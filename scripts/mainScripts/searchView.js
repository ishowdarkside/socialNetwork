class searchView {
  #parentElement = document.querySelector(".search-interface__search-results");
  #searchForm = document.querySelector(".search-interface__input__wrapper");
  handleSearch(handler) {
    this.#searchForm.addEventListener(
      "submit",
      async function (e) {
        e.preventDefault();
        this.#parentElement.innerHTML = "";
        const input = this.#searchForm.firstElementChild;

        if (input.value === "") return;
        const users = await handler(input.value);

        if (users.length === 0) {
          const errMsg = `<p class="redDom">User not Found</p>`;
          this.#parentElement.insertAdjacentHTML("afterbegin", errMsg);
        }
        users.forEach((user) => {
          const markup = `
            <div class="search-interface__search-result">
            <h2 id="searchName" class="heading-primary">${user.firstName}</h2>
            <i id="searchLastName">${user.lastName}</i>
          </div>
            `;

          this.#parentElement.insertAdjacentHTML("afterbegin", markup);
        });

        input.value = "";
        input.blur();
      }.bind(this)
    );
  }
}

export default new searchView();
