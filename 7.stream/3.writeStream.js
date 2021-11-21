//手写 writeStream
const EventEmitter = require('events');

class WriteStream extends EventEmitter {
  constructor(path, options) {
    super();
    this.path = path;
    this.highWaterMark = options.highWaterMark || 16 * 1024;
    this.flags = options.flags || 'w';
    this.encoding = options.encoding || 'utf8';
    this.start = options.start || 0;
    this.emitClose = options.emitClose || true;
    this.open();
    this.len = 0;
  }
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        return this.destory();
      }
    });
  }
  write(chunk, encoding = this.encoding, callback = () => {}) {
    // 写入的数据可能是buffer 也可能是string
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    this.len += chunk.length;
    let ret = this.highWaterMark > this.len;
    this.needDrain = !ret;
    if (!this.writing) {
      //写入到文件中
      this.writing = true;
      this._write(chunk, encoding, callback);
    } else {
      //如果正在写入，那么放到缓存区中
      this.cache.push({ chunk, encoding, callback });
    }

    return ret;
  }
  _write(chunk, encoding, callback) {}
}
