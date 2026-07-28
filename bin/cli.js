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
  http: (method, url, data) => {
    const options = { method: method.toUpperCase() };
    const req = https.request(url, options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          console.log(JSON.stringify(json, null, 2));
        } catch (e) {
          console.log(body);
        }
      });
    });
    req.on('error', e => console.error(e));
    if (data) {
      req.write(data);
    }
    req.end();
  },
  count: (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log(content.split(/\s+/).length);
  }
};

const command = args[0];
const commandArgs = args.slice(1);
if (commands[command]) {
  commands[command](...commandArgs);
} else {
  console.log('Command not found');
}