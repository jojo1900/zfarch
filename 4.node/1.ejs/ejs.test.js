let str = ``;
with (obj) {
  str += `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    ${name} ${age}
    `;
  arr.forEach((item) => {
    str += `
        <a href="">${item}</a>
    `;
  });
  str += `
</body>
</html>
`;
}
return str;
