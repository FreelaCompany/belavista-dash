import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function notify(type, message) {
  if (type === "error") {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  if (type === "success") {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastsuccess",
      bodyClassName: "bodytoast",
    });
  }
}

export { notify };
