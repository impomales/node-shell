const fs = require('fs');

module.exports = {
  pwd: function () {
    process.stdout.write(process.env.PWD);
    process.stdout.write('\nprompt > ');
  },
  date: function() {
    process.stdout.write((new Date()).toString());
    process.stdout.write('\nprompt > ');
  },
  ls: function() {
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      files.forEach(file => process.stdout.write(file.toString() + '\n'));
      process.stdout.write('prompt > ');
    });
  },
  echo: function(arr) {
    let output = arr.map(arg => {
      if (arg[0] === '$') return process.env[arg.slice(1)];
      return arg;
    }).join(' ');

    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
  },
  cat: function(files) {
    files.forEach(file => {
      fs.readFile(file, (err, data) => {
        if (err) throw err;
        process.stdout.write(data);
        process.stdout.write('\nprompt > ');
      });
    });
  },
  head: function(files) {
    files.forEach(file => {
      fs.readFile(file, (err, data) => {
        if (err) throw err;
        data = data
          .toString()
          .split('\n')
          .slice(0, 6)
          .join('\n');

        process.stdout.write(data);
        process.stdout.write('\nprompt > ');
      });
    });
  },
  tail: function(files) {
    files.forEach(file => {
      fs.readFile(file, (err, data) => {
        if (err) throw err;
        data = data
          .toString()
          .split('\n')
          .slice(-6)
          .join('\n');

        process.stdout.write(data);
        process.stdout.write('\nprompt > ');
      });
    });
  }
};
