const jcaiot = require("./jcaiot");
const layman = require("./layman");
const leetcode = require("./leetcode");

const enSidebar = require("./en-sidebar");

module.exports = {
  sidebar: Object.assign(
    {},
    {
      "/en": enSidebar,
    }
  ),
};
