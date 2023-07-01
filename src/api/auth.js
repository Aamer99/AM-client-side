import axios from "axios";
import { HTTP } from "./axios";

export default {
  resetPassword(data) {
    return HTTP.post("auth/reset-password", data);
  },

  logout() {
    return HTTP.post("auth/logout");
  },
};
