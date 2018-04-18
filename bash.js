'use strict';
const commands = require('./commands');

// econsole.log(process);
process.stdout.write('prompt > ');
process.stdin.on('data', function(data) {
  let cmd = data.toString().trim(); // remove \n
  let params = [];
  if (cmd.indexOf(' ') !== -1) {
    let arr = cmd.split(' ');
    params = arr.slice(1);
    cmd = arr[0];
  }

  if (commands[cmd]) commands[cmd](params);
});

// var startTime = new Date;

// setTimeout(function () {
//   var endTime = new Date;
//   console.log('Time elapsed: ', endTime - startTime, 'ms');
// }, 2000);

// while (new Date - startTime < 1000) {};
