console.log(1);

let p = new Promise((resolve, reject) => {
  console.log(2);
  resolve(4);
});

console.log(3);
p.then((value) => {
  console.log(value);
});
