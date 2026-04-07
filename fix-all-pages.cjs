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
  return '../application.html'; // default
}

function fixFile(filepath) {
  const filename = path.basename(filepath);
  let content = fs.readFileSync(filepath, 'utf8');
  let modified = false;

  // 1. Fix breadcrumb href="../.html"
  const categoryHref = getCategoryHref(filename);
  if (content.includes('href="../.html"')) {
    content = content.replace(/href="\.\.\/\.html"/g, `href="${categoryHref}"`);
    modified = true;
  }

  // 2. Fix orphaned showPDFPreview code
  // Pattern: function ends with '}' then immediately 'const clone=' (orphaned code)
  const showPDFPattern = /function showPDFPreview\(\)\{[^}]+\}[^}]*\}\s*const clone=letter\.cloneNode\(true\);/g;
  if (showPDFPattern.test(content)) {
    content = content.replace(showPDFPattern, "function showPDFPreview(){const letter=document.getElementById('letterDocument');if(!letter){alert('Letter not found');return;}const clone=letter.cloneNode(true);clone.querySelectorAll('[contenteditable]').forEach(el=>el.removeAttribute('contenteditable'));clone.querySelectorAll('.placeholder').forEach(el=>{el.style.background='transparent';el.style.borderBottom='1px solid #ccc';el.style.color='#000';});const preview=document.getElementById('pdfPreview');if(preview){preview.innerHTML='';preview.style.fontFamily=\"'Noto Serif Bengali', serif\";preview.style.fontSize='14pt';preview.style.lineHeight='2';preview.appendChild(clone);}const modal=document.getElementById('pdfModal');if(modal)modal.classList.add('active');}");
    modified = true;
  }

  // 3. Fix orphaned generatePDF code
  // Pattern: function ends, then orphaned 'const opt=' and 'html2pdf()' outside function
  const genPDFPattern = /html2pdf\(\)\.set\(opt\)\.from\(tempDiv\)\.save\(\)\.then[^}]+\}\s*const opt=\{[^;]+;[^}]+\}\s*html2pdf\(\)\.set\(opt\)\.from\(preview\)\.save\(\)/g;
  if (genPDFPattern.test(content)) {
    content = content.replace(genPDFPattern, "html2pdf().set(opt).from(tempDiv).save().then(()=>{document.body.removeChild(tempDiv);closePDFModal();});}");
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ Fixed: ${filename}`);
  } else {
    console.log(`⚠️ No issues: ${filename}`);
  }
}

// Get all HTML files in formats directory
const files = fs.readdirSync(formatsDir)
  .filter(f => f.endsWith('.html'))
  .map(f => path.join(formatsDir, f));

console.log(`\n📁 Found ${files.length} HTML files\n`);
console.log('=' .repeat(50));

files.forEach(fixFile);

console.log('\n' + '=' .repeat(50));
console.log('✨ All fixes complete!');
