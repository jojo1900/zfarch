//发布订阅模式
//发布订阅的作用：将事件之间解耦。
// 举例：on: 监视一个人的动作，如果他吃饭了，就执行某些函数；如果睡觉了，就执行对应的函数；
// trigger : 让他进行某个动作，吃饭，睡觉。。。

class EventManager {
  constructor() {
    this.taskMap = {};
  }
  //监听
  on(target, cb) {
    if (!this.taskMap[target]) {
      this.taskMap[target] = [];
    }
    this.taskMap[target].push(cb);
  }
  //触发，行动
  trigger(target, ...args) {
    let cbs = this.taskMap[target] || [];
    cbs.forEach((cb) => {
      cb(...args);
    });
  }

  //取消监听
  off(target, cb) {
    let cbs = this.taskMap[target] || [];
    let index = cbs.indexOf(cb);
    if (index > -1) {
      this.taskMap[target].splice(index, 1);
    }
  }
}

const em = new EventManager();
const eat = (...args) => {
  console.log('she is eating:' + args.join(','));
};
em.on('eat', eat);
// em.trigger('eat', 'apple', 'banana', 'orange');

em.off('eat', eat);
em.trigger('eat', 'apple', 'banana', 'orange');
