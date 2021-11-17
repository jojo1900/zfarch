//promisify:把一个函数变成promise的

const fs = require('fs');
const fsPromise = require('fs').promises;

function promisify(fn) {}

fs.readFile(__dirname + '/a.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

fsPromise.readFile(__dirname + '/a.txt', 'utf8').then((data) => {
  console.log(data);
});
