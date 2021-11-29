const path = require('path');
const vm = require('vm');

//1. join,拼接路径
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'));

//2. resolve,解析绝对路径,不认 /
console.log(path.resolve('/foo/bar', './baz'));

//3. dirname,取文件夹名
console.log(path.dirname(__filename));

//4. 取文件的拓展名
console.log(path.extname('index.html'));

//5.取文件的基础名
console.log(path.basename(__filename, '.js'));

//读取文件操作路径 尽量采用绝对路径

//如何执行一个字符串
// eval  会引用上级作用域的变量   适合简单的js执行  不依赖上下文变量,安全问题
// new Function （） 会创造一个和全局平级的执行环境  也会引用上级变量,安全问题

//vm虚拟机模块

//安全执行。不拿字符串外部的变量
var a = 100;
vm.runInThisContext('console.log(a)');
