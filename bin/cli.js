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
  env: (varName) => {
    if (varName) {
      console.log(process.env[varName]);
    } else {
      Object.entries(process.env).forEach(([key, value]) => {
        console.log(`${key}=${value}`);
      });
    }
  }
};

const command = args[0];
const params = args.slice(1);
if (commands[command]) {
  commands[command](...params);
} else {
  console.log('Command not found');
}