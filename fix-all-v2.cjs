const fs = require('fs');
const path = require('path');

const formatsDir = path.join(__dirname, 'formats');

// CORRECT JavaScript code (the proper version without orphans)
const CORRECT_JS = `
function showPDFPreview(){const letter=document.getElementById('letterDocument');if(!letter){alert('Letter not found');return;}const clone=letter.cloneNode(true);clone.querySelectorAll('[contenteditable]').forEach(el=>el.removeAttribute('contenteditable'));clone.querySelectorAll('.placeholder').forEach(el=>{el.style.background='transparent';el.style.borderBottom='1px solid #ccc';el.style.color='#000';});const preview=document.getElementById('pdfPreview');if(preview){preview.innerHTML='';preview.style.fontFamily="'Noto Serif Bengali', serif";preview.style.fontSize='14pt';preview.style.lineHeight='2';preview.appendChild(clone);}const modal=document.getElementById('pdfModal');if(modal)modal.classList.add('active');}
function closePDFModal(){const modal=document.getElementById('pdfModal');if(modal)modal.classList.remove('active');}
function generatePDF(){const letter=document.getElementById('letterDocument');if(!letter){alert('Letter not found');return;}const clone=letter.cloneNode(true);clone.querySelectorAll('[contenteditable]').forEach(el=>el.removeAttribute('contenteditable'));clone.querySelectorAll('.placeholder').forEach(el=>{el.style.background='transparent';el.style.borderBottom='1px solid #ccc';el.style.color='#000';});const tempDiv=document.createElement('div');tempDiv.style.position='absolute';tempDiv.style.left='-9999px';tempDiv.style.top='0';tempDiv.style.width='210mm';tempDiv.style.padding='20mm';tempDiv.style.background='white';tempDiv.style.fontFamily="'Noto Serif Bengali', serif";tempDiv.style.fontSize='14pt';tempDiv.style.lineHeight='2';tempDiv.appendChild(clone);document.body.appendChild(tempDiv);const opt={margin:[0,0,0,0],filename:'letterformat.pdf',image:{type:'jpeg',quality:0.98},html2canvas:{scale:2,useCORS:true,letterRendering:true,scrollY:0,windowWidth:794},jsPDF:{unit:'mm',format:'a4',orientation:'portrait'}};html2pdf().set(opt).from(tempDiv).save().then(()=>{document.body.removeChild(tempDiv);closePDFModal();});}`;

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

  // 2. Fix broken JS - replace the broken section with correct code
  // The broken section starts with: function showPDFPreview(){...function closePDFModal()...function generatePDF(){...
  // It ends before: function validateForm(){
  // We replace it entirely with CORRECT_JS
  const brokenStart = 'function showPDFPreview()';
  const brokenEnd = 'function validateForm()';
  
  if (content.includes(brokenStart) && content.includes(brokenEnd)) {
    // Find positions
    const startIdx = content.indexOf(brokenStart);
    const endIdx = content.indexOf(brokenEnd);
    
    // Replace the entire broken section with correct JS
    const before = content.substring(0, startIdx);
    const after = content.substring(endIdx);
    
    content = before + '\n' + CORRECT_JS + '\n' + after;
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
