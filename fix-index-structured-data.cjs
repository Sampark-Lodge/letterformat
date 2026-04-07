// fix-index-structured-data.cjs
// Fixes structured data on index.html and all 9 category pages

const fs = require('fs');
const path = require('path');

const baseUrl = 'https://sampark-lodge.github.io/letterformat';

// ============================================================
// 1. Fix index.html
// ============================================================
function fixIndexPage() {
  const filepath = path.join(__dirname, 'index.html');
  let content = fs.readFileSync(filepath, 'utf8');

  // New structured data: WebSite + Organization + BreadcrumbList
  const newStructuredData = `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LetterFormat.in",
    "url": "${baseUrl}/",
    "description": "বিনামূল্যে বাংলা চিঠি ও আবেদন ফরম্যাটের ওয়েবসাইট। ছাত্র, চাকরিজীবী ও সাধারণ মানুষের জন্য কপি-পেস্ট ফরম্যাট।",
    "inLanguage": "bn",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "${baseUrl}/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LetterFormat.in",
    "url": "${baseUrl}/",
    "description": "বিনামূল্যে বাংলা চিঠি ও আবেদন ফরম্যাটের ওয়েবসাইট। ছাত্র, চাকরিজীবী ও সাধারণ মানুষের জন্য কপি-পেস্ট ফরম্যাট।",
    "areaServed": "BD"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "হোম",
        "item": "${baseUrl}/"
      }
    ]
  }
  </script>`;

  // Replace existing Organization schema
  const orgSchemaRegex = /<script type="application\/ld\+json">\s*\{[\s\S]*?"@type":\s*"Organization"[\s\S]*?<\/script>\s*/;
  content = content.replace(orgSchemaRegex, newStructuredData);

  fs.writeFileSync(filepath, content, 'utf8');
  console.log('✅ index.html updated');
}

// ============================================================
// 2. Fix category pages
// ============================================================
const categories = [
  { file: 'application.html', name: 'ছুটির আবেদন', desc: 'সব ধরনের সাধারণ আবেদন পত্রের বাংলা ফরম্যাট। সরকারি, ব্যাংক, জমিসংক্রান্ত সহ সব আবেদন।', keywords: 'আবেদন পত্র, সাধারণ আবেদন, ব্যাংক আবেদন, সরকারি আবেদন, LetterFormat.in' },
  { file: 'complaint.html', name: 'অভিযোগ পত্র', desc: 'ব্যাংক, বিদ্যুৎ, পানি, পরিবেশ সহ সব ধরনের অভিযোগ পত্রের বাংলা ফরম্যাট।', keywords: 'অভিযোগ পত্র, লিখিত অভিযোগ, প্রশাসনিক অভিযোগ, LetterFormat.in' },
  { file: 'certificate.html', name: 'সার্টিফিকেট ও প্রত্যয়ন', desc: 'আয়, অক্ষমতা, বয়স, জাত, অবিবাহিত সহ সব ধরনের সার্টিফিকেট আবেদনের বাংলা ফরম্যাট।', keywords: 'সার্টিফিকেট, প্রত্যয়ন, আয় সার্টিফিকেট, অক্ষমতা সার্টিফিকেট, LetterFormat.in' },
  { file: 'bank.html', name: 'ব্যাংক আবেদন', desc: 'একাউন্ট খোলা, কার্ড, লোন, স্টেটমেন্ট সহ ব্যাংক সংক্রান্ত সব আবেদনের বাংলা ফরম্যাট।', keywords: 'ব্যাংক আবেদন, একাউন্ট স্টেটমেন্ট, কার্ড আবেদন, লোন, LetterFormat.in' },
  { file: 'government.html', name: 'সরকারি সেবা', desc: 'পাসপোর্ট, ট্যাক্স, পেনশন, বেকারত্ব ভাতা সহ সরকারি সেবার আবেদনের বাংলা ফরম্যাট।', keywords: 'সরকারি আবেদন, পাসপোর্ট, পেনশন, ট্যাক্স, LetterFormat.in' },
  { file: 'school.html', name: 'স্কুল আবেদন', desc: 'ভর্তি, পরীক্ষার অনুমতি, ইউনিফর্ম, ট্রান্সপোর্ট সহ স্কুল সংক্রান্ত সব আবেদনের বাংলা ফরম্যাট।', keywords: 'স্কুল আবেদন, ভর্তি, পরীক্ষা, ইউনিফর্ম, LetterFormat.in' },
  { file: 'employment.html', name: 'কর্মসংস্থান পত্র', desc: 'অফার লেটার, যোগদান, টার্মিনেশন, ট্রান্সফার সহ কর্মসংস্থান সংক্রান্ত সব পত্রের বাংলা ফরম্যাট।', keywords: 'চাকরি পত্র, অফার লেটার, টার্মিনেশন, LetterFormat.in' },
  { file: 'academic.html', name: 'একাডেমিক আবেদন', desc: 'স্কুল/কলেজ সম্পর্কিত সব আবেদন ফরম্যাট। ছুটি, সার্টিফিকেট, ফি, স্কলারশিপ সহ।', keywords: 'একাডেমিক আবেদন, স্কুল আবেদন, কলেজ আবেদন, সার্টিফিকেট, LetterFormat.in' },
  { file: 'job.html', name: 'চাকরির আবেদন', desc: 'কভার লেটার, রেজিউম, ফলো-আপ, রেফারেন্স সহ চাকরি আবেদনের সব বাংলা ফরম্যাট।', keywords: 'চাকরি আবেদন, কভার লেটার, ফলো-আপ, রেজিউম, LetterFormat.in' },
];

function fixCategoryPage(cat) {
  const filepath = path.join(__dirname, cat.file);
  if (!fs.existsSync(filepath)) {
    console.log(`⚠️  ${cat.file} not found, skipping`);
    return;
  }

  let content = fs.readFileSync(filepath, 'utf8');
  const catUrl = `${baseUrl}/${cat.file}`;

  const structuredData = `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "${cat.name} — LetterFormat.in",
    "url": "${catUrl}",
    "description": "${cat.desc}",
    "keywords": "${cat.keywords}",
    "inLanguage": "bn",
    "isPartOf": {
      "@type": "WebSite",
      "name": "LetterFormat.in",
      "url": "${baseUrl}/"
    }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "হোম",
        "item": "${baseUrl}/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "${cat.name}",
        "item": "${catUrl}"
      }
    ]
  }
  </script>`;

  // Insert before </head>
  content = content.replace('</head>', structuredData + '\n</head>');

  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`✅ ${cat.file} updated`);
}

// Run
fixIndexPage();
console.log('');
console.log('Fixing category pages:');
categories.forEach(fixCategoryPage);
console.log('');
console.log('Done!');
