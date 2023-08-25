document.addEventListener("DOMContentLoaded", () => {
  const head = document.querySelector("head");
  const title = document.createElement("title");
  title.textContent = "BFA - Panel de administración";
  head.appendChild(title);

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
        errorMessage.textContent = "Por favor, ingresa un correo electrónico.";
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
    }
  });
  emailValue = "";
  passwordValue = "";
});
