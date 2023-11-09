export const showToastify = (message, avatarHTML = "") => {
  Toastify({
    text: message,
    avatar: avatarHTML,
    gravity: "top",
    position: "center",
    className: "toast-notification",
    style: {
      background: "#ffffff",
      color: "#000000",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      cursor: "auto",
    },
  }).showToast();
};