document.addEventListener("DOMContentLoaded", () => {
  const head = document.querySelector("head");
  const title = document.createElement("title");
  title.textContent = "BFA - Panel de administración";
  head.appendChild(title);

  if (document.URL.includes("index.html")) {
    const formContainer = document.querySelector("section.form-container");
    const form = document.querySelector("form");

    const errorsContainer = document.createElement("div");
    errorsContainer.classList.add("errors-container");
    formContainer.appendChild(errorsContainer);

    const errorMessage = document.createElement("span");
    errorsContainer.appendChild(errorMessage);

    const email = document.querySelector("input#email");
    const password = document.querySelector("input[type=password]");

    const compararData = (data) => {
      let correctData = {
        email: "fabian.butera@gmail.com",
        password: "admin123",
      };

      switch (true) {
        case correctData.email === data.email &&
          correctData.password === data.password:
          return "Bienvenido de vuelta Fabian";
        default:
          return "El email o la contraseña no son correctos";
      }
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      let emailValue = email.value;
      let passwordValue = password.value;
      let errorBoolean = false;

      let data = {};

      switch (true) {
        case emailValue.trim() === "":
          errorBoolean = true;
          errorMessage.classList.add(errorBoolean ? "error" : "accuracy");
          errorMessage.textContent = "";
          errorMessage.textContent =
            "Por favor, ingresa un correo electrónico.";
          break;
        case !regex.test(emailValue):
          errorBoolean = true;
          errorMessage.classList.add(errorBoolean ? "error" : "accuracy");
          errorMessage.textContent = "";
          errorMessage.textContent =
            "Por favor, ingresa un correo electrónico válido.";
          break;
        case passwordValue.trim() === "":
          errorBoolean = true;
          errorMessage.classList.add(errorBoolean ? "error" : "accuracy");
          errorMessage.textContent = "";
          errorMessage.textContent = "Por favor, ingresa una contraseña.";
          break;
        default:
          data.email = emailValue;
          data.password = passwordValue;
          errorMessage.textContent = "";
          if (
            compararData(data) === "El email o la contraseña no son correctos"
          ) {
            errorBoolean = true;
          }
          errorMessage.classList.contains("error") &&
            errorMessage.classList.remove("error");
          errorMessage.classList.add(errorBoolean ? "error" : "accuracy");
          errorMessage.textContent = compararData(data);
          if (compararData(data) === "Bienvenido de vuelta Fabian") {
            window.location.href = "dashboard.html";
          }
      }
    });
    emailValue = "";
    passwordValue = "";
  }

  if (document.URL.includes("dashboard.html")) {
    const body = document.querySelector("body");
    const createNewWork = document.createElement("a");
    createNewWork.setAttribute("href", "#");
    createNewWork.classList.add("create-work");
    createNewWork.textContent = "Nueva Obra";

    let lengthProjects = 1;
    let labels = ["ID", "Título", "Editar", "Eliminar"];

    if (lengthProjects > 0) {
      const registerWork = document.createElement("section");
      registerWork.classList.add("register-work");
      body.appendChild(registerWork);
      registerWork.appendChild(createNewWork);
      const myWorks = document.createElement("section");
      myWorks.classList.add("my-works");
      const table = document.createElement("table");
      const tr = document.createElement("tr");
      table.appendChild(tr);

      for (let i = 0; i < labels.length; i++) {
        const th = document.createElement("th");
        th.textContent = labels[i];
        tr.appendChild(th);
      }

      for (let i = 0; i < lengthProjects.length; i++) {
        const nuevaFila = document.createElement("tr");
        console.log(nuevaFila);

        nuevaFila.innerHTML = `
        <td>${i}</td>
        <td>Alfreds Futterkiste</td>
        <td>
            <a href="#" class="edit-work">
                <i class="fa-solid fa-pen-to-square"></i>
            </a>
        </td>
        <td>
            <a href="" class="delete-work"><i class="fa-solid fa-trash"></i></a>
        </td>
       `;
        table.appendChild(nuevaFila);
      }
      myWorks.appendChild(table);
      body.appendChild(myWorks);
    } else {
      const noWorksYet = document.createElement("section");
      noWorksYet.classList.add("no-works-yet");
      noWorksYet.classList.add("no-works-yet-container");
      body.appendChild(noWorksYet);
      const titleNoWorksYet = document.createElement("h2");
      titleNoWorksYet.classList.add("title-no-works");
      titleNoWorksYet.textContent =
        "No has publicado ninguna obra todavía. Ház una";
      noWorksYet.appendChild(titleNoWorksYet);
      noWorksYet.appendChild(createNewWork);
    }

    const editButton = document.querySelectorAll("a.edit-work");
    const deleteButton = document.querySelectorAll("a.delete-work");

    editButton.forEach((nodo) => {
      nodo.addEventListener("click", () => {
        alert("Se hizo click en editar botón...");
      });
    });

    deleteButton.forEach((nodo) => {
      nodo.addEventListener("click", () => {
        alert("Se hizo click en eliminar botón...");
      });
    });
  }

  if (document.URL.includes("registerWork.html")) {
  }
});
