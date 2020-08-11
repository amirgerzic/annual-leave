import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import CreateUser from "views/CreateUser.jsx";
import TableList from "views/TableList.jsx";
import UserTableList from "views/UsersTableList.jsx";
import Notifications from "views/Notifications.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Request a leave",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/user"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/createUser",
    name: "Create User",
    icon: "pe-7s-user",
    component: CreateUser,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/hr"
  },
  {
    path: "/userTable",
    name: "User Table List",
    icon: "pe-7s-note2",
    component: UserTableList,
    layout: "/hr"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/hr"
  }
];

export default dashboardRoutes;
