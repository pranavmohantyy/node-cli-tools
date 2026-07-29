const fs = require('fs');
const path = require('path');
const https = require('https');
const { exec } = require('child_process');
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
  watch: (target, command) => {
    fs.watch(target, (eventType, filename) => {
      if (filename) {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
          }
          console.log(`Output: ${stdout}`);
        });
      }
    });
  }
};

const command = args[0];
const params = args.slice(1);
if (commands[command]) {
  commands[command](...params);
} else {
  console.log('Command not recognized.');
}