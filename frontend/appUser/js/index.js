if (document.URL.includes("index.html")) {
  // Image slider header
  let counter = 1;

  const imageSlider = () => {
    setInterval(() => {
      document.querySelector(".img.show").classList.remove("show");
      document
        .querySelector(".description-project.show-description-project")
        .classList.remove("show-description-project");
      const img = document.querySelector(`.img-${counter}`);
      const descriptionImg = document.querySelector(
        `.description-project-${counter}`
      );
      img.classList.add("show");
      descriptionImg.classList.add("show-description-project");
      counter++;

      if (counter > 4) {
        counter = 1;
      }
    }, 5000);
  };

  imageSlider();

  //h1 animation text

  const h1 = new SplitType("#name-text");

  gsap.to(".char", {
    y: 0,
    stagger: 0.05,
    delay: 0.2,
    duration: 0.1,
  });
}

// date change footer
const dateFooterChange = document.getElementById("date__footer-copyright");

let date = new Date();
let year = date.getFullYear();

dateFooterChange.innerHTML = year;

// nav scroll
window.addEventListener("scroll", () => {
  let nav = document.querySelector("nav");
  nav.classList.toggle("sticky", window.scrollY > 0);
});
