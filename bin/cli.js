const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
const { exec } = require('child_process');
const args = process.argv.slice(2);
const dotenv = require('dotenv');

dotenv.config();

const color = {
  reset: '\u001B[0m',
  green: '\u001B[32m',
  red: '\u001B[31m',
  yellow: '\u001B[33m',
};

const commands = {
  greet: () => console.log(`${color.green}Hello!${color.reset}`),
  goodbye: () => console.log(`${color.red}Goodbye!${color.reset}`),
  find: (pattern, dir) => {
    const searchFiles = (dir) => {
      fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          searchFiles(filePath);
        }
        if (file.includes(pattern)) {
          console.log(`${color.yellow}${filePath}${color.reset}`);
        }
      });
    };
    searchFiles(dir);
  },
  help: () => {
    console.log(`${color.green}Available commands:${color.reset}`);
    console.log(`${color.yellow}greet${color.reset} - Print a greeting message`);
    console.log(`${color.yellow}goodbye${color.reset} - Print a farewell message`);
    console.log(`${color.yellow}find <pattern> <dir>${color.reset} - Find files matching pattern in directory`);
  }
};

if (args.length === 0) {
  commands.help();
} else {
  const command = args[0];
  const params = args.slice(1);
  if (commands[command]) {
    commands[command](...params);
  } else {
    console.log(`${color.red}Unknown command: ${command}${color.reset}`);
    commands.help();
  }
}