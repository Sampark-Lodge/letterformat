// fix-category-links.cjs
// Adds missing format pages to their category listing pages

const fs = require('fs');
const path = require('path');

const formatsDir = path.join(__dirname, 'formats');
const categories = {
  'application': 'application.html',
  'school': 'school.html',
  'academic': 'academic.html',
  'bank': 'bank.html',
  'certificate': 'certificate.html',
  'complaint': 'complaint.html',
  'employment': 'employment.html',
  'government': 'government.html',
  'job': 'job.html',
};

// Icon mapping by category
const categoryIcons = {
  application: '📝',
  school: '🏫',
  academic: '🎓',
  bank: '🏦',
  certificate: '📜',
  complaint: '📢',
  employment: '💼',
  government: '🏛️',
  job: '📬',
};

// Icon mapping by keyword in filename
const keywordIcons = {
  'leave': '🏖️', 'sick': '🏥', 'fever': '🤒', 'casual': '📅',
  'maternity': '🤱', 'paternity': '👶', 'wedding': '💒', 'funeral': '🕯️',
  'exam': '📝', 'scholarship': '🎓', 'fee': '💰', 'transfer': '🔄',
  'bonafide': '📋', 'character': '👤', 'income': '💵', 'caste': '📄',
  'birth': '👶', 'death': '🕯️', 'marriage': '💍', 'police': '👮',
  'bank': '🏦', 'loan': '💳', 'card': '💳', 'account': '💰',
  'passport': '🛂', 'license': '🪪', 'pan': '🪪', 'aadhaar': '🪪',
  'ration': '🍚', 'voter': '🗳️', 'name': '✏️', 'driving': '🚗',
  'salary': '💰', 'increment': '📈', 'promotion': '📈', 'transfer': '🔄',
  'resignation': '📤', 'relieving': '📤', 'experience': '📋',
  'pension': '👴', 'disability': '♿', 'unemployment': '📊', 'tax': '📋',
  'water': '🚿', 'electric': '⚡', 'road': '🛣️', 'lamp': '💡',
  'parking': '🅿️', 'noise': '🔊', 'garbage': '🗑️', 'internet': '🌐',
  'landlord': '🏠', 'neighbor': '🏘️', 'workplace': '🏢',
  'counter': '🤝', 'decline': '📪', 'follow': '📮', 'reference': '👔',
  'thank': '🙏', 'cover': '✉️', 'appraisal': '📊',
  'admission': '🎓', 'id': '🪪', 'uniform': '👕', 'transport': '🚌',
  'attendance': '📋', 'course': '📚', 'grade': '📊', 'hostel': '🏠',
  'library': '📚', 'project': '📁', 'result': '📊', 'tc': '📜',
  'transcript': '📜', 'rechecking': '🔍', 'extension': '⏰',
  'reactivation': '🔓', 'interest': '📈', 'minimum': '📉',
  'non-marriage': '💍', 'orphan': '👶', 'residence': '🏠', 'senior': '👴',
  'electricity': '⚡', 'power': '⚡', 'load': '⚡', 'connection': '🔌',
  'disconnection': '🔌', 'community': '👥',
};

function getIcon(filename) {
  const lower = filename.toLowerCase();
  for (const [kw, icon] of Object.entries(keywordIcons)) {
    if (lower.includes(kw)) return icon;
  }
  return '📄';
}

function generateCard(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  
  // Extract title
  const titleMatch = content.match(/<title>([^—]+)/);
  const title = titleMatch ? titleMatch[1].trim() : path.basename(filepath, '.html');
  
  // Extract description
  const descMatch = content.match(/<meta name="description" content="([^"]+)"/);
  const desc = descMatch ? descMatch[1].split('।')[0] + '।' : title;
  
  // Generate views (consistent per filename using simple hash)
  const hash = filepath.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const views = 5000 + (hash % 15000);
  const viewsStr = views.toLocaleString('bn-BD');
  
  const rating = (4.0 + (hash % 10) * 0.1).toFixed(1);
  const icon = getIcon(path.basename(filepath));
  const filename = path.basename(filepath);
  
  return `    <a href="formats/${filename}" class="format-card">
      <div class="format-icon">${icon}</div>
      <div class="format-name">${title}</div>
      <div class="format-desc">${desc}</div>
      <div class="format-meta"><span>👁 ${viewsStr}</span><span>⭐ ${rating}</span></div>
    </a>`;
}

function getExistingLinks(categoryPage) {
  const content = fs.readFileSync(categoryPage, 'utf8');
  const matches = content.match(/href="(formats\/[^"]+\.html)"/g) || [];
  return new Set(matches.map(m => m.match(/href="(formats\/[^"]+\.html)"/)[1]));
}

function fixCategoryPages() {
  let totalAdded = 0;
  
  for (const [prefix, catFile] of Object.entries(categories)) {
    const catPath = path.join(__dirname, catFile);
    if (!fs.existsSync(catPath)) {
      console.log(`⚠️  ${catFile} not found`);
      continue;
    }
    
    const content = fs.readFileSync(catPath, 'utf8');
    const existingLinks = getExistingLinks(catPath);
    
    // Find all format files for this category
    const allFiles = fs.readdirSync(formatsDir)
      .filter(f => f.startsWith(prefix + '-') && f.endsWith('.html'));
    
    // Find missing ones
    const missing = allFiles.filter(f => !existingLinks.has('formats/' + f));
    
    if (missing.length === 0) {
      console.log(`✅ ${catFile}: all ${allFiles.length} format pages already linked`);
      continue;
    }
    
    // Generate cards for missing ones
    const newCards = missing.map(f => generateCard(path.join(formatsDir, f)));
    
    // Find the formats-grid closing div: second-to-last </div> before </body>
    // (last </div> is page-content, second-to-last is formats-grid)
    const bodyIdx = content.indexOf('</body>');
    let idx = bodyIdx;
    let prev = -1, last = -1;
    while ((idx = content.lastIndexOf('</div>', idx - 1)) !== -1 && idx < bodyIdx) {
      prev = last;
      last = idx;
    }
    const gridCloseIdx = prev;
    
    if (gridCloseIdx === -1) {
      console.log(`⚠️  ${catFile}: could not find formats-grid closing tag`);
      continue;
    }
    
    const newContent = content.slice(0, gridCloseIdx) + '\n' + newCards.join('\n') + content.slice(gridCloseIdx);
    fs.writeFileSync(catPath, newContent, 'utf8');
    
    console.log(`✅ ${catFile}: added ${missing.length} missing cards`);
    totalAdded += missing.length;
  }
  
  console.log(`\nTotal: ${totalAdded} format cards added`);
}

fixCategoryPages();
