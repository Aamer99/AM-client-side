import { HTTP } from "./axios";

export default {
  getSubmissionsData(form_id) {
    return HTTP.get(`user/form/submissions/${form_id}`);
  },

  createForm(data) {
    return HTTP.post("user/form", data);
  },

  getMyForms() {
    return HTTP.get("user/my-forms");
  },
  getOneForm(id) {
    return HTTP.get(`user/form/${id}`);
  },
  editForm(data, id) {
    console.log(id);
    return HTTP.put(`user/form/${id}`, data);
  },
};
