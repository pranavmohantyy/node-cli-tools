const fs = require('fs');
const path = require('path');
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
  }
};

const command = args[0];
if (command === 'find' && args[1] && args[2]) {
  commands.find(args[1], args[2]);
} else if (commands[command]) {
  commands[command]();
} else {
  console.log('Unknown command');
}