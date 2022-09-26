const fs = require("fs");

fs.readFile("./README.md", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

console.log("Hello github actions! Nice to meet you! nice to season you!");
