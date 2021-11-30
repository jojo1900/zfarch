//模引擎的实现原理：字符串拼接+with+ newFunction()

//1.字符串拼接
//把模版中的JS语法相关的，以及取值的，用 JS执行，用得到的结果替换原来的模版。

//2.with(obj){}
//以obj作为this，执行函数内的里面的表达式，解决取值问题
const obj = {
  a: 1,
  b: 2,
};
with (obj) {
  console.log(a);
}

//3.newFunction
//执行字符串
const s = "console.log('a')";
const f = new Function("a", s);
f("hhh");

const fs = require("fs").promises;
const path = require("path");
const ejs = {
  async readFile(filePath, data) {
    let template = await fs.readFile(filePath, "utf8");
    let head = "let str = ``;\r\n";
    head += "with(obj){\r\nstr+=`";
    //模版取值,用模版字符串
    let content = template.replace(/<%=(.+?)%>/g, function () {
      // <%=xxx%> -> ${xxx}
      return "${" + arguments[1] + "}";
    });
    //模版字符串执行JS语法。
    content = content.replace(/<%(.+?)%>/g, function () {
      // <%arr.forEach(item=>{%> -> arr.forEach(item=>
      return "`\r\n" + arguments[1] + "\r\nstr+=`";
    });
    let tail = "`}\r\n return str";
    console.log(head + content + tail);
    return new Function("obj", head + content + tail)(data);
  },
};

ejs
  .readFile(path.resolve(__dirname, "template.html"), {
    name: "zf",
    age: 12,
    arr: [1, 2, 3],
  })
  .then((data) => {
    // console.log(data);
  });
