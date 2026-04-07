const fs = require('fs');
const path = require('path');

const formatsDir = './formats';
const files = fs.readdirSync(formatsDir).filter(f => f.endsWith('.html'));

let fixed = 0;

files.forEach(file => {
  const filePath = path.join(formatsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 1. Add contenteditable to all placeholder spans
  content = content.replace(/class="placeholder"/g, 'class="placeholder" contenteditable="true"');
  
  // 2. Update CSS for editable placeholders
  const oldPlaceholder = '.placeholder{background:rgba(220,38,38,0.08);border-bottom:2px dashed var(--red-mid);padding:0 4px;border-radius:3px;color:var(--red-dark)}';
  const newPlaceholder = '.placeholder{background:rgba(220,38,38,0.08);border-bottom:2px dashed var(--red-mid);padding:0 4px;border-radius:3px;color:var(--red-dark);cursor:text;outline:none;transition:all 0.2s}.placeholder:hover{background:rgba(220,38,38,0.12)}.placeholder:focus{background:rgba(220,38,38,0.15);border-bottom-style:solid;box-shadow:0 0 0 3px rgba(220,38,38,0.1)}';
  content = content.replace(oldPlaceholder, newPlaceholder);
  
  // 3. Add print styles if not present
  if (content.includes('letter-wrapper{border:none;box-shadow:none}.body{background:white}}')) {
    content = content.replace(
      '.body{background:white}}',
      '.body{background:white}.placeholder{background:none;border-bottom:none;color:inherit;cursor:default}}'
    );
  }
  
  // 4. Fix the copy function to include editable content
  const oldCopy = "function copyLetter(){const doc=document.getElementById('letterDocument');const text=doc.innerText;navigator.clipboard.writeText(text).then(()=>showToast()).catch(()=>{const range=document.createRange();range.selectNodeContents(doc);const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);document.execCommand('copy');sel.removeAllRanges();showToast()})}";
  const newCopy = "function copyLetter(){const doc=document.getElementById('letterDocument');const clone=doc.cloneNode(true);clone.querySelectorAll('[contenteditable]').forEach(el=>{el.removeAttribute('contenteditable')});const text=clone.innerText;navigator.clipboard.writeText(text).then(()=>showToast()).catch(()=>{const range=document.createRange();range.selectNodeContents(doc);const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);document.execCommand('copy');sel.removeAllRanges();showToast()})}";
  content = content.replace(oldCopy, newCopy);
  
  // 5. Fix the letter document to be fully editable
  if (content.includes('class="letter-document" id="letterDocument"')) {
    content = content.replace(
      'class="letter-document" id="letterDocument"',
      'class="letter-document" id="letterDocument" contenteditable="true"'
    );
  }
  
  // 6. Add instruction text above letter
  if (content.includes('ফরম্যাট — লাল অংশ পরিবর্তন করুন')) {
    content = content.replace(
      'ফরম্যাট — লাল অংশ পরিবর্তন করুন',
      'ফরম্যাট — লাল অংশে ক্লিক করে আপনার তথ্য লিখুন'
    );
  }
  
  fs.writeFileSync(filePath, content);
  fixed++;
  console.log(`✓ ${file}`);
});

console.log(`\n✅ Fixed ${fixed} files with editable placeholders`);
