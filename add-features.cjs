const fs = require('fs');
const path = require('path');

const formatsDir = './formats';
const files = fs.readdirSync(formatsDir).filter(f => f.endsWith('.html'));

let pdfAdded = 0;
let valAdded = 0;

files.forEach(file => {
  const filePath = path.join(formatsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // ADD PDF functionality if missing
  if (!content.includes('showPDFPreview')) {
    // Add CSS
    const pdfCSS = `.pdf-modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:1000;justify-content:center;align-items:center}.pdf-modal.active{display:flex}.pdf-modal-content{background:white;border-radius:var(--radius-lg);width:90%;max-width:800px;max-height:90vh;overflow:hidden}.pdf-modal-header{display:flex;justify-content:space-between;align-items:center;padding:16px 24px;border-bottom:1px solid var(--gray-200)}.pdf-modal-header h3{font-size:1rem;font-weight:700;color:var(--gray-900)}.pdf-close{background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--gray-500)}.pdf-preview{padding:24px;max-height:60vh;overflow-y:auto;background:#f9f9f9}.pdf-actions{padding:16px 24px;border-top:1px solid var(--gray-200);display:flex;justify-content:flex-end}.pdf-download-btn{background:var(--red);color:white;border:none;padding:10px 20px;border-radius:var(--radius-sm);font-weight:600;cursor:pointer;font-family:var(--font-bn)}.pdf-download-btn:hover{background:var(--red-dark)}`;
    
    if (content.includes('</style>')) {
      content = content.replace('</style>', pdfCSS + '\n  </style>');
    }

    // Add PDF button
    if (content.includes('action-btn print')) {
      content = content.replace(
        /(<button class="action-btn print"[^>]*>.*?<\/button>)/,
        '$1\n          <button class="action-btn download" onclick="showPDFPreview()">📄 PDF ডাউনলোড</button>'
      );
    }

    // Add modal HTML before </body>
    const modalHTML = `\n  <div id="pdfModal" class="pdf-modal">\n    <div class="pdf-modal-content">\n      <div class="pdf-modal-header">\n        <h3>📄 PDF প্রিভিউ</h3>\n        <button class="pdf-close" onclick="closePDFModal()">×</button>\n      </div>\n      <div class="pdf-preview" id="pdfPreview"></div>\n      <div class="pdf-actions">\n        <button class="pdf-download-btn" onclick="generatePDF()">📥 PDF ডাউনলোড করুন</button>\n      </div>\n    </div>\n  </div>\n`;
    
    if (content.includes('</body>')) {
      content = content.replace('</body>', modalHTML + '</body>');
    }

    // Add JS functions
    const pdfJS = `function showPDFPreview(){const letter=document.getElementById('letterDocument').cloneNode(true);letter.querySelectorAll('[contenteditable]').forEach(el=>el.removeAttribute('contenteditable'));letter.querySelectorAll('.placeholder').forEach(el=>{el.style.background='none';el.style.borderBottom='none';});document.getElementById('pdfPreview').innerHTML=letter.outerHTML;document.getElementById('pdfModal').classList.add('active');}function closePDFModal(){document.getElementById('pdfModal').classList.remove('active');}function generatePDF(){const element=document.getElementById('pdfPreview');const opt={margin:1,filename:'letterformat.pdf',image:{type:'jpeg',quality:0.98},html2canvas:{scale:2},jsPDF:{unit:'in',format:'letter',orientation:'portrait'}};html2pdf().set(opt).from(element).save();}`;
    
    if (content.includes('</script>')) {
      content = content.replace('</script>', pdfJS + '</script>');
    }

    // Add html2pdf CDN
    if (content.includes('</body>') && !content.includes('html2pdf')) {
      content = content.replace('</body>', '<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>\n</body>');
    }

    pdfAdded++;
    modified = true;
  }

  // ADD validation if missing
  if (!content.includes('validateForm')) {
    // Add validation CSS
    const valCSS = `.validation-error{border:2px solid #ef4444!important;background:rgba(239,68,68,0.05)!important}.validation-success{border:2px solid #10b981!important}.validation-bar{background:white;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);padding:12px 16px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between}.validation-status{display:flex;align-items:center;gap:8px}.validation-icon{font-size:1.2rem}.validation-text{font-size:0.85rem;color:var(--gray-700)}.validation-progress{width:200px;height:6px;background:var(--gray-100);border-radius:3px;overflow:hidden}.validation-progress-bar{height:100%;background:var(--red);border-radius:3px;transition:width 0.3s ease}.validation-bar.complete{border-color:#10b981}.validation-bar.complete .validation-progress-bar{background:#10b981}`;
    
    if (content.includes('</style>')) {
      content = content.replace('</style>', valCSS + '\n  </style>');
    }

    // Add validation bar HTML
    const valBar = `\n        <div class="validation-bar" id="validationBar">\n          <div class="validation-status">\n            <span class="validation-icon">⚠️</span>\n            <span class="validation-text">সব লাল ঘর পূরণ করুন</span>\n          </div>\n          <div class="validation-progress">\n            <div class="validation-progress-bar" id="validationProgressBar" style="width:0%"></div>\n          </div>\n        </div>\n`;
    
    if (content.includes('letter-document')) {
      content = content.replace(/(<div class="letter-document")/, valBar + '        $1');
    }

    // Add validation JS
    const valJS = `function validateForm(){const placeholders=document.querySelectorAll('.placeholder');let filled=0;let empty=[];placeholders.forEach((ph,i)=>{const text=ph.textContent.trim();if(text&&!text.startsWith('[')&&!text.endsWith(']')){filled++;ph.classList.remove('validation-error');ph.classList.add('validation-success');}else{empty.push(ph);ph.classList.remove('validation-success');}});const total=placeholders.length;const percent=Math.round((filled/total)*100);document.getElementById('validationProgressBar').style.width=percent+'%';const bar=document.getElementById('validationBar');const statusText=bar.querySelector('.validation-text');const statusIcon=bar.querySelector('.validation-icon');if(filled===total){bar.classList.add('complete');statusIcon.textContent='✅';statusText.textContent='সব তথ্য পূরণ হয়েছে!';}else{bar.classList.remove('complete');statusIcon.textContent='⚠️';statusText.textContent=filled+'/'+total+' ঘর পূরণ হয়েছে';}return filled===total;}document.querySelectorAll('.placeholder').forEach(ph=>{ph.addEventListener('blur',function(){const text=this.textContent.trim();if(text&&text.length>0){this.textContent=text.charAt(0).toUpperCase()+text.slice(1);}});ph.addEventListener('input',function(){validateForm();});});validateForm();`;
    
    if (content.includes('function copyLetter')) {
      content = content.replace(/function copyLetter\(\)/, valJS + 'function copyLetter()');
      // Update copyLetter to validate first
      content = content.replace(/function copyLetter\(\)\{/, "function copyLetter(){if(!validateForm()){alert('অনুগ্রহ করে সব লাল ঘর পূরণ করুন!');return;");
    }

    valAdded++;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
  }
});

console.log(`✅ PDF added to ${pdfAdded} pages`);
console.log(`✅ Validation added to ${valAdded} pages`);
console.log(`📊 Total pages: ${files.length}`);
