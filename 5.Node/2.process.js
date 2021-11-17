//process是node上的一个全局属性

//当前工作路径
console.log(process.cwd());

//当前工作路径
const path = require('path');
console.log(path.resolve());

// env，系统中的所有环境变量
// windows: set x = xx; mac:export x = xx
// cross-env模块. 统一mac和window
console.log(process.env); //一般先设置环境变量再使用,环境变量只在当前目录有效

// cross-env NODE_ENV=production

//argv:获取所有命令行参数
// --port 3000 --config config.json
