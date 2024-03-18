import { toast } from "react-toastify";

export const errorHandler = (e) => {
  if (e.response && e.response.data && e.response.data.message) {
    toast.error(e.response.data.message);
  }
};
