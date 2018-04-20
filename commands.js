'use strict';

const fs = require('fs');
const request = require('request');

function countData(data) {
  let newLines = data
    .split('\n')
    .length;
  newLines--;
  newLines = newLines.toString();

  let words = data
    .split('\n')
    .map(line => line.split(' ').filter(l => l !== '').length)
    .reduce((count, next) => count + next, 0)
    .toString();

  let bytes = data
    .split('')
    .length
    .toString();
  return `${newLines} ${words} ${bytes}`;
}

function getUniq(data) {
  let res = '';

  for (let i = 0; i < data.length; i++) {
    if (i === 0 ) res += data[i] + '\n';
    else {
      let prev = data[i -1];
      if (prev !== data[i]) res += data[i] + '\n';
    }
  }

  return res;
}

// needs refactoring

module.exports = {
  pwd: function (stdin, args, done) {
    done(process.env.PWD);
  },
  date: function(stdin, args, done) {
    done((new Date()).toString());
  },
  ls: function(stdin, args, done) {
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      let res = '';
      files.forEach(file => res += file.toString() + '\n');
      done(res);
    });
  },
  echo: function(stdin, arr, done) {
    let output = arr.map(arg => {
      if (arg[0] === '$') return process.env[arg.slice(1)];
      return arg;
    }).join(' ');

    done(output);
  },
  cat: function(stdin, files, done) {
    if (files.length === 0 && stdin) {
      done(stdin);
      return;
    }
    files.forEach(file => {
      fs.readFile(file, (err, data) => {
        if (err) throw err;
        done(data);
      });
    });
  },
  head: function(stdin, files, done) {
    if (files.length === 0 && stdin) {
      done(stdin.split('\n').slice(0, 6).join('\n'));
      return;
    }
    files.forEach(file => {
      fs.readFile(file, (err, data) => {
        if (err) throw err;
        data = data
          .toString()
          .split('\n')
          .slice(0, 6)
          .join('\n');

        done(data);
      });
    });
  },
  tail: function(stdin, files, done) {
    if (files.length === 0 && stdin) {
      done(stdin.split('\n').slice(-6).join('\n'));
      return;
    }
    files.forEach(file => {
      fs.readFile(file, (err, data) => {
        if (err) throw err;
        data = data
          .toString()
          .split('\n')
          .slice(-6)
          .join('\n');

        done(data);
      });
    });
  },
  sort: function(stdin, files, done) {
    if (files.length === 0 && stdin) {
      done(stdin.split('\n').sort().join('\n'));
      return;
    }
    files.forEach(file => {
      fs.readFile(file, (err, data) => {
        if (err) throw err;
        data = data
          .toString()
          .split('\n')
          .sort()
          .join('\n');

        done(data);
      });
    });
  },
  wc: function(stdin, files, done) {
    if (files.length === 0 && stdin) {
        done(countData(stdin));
        return;
    }
    files.forEach(file => {
      fs.readFile(file, (err, data) => {
        if (err) throw err;
        data = data.toString();
        done(countData(data));
      });
    });
  },
  uniq: function(stdin, files, done) {
    if (files.length === 0 && stdin) {
      done(getUniq(stdin.split('\n')));
    }
    files.forEach(file => {
      fs.readFile(file, (err, data) => {
        if (err) throw err;

        data = data.toString().split('\n');

        done(getUniq(data));
      });
    });
  },
  curl: function(stdin, urls, done) {
    urls.forEach(url => {
      request(url, (err, resp, body) => {
        if (err) throw err;
        done(body.toString());
      });
    });
  },
  find: function(stdin, dirs, done) {
    dirs.forEach(directory => {
      fs.readdir(directory, (err, children) => {
        if (err) throw err;
        children.forEach(child => {
          let path = directory + '/' + child;
          fs.stat(path, (err, fileObj) => {
            if (fileObj.isFile()) done(path);
            else this.find([path], done);
          });
        });
      });
    });
  }
};
