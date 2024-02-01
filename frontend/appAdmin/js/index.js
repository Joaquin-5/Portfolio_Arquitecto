import {
  loginAdmin,
  logoutAdmin,
  saveWork,
  getWorkById,
  getWorks,
  uploadFile,
  deleteWork,
} from "../../common/js/firebaseConfig.js";
import { okIcon, errorIcon, showToastify } from "../../common/js/toastify.js";

import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

const auth = getAuth();

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
          loginAdmin(data)
            .then((user) => {
              window.location.href = "dashboard.html";
            })
            .catch((error) => {
              showToastify(
                "El email o la contraseña no son correctos",
                errorIcon
              );
            });
      }
    });
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Si el administrador está autenticado
      if (document.URL.includes("index.html")) {
        // Redirige al administrador a dashboard.html
        window.location.href = "dashboard.html";
      }

      if (document.URL.includes("dashboard.html")) {
        const body = document.querySelector("body");
        const buttonCloseSession = document.querySelector(".close-session");
        const loadingMessage = document.getElementById("loading-message");
        loadingMessage.style.display = "block";
        const createNewWork = document.createElement("a");
        createNewWork.setAttribute("href", "./registerWork.html");
        createNewWork.classList.add("create-work");
        createNewWork.textContent = "Nueva Obra";
        console.log(user);

        // Verifica si es la primera visita a la página dashboard.html
        const isFirstVisit = sessionStorage.getItem("dashboardFirstVisit");
        if (!isFirstVisit) {
          showToastify("Bienvenido Fabian");
          sessionStorage.setItem("dashboardFirstVisit", "true");
        }

        buttonCloseSession.addEventListener("click", () => {
          logoutAdmin();
          window.location.href = "index.html";
        });

        let labels = ["ID", "Título", "Editar", "Eliminar"];

        const fetchWorksAndPrint = async () => {
          try {
            // Llamas a la función getWorks con el nombre de la colección
            const works = await getWorks();

            console.log(works);

            // Obtén la longitud de los trabajos
            const lengthWorks = works.length;

            if (lengthWorks > 0 && works) {
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

              for (let i = 0; i < lengthWorks; i++) {
                const newRow = document.createElement("tr");

                newRow.innerHTML = `
                <td class="id-work">${works[i].id}</td>
                <td>${works[i].workName}</td>
                <td>
                    <a href="#" class="edit-work" data-work-id=${works[i].id}>
                      <i class="fa-solid fa-pen-to-square"></i>
                    </a>
                </td>
                <td>
                    <a href="#" class="delete-work" data-work-id=${works[i].id}><i class="fa-solid fa-trash"></i></a>
                </td>
               `;
                table.appendChild(newRow);
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
                const idWork = nodo.dataset.workId;

                alert("Se hizo click en editar obra con el id: " + idWork);

                // Redirigir al formulario de edición y pasar el ID como parámetro
                window.location.href = `editWork.html?id=${idWork}`;
              });
            });

            deleteButtons.forEach((nodo) => {
              nodo.addEventListener("click", async () => {
                const idWork = nodo.dataset.workId;
                const result = confirm(
                  "¿Estás seguro que querés borrar la obra con el id: " + idWork
                );
                if (result) {
                  try {
                    await deleteWork(idWork);
                    // Elimina la fila de la tabla correspondiente al trabajo eliminado
                    nodo.closest("tr").remove();
                    showToastify("Obra eliminada exitosamente", okIcon);
                  } catch (error) {
                    console.error("Error al eliminar la obra:", error);
                    showToastify("Error al eliminar la obra", errorIcon);
                  }
                }
              });
            });
          } catch (error) {
            console.error("Error al obtener los datos:", error);
          } finally {
            // Oculta el mensaje de carga después de obtener los datos o en caso de error
            loadingMessage.style.display = "none";
          }
        };

        fetchWorksAndPrint();
      }

      if (
        document.URL.includes("registerWork.html") ||
        document.URL.includes("editWork.html")
      ) {
        let editedForm = false;
        let successfulValidation = false;
        let counterImages =
          document.querySelector("#camposImagenes").childElementCount;
        let camposValidacion = [];

        // Selecciona todos los campos y con la cantidad de los divs hijos imagen-campo actualiza todos
        const actualizarNumerosCampos = (cantidad) => {
          // Todos los campos del input type file con su respesctivo label
          const labelsImageFile =
            document.querySelectorAll(".image-file__label");
          const inputsImageFile =
            document.querySelectorAll(".image_file__input");

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
              labelsImageDescription[
                i
              ].textContent = `Descripción de la imágen ${
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
          editedForm = true;

          counterImages = counterImages + 1;
          const newField = document.createElement("div");

          newField.classList.add("imagen-campo");
          const numberField = camposValidacion.length + 1;

          newField.classList.add(`imagen-campo-${numberField}`);

          newField.insertAdjacentHTML(
            "beforeend",
            `
            <label for="image${counterImages}" class="image-file__label">Imagen ${counterImages}:</label>
            <input type="file" id="image${counterImages}" name="image${counterImages}" accept="image/*" class="image_file__input"/>
            <label for="descriptionImage${counterImages}" class="image-description__label">Descripción de la imágen ${counterImages} (máx. 50 caracteres):</label>
            <input type="text" id="descriptionImage${counterImages}" name="descriptionImage${counterImages}" placeholder="Descripcion de la imágen"/>
            <span class="contadorCaracteres">0 / 50</span>
            <button type="button" class="eliminarCampo">Eliminar</button>
          `
          );

          // Agregar el evento de eliminar al botón
          const eliminarBoton = newField.querySelector(".eliminarCampo");
          eliminarBoton.addEventListener("click", () => {
            editedForm = true;
            document.getElementById("camposImagenes").removeChild(newField);

            counterImages =
              document.querySelector("#camposImagenes").childElementCount;
            actualizarNumerosCampos(counterImages);
          });

          // Agregar el nuevo campo al formulario
          document.getElementById("camposImagenes").appendChild(newField);

          // Agregar evento de conteo de caracteres a la descripción
          const nuevoInput = newField.querySelector(
            `#descriptionImage${counterImages}`
          );
          const nuevoContador = newField.querySelector(".contadorCaracteres");

          nuevoInput.addEventListener("input", () => {
            actualizarContador(nuevoInput, nuevoContador, newField);
          });
        };

        document
          .getElementById("agregarImagen")
          .addEventListener("click", agregarCampoImagen);

        const descriptionInput = document.getElementById("descriptionImage1");
        const contadorCaracteres = document.querySelector(
          ".contadorCaracteres"
        );

        descriptionInput.addEventListener("input", () => {
          actualizarContador(descriptionInput, contadorCaracteres);
        });

        const actualizarContador = (
          input,
          contadorCaracteres,
          campo = null
        ) => {
          const numberField = input.id.replace(/\D/g, "");
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
            const imageInput = campo.querySelector(`#image${numberField}`);
            const inputDescripcion = campo.querySelector(
              `#descriptionImage${numberField}`
            );
            if (imageInput && inputDescripcion) {
              imageInput.name = `image${numberField}`;
              inputDescripcion.name = `descriptionImage${numberField}`;
            }
          });
        };

        const registerNewWorkForm =
          document.querySelector("form.register-work");

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
        registerNewWorkForm.addEventListener("input", () => {
          editedForm = true;
        });

        // Mostrar mensaje de alerta ante el actualizado o cerrado de la página para no perder la información del formulario
        window.addEventListener("beforeunload", (e) => {
          if (successfulValidation) {
            return;
          }

          if (editedForm) {
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
        const descripcionObra = document.querySelector(
          "textarea#descriptionWork"
        );

        const regex = /^[A-Za-z\s]+,\s[A-Za-z\s]+$/;

        registerNewWorkForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          let error = false;
          let uploadImages = true;
          let data = {};

          const imageFields = document.querySelectorAll(".imagen-campo");
          const imagesData = [];

          let workName = nombreObra.value;
          let location = ubicacion.value;
          let startDate = diaInicio.value;
          let endDate = diaFinalizacion.value;
          let workDescription = descripcionObra.value;

          // Icono de error de font awesome: '<i class="fa-solid fa-circle-xmark" style="color: #ff0000;"></i>
          // Icono de OK de font awesome: <i class="fa-solid fa-circle-check" style="color: #107b10;"></i>'

          if (workName.trim() === "") {
            error = true;
            showToastify(
              "El nombre de la obra no puede estar vacío",
              errorIcon
            );
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

          if (!error && startDate.trim() === "") {
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
            const imageInput = contenedor.querySelector(`#image${i + 1}`);
            const inputDescripcion = contenedor.querySelector(
              `#descriptionImage${i + 1}`
            );
            const selectedImage = imageInput.files ? imageInput.files[0] : null;

            if (!error && !selectedImage) {
              error = true;
              showToastify(
                `Debe seleccionar una imágen, para el archivo de la imágen: ${
                  i + 1
                }`,
                errorIcon
              );
              uploadImages = false;
            } else {
              const selectedImageName = selectedImage
                ? selectedImage.name
                : null;
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
                  image: selectedImage,
                  descriptionImage: valorDescripcion,
                });
              }
            }
          });

          const imageFieldsArray = Array.from(imageFields).filter(
            (contenedor) =>
              contenedor !== null && typeof contenedor !== "undefined"
          );

          if (
            imageFieldsArray.some((contenedor) =>
              contenedor.classList.contains("invalid")
            )
          ) {
            successfulValidation = false;
          }

          if (!error && workDescription.trim() === "") {
            error = true;
            showToastify(
              "La descripción de la obra no puede estar vacía",
              errorIcon
            );
          }

          if (!error && uploadImages) {
            // Asignar datos del formulario
            successfulValidation = true;
            data.workName = workName;
            data.location = location;
            data.startDate = startDate;
            data.endDate = endDate;
            data.workDescription = workDescription;

            // Subir todas las imágenes y obtener las URLs
            const imagenesPromesas = imagesData.map(async (imagenData) => {
              const imageUrl = await uploadFile(imagenData.image);
              return {
                image: imageUrl,
                descriptionImage: imagenData.descriptionImage,
              };
            });

            // Esperar a que todas las imágenes se suban
            const imagenesConUrls = await Promise.all(imagenesPromesas);

            // Asignar las URLs a las imágenes en 'data'
            data.imagesData = imagenesConUrls;

            // Llamada a saveWork y redirección después de que se complete
            saveWork(data)
              .then(() => {
                showToastify("La obra fue creada correctamente", okIcon);
                setTimeout(() => {
                  window.location.href = "dashboard.html";
                }, 2000);
              })
              .catch((error) => {
                console.error("Error al guardar la obra:", error);
                showToastify("Hubo un error al guardar la obra.", errorIcon);
              });
          }
        });
      }

      if (document.URL.includes("editWork.html")) {
        // Extraer parámetro 'id' de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const workId = urlParams.get("id");
        const camposImagenes = document.getElementById("camposImagenes");
        console.log(workId);

        if (workId) {
          getWorkById(workId).then((workData) => {
            console.log(workData);
            document.getElementById("title").value = workData.workName;
            document.getElementById("location").value = workData.location;
            document.getElementById("startdate").value = workData.startdate;
            document.getElementById("enddate").value = workData.endDate;
            camposImagenes.forEach((campo, index) => {

            });
            document.getElementById("descriptionWork").value =
              workData.descriptionWork;
          });
        } else {
          console.error("ID de obra no encontrado en la URL");
        }
      }
    } else {
      if (!window.location.href.includes("index.html")) {
        window.location.href = "index.html";
      }
    }
  });
});
