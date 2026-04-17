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
  
  // Replace double quotes version
  content = content.replace(/"http:\/\/localhost:5000\//g, '`${process.env.REACT_APP_BACKEND_URL || \'http://localhost:5000\'}/');
  // Replace single quotes version
  content = content.replace(/'http:\/\/localhost:5000\//g, '`${process.env.REACT_APP_BACKEND_URL || \'http://localhost:5000\'}/');
  
  // Close the backtick template
  // This is tricky as we need to find the end of the string.
  // Actually, let's do a more robust replacement.
  
  const regex = /(['"])http:\/\/localhost:5000\/(.*?)(\1)/g;
  content = content.replace(regex, (match, p1, p2) => {
    return `\${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/${p2}\``;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});
