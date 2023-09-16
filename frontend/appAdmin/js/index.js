document.addEventListener("DOMContentLoaded", () => {
  const head = document.querySelector("head");
  const title = document.createElement("title");
  title.textContent = "BFA - Panel de administración";
  head.appendChild(title);

  if (document.URL.includes("index.html")) {
    const formContainer = document.querySelector("section.admin-login");
    const form = document.querySelector("form");

    const messagesContainer = document.createElement("div");
    messagesContainer.classList.add("errors-container");
    formContainer.appendChild(messagesContainer);

    const message = document.createElement("span");
    messagesContainer.appendChild(message);

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

    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let emailValue = email.value;
      let passwordValue = password.value;
      let errorBoolean = false;

      let data = {};

      switch (true) {
        case emailValue.trim() === "":
          errorBoolean = true;
          message.classList.add(errorBoolean ? "error" : "accuracy");
          message.textContent = "";
          message.textContent = "Por favor, ingresa un correo electrónico.";
          break;
        case !regex.test(emailValue):
          errorBoolean = true;
          message.classList.add(errorBoolean ? "error" : "accuracy");
          message.textContent = "";
          message.textContent =
            "Por favor, ingresa un correo electrónico válido.";
          break;
        case passwordValue.trim() === "":
          errorBoolean = true;
          message.classList.add(errorBoolean ? "error" : "accuracy");
          message.textContent = "";
          message.textContent = "Por favor, ingresa una contraseña.";
          break;
        default:
          data.email = emailValue;
          data.password = passwordValue;
          message.textContent = "";
          if (
            compararData(data) === "El email o la contraseña no son correctos"
          ) {
            errorBoolean = true;
          }
          message.classList.contains("error") &&
            message.classList.remove("error");
          message.classList.add(errorBoolean ? "error" : "accuracy");
          message.textContent = compararData(data);
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
    createNewWork.setAttribute("href", "./registerWork.html");
    createNewWork.classList.add("create-work");
    createNewWork.textContent = "Nueva Obra";

    let lengthProjects = 2;
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

      for (let i = 0; i < lengthProjects; i++) {
        const nuevaFila = document.createElement("tr");

        nuevaFila.innerHTML = `
        <td>${i + 1}</td>
        <td>Alfreds Futterkiste</td>
        <td>
            <a href="#" class="edit-work">
              <i class="fa-solid fa-pen-to-square"></i>
            </a>
        </td>
        <td>
            <a href="#" class="delete-work"><i class="fa-solid fa-trash"></i></a>
        </td>
       `;
        table.appendChild(nuevaFila);
      }
      myWorks.appendChild(table);
      body.appendChild(myWorks);
    } else {
      const noWorksYet = document.createElement("section");
      noWorksYet.classList.add("no-works-yet-container");
      body.appendChild(noWorksYet);
      const titleNoWorksYet = document.createElement("h2");
      titleNoWorksYet.classList.add("title-no-works");
      titleNoWorksYet.textContent =
        "No has publicado ninguna obra todavía. Ház una";
      noWorksYet.appendChild(titleNoWorksYet);
      noWorksYet.appendChild(createNewWork);
    }

    const editButtons = document.querySelectorAll("a.edit-work");
    const deleteButtons = document.querySelectorAll("a.delete-work");

    editButtons.forEach((nodo) => {
      nodo.addEventListener("click", () => {
        alert("Se hizo click en editar botón...");
      });
    });

    deleteButtons.forEach((nodo) => {
      nodo.addEventListener("click", () => {
        alert("Se hizo click en eliminar botón...");
      });
    });
  }

  if (document.URL.includes("registerWork.html")) {
    let contadorImagenes = 1;

    // Función para agregar campos de imágenes
    function agregarCampoImagen() {
      contadorImagenes++;
      const nuevoCampo = document.createElement("div");
      nuevoCampo.classList.add("imagen-campo");
      nuevoCampo.innerHTML = `
        <label for="imagen${contadorImagenes}">Imagen:</label>
        <input type="file" id="imagen${contadorImagenes}" name="imagen${contadorImagenes}" accept="image/*"/>
        <label for="descripcion${contadorImagenes}">Descripción (máx. 50 caracteres):</label>
        <input type="text" id="descripcion${contadorImagenes}" name="descripcion${contadorImagenes}" placeholder="Descripcion de la imágen"/>
        <span class="contadorCaracteres">0 / 50</span>
    `;
      document.getElementById("camposImagenes").appendChild(nuevoCampo);
      const nuevoInput = nuevoCampo.querySelector(
        `#descripcion${contadorImagenes}`
      );
      const nuevoContador = nuevoCampo.querySelector(".contadorCaracteres");

      nuevoInput.addEventListener("input", () => {
        actualizarContador(nuevoInput, nuevoContador);
      });
      return contadorImagenes;
    }

    document
      .getElementById("agregarImagen")
      .addEventListener("click", agregarCampoImagen);

    const descripcionInput = document.getElementById("descriptionImage");
    const contadorCaracteres = document.querySelector(".contadorCaracteres");

    descripcionInput.addEventListener("input", () => {
      actualizarContador(descripcionInput, contadorCaracteres);
    });

    function actualizarContador(input, contadorCaracteres) {
      const longitudActual = input.value.length;
      contadorCaracteres.textContent = `${longitudActual} / 50`;

      if (longitudActual > 50) {
        input.style.borderColor = "red";
        contadorCaracteres.style.color = "red";
      } else {
        contadorCaracteres.style.color = "black";
      }
    }

    const registrarNuevaObraForm = document.querySelector("form.register-work");

    const fechaInicio = document.querySelector(
      "input[type='date'][name='startdate']"
    );
    const fechaFin = document.querySelector(
      "input[type='date'][name='enddate']"
    );

    // Validador de fechas, la fecha de inicio no puede ser mayor a la de finalización
    fechaFin.addEventListener("change", () => {
      const fechaInicioValue = new Date(fechaInicio.value);
      const fechaFinValue = new Date(fechaFin.value);

      if (fechaInicioValue > fechaFinValue) {
        alert(
          "La fecha de inicio no puede ser mayor que la fecha de finalización."
        );
        fechaFin.value = "";
      }
    });

    // Persistencia de los datos del formulario en el localStorage
    registrarNuevaObraForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Se hizo click en registrar...");

      const formDataObject = {};
      const formFields = this.elements;

      for (let i = 0; i < formFields.length; i++) {
        const field = formFields[i];

        if (field.name && field.type !== "submit") {
          if (field.type === "file") {
            if (field.files.length > 0) {
              formDataObject[field.name] = field.files[0];
            } else {
              formDataObject[field.name] = null;
            }
          } else {
            formDataObject[field.name] = field.value;
          }
        }
      }
    });
  }
});
