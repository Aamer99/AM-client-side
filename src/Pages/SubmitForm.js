import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  FormControl,
  RadioGroup,
  FormLabel,
  Radio,
  Checkbox,
} from "@mui/material";
import Swal from "sweetalert2";

export default function SubmitForm() {
  const [fields, setFields] = useState([]);
  const form_id = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [selectValue, setSelectValue] = useState("");

  const handelSubmissions = (filed, id, index) => {
    console.log(filed);
    const item = {
      submission: filed.target.value,
      filed_name: filed.target.name,
      id: id,
    };

    const oldSubmissions = [...submissions];
    oldSubmissions[index - 1] = item;

    setSubmissions(oldSubmissions);
    console.log(submissions);
  };

  const submit = async () => {
    const data = {
      form_id: form_id.id,
      content: submissions,
    };

    await axios
      .post("http://127.0.0.1:8000/api/v1/user/form/submit", data)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Your form has been submitted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 600);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "sorry please try again",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 600);
      });
  };
  useEffect(() => {
    const getFrom = async () => {
      const id = form_id.id;
      await axios
        .get(`http://127.0.0.1:8000/api/v1/user/form/${id}`)
        .then((response) => {
          setFields(response.data.data.form.content);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getFrom();
  }, []);
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <div class="flex-row justify-center py-10 w-1/2">
          {fields.map((field, index) => (
            <div class="mb-6">
              {field.type === "text" && (
                <div>
                  <label
                    className={`block mb-2 text-sm font-medium ${field.style.algin}`}
                    style={{ color: field.style.color }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.style.dataFormat}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent "
                    key={index}
                    onChange={(e) => handelSubmissions(e, field.id, index)}
                    name={field.label}
                  />
                </div>
              )}

              {field.type === "textarea" && (
                <div>
                  <label
                    className={`block mb-2 text-sm font-medium ${field.style.algin}`}
                    style={{ color: field.style.color }}
                  >
                    {field.label}
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    key={index}
                    onChange={(e) => {
                      handelSubmissions(e, field.id, index);
                    }}
                    name={field.label}
                  ></textarea>
                </div>
              )}
              {field.type === "label" && (
                <div>
                  <label
                    className={`block mb-2 text-sm font-medium ${field.style.algin}`}
                    style={{ color: field.style.color }}
                  >
                    {field.label}
                  </label>
                </div>
              )}

              {field.type === "radio" && (
                <div>
                  <FormControl>
                    <FormLabel
                      className={`block mb-2 text-sm font-medium ${field.style.algin}`}
                      style={{ color: field.style.color }}
                    >
                      {field.label}
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      key={index}
                      onChange={(e) => handelSubmissions(e, field.id, index)}
                      name={field.label}
                    >
                      {field.option.map((option, index) => (
                        <FormControlLabel
                          value={option.value}
                          control={<Radio />}
                          label={option.title}
                          key={index}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              )}

              {field.type === "checkbox" && (
                <div>
                  <FormControl>
                    <FormLabel
                      className={`block mb-2 text-sm font-medium ${field.style.algin}`}
                      style={{ color: field.style.color }}
                    >
                      {field.label}
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      key={index}
                    >
                      {field.option.map((option, index) => (
                        <FormControlLabel
                          value={option.value}
                          control={<Checkbox />}
                          label={option.title}
                          labelPlacement={option.title}
                          onClick={(e) => handelSubmissions(e, field.id, index)}
                          name={field.label}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              )}

              {field.type === "dropdown" && (
                <div>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-simple-select-label">
                      {field.label}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={field.label}
                      key={index}
                      onChange={(e) => {
                        handelSubmissions(e, field.id, index);
                      }}
                      name={field.label}
                      value={selectValue}
                    >
                      {field.option.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                          {option.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
            </div>
          ))}

          <Button variant="contained" disableElevation onClick={() => submit()}>
            Submit Form
          </Button>
        </div>
      </Grid>
    </div>
  );
}
