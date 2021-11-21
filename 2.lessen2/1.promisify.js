//promisify:把一个函数变成promise的

const fs = require('fs');
const fsPromise = require('fs').promises;

function promisify(fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      try {
        let v = fn(...args);
        resolve(v);
      } catch (error) {
        reject(error);
      }
    });
  };
}
f = promisify(fs.readFile);
const read = f(__dirname + '/a.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
read.then((data) => {
  console.log(1111);
});
// fsPromise.readFile(__dirname + '/a.txt', 'utf8').then((data) => {
//   console.log(data);
// });
