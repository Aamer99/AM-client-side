import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import Swal from "sweetalert2";
import auth from "../api/auth";

export default function SideBar(props) {
  const logout = async () => {
    Swal.fire({
      title: "Are you sure You Want to logout?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      auth
        .logout()
        .then((response) => {
          Swal.fire("Success!", "", "success");
          setTimeout(() => {
            window.location = "/login";
            localStorage.clear();
          }, 600);
        })
        .catch((error) => {
          Swal.fire("Error!", "Please Try again", "error");
        });
    });
  };
  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200 ">
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="/"
              className={`flex items-center p-2 text-gray-900 rounded-lg ${
                props.currentDestination === "Home" && "bg-gray-500"
              }
              } `}
            >
              <HomeIcon />
              <span className="ml-3">Home</span>
            </a>
          </li>

          <li>
            <a
              href="/add-form"
              className={`flex items-center p-2 text-gray-900 rounded-lg ${
                props.currentDestination === "Add Form" && "bg-gray-500"
              }
              } `}
            >
              <PostAddIcon />
              <span className="flex-1 ml-3 whitespace-nowrap">Add Form</span>
            </a>
          </li>
          <li>
            <a
              href="/my-account"
              className={`flex items-center p-2 text-gray-900 rounded-lg ${
                props.currentDestination === "My Account" && "bg-gray-500"
              }
              } `}
            >
              <PersonIcon />
              <span className="flex-1 ml-3 whitespace-nowrap">My Account</span>
            </a>
          </li>
          <li>
            <button
              onClick={() => logout()}
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-500 "
            >
              <LogoutIcon />
              <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
