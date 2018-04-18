'use strict';
const commands = require('./commands');

// econsole.log(process);
process.stdout.write('prompt > ');
process.stdin.on('data', function(data) {
  let stdin = null;

  function done(output) {
    stdin = output;
    if (cmds.length > 0) {
      let cmd = cmds.shift();
      cmd = cmd.split(' ');
      let c = cmd[0];
      let params = cmd.slice(1);
      if (stdin) stdin = stdin.toString().split(' ');
      if (commands[c]) commands[c](stdin, params, done);
      else {
        process.stderr.write('command not found: ' + c.toString())
        process.stdout.write('\nprompt > ');
      }
    }
    else {
      process.stdout.write(output);
      process.stdout.write('\nprompt > ');
    }
  }


  let cmds = data.toString().trim(); // remove \n
  // let params = [];
  // if (cmd.indexOf(' ') !== -1) {
  //   let arr = cmd.split(' ');
  //   params = arr.slice(1);
  //   cmd = arr[0];
  // }

  cmds = cmds.split(/\s*\|\s*/g);

  let cmd = cmds.shift();

  cmd = cmd.split(' ');
  let c = cmd[0];
  let params = cmd.slice(1);
  if (stdin) stdin = stdin.split(' ');
  if (commands[c]) commands[c](stdin, params, done);
  else {
    process.stderr.write('command not found: ' + c.toString())
    process.stdout.write('\nprompt > ');
  };
});

// var startTime = new Date;

// setTimeout(function () {
//   var endTime = new Date;
//   console.log('Time elapsed: ', endTime - startTime, 'ms');
// }, 2000);

// while (new Date - startTime < 1000) {};
