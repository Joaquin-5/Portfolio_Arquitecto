document.addEventListener("DOMContentLoaded", () => {
  // Dinamic tab
  const head = document.querySelector("head");
  const title = document.createElement("title");
  head.appendChild(title);

  // Length of amount of images
  const imageCarrouselContainer =
    document.querySelector("div.container").childElementCount;

  const projectsContainer = document.querySelector("article.project-container");

  // FAKE API
  const url = "http://127.0.0.1:5500/frontend/appUser/projects.json";

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

  const getProject = (key) => {
    window.location.href = `project.html?key=${key}`;
  };

  if (document.URL.includes("index.html")) {
    title.textContent = "BFA - Fabián Butera Arquitecto";

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

    const getProjects = (url) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          data.length > 0
            ? data.map((project, id) => {
                projectsContainer.innerHTML += `<section class="project" key=${id}>
            <a href="./project.html">
              <img src="./img/landscape2.avif" alt="" />
              <div class="project__content-container">
                <div class="project-data">
                  <p>Fecha del Proyecto: ${project.fecha}</p>
                  <p class="icon-text">
                    <span class="material-symbols-outlined"> location_on </span
                    >${project.lugar}
                  </p>
                </div>
                <h3>${project.titulo}</h3>
              </div>
            </a>
          </section>`;
              })
            : (projectsContainer.innerHTML += `<h2 class="no-projects__title">¡No hay proyectos publicados todavía!</h2>`);
        })
        .catch((error) => {
          console.error("Error al cargar el archivo JSON:", error);
        });
    };

    getProjects(url);

    projectsContainer.addEventListener("click", (event) => {
      event.preventDefault();
      const clickedSection = event.target.closest("section");

      if (clickedSection) {
        const key = clickedSection.getAttribute("key");
        console.log("La clave es: " + key);
        getProject(key);
      }
    });
  }

  if (document.URL.includes("project.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get("key");

    const imageSlider = document.querySelector("div.container");
    const projectTitle = document.querySelector("h1#project-name");
    const placeProject = document.querySelector("span.location");
    const dateProject = document.querySelector("h2.date-project");
    const descriptionProject = document.querySelector("p");

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        /* imageSlider.map((image, i) => {

        }) */
        title.textContent = `BFA - ${data[key].titulo}`;
        projectTitle.textContent = `${data[key].titulo}`;
        placeProject.textContent = `${data[key].lugar}`;
        dateProject.textContent = `Fecha del Proyecto: ${data[key].fecha}`;
        descriptionProject.textContent = `${data[key].descripcion_larga}`;
      });
  }

  // date change footer
  const dateFooterChange = document.getElementById("date__footer-copyright");

  let date = new Date();
  let year = date.getFullYear();

  dateFooterChange.innerHTML = year;
});
