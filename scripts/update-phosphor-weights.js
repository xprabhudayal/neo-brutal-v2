const fs = require('fs');
const glob = require('glob'); // use standard node techniques if glob not available
const path = require('path');

// A simple recursive find function
function findFiles(dir, ext, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
        if (!filePath.includes('node_modules') && !filePath.includes('.next')) {
            findFiles(filePath, ext, fileList);
        }
    } else if (filePath.endsWith(ext) || filePath.endsWith('.tsx')) {
        fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = findFiles('./app', '.tsx').concat(findFiles('./components', '.tsx'));

let modifiedCount = 0;

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find Phosphor imports
  const phosphorImportRegex = /import\s+{([^}]+)}\s+from\s+['"]@phosphor-icons\/react(\/ssr)?['"]/g;
  let match;
  let importedIcons = new Set();
  
  while ((match = phosphorImportRegex.exec(content)) !== null) {
      const imports = match[1].split(',').map(s => s.trim()).filter(Boolean);
      imports.forEach(imp => {
          // Handle 'Envelope as Mail'
          const parts = imp.split(' as ');
          if (parts.length === 2) {
              importedIcons.add(parts[1].trim());
          } else {
              importedIcons.add(parts[0].trim());
          }
      });
  }

  if (importedIcons.size > 0) {
      let fileModified = false;
      const iconsArray = Array.from(importedIcons);
      
      iconsArray.forEach(icon => {
          // Regex to match the component usage e.g. <FolderOpen className="..." /> 
          // Match the opening tag <IconName avoiding <IconNameWrapper...
          // We need a negative lookahead to only add weight="bold" if it doesn't already have weight="..."
          const usageRegex = new RegExp(`<${icon}\\b(?![^>]*weight=)([^>]*)>`, 'g');
          
          content = content.replace(usageRegex, (fullMatch, props) => {
              fileModified = true;
              return `<${icon} weight="bold"${props}>`;
          });
      });

      if (fileModified) {
          fs.writeFileSync(file, content, 'utf8');
          console.log('Modified:', file);
          modifiedCount++;
      }
  }
});

console.log('Total files modified:', modifiedCount);
