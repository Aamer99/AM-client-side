import { TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import auth from "../api/auth";
import user from "../api/user";
import SideBar from "../components/sidebar";

export default function MyAccount() {
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

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handelResetPassword = async () => {
    setErrors([]);
    const data = {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: confirmPassword,
    };

    await auth
      .resetPassword(data)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Your password has been reset successfully",
          text: "The system logged you out. You need to login again.",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          localStorage.clear();
          window.location = "/login";
        }, 600);
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
        if (error.response.status === 401) {
          window.location = "/login";
        }
      });
  };

  return (
    <div>
      <SideBar currentDestination="My Account" />
      <div className="p-4 sm:ml-64">
        <div className="relative max-w-md mx-auto md:max-w-2xl  min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full flex justify-center">
                <div className="relative">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                  />
                </div>
              </div>
              <div className="w-full text-center mt-20">
                <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                  <div className="p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                      3
                    </span>
                    <span className="text-sm text-slate-400">Forms</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-2">
              <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
                Mike Thompson
              </h3>
              <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                mike@gemail.com
              </div>
            </div>
            <div className="mt-6 py-6 border-t border-slate-200 text-start">
              <h6 className="text-xl text-slate-700 font-mono  leading-normal mb-1">
                Reset Password:
              </h6>
              <TextField
                id="outlined-basic"
                label="Current Password"
                variant="outlined"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={{ width: "80%", margin: "20px" }}
                error={errors.current_password}
                helperText={errors.current_password && errors.current_password}
              />
              <TextField
                id="outlined-basic"
                label="New Password"
                variant="outlined"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ width: "80%", margin: "20px" }}
                error={errors.password}
                helperText={errors.password && errors.password}
              />
              <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                type="password"
                style={{ width: "80%", margin: "20px" }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.password}
                helperText={errors.password && errors.password}
              />

              <Button
                variant="contained"
                color="success"
                style={{ margin: "10px", width: "150px" }}
                onClick={handelResetPassword}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
