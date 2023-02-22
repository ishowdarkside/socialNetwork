class scrollView {
  #btnRegisterScroll = document.querySelector("#registerScroll");
  #btnExploreScroll = document.querySelector("#exploreScroll");
  #btnTestimonials = document.querySelector(".section__about__scrollTo");
  handleListener() {
    this.#btnRegisterScroll.addEventListener("click", function (e) {
      document.querySelector(".section__register").scrollIntoView();
    });

    this.#btnExploreScroll.addEventListener("click", function () {
      document.querySelector(".section__about").scrollIntoView();
    });

    this.#btnTestimonials.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .querySelector(".section__testimonials__grid__wrapper")
        .scrollIntoView();
    });
  }
}

export default new scrollView();
