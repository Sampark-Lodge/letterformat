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
  // Original pattern: ...modal.classList.add('active');}const clone=letter.cloneNode(true);...
  // The orphaned code starts with 'const clone=' and references 'letter' which is out of scope
  const showPDFOrphaned = /\}const clone=letter\.cloneNode\(true\);[^}]*\}\s*function closePDFModal/g;
  if (showPDFOrphaned.test(content)) {
    content = content.replace(showPDFOrphaned, '}function closePDFModal');
    modified = true;
  }

  // 3. Fix generatePDF orphaned code
  // Original pattern: ...closePDFModal();});}const opt={margin:[0.5,0.5,0.5,0.5]...html2pdf().set(opt).from(preview)...
  // The orphaned code uses 'preview' instead of 'tempDiv' and declares 'const opt' again
  const genPDFOrphaned = /\}const opt=\{[^}]+\}[^}]*html2pdf\(\)\.set\(opt\)\.from\(preview\)\.save\(\)/g;
  if (genPDFOrphaned.test(content)) {
    content = content.replace(genPDFOrphaned, '}');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ Fixed: ${filename}`);
  } else {
    console.log(`⚠️ No issues: ${filename}`);
  }
}

const files = fs.readdirSync(formatsDir).filter(f => f.endsWith('.html')).map(f => path.join(formatsDir, f));
console.log(`\n📁 Processing ${files.length} files\n`);
files.forEach(fixFile);
console.log('\n✨ Done!');
