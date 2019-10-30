import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/pacientes",
    name: "Pacientes",
    icon: "pe-7s-users",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/consultas",
    name: "Consultas",
    icon: "pe-7s-clock",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/exames",
    name: "Exames",
    icon: "pe-7s-like",
    component: Typography,
    layout: "/admin"
  }
];

export default dashboardRoutes;
