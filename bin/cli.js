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
  serve: () => {
    const server = https.createServer((req, res) => {
      const filePath = path.join(process.cwd(), req.url === '/' ? 'index.html' : req.url);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('404 Not Found');
          return;
        }
        res.writeHead(200);
        res.end(data);
      });
    });
    server.listen(3000, () => console.log('Server running at https://localhost:3000'));
  }
};

const command = args[0];
const params = args.slice(1);
if (commands[command]) {
  commands[command](...params);
} else {
  console.log('Command not found.');
}