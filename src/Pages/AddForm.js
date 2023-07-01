import React, { useEffect } from "react";
import user from "../api/user";
import CreateForm from "../components/CreateForm";
import SideBar from "../components/sidebar.js";
import Home from "../components/sidebar.js";

export default function AddForm() {
  useEffect(() => {
    const getData = async () => {
      await user
        .myAccount()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            window.location = "/login";
          }
        });
    };
    getData();
  });
  return (
    <div>
      <SideBar currentDestination="Add Form" />
      <div class="p-4 sm:ml-64">
        <CreateForm />
      </div>
    </div>
  );
}
