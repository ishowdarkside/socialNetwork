class LoginView {
  #inputEmail = document.querySelector("#loginEmail");
  #inputPassword = document.querySelector("#loginPassword");
  #loginBtn = document.querySelector("#loginUser");

  handleLoginButton(handler) {
    this.#loginBtn.addEventListener(
      "click",
      async function (e) {
        e.preventDefault();
        const targetUser = await handler(
          this.#inputEmail.value,
          this.#inputPassword.value
        );

        if (targetUser === undefined) {
          const markup = `<p class="redDom">Invalid Email/Password</p>`;
          this.#inputPassword.insertAdjacentHTML("afterend", markup);
        }

        if (targetUser) {
          //if user is found,get cookie and refresh the page
          const now = new Date();
          const expirationTime = now.getTime() + 2880 * 60 * 10000;
          const expires = new Date(expirationTime).toUTCString();
          document.cookie = `id="${targetUser.id}";expires="${expires}"`;
          window.location.href = "main.html";
        }
      }.bind(this)
    );
  }
}

export default new LoginView();
