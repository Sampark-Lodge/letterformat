const fs = require('fs');
const path = require('path');

const formatsDir = path.join(__dirname, 'formats');

// Fix government recipients (5 files) - school terminology → proper government authority
const governmentRecipients = {
  'government-passport-status.html': {
    toName: 'পাসপোর্ট অফিসার / উপজেলা নির্বাহী কর্মকর্তা',
    toAddress: '[পাসপোর্ট অফিস / উপজেলা প্রশাসন কার্যালয়]\n[শহর, জেলা]'
  },
  'government-tax-certificate.html': {
    toName: 'কর অফিসার / জেলা কর রেজিস্ট্রার',
    toAddress: '[কর অফিস / জেলা প্রশাসন কার্যালয়]\n[শহর, জেলা]'
  },
  'government-old-age-pension.html': {
    toName: 'উপজেলা সমাজসেবা কর্মকর্তা / জেলা সমাজসেবা প্রম্পটি',
    toAddress: '[উপজেলা সমাজসেবা কার্যালয় / জেলা সমাজসেবা প্রম্পটি]\n[শহর, জেলা]'
  },
  'government-disability-certificate.html': {
    toName: 'উপজেলা সমাজসেবা কর্মকর্তা / জেলা সমাজসেবা প্রম্পটি',
    toAddress: '[উপজেলা সমাজসেবা কার্যালয় / জেলা সমাজসেবা প্রম্পটি]\n[শহর, জেলা]'
  },
  'government-unemployment.html': {
    toName: 'উপজেলা যুব উন্নয়ন কর্মকর্তা / জেলা যুব উন্নয়ন প্রম্পটি',
    toAddress: '[উপজেলা যুব উন্নয়ন কার্যালয় / জেলা যুব উন্নয়ন প্রম্পটি]\n[শহর, জেলা]'
  }
};

console.log('\n📋 Fixing government recipients...\n');

Object.entries(governmentRecipients).forEach(([filename, data]) => {
  const filepath = path.join(formatsDir, filename);
  if (!fs.existsSync(filepath)) {
    console.log(`❌ Not found: ${filename}`);
    return;
  }
  
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Fix to-name
  content = content.replace(
    /<div class="to-name"><span class="placeholder" contenteditable="true">প্রধান শিক্ষক \/ ব্যবস্থাপক<\/span><\/div>/,
    `<div class="to-name"><span class="placeholder" contenteditable="true">${data.toName}</span></div>`
  );
  
  // Fix to-address
  content = content.replace(
    /<div class="to-address"><span class="placeholder" contenteditable="true">\[বিদ্যালয় \/ প্রতিষ্ঠানের নাম\]<\/span><br><span class="placeholder" contenteditable="true">\[শহর, জেলা\]<\/span><\/div>/,
    `<div class="to-address"><span class="placeholder" contenteditable="true">${data.toAddress.replace(/\n/g, '<br>')}</span></div>`
  );
  
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`✅ Fixed: ${filename}`);
});

console.log('\n📋 Fixing TIN → টিন in government-tax-certificate.html...\n');

const taxFile = path.join(formatsDir, 'government-tax-certificate.html');
if (fs.existsSync(taxFile)) {
  let content = fs.readFileSync(taxFile, 'utf8');
  
  // Fix TIN → টিন (Bengali TIN)
  content = content.replace(/TIN/g, 'টিন');
  content = content.replace(/টিন নম্বর/g, 'টিন নম্বর');
  content = content.replace(/TIN সনদ/g, 'টিন সনদ');
  
  fs.writeFileSync(taxFile, content, 'utf8');
  console.log('✅ Fixed TIN → টিন');
}

console.log('\n✨ Done!');
