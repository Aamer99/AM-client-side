import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/login";
import Signup from "./Pages/signup";

import AddForm from "./Pages/AddForm";
import Home from "./Pages/home";
import FormDetails from "./Pages/Submissions";
import MyAccount from "./Pages/MyAccount";
import EditForm from "./Pages/FormEdit";
import SubmitForm from "./Pages/SubmitForm";
function App() {
  return (
    <Routes>
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/" exact element={<Home />} />
      <Route path="/add-form" exact element={<AddForm />} />
      <Route path="/form-details/:id" exact element={<FormDetails />} />
      <Route path="/my-account" exact element={<MyAccount />} />
      <Route path="/form/edit/:id" exact element={<EditForm />} />
      <Route path="form/submit/:id" exact element={<SubmitForm />} />
    </Routes>
  );
}

export default App;
