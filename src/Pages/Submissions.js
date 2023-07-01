import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import GetAppIcon from "@mui/icons-material/GetApp";
import { CSVLink } from "react-csv";
import axios from "axios";
import { useParams } from "react-router-dom";
import form from "../api/form";
export default function Submissions() {
  const params = useParams();
  const [DataHeaders, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await form
        .getSubmissionsData(params.id)
        .then((response) => {
          setData(response.data.data);

          if (response.data.data.length) {
            setHeaders(response.data.data[0].content);
          }
          const csvData = [
            DataHeaders.map((data) => [data.filed_name]),
            ...data.map((item) =>
              item.content.map((content) => [content.submission])
            ),
          ];
          setCsvData(csvData);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  return (
    <div className="p-12">
      <SideBar currentDestination="Home" />
      <div className="p-4 sm:ml-64">
        <p className="font-sans font-bold text-lg">Submissions</p>
        {data && (
          <>
            {data.length > 0 && (
              <div class="relative overflow-x-auto ">
                <div class="flex items-center  w-full h-20">
                  <div className="absolute top-0 right-0">
                    <CSVLink data={csvData}>
                      <button
                        class="inline-flex items-center  bg-white border border-gray-300  hover:bg-gray-100  font-medium rounded-lg text-sm px-3 py-1.5"
                        type="button"
                      >
                        <GetAppIcon />
                        Export
                      </button>
                    </CSVLink>
                  </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 shadow-md sm:rounded-lg ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" className="p-4"></th>
                      {DataHeaders.map((filed) => (
                        <th scope="col" className="px-6 py-3">
                          {filed.filed_name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr className="bg-white border-b ">
                        <th scope="col" className="p-4">
                          {index + 1}
                        </th>
                        {item.content.map((data) => (
                          <th scope="col" className="px-6 py-3">
                            {data.submission}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
