import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import form from "../api/form";

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
import { v4 as uuidv4 } from "uuid";

import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OutlinedInput from "@mui/material/OutlinedInput";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { addFieldList } from "../data/AddFieldList";
import { defaultChoices, TextAlign } from "../data/style";

import Swal from "sweetalert2";
import SideBar from "../components/sidebar";

export default function EditForm() {
  const form_id = useParams();
  const [formInfo, setFormInfo] = useState([]);
  const [fields, setFields] = useState([]);

  //   const [fields, setFields] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [selectedFieldLabel, setSelectedFieldLabel] = useState("");
  const [selectedFieldColor, setSelectedFieldColor] = useState("");
  const [selectedFieldAlgin, setSelectedFieldAlgin] = useState("");
  const [selectedFieldDataFormat, setSelectedFieldDataFormat] = useState("");
  const [selectedFieldChoice, setSelectedFieldChoice] = useState([]);
  const [formName, setFormName] = useState("");

  const publishForm = async () => {
    const data = {
      submission_limit: 10,
      content: fields,
      form_name: formName,
    };
    form
      .editForm(data, form_id.id)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Your form has been published successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location = "/";
        }, 600);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addNewFiled = (item) => {
    let uuid = uuidv4();

    switch (item.title) {
      case "TEXT CONTENT":
        setFields((oldArray) => [
          ...oldArray,
          {
            id: uuid,
            label: "TEXT CONTENT",
            type: item.type,
            style: {
              color: "black",
              algin: "left",
            },
          },
        ]);
        break;
      case "SHORT ANSWER":
        setFields((oldArray) => [
          ...oldArray,
          {
            id: uuid,
            label: "SHORT ANSWER",
            type: item.type,
            style: {
              color: "black",
              algin: "left",
            },
          },
        ]);
        break;
      case "LONG ANSWER":
        setFields((oldArray) => [
          ...oldArray,
          {
            id: uuid,
            label: "LONG ANSWER",
            type: item.type,
            style: {
              color: "black",
              algin: "left",
            },
          },
        ]);
        break;
      case "SINGLE CHOICE":
        setFields((oldArray) => [
          ...oldArray,
          {
            id: uuid,
            label: "LONG ANSWER",
            type: item.type,
            option: defaultChoices,
            style: {
              color: "black",
              algin: "left",
            },
          },
        ]);
        console.log(fields);
        break;
      case "MULTIPLE CHOICE":
        setFields((oldArray) => [
          ...oldArray,
          {
            id: uuid,
            label: "MULTIPLE CHOICE",
            type: item.type,
            option: defaultChoices,
            style: {
              color: "black",
              algin: "left",
            },
          },
        ]);
        break;
      case "DROPDOWN":
        setFields((oldArray) => [
          ...oldArray,
          {
            id: uuid,
            label: "DROPDOWN",
            type: item.type,
            option: defaultChoices,
          },
        ]);
        break;
    }
  };

  const deleteFields = (filed) => {
    const fieldRemoved = fields.filter((item) => item.id !== filed.id);

    setFields(fieldRemoved);
    setOpenDrawer(false);
    setSelectedField("");
  };

  const duplicateField = (filed) => {
    setFields((oldFields) => [...oldFields, filed]);
    setOpenDrawer(false);
    setSelectedField("");
  };

  const handelChoices = (value) => {
    // const update = defaultChoices.map((choice, index) => {
    //   if (choice.id == value.id) {
    //     return {
    //       ...choice,
    //       title: value.title,
    //       value: value.value,
    //     };
    //   } else {
    //     setSelectedFieldChoice((oldArray) => [
    //       ...oldArray,
    //       {
    //         id: index,
    //         title: value.title,
    //         value: value.vale,
    //       },
    //     ]);
    //   }
    //   return choice;

    // });
    defaultChoices.map((choice, index) => {
      if (choice.id == value.id) {
        console.log("choices");
      }
    });
    // setSelectedFieldChoice(update);
  };
  const handleEditOnFiled = () => {
    const editFiled = fields.map((field) => {
      if (field.id === selectedField.id) {
        if (field.type === "text") {
          return {
            ...field,
            label: selectedFieldLabel,
            style: {
              color: selectedFieldColor,
              algin: selectedFieldAlgin,
              dataFormat: selectedFieldDataFormat,
            },
          };
        }
        if (
          field.type === "radio" ||
          field.type === "checkbox" ||
          field.type === "dropdown"
        ) {
          return {
            ...field,
            label: selectedFieldLabel,
            style: {
              color: selectedFieldColor,
              algin: selectedFieldAlgin,
              option: selectedFieldChoice,
            },
          };
        }
        return {
          ...field,
          label: selectedFieldLabel,
          style: {
            color: selectedFieldColor,
            algin: selectedFieldAlgin,
          },
        };
      }
      return field;
    });

    setFields(editFiled);
    setSelectedField("");
    setSelectedFieldAlgin("");
    setSelectedFieldColor("");
    setSelectedFieldLabel("");
    setSelectedFieldDataFormat("");
    setOpenDrawer(false);
  };

  const createdDate = () => {
    const today = new Date();

    const date =
      today.getDate() +
      " " +
      today.toLocaleString("default", { month: "long" }) +
      " " +
      today.getFullYear() +
      " at " +
      today.getHours() +
      ":" +
      today.getMinutes();
    return date;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrag = (e, type, name) => {
    e.dataTransfer.setData("field_type", type);
    e.dataTransfer.setData("field_name", name);
  };
  const handleOnDrop = (e) => {
    const field_type = e.dataTransfer.getData("field_type");
    const field_name = e.dataTransfer.getData("field_name");

    if (
      field_name === "SINGLE CHOICE" ||
      field_name === "MULTIPLE CHOICE" ||
      field_name === "DROPDOWN"
    ) {
      setFields((oldArray) => [
        ...oldArray,
        {
          label: field_name,
          type: field_type,
          option: defaultChoices,
          style: {
            color: "black",
            algin: "left",
          },
        },
      ]);
    } else if (field_name === "SHORT ANSWER") {
      setFields((oldArray) => [
        ...oldArray,
        {
          label: field_name,
          type: field_type,
          style: {
            color: "black",
            algin: "left",
            dataFormat: "text",
          },
        },
      ]);
    } else {
      setFields((oldArray) => [
        ...oldArray,
        {
          label: field_name,
          type: field_type,
          style: {
            color: "black",
            algin: "left",
          },
        },
      ]);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await form
        .getOneForm(form_id.id)
        .then((response) => {
          console.log(response.data.data.form.content);
          setFields(response.data.data.form.content);
          setFormInfo(response.data.data.form);
          setFormName(response.data.data.form.form_name);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            window.location = "/login";
          }
        });
    };
    getData();
  }, []);
  return (
    <div>
      <SideBar currentDestination="Home" />
      <div class="p-4 sm:ml-64">
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid md={10}>
            <div class="flex items-center justify-between top-0 m-1 ">
              <div class="min-w-0 flex-1">
                <input
                  type="text"
                  class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
                  value={formName}
                  placeholder="Enter a name for the form"
                  onChange={(e) => setFormName(e.target.value)}
                />

                <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                  <div class="mt-2 flex items-center text-sm text-gray-500">
                    <CalendarTodayIcon className="w-2 h-2" />
                    Updated on {createdDate()}
                  </div>
                </div>
              </div>
              <div class="mt-5 flex lg:ml-4 lg:mt-0">
                <span class="sm:ml-3">
                  <button
                    type="button"
                    class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => publishForm()}
                  >
                    <svg
                      class="-ml-0.5 mr-1.5 h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Republish
                  </button>
                </span>
              </div>
            </div>

            {/* Form Dashboard */}
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              {fields.length === 0 && (
                <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
                  <h1>
                    To add fields please drag and drop or click on the button
                    that inside the Add Fields list
                  </h1>
                </Box>
              )}
              <div
                class="flex-row justify-center py-10 w-1/2"
                onDrop={handleOnDrop}
                onDragOver={handleDragOver}
              >
                {fields.map((field, index) => (
                  <div class="mb-6">
                    {field.type === "text" && (
                      <div
                        className="hover:bg-gray-50 p-2 hover:border-r-4 "
                        onClick={() => {
                          setOpenDrawer(true);
                          setSelectedField(field);
                        }}
                      >
                        <label
                          className={`block mb-2 text-sm font-medium ${field.style.algin}`}
                          style={{ color: field.style.color }}
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.style.dataFormat}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent "
                        />
                      </div>
                    )}

                    {field.type === "textarea" && (
                      <div
                        className="hover:bg-gray-50 p-2 hover:border-r-4 "
                        onClick={() => {
                          setOpenDrawer(true);
                          setSelectedField(field);
                        }}
                      >
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
                          placeholder="Write your thoughts here..."
                        ></textarea>
                      </div>
                    )}
                    {field.type === "label" && (
                      <div
                        className="hover:bg-gray-50 p-2 hover:border-r-4 "
                        onClick={() => {
                          setOpenDrawer(true);
                          setSelectedField(field);
                        }}
                      >
                        <label
                          className={`block mb-2 text-sm font-medium ${field.style.algin}`}
                          style={{ color: field.style.color }}
                        >
                          {field.label}
                        </label>
                      </div>
                    )}

                    {field.type === "radio" && (
                      <div
                        className="hover:bg-gray-50 p-2 hover:border-r-4 "
                        onClick={() => {
                          setOpenDrawer(true);
                          setSelectedField(field);
                        }}
                      >
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
                            name="row-radio-buttons-group"
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
                      <div
                        className="hover:bg-gray-50 p-2 hover:border-r-4 "
                        onClick={() => {
                          setOpenDrawer(true);
                          setSelectedField(field);
                        }}
                      >
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
                            name="row-radio-buttons-group"
                          >
                            {field.option.map((option, index) => (
                              <FormControlLabel
                                value={option.value}
                                control={<Checkbox />}
                                label={option.title}
                                labelPlacement={option.title}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </div>
                    )}

                    {field.type === "dropdown" && (
                      <div
                        className="hover:bg-gray-50 p-2 hover:border-r-4 "
                        onClick={() => {
                          setOpenDrawer(true);
                          setSelectedField(field);
                        }}
                      >
                        <FormControl sx={{ m: 1, width: 300 }}>
                          <InputLabel id="demo-simple-select-label">
                            {field.label}
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={field.label}
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
                {fields.length != 0 && (
                  <Button variant="contained" disableElevation>
                    Submit Form
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
          <Grid md={2}>
            <aside
              className="fixed top-0  z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
              aria-label="Sidebar"
            >
              <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200 ">
                <h1 className="text-center text-lg">ADD FIELDS </h1>
                <Divider />
                <div className="text-center justify-center m-2">
                  {addFieldList.map((item, index) => (
                    <div
                      onClick={(e) => addNewFiled(item)}
                      draggable
                      onDragStart={(e) =>
                        handleOnDrag(e, item.type, item.title)
                      }
                      name={item.title}
                    >
                      <h5 className="w-full border-2 border-stone-300 p-2 my-2 ">
                        {item.icon}
                        {item.title}
                      </h5>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </Grid>
        </Grid>

        <Drawer anchor="right" open={openDrawer}>
          <Box
            role="presentation"
            // onClick={setOpenDrawer(false)}
            // onKeyDown={setOpenDrawer(false)}
            sx={{
              width: 300,
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ padding: "10px" }}
                >
                  {selectedField.label}
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={() => setOpenDrawer(false)}
                  sx={{
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid>
                <Divider variant="middle" />
              </Grid>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="outlined"
                  color="error"
                  style={{ width: "200px", margin: "10px" }}
                  onClick={() => deleteFields(selectedField)}
                >
                  Delate
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ width: "200px", marginBottom: "10px" }}
                  onClick={() => duplicateField(selectedField)}
                >
                  Duplicate
                </Button>

                <Accordion style={{ width: "100%", margin: "1px" }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>TEXT</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      id="outlined-basic"
                      label="Label"
                      variant="outlined"
                      style={{ width: "100%", margin: "1px" }}
                      value={selectedFieldLabel}
                      onChange={(e) => setSelectedFieldLabel(e.target.value)}
                    />
                  </AccordionDetails>
                </Accordion>

                {selectedField.type != "dropdown" && (
                  <Accordion style={{ width: "100%", margin: "1px" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>OPTIONS</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        style={{ margin: "5px" }}
                      >
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900 m-1"
                        >
                          Color:
                        </label>
                        <input
                          type="color"
                          value={selectedFieldColor}
                          onChange={(e) => {
                            setSelectedFieldColor(e.target.value);
                          }}
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "none",
                            overflow: "hidden",
                            backgroundColor: "none",
                          }}
                        />
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        style={{ margin: "5px" }}
                      >
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900 m-1"
                        >
                          Algin:
                        </label>
                        <Select
                          style={{ width: "60%" }}
                          onChange={(e) =>
                            setSelectedFieldAlgin(e.target.value)
                          }
                        >
                          {TextAlign.map((item, index) => (
                            <MenuItem value={item.value} key={index}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      {/* short answer  */}

                      {selectedField.type === "text" && (
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          style={{ margin: "5px" }}
                        >
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium leading-6 text-gray-900 m-1"
                          >
                            Data Format:
                          </label>
                          <Select
                            style={{ width: "60%" }}
                            onChange={(e) =>
                              setSelectedFieldDataFormat(e.target.value)
                            }
                          >
                            <MenuItem value="text"> Text </MenuItem>
                            <MenuItem value="email"> Email </MenuItem>
                            <MenuItem value="number"> Number </MenuItem>
                            <MenuItem value="password"> Password </MenuItem>
                          </Select>
                        </Grid>
                      )}

                      {/* long answer  */}
                      {selectedField.type === "textarea" && (
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          style={{ margin: "5px" }}
                        >
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium leading-6 text-gray-900 m-1"
                          >
                            Input height in rows:
                          </label>
                          <TextField type="number" style={{ width: "40%" }} />
                        </Grid>
                      )}
                    </AccordionDetails>
                  </Accordion>
                )}

                {(selectedField.type === "radio" ||
                  selectedField.type === "checkbox" ||
                  selectedField.type === "dropdown") && (
                  <Accordion style={{ width: "100%", margin: "1px" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography> EDIT CHOICES</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        {defaultChoices.map((item, i) => (
                          <>
                            <input
                              key={item.id}
                              className="w-10/12 border-2 border-stone-300 p-2 my-2 "
                              value={selectedFieldChoice}
                              name={item.title}
                              onChange={(e) =>
                                handelChoices((item) => [
                                  ...item,
                                  e.target.value,
                                ])
                              }
                            />
                            <IconButton aria-label="delete">
                              <DeleteIcon color="red" />
                            </IconButton>
                          </>
                        ))}
                      </Grid>
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ width: "200px", marginBottom: "10px" }}
                      >
                        Add Choice
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Grid>
            </Grid>
            <div class="relative h-32 w-full text-center justify-center">
              <div class="absolute inset-x-0 bottom-0 h-16 justify-center items-center">
                <Button
                  variant="contained"
                  color="success"
                  style={{ width: "200px" }}
                  onClick={handleEditOnFiled}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Box>
        </Drawer>
      </div>
    </div>
  );
}
