import React, { createRef, useEffect, useState } from "react";
import OTPInput from "otp-input-react";
import axios from "axios";
import { DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function OtpView(props) {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [otp, setOtp] = useState("");
  const [isOtpWrong, setIsOtpWrong] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otp_expired_date, setOtp_expired_date] = useState(
    props.otpExpiredDate
  );
  const [regenerateOtp, setRegenerateOtp] = useState(false);
  const [disabledRegenerateOtpBtn, setDisabledRegenerateOtpBtn] =
    useState(true);
  const [isResendNewOtp, setIsResendNewOtp] = useState(false);

  const diff_minutes = (date2, date1) => {
    var diff = (date2.getTime() - date1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  };

  const verifyOTP = async () => {
    setIsOtpWrong(false);
    setErrorMessage("");
    const data = {
      otp: otp,
      token: localStorage.getItem("otp_token"),
    };

    await axios
      .post("http://127.0.0.1:8000/api/v1/auth/verify-otp", data)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        localStorage.setItem("token", response.data.data.token);
        window.location = "/";
      })
      .catch((error) => {
        setIsOtpWrong(true);
        setErrorMessage(error.response.data.message);
      });
  };

  const resendOTP = async () => {
    const data = {
      token: localStorage.getItem("otp_token"),
    };

    await axios
      .post("http://127.0.0.1:8000/api/v1/auth/regenerate-otp", data)
      .then((response) => {
        setOtp_expired_date(response.data.data.data.expired_at);
        setRegenerateOtp(true);
        localStorage.setItem("otp_token", response.data.data.data.token);
      })
      .catch((error) => {
        setIsOtpWrong(true);
        setErrorMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    let second = 60;
    let minutes = diff_minutes(new Date(otp_expired_date), new Date()) - 1;
    setDisabledRegenerateOtpBtn(true);
    let interval = setInterval(() => {
      if (minutes === 0 && second === 0) {
        clearInterval(interval);

        if (!isResendNewOtp) {
          setDisabledRegenerateOtpBtn(false);
          setIsResendNewOtp(true);
        }
      } else {
        if (second == 0) {
          second--;
          minutes--;
          second = 60;
          setSeconds(second);
          setMinutes(minutes);
        } else {
          setMinutes(minutes);
          second--;
          setSeconds(second);
        }
      }
    }, 1000);
  }, [regenerateOtp]);

  return (
    <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-xl rounded-2xl">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton
          aria-label="close"
          onClick={props.handelOpenDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <div class="mx-auto flex w-full max-w-md flex-col space-y-12">
        <div class="flex flex-col items-center justify-center text-center space-y-2">
          <div class="font-semibold text-3xl">
            <p>OTP Verification</p>
          </div>
          <div class="flex flex-row text-sm font-medium text-gray-400">
            <p>We have sent a code to your email {props.email}</p>
          </div>
        </div>

        <div class="flex flex-row text-sm font-medium text-gray-700 m-t-5 text-center justify-center">
          <p>
            {minutes} Minutes : {seconds} Seconds
          </p>
        </div>

        <div>
          <div class="flex flex-col space-y-16">
            <dl class="flex flex-row items-center justify-between mx-auto w-full max-w-md">
              <OTPInput
                value={otp}
                onChange={setOtp}
                autoFocus
                OTPLength={6}
                otpType="number"
                inputStyles={{
                  borderRadius: "0.75rem",
                  borderWidth: "1px",
                  width: "50px",
                  height: "50px",
                  borderColor: isOtpWrong ? "red" : "black",
                }}
              />
            </dl>
          </div>
        </div>

        <div class=" font-medium text-red-700 text-center justify-center">
          <p>{errorMessage}</p>
        </div>

        <div class="flex flex-col space-y-5">
          <div>
            <button
              class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
              onClick={verifyOTP}
            >
              Verify
            </button>
          </div>

          <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
            <p>Didn't receive code?</p>
            <button
              class="flex flex-row items-center text-blue-600 disabled:text-gray-400"
              onClick={resendOTP}
              rel="noopener noreferrer"
              disabled={disabledRegenerateOtpBtn}
            >
              Resend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
