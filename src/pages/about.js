const aboutTemplate = require("../views/pages/about.hbs");

const html = aboutTemplate();

const body = document.querySelector("#app-body");
body.innerHTML = html;
