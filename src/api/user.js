import { HTTP } from "./axios";

export default {
  myAccount() {
    return HTTP.get("user/my-account");
  },
};
