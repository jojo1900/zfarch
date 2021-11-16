//1.是一个类
//2.传入一个execute函数，executor立即执行，该函数有两个参数，resolve和reject。成功，则调用resolve抛出一个成功的值，失败则调用reject，抛出一个失败的原因。
//3.一个Promise实例，有三个状态：pending、onfulfilled、onrejected。只能pending状态转为其他状态。
//4.必须有一个then方法。then方法异步执行(微任务)，接受两个参数，一个成功时的回调，一个失败时的回调。
//5.一个promise 可以 then 多次。
//6.走向失败状态有两种情况：1.reject，2.用户抛出异常

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = 'init';
    this.reason = undefined;
    this.onResolveCbs = [];
    this.onRejectCbs = [];
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        setTimeout(() => {
          this.onResolveCbs.forEach((cb) => {
            cb(this.value);
          });
        });
      }
    };
    console.log('my promise');
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        setTimeout(() => {
          this.onRejectCbs.forEach((cb) => {
            cb(this.reason);
          });
        });
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFullFilled, onRejected) {
    if (this.status === FULFILLED) {
      setTimeout(() => {
        onFullFilled(this.value);
      });
    }
    if (this.status === REJECTED) {
      setTimeout(() => {
        onRejected(this.reason);
      });
    }
    if (this.status === PENDING) {
      setTimeout(() => {
        this.onResolveCbs.push(onFullFilled);
        this.onRejectCbs.push(onRejected);
      });
    }
  }
}

module.exports = Promise;
