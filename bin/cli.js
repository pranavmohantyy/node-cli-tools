const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
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
  hash: (filePath) => {
    const algorithm = ['md5', 'sha1', 'sha256'];
    const hashes = {};
    const computeHash = (algo) => {
      const hash = crypto.createHash(algo);
      const input = fs.existsSync(filePath) ? fs.createReadStream(filePath) : process.stdin;
      input.on('data', (chunk) => hash.update(chunk));
      input.on('end', () => {
        hashes[algo] = hash.digest('hex');
        if (Object.keys(hashes).length === algorithm.length) {
          console.log(hashes);
        }
      });
    };
    algorithm.forEach(computeHash);
  }
};

if (args.length > 0 && commands[args[0]]) {
  commands[args[0]](...args.slice(1));
} else {
  console.log('Unknown command.');
}