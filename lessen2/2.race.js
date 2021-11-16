//赛跑，处理超时处理
//谁先成功/失败 就返回谁
Promise.race([
  new Promise((resolve, reject) => {
    resolve(100);
  }),
  200,
])
  .then((data) => {
    console.log('success');
    console.log(data);
  })
  .catch((err) => {
    console.log('err');
    console.log(err);
  });

// Promise.race = function (values) {};

// 超时，模拟取消操作
// let p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('300');
//   }, 300);
// });

// p.then((data) => {
//   console.log(data);
// }).catch((err) => {});
