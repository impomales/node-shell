'use strict';
const commands = require('./commands');

console.log(process);
process.stdout.write('prompt > ');
process.stdin.on('data', function(data) {
  let cmd = data.toString().trim(); // remove \n

  if (commands[cmd]) commands[cmd]();
  process.stdout.write('\nprompt > ');
})
