const fs = require('fs');
const path = require('path');
const https = require('https');
const args = process.argv.slice(2);

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
  json: (filePath, query) => {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const result = query.split('.').reduce((o, k) => (o || {})[k], data);
    console.log(result);
  }
};

const command = args[0];
const commandArgs = args.slice(1);
if (commands[command]) {
  commands[command](...commandArgs);
} else {
  console.log('Command not found');
}