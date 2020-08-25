import Dashboard from "views/Dashboard.jsx";
import UserList from "views/UserList.jsx";
import CreateUser from "views/CreateUser.jsx";
import RequestTable from "views/RequestTable.jsx";
import Requests from "views/Requests.jsx";
import EmployeeTable from "views/EmployeeTable.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Request a leave",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/user"
  },
  {
    path: "/createUser",
    name: "Create User",
    icon: "pe-7s-user",
    component: CreateUser,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User List",
    icon: "pe-7s-user",
    component: UserList,
    layout: "/admin"
  },
  {
    path: "/requestTable",
    name: "Request List",
    icon: "pe-7s-note2",
    component: RequestTable,
    layout: "/hr"
  },
  {
    path: "/request",
    name: "Request List",
    icon: "pe-7s-note2",
    component: Requests,
    layout: "/user"
  },
  {
    path: "/employeeTable",
    name: "Employee List",
    icon: "pe-7s-note2",
    component: EmployeeTable,
    layout: "/hr"
  }
];

export default dashboardRoutes;
