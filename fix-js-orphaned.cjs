const fs = require('fs');
const path = require('path');

const formatsDir = path.join(__dirname, 'formats');

// Category mapping from filename prefix
const categoryMap = {
  'application-': 'application.html',
  'complaint-letter-': 'complaint.html',
  'complaint-': 'complaint.html',
  'certificate-': 'certificate.html',
  'bank-': 'bank.html',
  'letter-bank-': 'bank.html',
  'government-': 'government.html',
  'school-': 'school.html',
  'employment-': 'employment.html',
  'academic-': 'academic.html',
  'job-': 'job.html'
};

function getCategoryHref(filename) {
  for (const [prefix, category] of Object.entries(categoryMap)) {
    if (filename.startsWith(prefix)) {
      return `../${category}`;
    }
  }
  return '../application.html';
}

function fixFile(filepath) {
  const filename = path.basename(filepath);
  let content = fs.readFileSync(filepath, 'utf8');
  let modified = false;

  // Fix breadcrumb
  const categoryHref = getCategoryHref(filename);
  if (content.includes('href="../.html"')) {
    content = content.replace(/href="\.\.\/\.html"/g, `href="${categoryHref}"`);
    modified = true;
  }

  // Fix orphaned showPDFPreview code
  // Pattern: }const clone=letter.cloneNode(true); appears right after function ends
  const orphanedShowPDF = /\}\s*const clone=letter\.cloneNode\(true\);/g;
  if (orphanedShowPDF.test(content)) {
    content = content.replace(orphanedShowPDF, '}');
    modified = true;
  }

  // Fix orphaned generatePDF code  
  // Pattern: });}const opt={...}html2pdf().set(opt).from(preview).save()
  // The orphaned code uses 'preview' instead of 'tempDiv'
  const orphanedGenPDF = /\}\s*const opt=\{[^}]+\}[^}]*html2pdf\(\)\.set\(opt\)\.from\(preview\)\.save\(\)/g;
  if (orphanedGenPDF.test(content)) {
    content = content.replace(orphanedGenPDF, '}');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ Fixed: ${filename}`);
  } else {
    console.log(`⚠️ No issues: ${filename}`);
  }
}

const files = fs.readdirSync(formatsDir)
  .filter(f => f.endsWith('.html'))
  .map(f => path.join(formatsDir, f));

console.log(`\n📁 Found ${files.length} HTML files\n`);
console.log('='.repeat(50));
files.forEach(fixFile);
console.log('\n' + '='.repeat(50));
console.log('✨ All fixes complete!');
