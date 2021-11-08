// 函数科里化：函数参数可以一个一个的传，参数传满后直接执行，没传满继续传参。柯里化让我们能够更容易地获取偏函数。
// 偏函数 (可以分批传入参数) 柯里化的区别 (一个个传递)  我们一般不去区分是偏函数还是柯里化
// 实现原理

function sum(a, b, c) {
  return a + b + c;
}

function curry(fn) {
  return function inner(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...args2) => {
        //这里一定记得return ，不然sum(1)就是：(...args2) => {inner(...args, ...args2);},
        //再调sum(2),就是undefined，因为没有return 出来
        return inner(...args, ...args2);
      };
    }
  };
}
let newSum = curry(sum);
// console.log(newSum(1).toString());
console.log(newSum(1)(2)(3));
