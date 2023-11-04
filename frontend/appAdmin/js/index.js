// import { loginAdmin, saveWork } from "../../common/js/firebaseConfig.js";
import { showToastify } from "../../common/js/toastify.js";

const okIcon =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/800px-Eo_circle_green_checkmark.svg.png";
const errorIcon =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/1200px-Cross_red_circle.svg.png";

document.addEventListener("DOMContentLoaded", () => {
  const head = document.querySelector("head");
  const title = document.createElement("title");
  title.textContent = "BFA - Panel de administración";
  head.appendChild(title);

  if (document.URL.includes("index.html")) {
    const form = document.querySelector("form");

    const email = document.querySelector("input#email");
    const password = document.querySelector("input[type=password]");
    const eyeIcon = document.querySelector("i.input-icon");

    const toggleShowPassword = () => {
      if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
      } else {
        password.type = "password";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
      }
    };

    eyeIcon.addEventListener("click", toggleShowPassword);

    const compararData = (data) => {
      let correctData = {
        email: "fabian.butera@gmail.com",
        password: "admin123",
      };

      switch (true) {
        case correctData.email === data.email &&
          correctData.password === data.password:
          return "Bienvenido Fabian";
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
      let error = false;

      let data = {};

      switch (true) {
        case emailValue.trim() === "":
          error = true;
          showToastify("Por favor, ingresa un correo electrónico.", errorIcon);
          break;
        case !regex.test(emailValue):
          error = true;
          showToastify(
            "Por favor, ingresa un correo electrónico válido.",
            errorIcon
          );
          break;
        case passwordValue.trim() === "":
          error = true;
          showToastify("Por favor, ingrese una contraseña.", errorIcon);
          break;
        default:
          data.email = emailValue;
          data.password = passwordValue;
          if (
            compararData(data) === "El email o la contraseña no son correctos"
          ) {
            error = true;
            showToastify(compararData(data), errorIcon);
          }
          // loginAdmin(data);
          if (compararData(data) === "Bienvenido Fabian") {
            window.location.href = "dashboard.html";
          }
      }
      form.reset();
      /* emailValue = "";
      passwordValue = ""; */
    });
  }

  if (document.URL.includes("dashboard.html")) {
    const body = document.querySelector("body");
    const createNewWork = document.createElement("a");
    createNewWork.setAttribute("href", "./registerWork.html");
    createNewWork.classList.add("create-work");
    createNewWork.textContent = "Nueva Obra";

    // Verifica si es la primera visita a la página dashboard.html
    const isFirstVisit = sessionStorage.getItem("dashboardFirstVisit");
    if (!isFirstVisit) {
      showToastify("Bienvenido Fabian");
      sessionStorage.setItem("dashboardFirstVisit", "true");
    }

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
    let validacionExitosa = false;
    let contadorImagenes =
      document.querySelector("#camposImagenes").childElementCount;
    let camposValidacion = [];

    // Selecciona todos los campos y con la cantidad de los divs hijos imagen-campo actualiza todos
    const actualizarNumerosCampos = (cantidad) => {
      // Todos los campos del input type file con su respesctivo label
      const labelsImageFile = document.querySelectorAll(".image-file__label");
      const inputsImageFile = document.querySelectorAll(".image_file__input");

      // Todos los campos del input para la descripción de la imagen
      const labelsImageDescription = document.querySelectorAll(
        ".image-description__label"
      );
      const inputsImageDescription = document.querySelectorAll(
        ".image-description__input"
      );

      for (let i = 0; i < cantidad; i++) {
        if (labelsImageFile[i]) {
          labelsImageFile[i].setAttribute("for", `image${i + 1}`);
          labelsImageFile[i].textContent = `Imagen ${i + 1}`;
        }

        if (inputsImageFile[i]) {
          inputsImageFile[i].setAttribute("id", `image${i + 1}`);
          inputsImageFile[i].setAttribute("name", `image${i + 1}`);
        }

        if (labelsImageDescription[i]) {
          labelsImageDescription[i].setAttribute(
            "for",
            `descriptionImage${i + 1}`
          );
          labelsImageDescription[i].textContent = `Descripción de la imágen ${
            i + 1
          } (máx. 50 caracteres):`;
        }

        if (inputsImageDescription[i]) {
          inputsImageDescription[i].setAttribute(
            "id",
            `descriptionImage${i + 1}`
          );
          inputsImageDescription[i].setAttribute(
            "name",
            `descriptionImage${i + 1}`
          );
        }
      }
    };

    // Función para agregar el campo de imagen
    const agregarCampoImagen = () => {
      formularioEditado = true;
      contadorImagenes = contadorImagenes + 1;
      const nuevoCampo = document.createElement("div");
      nuevoCampo.classList.add("imagen-campo");
      const numeroCampo = camposValidacion.length + 1;
      nuevoCampo.classList.add(`imagen-campo-${numeroCampo}`);
      nuevoCampo.insertAdjacentHTML(
        "beforeend",
        `
        <label for="image${contadorImagenes}" class="image-file__label">Imagen ${contadorImagenes}:</label>
        <input type="file" id="image${contadorImagenes}" name="image${contadorImagenes}" acce-pt="image/*"/>
        <label for="descriptionImage${contadorImagenes}" class="image-description__label">Descripción de la imágen ${contadorImagenes} (máx. 50 caracteres):</label>
        <input type="text" id="descriptionImage${contadorImagenes}" name="descriptionImage${contadorImagenes}" placeholder="Descripcion de la imágen"/>
        <span class="contadorCaracteres">0 / 50</span>
        <button type="button" class="eliminarCampo">Eliminar</button>
      `
      );

      // Agregar el evento de eliminar al botón
      const eliminarBoton = nuevoCampo.querySelector(".eliminarCampo");
      eliminarBoton.addEventListener("click", () => {
        formularioEditado = true;
        document.getElementById("camposImagenes").removeChild(nuevoCampo);
        contadorImagenes =
          document.querySelector("#camposImagenes").childElementCount;
        actualizarNumerosCampos(contadorImagenes);
      });

      // Agregar el nuevo campo al formulario
      document.getElementById("camposImagenes").appendChild(nuevoCampo);

      // Agregar evento de conteo de caracteres a la descripción
      const nuevoInput = nuevoCampo.querySelector(
        `#descriptionImage${contadorImagenes}`
      );
      const nuevoContador = nuevoCampo.querySelector(".contadorCaracteres");

      nuevoInput.addEventListener("input", () => {
        actualizarContador(nuevoInput, nuevoContador, nuevoCampo);
      });
    };

    document
      .getElementById("agregarImagen")
      .addEventListener("click", agregarCampoImagen);

    const descripcionInput = document.getElementById("descriptionImage1");
    const contadorCaracteres = document.querySelector(".contadorCaracteres");

    descripcionInput.addEventListener("input", () => {
      actualizarContador(descripcionInput, contadorCaracteres);
    });

    const actualizarContador = (input, contadorCaracteres, campo = null) => {
      const numeroCampo = input.id.replace(/\D/g, "");
      const longitudActual = input.value.length;
      contadorCaracteres.textContent = `${longitudActual} / 50`;

      if (longitudActual > 50) {
        input.style.borderColor = "#ff0000";
        contadorCaracteres.style.color = "#ff0000";

        if (campo) {
          campo.classList.add("invalid");
        }
      } else {
        input.style.borderColor = "#000000";
        contadorCaracteres.style.color = "#000000";

        if (campo) {
          campo.classList.remove("invalid");
        }
      }

      // Actualiza los nombres de los campos
      camposValidacion.forEach((campo) => {
        const inputImagen = campo.querySelector(`#image${numeroCampo}`);
        const inputDescripcion = campo.querySelector(
          `#descriptionImage${numeroCampo}`
        );
        if (inputImagen && inputDescripcion) {
          inputImagen.name = `image${numeroCampo}`;
          inputDescripcion.name = `descriptionImage${numeroCampo}`;
        }
      });
    };

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
        showToastify(
          "La fecha de finalización no puede ser menor o igual que la fecha de inicio.",
          errorIcon
        );
        fechaFin.value = "";
      }
    });

    // Lo hago también para le fecha de finalización por si el usuario ingresa primero la de finalización. Aunque no se el flujo del programa
    fechaInicio.addEventListener("change", () => {
      const fechaInicioValue = new Date(fechaInicio.value);
      const fechaFinValue = new Date(fechaFin.value);

      if (fechaInicioValue >= fechaFinValue) {
        showToastify(
          "La fecha de finalización no puede ser menor o igual que la fecha de inicio.",
          errorIcon
        );
        fechaFin.value = "";
      }
    });

    // Se le asigna varible formulario editado en true si el input
    registrarNuevaObraForm.addEventListener("input", () => {
      formularioEditado = true;
    });

    // Mostrar mensaje de alerta ante el actualizado o cerrado de la página para no perder la información del formulario
    window.addEventListener("beforeunload", (e) => {
      if (validacionExitosa) {
        return;
      }

      if (formularioEditado) {
        e.preventDefault();
        e.returnValue = "";
        return "¡Atención! Hay cambios no guardados en el formulario.";
      }
    });

    // Encuentra imágenes duplicadas. En caso de encontrar devuelve true sino false
    const isImageDuplicate = (selectedImageName, imagesData) => {
      return imagesData.some(
        (imageData) => imageData.imagen === selectedImageName
      );
    };

    const nombreObra = document.querySelector("input#title");
    const ubicacion = document.querySelector("input#location");
    const diaInicio = document.querySelector("input#startdate");
    const diaFinalizacion = document.querySelector("input#enddate");
    const descripcionObra = document.querySelector("textarea#descriptionWork");

    const regex = /^[A-Za-z\s]+,\s[A-Za-z\s]+$/;

    registrarNuevaObraForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let error = false;
      let data = {};

      const imageFields = document.querySelectorAll(".imagen-campo");
      const imagesData = [];

      let workName = nombreObra.value;
      let location = ubicacion.value;
      let startdate = diaInicio.value;
      let endDate = diaFinalizacion.value;
      let workDescription = descripcionObra.value;

      // Icono de error de font awesome: '<i class="fa-solid fa-circle-xmark" style="color: #ff0000;"></i>
      // Icono de OK de font awesome: <i class="fa-solid fa-circle-check" style="color: #107b10;"></i>'

      if (workName.trim() === "") {
        error = true;
        showToastify("El nombre de la obra no puede estar vacío", errorIcon);
      }

      if (!error && location.trim() === "") {
        error = true;
        showToastify("La ubicación no puede estar vacía", errorIcon);
      }

      if (!error && !regex.test(location)) {
        error = true;
        showToastify(
          "El formato de la ubicación es inválido. Debe ser 'Ciudad, País'.",
          errorIcon
        );
      }

      if (!error && startdate.trim() === "") {
        error = true;
        showToastify("La fecha de inicio no puede estar vacía", errorIcon);
      }

      if (!error && endDate.trim() === "") {
        error = true;
        showToastify(
          "La fecha de finalización no puede estar vacía",
          errorIcon
        );
      }

      imageFields.forEach((contenedor, i) => {
        const inputImagen = contenedor.querySelector(`#image${i + 1}`);
        const inputDescripcion = contenedor.querySelector(
          `#descriptionImage${i + 1}`
        );
        const selectedImage = inputImagen.files ? inputImagen.files[0] : null;

        if (!error && !selectedImage) {
          error = true;
          showToastify(
            `Debe seleccionar una imágen, para el archivo de la imágen: ${
              i + 1
            }`,
            errorIcon
          );
        } else {
          const selectedImageName = selectedImage ? selectedImage.name : null;
          const valorDescripcion = inputDescripcion
            ? inputDescripcion.value
            : null;

          if (!error && selectedImageName.trim() === "") {
            error = true;
            showToastify(
              `Debe seleccionar una imágen, para el archivo de la imágen: ${
                i + 1
              }`,
              errorIcon
            );
          } else if (!error && !valorDescripcion) {
            error = true;
            showToastify(
              `La descripción de la imagen ${i + 1} no puede estar vacía`,
              errorIcon
            );
          } else if (!error && inputDescripcion.value.length > 50) {
            error = true;
            showToastify(
              `La descripción de la imagen ${
                i + 1
              } no puede tener más de 50 caracteres`,
              errorIcon
            );
            contenedor.classList.add("invalid");
          } else if (
            !error &&
            isImageDuplicate(selectedImageName, imagesData)
          ) {
            error = true;
            showToastify(
              `La imagen seleccionada en el campo ${
                i + 1
              } ya ha sido agregada en otro campo`,
              errorIcon
            );
          } else {
            imagesData.push({
              imagen: selectedImageName,
              descripcion: valorDescripcion,
            });
          }
        }
      });

      const imageFieldsArray = Array.from(imageFields).filter(
        (contenedor) => contenedor !== null && typeof contenedor !== "undefined"
      );

      if (
        imageFieldsArray.some((contenedor) =>
          contenedor.classList.contains("invalid")
        )
      ) {
        validacionExitosa = false;
      }

      if (!error && workDescription.trim() === "") {
        error = true;
        showToastify(
          "La descripción de la obra no puede estar vacía",
          errorIcon
        );
      }

      if (!error) {
        validacionExitosa = true;
        data.workName = workName;
        data.location = location;
        data.startdate = startdate;
        data.endDate = endDate;
        data.imagesData = imagesData;
        data.workDescription = workDescription;
        console.log(data);
        registrarNuevaObraForm.reset();
        showToastify("La obra fue creada correctamente", okIcon);
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 2000);
      }
    });
  }
});
