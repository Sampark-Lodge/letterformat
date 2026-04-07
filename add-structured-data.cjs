const fs = require('fs');
const path = require('path');

const baseUrl = 'https://sampark-lodge.github.io/letterformat/';
const formatsDir = path.join(__dirname, 'formats');

function extractTitle(content) {
  const match = content.match(/<h1 class="format-title">([^<]+)<\/h1>/);
  return match ? match[1].trim() : null;
}

function extractFAQs(content) {
  const faqItems = [];
  const faqRegex = /<div class="faq-item">\s*<h3>([^<]+)<\/h3>\s*<p>([^<]+)<\/p>\s*<\/div>/g;
  let match;
  while ((match = faqRegex.exec(content)) !== null) {
    faqItems.push({ question: match[1].trim(), answer: match[2].trim() });
    if (faqItems.length >= 5) break; // Max 5 FAQs
  }
  return faqItems;
}

function buildArticleSchema(filename, title) {
  // Convert filename to readable title if needed
  const url = `${baseUrl}formats/${filename}`;
  const today = '2026-04-07';
  
  return `  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${title.replace(/"/g, '\\"')}",
    "description": "বিনামূল্যে বাংলা চিঠি ও আবেদন ফরম্যাট। কপি-পেস্ট করুন এবং সহজেই ব্যবহার করুন।",
    "url": "${url}",
    "datePublished": "${today}",
    "dateModified": "${today}",
    "author": {
      "@type": "Organization",
      "name": "LetterFormat.in",
      "url": "${baseUrl}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LetterFormat.in",
      "url": "${baseUrl}"
    },
    "inLanguage": "bn",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    }
  }
  </script>`;
}

function buildFAQSchema(faqs) {
  if (faqs.length === 0) return '';
  
  const mainEntity = faqs.map(faq => {
    return `      {
        "@type": "Question",
        "name": "${faq.question.replace(/"/g, '\\"')}",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "${faq.answer.replace(/"/g, '\\"')}"
        }
      }`;
  }).join(',\n');
  
  return `  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
${mainEntity}
    ]
  }
  </script>`;
}

function addStructuredData(filepath) {
  const filename = path.basename(filepath);
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Skip if already has structured data
  if (content.includes('application/ld+json')) {
    return null;
  }
  
  const title = extractTitle(content);
  if (!title) {
    return `❌ No title found: ${filename}`;
  }
  
  const faqs = extractFAQs(content);
  
  const articleSchema = buildArticleSchema(filename, title);
  const faqSchema = buildFAQSchema(faqs);
  
  // Insert before </head>
  const insertPoint = content.indexOf('</head>');
  if (insertPoint === -1) {
    return `❌ No </head> found: ${filename}`;
  }
  
  const schemaBlock = '\n' + articleSchema + '\n' + faqSchema + '\n';
  const newContent = content.slice(0, insertPoint) + schemaBlock + content.slice(insertPoint);
  
  fs.writeFileSync(filepath, newContent, 'utf8');
  return `✅ ${filename} (${faqs.length} FAQs)`;
}

const files = fs.readdirSync(formatsDir).filter(f => f.endsWith('.html'));
console.log(`\n🔍 Processing ${files.length} format pages for structured data...\n`);
console.log('='.repeat(60));

let success = 0, skipped = 0, errors = 0;
files.forEach(f => {
  const filepath = path.join(formatsDir, f);
  const result = addStructuredData(filepath);
  if (result === null) {
    console.log(`⏭️  Already has schema: ${f}`);
    skipped++;
  } else if (result.startsWith('✅')) {
    console.log(result);
    success++;
  } else {
    console.log(result);
    errors++;
  }
});

console.log('\n' + '='.repeat(60));
console.log(`✨ Done: ${success} added, ${skipped} skipped, ${errors} errors`);
