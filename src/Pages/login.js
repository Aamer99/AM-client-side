import { Dialog, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OtpView from "../components/OtpView";
import logo from "../AmLogo.png";
export default function Login() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [otpExpiredDate, setOtpExpiredDate] = useState("");

  const handleSubmit = async () => {
    const data = {
      email: email,
      password: password,
    };
    await axios
      .post("http://127.0.0.1:8000/api/v1/auth/login", data)
      .then((response) => {
        console.log(response.data.data.data);

        localStorage.setItem("otp_token", response.data.data.data.token);
        setOpenDialog(true);
        setOtpExpiredDate(response.data.data.data.expired_at);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const handelOpenDialog = () => {
    setOpenDialog(false);
  };
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img className="mx-auto h-[250px] w-[250px]" src={logo} alt="logo" />
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Welcome Back!!
            </h1>

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className="w-full"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              // helperText={errors.email ? errors.email[0] : ""}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              className="w-full"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}
              helperText={error ? error : ""}
            />

            <div className="container  mx-0 min-w-full grid place-items-center">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center w-1/2 mr-2 mb-2 disabled:bg-gray-400 "
                onClick={handleSubmit}
                disabled={email === "" || password === ""}
              >
                Login
              </button>
            </div>
            <p className="text-sm font-light text-black ">
              You Don't have an account?
              <Link
                to="/signup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 px-1"
              >
                Signup
              </Link>
            </p>

            <Dialog open={openDialog}>
              <OtpView
                email={email}
                otpExpiredDate={otpExpiredDate}
                handelOpenDialog={handelOpenDialog}
              />
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
