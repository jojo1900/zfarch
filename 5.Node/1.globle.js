// nextTick（主线程代码执行完立即执行） 快于 promise（再执行微任务队列）
process.nextTick(function hh() {
  //死循环，会报错。一直执行nextTick里的。promise就不会
  //   hh();
});

// node中的事件环，主要关注以下三个
//1.timers: 定时器队列
//2.poll:轮询队列
//3.check :存放setImmediate的队列

// setTimeout(function () {
//   console.log('setTimeout');
// }, 10);

// setImmediate(() => {
//   console.log('setImmediate');
// });

let fs = require('fs');
let path = require('path');

fs.readFile(path.join(__dirname, './1.txt'), 'utf8', function (err, data) {
  //从poll队列中拿出回调执行
  Promise.resolve().then(() => {
    console.log('promise1');
  });
  console.log('ok');

  setTimeout(() => {
    console.log('setTimeout');
    Promise.resolve().then(() => {
      console.log('promise2');
    });
  }, 0);
  setImmediate(() => {
    console.log('setImmediate');
  });
});
