class ValidationView {
  #parentElement = document.querySelector(".section__register form");
  #registerButton = document.querySelector("#registerUser");
  #testSet = new Set();
  constructor() {
    this.config = {
      firstName: {
        min: 4,
        max: 12,
      },
      lastName: {
        min: 6,
        max: 13,
      },
      email: {
        min: 8,
        email: true,
        max: 30,
      },
      password: {
        min: 9,
        max: 30,
      },
    };
    this.#handleInputListeners();
    this.#validateButton();
  }

  #handleInputListeners() {
    this.#parentElement.addEventListener(
      "input",
      function (e) {
        const currInput = e.target;

        //Looping trough all "id's" of inputs and for each id checking
        //if the id is equal to the object id (property)
        Object.keys(this.config).forEach((eachConf) => {
          if (currInput.getAttribute("id") === eachConf) {
            //if so,check if the length is greater or less than objects defined lenghts
            if (
              currInput.value.length < this.config[eachConf].min ||
              currInput.value.length > this.config[eachConf].max
            ) {
              //if so,display error
              this.#populateError(currInput, this.config[eachConf]);
              this.#testSet.delete(eachConf);
              //else,remove error
            } else {
              currInput.nextElementSibling?.remove();
              this.#testSet.add(eachConf);
            }
          }
          //Check if it is email
          if (currInput.getAttribute("id") === "email") {
            this.#validateEmail(currInput);
          }
        });
      }.bind(this)
    );
  }

  #populateError(input, obj) {
    const parentElement = input.closest("div");
    const markup = `<p class="redDom">Should contain more than ${obj.min} characters and less than ${obj.max} chars.</p> `;
    parentElement.querySelectorAll("p").forEach((el) => el.remove());
    parentElement.insertAdjacentHTML("beforeend", markup);
  }

  #validateEmail(input) {
    const emailRegex = /^[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+$/;
    const parentElement = input.closest("div");
    if (!emailRegex.test(input.value)) {
      const markup = `<p class="redDom emailError">Invalid Email Adress</p>`;
      parentElement
        .querySelectorAll(".emailError")
        .forEach((el) => el.remove());
      parentElement.insertAdjacentHTML("beforeend", markup);
    } else {
      parentElement
        .querySelectorAll(".emailError")
        .forEach((el) => el.remove());

      this.#testSet.add("emailValidated");
    }
  }

  #validateButton() {
    this.#registerButton.addEventListener(
      "click",
      async function (e) {
        e.preventDefault();
        if (this.#testSet.size === 5) {
          const firstName = document.querySelector("#firstName").value;
          const lastName = document.querySelector("#lastName").value;
          const email = document.querySelector("#email").value;
          const password = document.querySelector("#password").value;

          await this.handler(firstName, lastName, email, password);

          window.location.href = "main.html";
        }
      }.bind(this)
    );
  }
  catchHandler(handler) {
    this.handler = handler;
  }
}

export default new ValidationView();
