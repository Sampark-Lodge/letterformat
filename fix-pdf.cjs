const fs = require('fs');
const path = require('path');

const formatsDir = './formats';
const files = fs.readdirSync(formatsDir).filter(f => f.endsWith('.html'));

let fixed = 0;

files.forEach(file => {
  const filePath = path.join(formatsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // FIX 1: Replace broken PDF functions with working ones
  const oldPDF = /function showPDFPreview\(\)\{[^}]*\}function closePDFModal\(\)\{[^}]*\}function generatePDF\(\)\{[^}]*\}/;
  const newPDF = `function showPDFPreview(){const letter=document.getElementById('letterDocument');if(!letter){alert('Letter not found');return;}const clone=letter.cloneNode(true);clone.querySelectorAll('[contenteditable]').forEach(el=>el.removeAttribute('contenteditable'));clone.querySelectorAll('.placeholder').forEach(el=>{el.style.background='transparent';el.style.borderBottom='1px solid #ccc';el.style.color='#000';});const preview=document.getElementById('pdfPreview');if(preview){preview.innerHTML='';preview.appendChild(clone);}const modal=document.getElementById('pdfModal');if(modal)modal.classList.add('active');}function closePDFModal(){const modal=document.getElementById('pdfModal');if(modal)modal.classList.remove('active');}function generatePDF(){const preview=document.getElementById('pdfPreview');if(!preview||!preview.innerHTML.trim()){alert('Preview is empty. Please fill the letter first.');return;}const opt={margin:[0.5,0.5,0.5,0.5],filename:'letterformat.pdf',image:{type:'jpeg',quality:0.98},html2canvas:{scale:2,useCORS:true,letterRendering:true},jsPDF:{unit:'in',format:'a4',orientation:'portrait'}};html2pdf().set(opt).from(preview).save().then(()=>{closePDFModal();});}`;
  
  if (oldPDF.test(content)) {
    content = content.replace(oldPDF, newPDF);
    modified = true;
  }

  // FIX 2: Ensure html2pdf CDN is loaded
  if (!content.includes('html2pdf.bundle.min.js')) {
    content = content.replace('</body>', '<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>\n</body>');
    modified = true;
  }

  // FIX 3: Ensure PDF modal exists
  if (!content.includes('pdfModal')) {
    const modal = `\n  <div id="pdfModal" class="pdf-modal">\n    <div class="pdf-modal-content">\n      <div class="pdf-modal-header">\n        <h3>PDF প্রিভিউ</h3>\n        <button class="pdf-close" onclick="closePDFModal()">×</button>\n      </div>\n      <div class="pdf-preview" id="pdfPreview"></div>\n      <div class="pdf-actions">\n        <button class="pdf-download-btn" onclick="generatePDF()">PDF ডাউনলোড করুন</button>\n      </div>\n    </div>\n  </div>\n`;
    content = content.replace('</body>', modal + '</body>');
    modified = true;
  }

  // FIX 4: Ensure PDF CSS exists
  if (!content.includes('.pdf-modal{')) {
    const css = `.pdf-modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:1000;justify-content:center;align-items:center}.pdf-modal.active{display:flex}.pdf-modal-content{background:white;border-radius:var(--radius-lg);width:90%;max-width:800px;max-height:90vh;overflow:hidden}.pdf-modal-header{display:flex;justify-content:space-between;align-items:center;padding:16px 24px;border-bottom:1px solid var(--gray-200)}.pdf-modal-header h3{font-size:1rem;font-weight:700;color:var(--gray-900)}.pdf-close{background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--gray-500)}.pdf-preview{padding:24px;max-height:60vh;overflow-y:auto;background:#f9f9f9}.pdf-actions{padding:16px 24px;border-top:1px solid var(--gray-200);display:flex;justify-content:flex-end}.pdf-download-btn{background:var(--red);color:white;border:none;padding:10px 20px;border-radius:var(--radius-sm);font-weight:600;cursor:pointer;font-family:var(--font-bn)}.pdf-download-btn:hover{background:var(--red-dark)}`;
    content = content.replace('</style>', css + '\n  </style>');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    fixed++;
  }
});

console.log(`✅ Fixed PDF on ${fixed} pages`);
console.log(`📊 Total pages checked: ${files.length}`);
