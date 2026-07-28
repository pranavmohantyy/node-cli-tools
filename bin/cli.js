const args = process.argv.slice(2);

const commands = {
  greet: () => console.log('Hello!'),
  goodbye: () => console.log('Goodbye!')
};

const command = args[0];

if (commands[command]) {
  commands[command]();
} else {
  console.log('Unknown command');
}