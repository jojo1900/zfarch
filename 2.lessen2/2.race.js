Promise.my_race = function (values) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < values.length; i++) {
      let p = values[i];
      Promise.resolve(p).then(resolve, reject);
    }
  });
};
