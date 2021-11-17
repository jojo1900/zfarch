// const Promise = require('./1.promise');
const fs = require('fs').promises;
const path = require('path');
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(1);
    resolve(2);
  });
});
p.then((data) => {
  console.log(data);
});

console.log(3);

fs.readFile(path.join(__dirname, './a.txt'), 'utf8').then((data) => {
  fs.readFile(path.join(__dirname, data), 'utf8').then(
    (data) => {
      console.log(data);
    },
    (err) => {
      console.log(err);
    }
  );
});
