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
      process.stdout.write('\n');
      files.forEach(file => process.stdout.write(file.toString() + '\n'));
      process.stdout.write('prompt > ');
    });
  }
};
