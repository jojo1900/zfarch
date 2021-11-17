let p = new Promise((resolve, reject) => {
  console.log(2);
  // reject('fail');
  resolve(4);
});

p.then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  }
);
console.log(3);
