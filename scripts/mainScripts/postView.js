import { id } from "./mainModel.js";
class PostView {
  #parentElement = document.querySelector(".user-interface__posts");
  #inputContent = document.querySelector("#postData");
  #postBtn = document.querySelector("#postBtn");

  handlePost(handler) {
    this.#postBtn.addEventListener(
      "click",
      async function (e) {
        e.preventDefault();
        const currUser = +document.cookie.split("=")[1].slice(1, 2);
        const content = this.#inputContent.value;
        if (content === "") return;
        await handler(currUser, content);
        this.#inputContent.value = "";
        this.#inputContent.blur();
        location.reload();
      }.bind(this)
    );
  }

  async loadAllPosts(data, getUsernameHandler) {
    const allPosts = await data;
    allPosts.forEach(async (post) => {
      const postId = +post.user_id;
      const publisher = await getUsernameHandler(postId);
      console.log(post.content);
      let markup;
      if (id === postId)
        markup = `
      <div class="user-interface__post currUser__post"   data-postId=${post.id}>
              <h2 id="postUsername" class="heading-primary mb-small">${publisher}</h2>
              <p id="messageContent">${post.content.trim()}</p>
             <button id="deletePost"><img src="../../assets/trash.svg"</button>
            </div>
      `;
      else
        markup = `  <div class="user-interface__post"  data-postId=${post.id}>
        <h2 id="postUsername" class="heading-primary mb-small">${publisher}</h2>
      <p id="messageContent">${post.content.trim()}</p>
    
    </div>`;

      this.#parentElement.insertAdjacentHTML("afterbegin", markup);
    });
  }

  handleDeletingPost(handler) {
    this.#parentElement.addEventListener("click", async function (e) {
      console.log();
      if (e.target.tagName === "IMG") {
        const postParent = e.target.closest(".user-interface__post");
        const postId = +postParent.dataset.postid;
        await handler(postId);
        location.reload();
      }
    });
  }
}

export default new PostView();
