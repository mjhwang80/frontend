// css
import * as Indi from "./modules/Indi/index.js";
import { getNode, createElement, render } from "./modules/DOM.js";

require("./assets/css/style.css");

// Indi 멤버에서 하위 모듈 추출
const {
  logger: { success, error },
  tester: { test, expect },
  utils: { isFunction },
} = Indi;

// router
const {
  initialRoutes,
  historyRouterPush,
  hashRouterPush,
} = require("./router");

// app division
const historyAppDiv = document.querySelector("#history-app");
const hashAppDiv = document.querySelector("#hash-app");

// Browser History
initialRoutes("history", historyAppDiv);

// Hash History
initialRoutes("hash", hashAppDiv);

window.onload = () => {
  const historyLinker = document.querySelectorAll("span.history");
  const hashLinker = document.querySelectorAll("a.hash");

  historyLinker.forEach((el) => {
    el.addEventListener("click", (evt) => {
      const pathName = evt.target.getAttribute("route");

      historyRouterPush(pathName, historyAppDiv);
    });
  });

  hashLinker.forEach((el) => {
    el.addEventListener("click", (evt) => {
      const pathName = evt.target.getAttribute("route");

      hashRouterPush(pathName, hashAppDiv);
    });
  });
};
