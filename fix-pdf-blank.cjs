const fs = require('fs');
const path = require('path');

const formatsDir = './formats';
const files = fs.readdirSync(formatsDir).filter(f => f.endsWith('.html'));

let fixed = 0;

files.forEach(file => {
  const filePath = path.join(formatsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace the broken generatePDF function with a working one
  const oldGeneratePDF = /function generatePDF\(\)\{[^}]*\}/;
  const newGeneratePDF = `function generatePDF(){const letter=document.getElementById('letterDocument');if(!letter){alert('Letter not found');return;}const clone=letter.cloneNode(true);clone.querySelectorAll('[contenteditable]').forEach(el=>el.removeAttribute('contenteditable'));clone.querySelectorAll('.placeholder').forEach(el=>{el.style.background='transparent';el.style.borderBottom='1px solid #ccc';el.style.color='#000';});const tempDiv=document.createElement('div');tempDiv.style.position='absolute';tempDiv.style.left='-9999px';tempDiv.style.top='0';tempDiv.style.width='210mm';tempDiv.style.padding='20mm';tempDiv.style.background='white';tempDiv.style.fontFamily="'Noto Serif Bengali', serif";tempDiv.style.fontSize='14pt';tempDiv.style.lineHeight='2';tempDiv.appendChild(clone);document.body.appendChild(tempDiv);const opt={margin:[0,0,0,0],filename:'letterformat.pdf',image:{type:'jpeg',quality:0.98},html2canvas:{scale:2,useCORS:true,letterRendering:true,scrollY:0,windowWidth:794},jsPDF:{unit:'mm',format:'a4',orientation:'portrait'}};html2pdf().set(opt).from(tempDiv).save().then(()=>{document.body.removeChild(tempDiv);closePDFModal();});}`;
  
  if (oldGeneratePDF.test(content)) {
    content = content.replace(oldGeneratePDF, newGeneratePDF);
    fixed++;
  }
  
  // Also fix showPDFPreview to work better
  const oldPreview = /function showPDFPreview\(\)\{[^}]*\}/;
  const newPreview = `function showPDFPreview(){const letter=document.getElementById('letterDocument');if(!letter){alert('Letter not found');return;}const clone=letter.cloneNode(true);clone.querySelectorAll('[contenteditable]').forEach(el=>el.removeAttribute('contenteditable'));clone.querySelectorAll('.placeholder').forEach(el=>{el.style.background='transparent';el.style.borderBottom='1px solid #ccc';el.style.color='#000';});const preview=document.getElementById('pdfPreview');if(preview){preview.innerHTML='';preview.style.fontFamily="'Noto Serif Bengali', serif";preview.style.fontSize='14pt';preview.style.lineHeight='2';preview.appendChild(clone);}const modal=document.getElementById('pdfModal');if(modal)modal.classList.add('active');}`;
  
  if (oldPreview.test(content)) {
    content = content.replace(oldPreview, newPreview);
  }
  
  fs.writeFileSync(filePath, content);
});

console.log(`✅ Fixed PDF generation on ${fixed} pages`);
