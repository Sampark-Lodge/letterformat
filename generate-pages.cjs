const fs = require('fs');
const path = require('path');

// Read the pages.ts file and extract data using regex
const pagesFile = fs.readFileSync('./src/content/data/pages.ts', 'utf-8');

// Extract all page entries - simplified approach
const pageEntries = [];
const entryRegex = /\{\s*keyword:\s*['"]([^'"]+)['"]/g;
let match;

while ((match = entryRegex.exec(pagesFile)) !== null) {
  const keyword = match[1];
  // Extract slug for this keyword
  const slugMatch = pagesFile.substring(match.index).match(/slug:\s*['"]([^'"]+)['"]/);
  const categoryMatch = pagesFile.substring(match.index).match(/category:\s*['"]([^'"]+)['"]/);
  const subcategoryMatch = pagesFile.substring(match.index).match(/subcategory:\s*['"]([^'"]+)['"]/);
  
  if (slugMatch && categoryMatch && subcategoryMatch) {
    pageEntries.push({
      keyword,
      slug: slugMatch[1],
      category: categoryMatch[1],
      subcategory: subcategoryMatch[1]
    });
  }
}

console.log(`Found ${pageEntries.length} pages`);
console.log(pageEntries.slice(0, 5));
