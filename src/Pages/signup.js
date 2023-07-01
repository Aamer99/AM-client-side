import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../AmLogo.png";
export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setErrors({ password: ["password not match"] });
    } else {
      const data = {
        name: name,
        email: email,
        password: password,
        phone_number: phoneNumber,
      };
      await axios
        .post("http://127.0.0.1:8000/api/v1/user/signup", data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          window.location = "/login";
        })
        .catch((err) => {
          setErrors(err.response.data.errors);
        });
    }
  };

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img className="mx-auto h-[250px] w-[250px]" src={logo} alt="logo" />
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create account
            </h1>

            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              className="w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              helperText={errors.name ? errors.name[0] : ""}
            />

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className="w-full"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              helperText={errors.email ? errors.email[0] : ""}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              className="w-full"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              helperText={errors.password ? errors.password[0] : ""}
            />
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              className="w-full"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.password}
              helperText={errors.password ? errors.password[0] : ""}
            />
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              className="w-full"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              error={errors.phone_number}
              helperText={errors.phone_number ? "Incorrect entry." : ""}
            />

            <div className="container  mx-0 min-w-full grid place-items-center">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 disabled:bg-gray-400 "
                onClick={handleSubmit}
                disabled={
                  name === "" ||
                  email === "" ||
                  password === "" ||
                  confirmPassword === "" ||
                  phoneNumber === ""
                }
              >
                Create an account
              </button>
            </div>
            <p className="text-sm font-light text-black ">
              Already have an account?
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 px-1"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
