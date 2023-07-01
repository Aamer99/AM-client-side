import React, { useEffect, useState } from "react";
import form from "../api/form";
import SideBar from "../components/sidebar";

export default function Home() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    async function getData() {
      form
        .getMyForms()
        .then((response) => {
          setForms(response.data.data.forms);
          console.log(forms);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            window.location = "/login";
          }
        });
    }
    getData();
  }, []);
  return (
    <div>
      <SideBar currentDestination="Home" />
      <div className="p-4 sm:ml-64">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Submissions
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form, index) => (
                <tr
                  className="bg-white border-b  hover:bg-gray-200"
                  onClick={() =>
                    (window.location = `/form-details/${form._id}`)
                  }
                >
                  <th scope="row" className="px-6 py-4 ">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{form._id}</td>
                  <td className="px-6 py-4">{form.form_name}</td>
                  <td className="px-6 py-4">12</td>
                  <td className="px-6 py-4">
                    <a
                      href={`form/edit/${form._id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
