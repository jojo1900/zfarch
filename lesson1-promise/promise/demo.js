const Promise = require('./1.promise');

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
