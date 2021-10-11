/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People";
import Settings from "@material-ui/icons/Settings";


import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import ClosedReports from "./components/reports/closedreports";
import FollowupReports from "components/reports/followupreports";
import KDMap from "components/map/kdmap";
import Projects from "views/projects/projects";
import FunctionalityReports from "views/reports/functionality/functionalityreport";
import Reports from "views/reports/reports";
import ProjectsMap from "components/map/projectsMap";
import ContractorsList from "views/contractors/contractorslist";
import SupervisorsList from "views/supervisors/supervisors";
import Functionality from "views/reports/functionality/functionality";
import SystemSettings from "views/Settings";

let dashboardRoutes;
const dashboardRoutes1 = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },

  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: ProjectsMap,
    layout: "/admin"
  },
    {
    path: "/projects",
    name: "Projects",
    rtlName: "خرائط",
    icon: LibraryBooks,
    component: Projects,
    layout: "/admin"
  },
  {
    path: "/functionality",
    name: "Functionality",
    rtlName: "خرائط",
    icon: LibraryBooks,
    component: Functionality,
    layout: "/admin"
  },
  {
    path: "/reports",
    name: "Reports",
    rtlName: "خرائط",
    icon: LibraryBooks,
    component: Reports,
    layout: "/admin"
  },
  {
    path: "/contractors",
    name: "Contractors",
    rtlName: "خرائط",
    icon: LibraryBooks,
    component: ContractorsList,
    layout: "/admin"
  },
  { 
    path: "/users",
    name: "Supervisors",
    rtlName: "خرائط",
    icon: People,
    component: SupervisorsList,
    layout: "/admin"
  },
  { 
    path: "/setting",
    name: "Settings",
    rtlName: "خرائط",
    icon: Settings,
    component: SystemSettings,
    layout: "/admin"
  },
];
const dashboardRoutes2 = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Settings,
    component: DashboardPage,
    layout: "/admin"
  },

  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: ProjectsMap,
    layout: "/admin"
  },
    {
    path: "/projects",
    name: "Projects",
    rtlName: "خرائط",
    icon: LibraryBooks,
    component: Projects,
    layout: "/admin"
  },
  {
    path: "/functionalityy",
    name: "Functionality",
    rtlName: "خرائط",
    icon: LibraryBooks,
    component: Functionality,
    layout: "/admin"
  },
  {
    path: "/reports",
    name: "Reports",
    rtlName: "خرائط",
    icon: LibraryBooks,
    component: Reports,
    layout: "/admin"
  },
  {
    path: "/contractors",
    name: "Contractors",
    rtlName: "خرائط",
    icon: Notifications,
    component: ContractorsList,
    layout: "/admin"
  },
  
];
if( localStorage.getItem('acttype')=='superadmin'||localStorage.getItem('acttype')=='masteradmin'){
dashboardRoutes=dashboardRoutes1
}else{
  dashboardRoutes=dashboardRoutes2
}

export default dashboardRoutes;
