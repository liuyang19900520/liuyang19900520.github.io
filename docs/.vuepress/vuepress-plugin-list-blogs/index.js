const path = require("path");

module.exports = (options, ctx) => {
  return {
    name: "vuepress-plugin-list-blogs",
    enhanceAppFiles: path.resolve(__dirname, "enhanceApp.js"),
    //clientRootMixin: path.resolve(__dirname, "clientRootMixin.js"),
  };
};
