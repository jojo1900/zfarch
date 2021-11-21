const fs = require('fs');
const path = require('path');

//写事件：缓冲区 磁盘 内存(存放超出的数据)

const ws = fs.createWriteStream(path.resolve(__dirname, './b.txt'), {
  flags: 'w',
  encoding: 'utf8',
  //预期放入多少，放入到缓冲区中，超过预期会放入到内存中，影响性能
  highWaterMark: 3, // 默认16K
  start: 0,
  emitClose: true,
});

//顺序依次执行
//实现方法，第一次写入时，写入1，直接写到磁盘缓存中
//写入2，3 ，写到内存中，等写入1结束后，按顺序写入23

//后续写入 ，把4写入到磁盘中，把4，5写入到内存中，
//等待4写入完成后，按顺序写入56
//
ws.write('1', 'utf8', () => {
  console.log(1);
});

ws.write('2', 'utf8', () => {
  console.log(2);
});

ws.write('3', 'utf8', () => {
  console.log(3);
});

ws.write('ok', 'utf8', () => {
  console.log('ok');
});

//达到预期后并且消耗掉之后，才触发drain事件
ws.on('drain', () => {
  write();
});
//比如要写入0-9  10个数字，每次写入highWaterMark个，
let i = 0;
function write() {
  let flag = true;
  while (flag && i <= 9) {
    flag = ws.write(i++ + '');
  }
}
