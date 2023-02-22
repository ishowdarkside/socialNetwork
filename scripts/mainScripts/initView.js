export class initView {
  #textArea = document.querySelector("#postData");
  #nameHolder = document.querySelector("#username");
  #currUser;

  setHeight() {
    this.#textArea.style.height = "auto";
    this.#textArea.addEventListener(
      "input",
      function (e) {
        this.#textArea.style.height = this.#textArea.scrollHeight + "px";
      }.bind(this)
    );
  }

  async setName(data) {
    const userData = await data;
    this.#currUser = userData;
    this.#nameHolder.textContent = userData.firstName;
  }

  handleEditProfile(editProfileHandler) {
    const editProfileBtn = document.querySelector("#editProfile");
    editProfileBtn.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        const markup = `
      <div class="editProfileOverlay">
      <button id="closeOverlay">X</button>
      <div class="container">
      <form >
      <h2 class="heading-primary" >Edit Profile Informations</h2>
        <div>
          <input type="text" id="editName" value="${
            this.#currUser.firstName
          }" />
        </div>
        <div>
          <input type="text" id="editMail" value=${this.#currUser.email} />
        </div>
        <div>
          <input type="text" id="editPassword" value=${
            this.#currUser.password
          } />
        </div>

        <button id="saveEdit" class="btn btn--red">Save</button>
      </form>
      </div>
    </div>`;

        document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
        this.handleClosingButton();
        this.handleSaveButton(editProfileHandler);
      }.bind(this)
    );
  }

  handleClosingButton() {
    const button = document.querySelector("#closeOverlay");
    button.addEventListener("click", function (e) {
      document.querySelector(".editProfileOverlay").remove();
    });
  }

  handleSaveButton(handler) {
    const saveBtn = document.querySelector("#saveEdit");
    saveBtn.addEventListener("click", async function (e) {
      //this function is async because i need to stop execution
      //until the handler function put the data and only then
      //i want you to reload the page.
      e.preventDefault();
      const nameValue = document.querySelector("#editName").value;
      const emailValue = document.querySelector("#editMail").value;
      const passwordValue = document.querySelector("#editPassword").value;
      await handler(nameValue, emailValue, passwordValue);
      location.reload();
    });
  }

  handleClosingAccount(handler) {
    const closeBtn = document.querySelector("#closeAccBtn");
    closeBtn.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        const markup = `
      <div class="overlayCloseAccount">
      <!---->
      <button id="closeThisOverlay">X</button>
      <div class="container">
        <form>
          <h2 class="heading-primary">
            To Confirm that you are owner of the account, please provide your
            account informations
          </h2>
          <input type="text" id="inputCloseAccEmail" placeholder="Email" />
          <input type="text" id="inputCloseAccPass" placeholder="Password" />
          <button id="closeMyAcc" class="btn btn--red">Close my account</button>
        </form>
      </div>
    </div>
      
      `;
        document.querySelector("body").insertAdjacentHTML("beforeend", markup);
        this.handleCloseOverlay();
        this.handleClosingAccButton(handler);
      }.bind(this)
    );
  }

  handleCloseOverlay() {
    document
      .querySelector(".overlayCloseAccount")
      .addEventListener("click", function (e) {
        if (e.target.getAttribute("id") === "closeThisOverlay") this.remove();
      });
  }

  handleClosingAccButton(handler) {
    const closeAccBtn = document.querySelector("#closeMyAcc");
    closeAccBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const proofEmail = document.querySelector("#inputCloseAccEmail").value;
      const proofPass = document.querySelector("#inputCloseAccPass").value;
      if (
        proofEmail === this.#currUser.email &&
        proofPass === this.#currUser.password
      ) {
        handler();
      }
    });
  }

  handleLogOut(handler) {
    document.querySelector("#logOut").addEventListener("click", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new initView();
