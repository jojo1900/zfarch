const path = require('path');
const fs = require('fs');
const vm = require('vm');

//本函数实现的仅仅是传路径的Module。
//真正的Module在引入时，id可以传一个标识符，比如 'http'，'moment'

//路径查找时，先从缓存找，缓存找不到的话，核心模块在node执行时，已经加载到内存中。所以如果是核心模块，那么从内存中拿。
//当是自定义模块时(moment)，查找路径：node_modules，找package.json中的main，找不到再找index文件，找不到找上级文件夹。
//都找不到，就报错。
function Module(id) {
  //存的文件的的绝对路径
  this.id = id;
  //存导出结果
  this.exports = {};
}

//不同的拓展名，即不同的文件，有不同的加载方式
//js文件，module.exports
//json文件，存整个JSON对象
//.node文件等其他格式...暂时没写
Module._extensions = {
  '.js': function (module) {
    let content = fs.readFileSync(module.id, 'utf8');
    let script =
      '(function(exports,module,require,__dirname,__filename){' +
      content +
      '})';
    const fn = vm.runInThisContext(script);
    console.log('fn', fn.toString());
    let exports = module.exports;
    let filename = module.id;
    let dirname = path.dirname(filename);
    //文件里面为什么要写 module.exports 而不是直接写 exports，因为传过来的是形参。
    fn.call(exports, exports, module, myRequire, dirname, filename);
    console.log(module);
  },
  '.json': function (module) {
    const fileContent = fs.readFileSync(module.id);
    module.exports = JSON.parse(fileContent);
  },
};
Module._cache = {};

Module.prototype.load = function () {
  let extensionName = path.extname(this.id);
  Module._extensions[extensionName](this);
};
//文件名补全，并拿到文件的绝对路径
Module._resolveFilename = function (filePath) {
  const absPath = path.resolve(__dirname, filePath);
  if (path.extname(absPath)) {
    return absPath;
  }
  const extNameList = Object.keys(Module._extensions);
  for (let i = 0; i < extNameList.length; i++) {
    let filePath = absPath + extNameList[i];
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  throw new Error('文件不存在');
};
function myRequire(id) {
  //先拿到绝对路径
  const filePath = Module._resolveFilename(id);

  //试图从缓存中拿模块
  if (Module._cache[filePath]) {
    return Module._cache[filePath].exports;
  }
  //缓存中没有的话，那新建一个模块，并且放到缓存中
  const module = new Module(filePath);
  Module._cache[filePath] = module;
  //加载模块到内存中
  module.load(filePath);
  return module.exports;
}

const a = myRequire('./a');
console.log(a);
