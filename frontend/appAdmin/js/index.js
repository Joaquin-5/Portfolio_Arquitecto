// import { loginAdmin, saveWork } from "../../common/js/firebaseConfig.js";

document.addEventListener("DOMContentLoaded", () => {
  const head = document.querySelector("head");
  const title = document.createElement("title");
  title.textContent = "BFA - Panel de administración";
  head.appendChild(title);

  const showToastify = (mensaje, avatarHTML) => {
    Toastify({
      text: mensaje,
      avatar: "",
      gravity: "top",
      position: "center",
      className: "toast-notification",
      duration: 800000,
      style: {
        background: "#ffffff",
        color: "#000000",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        cursor: "auto",
      },
    }).showToast();

    const toast = document.querySelector(".toast-notification");
    toast.querySelector(".toastify-avatar").innerHTML = avatarHTML;
  };

  if (document.URL.includes("index.html")) {
    const formContainer = document.querySelector("section.admin-login");
    const form = document.querySelector("form");

    const messagesContainer = document.createElement("div");
    messagesContainer.classList.add("messages-container");
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
          // loginAdmin(data);
          message.classList.contains("error") &&
            message.classList.remove("error");
          message.classList.add(errorBoolean ? "error" : "accuracy");
          message.textContent = compararData(data);
          if (compararData(data) === "Bienvenido de vuelta Fabian") {
            window.location.href = "dashboard.html";
          }
      }
      emailValue = "";
      passwordValue = "";
    });
  }

  if (document.URL.includes("dashboard.html")) {
    const body = document.querySelector("body");
    const createNewWork = document.createElement("a");
    createNewWork.setAttribute("href", "./registerWork.html");
    createNewWork.classList.add("create-work");
    createNewWork.textContent = "Nueva Obra";

    let lengthProjects = 0;
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
        <td class="id-work">${i + 1}</td>
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
    const idWork = document.querySelectorAll("td.id-work");

    editButtons.forEach((nodo) => {
      nodo.addEventListener("click", () => {
        alert("Se hizo click en editar obra con el id " + idWork);
      });
    });

    deleteButtons.forEach((nodo) => {
      nodo.addEventListener("click", () => {
        alert("Se hizo click en eliminar obra con el id " + idWork);
      });
    });
  }

  if (document.URL.includes("registerWork.html")) {
    let formularioEditado = false;
    let contadorImagenes = 1;

    // Función para agregar campos de imágenes
    function agregarCampoImagen() {
      contadorImagenes++;
      formularioEditado = true;
      const nuevoCampo = document.createElement("div");
      nuevoCampo.classList.add("imagen-campo");
      nuevoCampo.innerHTML = `
        <label for="image${contadorImagenes}">Imagen:</label>
        <input type="file" id="image${contadorImagenes}" name="image${contadorImagenes}" accept="image/*"/>
        <label for="descriptionImage${contadorImagenes}">Descripción de la imágen (máx. 50 caracteres):</label>
        <input type="text" id="descriptionImage${contadorImagenes}" name="descriptionImage${contadorImagenes}" placeholder="Descripcion de la imágen"/>
        <span class="contadorCaracteres">0 / 50</span>
        <button type="button" class="eliminarCampo">Eliminar</button>
    `;
      const eliminarBoton = nuevoCampo.querySelector(".eliminarCampo");
      eliminarBoton.addEventListener("click", () => {
        document.getElementById("camposImagenes").removeChild(nuevoCampo);
      });

      document.getElementById("camposImagenes").appendChild(nuevoCampo);
      const nuevoInput = nuevoCampo.querySelector(
        `#descriptionImage${contadorImagenes}`
      );
      const nuevoContador = nuevoCampo.querySelector(".contadorCaracteres");

      nuevoInput.addEventListener("input", () => {
        actualizarContador(nuevoInput, nuevoContador);
      });
    }

    document
      .getElementById("agregarImagen")
      .addEventListener("click", agregarCampoImagen);

    const descripcionInput = document.getElementById("descriptionImage1");
    const contadorCaracteres = document.querySelector(".contadorCaracteres");

    descripcionInput.addEventListener("input", () => {
      actualizarContador(descripcionInput, contadorCaracteres);
    });

    function actualizarContador(input, contadorCaracteres) {
      const longitudActual = input.value.length;
      contadorCaracteres.textContent = `${longitudActual} / 50`;

      if (longitudActual > 50) {
        input.style.borderColor = "#ff0000";
        contadorCaracteres.style.color = "#ff0000";
      } else {
        input.style.borderColor = "#000000";
        contadorCaracteres.style.color = "#000000";
      }
    }

    const newWorkFormContainer = document.querySelector(".new-work__container");
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

      if (fechaInicioValue >= fechaFinValue) {
        alert(
          "La fecha de inicio no puede ser mayor o igual que la fecha de finalización."
        );
        fechaFin.value = "";
      }
    });

    fechaInicio.addEventListener("change", () => {
      const fechaInicioValue = new Date(fechaInicio.value);
      const fechaFinValue = new Date(fechaFin.value);

      if (fechaInicioValue >= fechaFinValue) {
        alert(
          "La fecha de inicio no puede ser mayor o igual que la fecha de finalización."
        );
        fechaFin.value = "";
      }
    });

    // Mostrar mensaje de alerta ante el actualizado o cerrado de la página para no perder la información del formulario
    registrarNuevaObraForm.addEventListener("input", () => {
      formularioEditado = true;
    });

    window.addEventListener("beforeunload", (e) => {
      if (formularioEditado) {
        e.preventDefault();
        e.returnValue = "";
        return "¡Atención! Hay cambios no guardados en el formulario.";
      }
    });

    const nombreObra = document.querySelector("input#title");
    const ubicacion = document.querySelector("input#location");
    const diaInicio = document.querySelector("input#startdate");
    const diaFinalizacion = document.querySelector("input#enddate");
    const descripcionObra = document.querySelector("textarea#descriptionWork");

    const messagesContainer = document.createElement("div");
    messagesContainer.classList.add("messages-container");
    newWorkFormContainer.appendChild(messagesContainer);

    const message = document.createElement("span");
    messagesContainer.appendChild(message);

    registrarNuevaObraForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let errorBoolean = false;
      let errorImagenes = false;
      let data = {};

      const imageFields = document.querySelectorAll(".imagen-campo");
      const imagesData = [];

      imageFields.forEach((contenedor, i) => {
        // Encontrar los inputs dentro de cada contenedor
        const inputImagen = contenedor.querySelector(`#image${i + 1}`);
        const inputDescripcion = contenedor.querySelector(
          `#descriptionImage${i + 1}`
        );

        // Hacer lo que necesites con los inputs, por ejemplo, acceder a sus valores
        const valorImagen = inputImagen.value;
        const valorDescripcion = inputDescripcion.value;

        // Puedes realizar operaciones específicas con estos valores
        /* console.log(`Valor del input imagen ${i + 1}: ${valorImagen}`);
        console.log(
          `Valor del input descripción ${i + 1}: ${valorDescripcion}`
        ); */

        switch (true) {
          case inputImagen.files.length === 0:
            errorImagenes = true;
            message.classList.add(errorBoolean ? "error" : "accuracy");
            message.textContent = `Debe seleccionar una imágen (${i})`;
            break;
          case !valorDescripcion:
            errorImagenes = true;
            errorImagenes;
            message.classList.add(errorBoolean ? "error" : "accuracy");
            message.textContent = `La descripción de la imagen ${
              i + 1
            } no puede estar vacía`;
            break;
          default:
            imagesData.push({
              imagen: valorImagen,
              descripcion: valorDescripcion,
            });
        }
      });

      let workName = nombreObra.value;
      let location = ubicacion.value;
      let startdate = diaInicio.value;
      let endDate = diaFinalizacion.value;
      let workDescription = descripcionObra.value;

      switch (true) {
        case workName.trim() === "":
          errorBoolean = true;
          showToastify(
            "El nombre de la obra no puede estar vacío",
            '<i class="fa-solid fa-circle-xmark" style="color: #ff0000;"></i>'
          );
          break;
        case location.trim() === "":
          errorBoolean = true;
          message.classList.add(errorBoolean ? "error" : "accuracy");
          message.textContent = "";
          message.textContent = "La ubicación no puede estar vacía";
          break;
        case startdate.trim() === "":
          errorBoolean = true;
          message.classList.add(errorBoolean ? "error" : "accuracy");
          message.textContent = "";
          message.textContent = "La fecha de inicio no puede estar vacía";
          break;
        case endDate.trim() === "":
          errorBoolean = true;
          message.classList.add(errorBoolean ? "error" : "accuracy");
          message.textContent = "";
          message.textContent = "La fecha de finalización no puede estar vacía";
          break;
        case workDescription.trim() === "":
          errorBoolean = true;
          message.classList.add(errorBoolean ? "error" : "accuracy");
          message.textContent = "";
          message.textContent = "La descripción no puede estar vacía";
          break;
      }

      if (!errorBoolean && !errorImagenes) {
        data.workName = workName;
        data.location = location;
        data.startdate = startdate;
        data.endDate = endDate;
        data.imagesData = imagesData;
        data.workDescription = workDescription;
        console.log(data);
        message.textContent = "Obra creada correctamente";
        message.classList.contains("error") &&
          message.classList.remove("error");
        message.classList.add(errorBoolean ? "error" : "accuracy");
        window.location.href = "dashboard.html";
        showToastify(
          "Obra creada correctamente",
          '<i class="fa-solid fa-circle-check" style="color: #107b10;"></i>'
        );
      }
    });
  }
});
