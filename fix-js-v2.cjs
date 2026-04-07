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

  // 2. Fix showPDFPreview: find the complete function and check for orphaned code AFTER the closing }
  // The function looks like:
  // function showPDFPreview(){...clone.querySelectorAll...modal.classList.add('active');}
  // [ORPHANED] const clone=letter.cloneNode(true);clone.querySelectorAll...
  // 
  // We need to keep the function body WITH the const clone=letter.cloneNode(true); INSIDE it
  // and remove only what comes AFTER the function's closing }

  // Pattern: after function showPDFPreview ends with '}', there's orphaned clone code starting with 'const clone='
  // But the CORRECT structure has 'const clone=' INSIDE the function before the last '}'
  
  // Fix: Remove orphaned code that appears AFTER the function closing } but uses 'clone' which shouldn't be accessible
  // Match: });}const clone=letter.cloneNode(true);
  const orphanedAfterShowPDF = /\}\)\}\s*const clone=letter\.cloneNode\(true\);/g;
  if (orphanedAfterShowPDF.test(content)) {
    content = content.replace(orphanedAfterShowPDF, '})}');
    modified = true;
  }

  // 3. Fix generatePDF: similar issue
  // After the function closes with '}' there can be orphaned: const opt={...};html2pdf().set(opt).from(preview).save()
  // We want to remove code that references 'preview' (the old wrong approach) after the function
  const orphanedAfterGenPDF = /\}\s*const opt=\{[^}]+\}[^}]*html2pdf\(\)\.set\(opt\)\.from\(preview\)\.save\(\)/g;
  if (orphanedAfterGenPDF.test(content)) {
    content = content.replace(orphanedAfterGenPDF, '}');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ Fixed: ${filename}`);
  } else {
    console.log(`⚠️ No JS issues: ${filename}`);
  }
}

const files = fs.readdirSync(formatsDir).filter(f => f.endsWith('.html')).map(f => path.join(formatsDir, f));
console.log(`\n📁 Processing ${files.length} files\n`);
files.forEach(fixFile);
console.log('\n✨ Done!');
