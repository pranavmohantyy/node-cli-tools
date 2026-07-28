const fs = require('fs');
const path = require('path');
const https = require('https');
const args = process.argv.slice(2);
const dotenv = require('dotenv');

dotenv.config();

const commands = {
  greet: () => console.log('Hello!'),
  goodbye: () => console.log('Goodbye!'),
  find: (pattern, dir) => {
    const searchFiles = (dir) => {
      fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          searchFiles(filePath);
        } else if (file.includes(pattern)) {
          console.log(filePath);
        }
      });
    };
    searchFiles(dir);
  },
  rename: (pattern, replacement, dir) => {
    const renameFiles = (dir) => {
      fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          renameFiles(filePath);
        } else if (file.includes(pattern)) {
          const newFileName = file.replace(new RegExp(pattern, 'g'), replacement);
          console.log(`Renaming: ${filePath} to ${path.join(dir, newFileName)}`);
          // Uncomment the line below to actually rename the files
          // fs.renameSync(filePath, path.join(dir, newFileName));
        }
      });
    };
    renameFiles(dir);
  }
};

if (args.length > 0 && commands[args[0]]) {
  commands[args[0]](...args.slice(1));
} else {
  console.log('Command not found');
}