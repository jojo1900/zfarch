//高阶函数：参数或者返回值是函数的函数

Function.prototype.before = function (beforeFunc) {
  return (...args) => {
    //before函数的参数数量
    let n = beforeFunc.length;
    beforeFunc(args[(0, n - 1)]);
    this(args[n]);
  };
};

let say = function (word) {
  console.log(word);
};
let sayBefore = function (name) {
  console.log(name);
};

let newSay = say.before(sayBefore);
newSay('before', 'say');
