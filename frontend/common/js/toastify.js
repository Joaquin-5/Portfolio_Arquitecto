// Icons
export const okIcon =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/800px-Eo_circle_green_checkmark.svg.png";
export const errorIcon =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/1200px-Cross_red_circle.svg.png";

export const showToastify = (message, avatarHTML = "") => {
  Toastify({
    text: message,
    avatar: avatarHTML,
    gravity: "top",
    position: "center",
    className: "toast-notification",
    duration: 3000,
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
