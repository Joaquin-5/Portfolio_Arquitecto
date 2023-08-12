const tab = document.querySelector("title");

const imageCarrouselContainer =
  document.querySelector("div.container").childElementCount;

const imageSlider = () => {
  let counter = 1;

  setInterval(() => {
    document.querySelector(".img.show").classList.remove("show");
    document.URL.includes("index.html") &&
      document
        .querySelector(".description-project.show-description-project")
        .classList.remove("show-description-project");

    const img = document.querySelector(`.img-${counter}`);
    const descriptionImg =
      document.URL.includes("index.html") &&
      document.querySelector(`.description-project-${counter}`);

    img.classList.add("show");
    document.URL.includes("index.html") &&
      descriptionImg.classList.add("show-description-project");
    counter++;

    if (counter > imageCarrouselContainer) {
      counter = 1;
    }
  }, 5000);
};

imageSlider();

if (document.URL.includes("index.html")) {
  tab.innerHTML = "BFA - Fabián Butera Arquitecto";

  //h1 animation text

  /* const h1 = new SplitType("#name-text");

  gsap.to(".char", {
    y: 0,
    stagger: 0.05,
    delay: 0.2,
    duration: 0.1,
  }); */

  // nav scroll
  window.addEventListener("scroll", () => {
    let nav = document.querySelector("nav");
    nav.classList.toggle("sticky", window.scrollY > 0);
  });
}

if (document.URL.includes("project.html")) {
  tab.innerHTML = "Nombre del proyecto - BFA";
}

// date change footer
const dateFooterChange = document.getElementById("date__footer-copyright");

let date = new Date();
let year = date.getFullYear();

dateFooterChange.innerHTML = year;
