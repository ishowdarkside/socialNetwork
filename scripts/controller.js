import scrollView from "./scrollView.js";
import validationView from "./validationView.js";
import { publishUser } from "./model.js";

const init = function () {
  scrollView.handleListener();
  validationView.catchHandler(publishUser);
  if (document.cookie !== "") window.location.href = "main.html";
};

init();
