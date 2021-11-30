const myPromise = require("./promise/2.promise");

const p = new Promise((resolve, reject) => {
  reject(100);
});
p.then(
  (data) => {
    console.log("success", data);
    return data;
  },
  (reason) => {
    console.log("reject", reason);
    return Promise.reject(reason);
  }
).then(
  (data) => {
    console.log(data, "ss");
  },
  (reason) => {
    console.log(reason, "rrr");
  }
);
