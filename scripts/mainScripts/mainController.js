import initView from "./initView.js";
import { getUserData } from "./mainModel.js";
import { editUserData } from "./mainModel.js";
import { removeUser } from "./mainModel.js";
import { publishPost } from "./mainModel.js";
import postView from "./postView.js";
import { getAllPosts } from "./mainModel.js";
import { getUsername } from "./mainModel.js";
import { deletePost } from "./mainModel.js";
import searchView from "./searchView.js";
import { getSearchResult } from "./mainModel.js";
const endSession = function () {
  document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ";
  location.reload();
};

const init = async function () {
  initView.setHeight();
  await initView.setName(getUserData());
  initView.handleEditProfile(editUserData);
  initView.handleClosingAccount(removeUser);
  initView.handleLogOut(endSession);
  postView.handlePost(publishPost);
  postView.loadAllPosts(getAllPosts(), getUsername);
  postView.handleDeletingPost(deletePost);
  searchView.handleSearch(getSearchResult);
};

init();
