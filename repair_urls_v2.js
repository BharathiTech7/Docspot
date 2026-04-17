const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend', 'src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles(srcDir).filter(file => file.endsWith('.jsx'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;
  
  // Repair Syntax Error: cases where the template starts with a backtick but ends with a quote
  // Example: `${process.env...}/api/path"
  const repairRegex = /(\$\{process\.env\.REACT_APP_BACKEND_URL \|\| 'http:\/\/localhost:5000'\}\/[^"']*)(["'])/g;
  content = content.replace(repairRegex, (match, p1, p2) => {
    return `${p1}\``;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Repaired (V2): ${file}`);
  }
});
