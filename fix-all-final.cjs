const fs = require('fs');
const path = require('path');

const formatsDir = path.join(__dirname, 'formats');

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
    if (filename.startsWith(prefix)) return `../${category}`;
  }
  return '../application.html';
}

function fixFile(filepath) {
  const filename = path.basename(filepath);
  let content = fs.readFileSync(filepath, 'utf8');
  let modified = false;

  // 1. Fix breadcrumb
  const categoryHref = getCategoryHref(filename);
  if (content.includes('href="../.html"')) {
    content = content.replace(/href="\.\.\/\.html"/g, `href="${categoryHref}"`);
    modified = true;
  }

  // 2. Fix showPDFPreview orphaned code
  const showPDFOrphan = /const clone=letter\.cloneNode\(true\)[\s\S]*?function closePDFModal/;
  if (showPDFOrphan.test(content)) {
    content = content.replace(showPDFOrphan, 'function closePDFModal');
    modified = true;
  }

  // 3. Fix generatePDF orphaned code
  const genPDFOrphan = /\}const opt=\{[\s\S]*?html2pdf\(\)\.set\(opt\)\.from\(preview\)\.save\(\)/;
  if (genPDFOrphan.test(content)) {
    content = content.replace(genPDFOrphan, '}');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filepath, content, 'utf8');
    return `✅ Fixed: ${filename}`;
  }
  return `⚠️ No issues: ${filename}`;
}

const files = fs.readdirSync(formatsDir).filter(f => f.endsWith('.html')).map(f => path.join(formatsDir, f));
console.log(`\n📁 Processing ${files.length} files\n`);
console.log('='.repeat(50));
files.forEach(f => console.log(fixFile(f)));
console.log('\n' + '='.repeat(50));
console.log('✨ Done!');
