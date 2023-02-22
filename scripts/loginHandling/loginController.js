import { findUser } from "./loginModel.js";
import loginView from "./loginView.js";

if (document.cookie !== "") window.location.href = "main.html";
loginView.handleLoginButton(findUser);
