//生成器：用来生成 迭代器
//迭代器：有迭代方法：Symbol.iterator :每次迭代调用next()
//展开运算符，只能展开可迭代对象

// console.log([
//   ...{
//     a: 1,
//     b: 2,
//     c: 3,
//     length: 3,
//     [Symbol.iterator]() {
//       let i = 0;
//       return {
//         next: () => {
//           return {
//             value: this[i],
//             done: i++ === this.length,
//           };
//         },
//       };
//     },
//   },
// ]);

// 加个※ 表示是生成器
function* read() {
  console.log('init');
  let a = yield 'react';
  console.log('a', a);
  let b = yield 'vue';
  console.log('b', b);

  let c = yield 'angular';
  console.log('c', c);
}
let it = read();

console.log(it.next());
// next参数赋给上一次yield的返回值
console.log(it.next('xxx'));
console.log(it.next('yyy'));
