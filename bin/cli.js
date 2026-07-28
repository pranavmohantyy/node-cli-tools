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
  },
  count: (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').length;
    const words = content.split(/\s+/).filter(Boolean).length;
    const chars = content.length;
    console.log(`Lines: ${lines}, Words: ${words}, Chars: ${chars}`);
  }
};

const command = args[0];
const params = args.slice(1);
if (commands[command]) {
  commands[command](...params);
} else {
  console.log('Unknown command');
}