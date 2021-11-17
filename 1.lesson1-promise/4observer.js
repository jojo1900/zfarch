//观察者模式
//和发布订阅模式的区别（观察者强耦合，被观察者状态变化要立即通知观察者）
//有个观察者类，有个被观察者类，被观察者的某个状态发生变化，观察者会做出相应的反应。

//被观察者,报纸
class NewsPaper {
  constructor(name) {
    this.name = name;
    this.num = 0;
    this.readerList = [];
  }
  //给某人订阅报纸
  subscribe(someone) {
    this.readerList.push(someone);
  }
  //取消某人的订阅
  unsubscribe(someone) {
    const index = this.readerList.indexOf(someone);
    if (index !== -1) {
      this.readerList.splice(index, 1);
    }
  }

  //发某个版本的报纸后，读者会收到报纸，并回复消息
  publish(num) {
    this.num = num;
    this.readerList.forEach((reader) => {
      reader.gotNewspaper(this.name, num);
    });
  }
}

class Reader {
  constructor(name) {
    this.name = name;
  }
  gotNewspaper(name, num) {
    console.log(`${this.name}拿到了第${num}期${name}`);
  }
}

const gmrb = new NewsPaper('光明日报');

const i = new Reader('我');
const you = new Reader('你');

gmrb.subscribe(i);
gmrb.subscribe(you);
// gmrb.unsubscribe(you);
gmrb.publish(2);
