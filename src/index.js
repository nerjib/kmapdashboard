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
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect, HashRouter } from "react-router-dom";
import "assets/css/material-dashboard-react.css?v=1.9.0";
// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
//import Reports from 'components/reports/reports'
import DraftDetails from 'components/reports/DraftDetails'
import FollowupReports from "components/reports/followupreports";
import FollowupList from "components/reports/followuplist";
import ClosedReports from "components/reports/closedreports";
import FollowupDetails from "components/reports/followupdetails";
import IncidentMap from "components/map/incidents";
import KDMap from "components/map/kdmap";
import ReportsByLGA from "components/reports/reportsbylga";
import Login from "views/Auth/login";
import SignOut from "views/Auth/signout";
import Projects from "views/projects/projects";
import ProjectDetails from "views/projects/projectdetails";
import ReportDetails from "views/reports/reportdetails";
import WeeklyReportDetails from "views/reports/weeklyreports";
import WatReports from "views/reports/mon/watmonreports";
import SolarEvalReports from "views/reports/mon/solrmon";
import SanEvalReports from "views/reports/mon/sanmonreports";
import FunctionalityDetails from "views/reports/functionality/functionalitydetails";
import FunctionalityReports from "views/reports/functionality/functionalityreport";
import Reports from "views/reports/reports";
import SiteMap from "components/map/sitemap";
import ContractorProjects from "views/contractors/contractorProjects";
import AllContractors from "views/contractors/allcontractors";
import addcontractor from "views/contractors/addcontractor";
import InsertProject from "views/projects/addprojects";
import UpdateProject from "views/projects/updateproject";
import SupervisorsList from "views/supervisors/supervisors";
import Allusers from "views/supervisors/allsupervisors";
import AddSupervisor from "views/supervisors/adduser";
import UpdateSupervisor from "views/supervisors/updateuser";
import SupervisorDetails from "views/supervisors/userdetails";
import Functionality from "views/reports/functionality/functionality";
import Settings from "views/Settings/index";
import addPhase from "views/Settings/addPhase";
import updateProjects from "views/Settings/updateProjects";





const hist = createBrowserHistory();

ReactDOM.render(
  <HashRouter history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/projects" exact component={Projects} />
      <Route path="/projects/:id" exact component={ProjectDetails} />
      <Route path="/reports/:id" exact component={ReportDetails} />
      <Route path="/weeklyreportdetails/:id" exact component={WeeklyReportDetails} />
      <Route path="/waterevalreport/:id" exact component={WatReports} />
          <Route path="/solarevalreport/:id" exact component={SolarEvalReports} />
          <Route path="/sanevalreport/:id" exact component={SanEvalReports} />
          <Route path="/functionalitydetails/:id" exact component={FunctionalityDetails} />
          <Route path="/functionalitydetails/:id"  component={FunctionalityDetails}/>
          <Route path="/reports"  component={Reports}/>
          <Route path="/sitemap/:id"  component={SiteMap}/>
          <Route path="/contractor/:phase/:cid"  component={ContractorProjects}/>
          <Route path="/allcontractors"  component={AllContractors}/>
          <Route path="/addcontractor"  component={addcontractor}/>
          <Route path="/addproject"  component={InsertProject}/>
          <Route path="/updateproject/:id"  component={UpdateProject}/>
          <Route path="/supervisors"  component={SupervisorsList}/>
          <Route path="/allusers"  component={Allusers}/>
          <Route path="/adduser"  component={AddSupervisor}/>
          <Route path="/functionality"  component={Functionality}/>

          <Route path="/edituser/:id"  component={UpdateSupervisor}/>
          <Route path="/user/:id"  component={SupervisorDetails}/>
          <Route path="/settings"  component={Settings}/>
          <Route path="/addphase"  component={addPhase}/>
          <Route path="/updateprojects"  component={updateProjects}/>




          






      <Route path="/draft/:id" exact component={DraftDetails} />
      <Route path="/followup" exact component={FollowupReports} />
      <Route path="/draft/followup/:action/:id" exact component={FollowupList} />
      <Route path="/closedreports" exact component={ClosedReports} />
      <Route path="/followup/:id" exact component={FollowupDetails} />
      <Route path="/incidentmap/:id" exact component={IncidentMap} />
      <Route path="/kdmap" exact component={KDMap} />
      <Route path="/reportsbylga/:id" exact component={ReportsByLGA} />
      <Route path="/login" exact component={Login} />
      <Route path="/signout" exact component={SignOut} />



     {//} <Route path="/rtl" component={RTL} />
      } <Redirect from="/" to="/login" />

    </Switch>

  </HashRouter>,
  document.getElementById("root")
);
