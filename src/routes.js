import Doencas from "views/Doencas/Doencas.jsx";
import Pacientes from "views/Pacientes/Pacientes.jsx";
import Consultas from "views/Consultas/Consultas.jsx";
import Exames from "views/Exames/Exames.jsx";
import Usuarios from "views/Usuarios/Usuarios.jsx";
import Dashboard from "views/Dashboard.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/doencas",
    name: "Doenças",
    icon: "pe-7s-vector",
    component: Doencas,
    layout: "/admin"
  },
  {
    path: "/pacientes",
    name: "Pacientes",
    icon: "pe-7s-users",
    component: Pacientes,
    layout: "/admin"
  },
  {
    path: "/consultas",
    name: "Consultas",
    icon: "pe-7s-clock",
    component: Consultas,
    layout: "/admin"
  },
  {
    path: "/exames",
    name: "Exames",
    icon: "pe-7s-like",
    component: Exames,
    layout: "/admin"
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    icon: "pe-7s-users",
    component: Usuarios,
    layout: "/admin"
  },
];

export default dashboardRoutes;
