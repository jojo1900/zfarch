//1.是一个类
//2.传入一个execute函数，executor立即执行，该函数有两个参数，resolve和reject。成功，则调用resolve抛出一个成功的值，失败则调用reject，抛出一个失败的原因。
//3.一个Promise实例，有三个状态：pending、onfulfilled、onrejected。只能pending状态转为其他状态。
//4.必须有一个then方法。then方法异步执行(微任务)，接受两个参数，一个成功时的回调，一个失败时的回调。
//5.一个promise 可以 then 多次。
//6.走向失败状态有两种情况：1.reject，2.用户抛出异常

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
function resolvePromise(x, promise, resolve, reject) {
  //循环解析，抛错出去，走下一个then的onReject
  if (x === promise) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  //如果是对象
  if ((x && typeof x === 'object') || typeof x === 'function') {
    //如果是x 是promise，那么继续解析
    try {
      let then = x.then;
      //如果then是一个函数,那么任务x是个promise,需要拿到这个promise的结果。
      //通过调用这个promise的then，来拿到结果，如果是走onResolve方法，继续解析，如果是走onReject方法，reject。
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            //如果走
            resolvePromise(y, promise, resolve, reject);
          },
          (r) => {
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      return reject(error);
    }
  }
  //如果是普通值，走下个then的resolve
  else {
    return resolve(x);
  }
}
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

  //then中的回调函数，如果是个promise，那么如果Promise成功，那么走下个then的成功，如果失败，走下个then的失败。
  //如果返回非Promise类型的普通值，那么走下次then的成功。
  //如果抛错 throw new Error，那么走下次then的失败。

  //所以，走失败的条件：返回一个 失败的promise，或者抛出一个错误。
  //其他时候走成功

  //then如何实现promise： return new Promise。
  then(onFullFilled, onRejected) {
    //每次调用then，返回一个新的promise
    //onFullFilled,可传可不传，如果不是函数，需要自己补，要求能把值传到最后一个then中
    //onRejected,可传可不传，如果不是函数，需要自己补，要求能最后一个then，能捕获到错误
    onFullFilled = typeof onFullFilled === 'function' ? onFullFilled : (v) => v;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (e) => {
            throw e;
          };
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        try {
          setTimeout(() => {
            let x = onFullFilled(this.value);
            resolvePromise(x, promise2, resolve, reject);
          });
        } catch (error) {
          reject(error);
        }
      }
      if (this.status === REJECTED) {
        try {
          setTimeout(() => {
            let x = onRejected(this.reason);
            //如果返回的是一个普通值，即使是失败回调返回的，也走成功
            resolvePromise(x, promise2, resolve, reject);
          });
        } catch (error) {
          reject(error);
        }
      }
      if (this.status === PENDING) {
        try {
          setTimeout(() => {
            this.onResolveCbs.push(() => {
              let x = onFullFilled(this.value);
              resolvePromise(x, promise2, resolve, reject);
            });
            this.onRejectCbs.push(() => {
              let x = onRejected(this.reason);
              resolvePromise(x, promise2, resolve, reject);
            });
          });
        } catch (error) {
          reject(error);
        }
      }
    });
    return promise2;
  }
}

module.exports = Promise;
