import React,{useState, useEffect} from "react";
import axios from 'axios'
import { Link, Route, Redirect } from 'react-router-dom';

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
  solarChart,
  vipChart,
  contractorChart
} from "variables/charts.js";
import Popup from './popup'
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function SystemSettings() {
  const classes = useStyles();
  const access = localStorage.getItem('login');

   const [phases, setPhases] = useState('')
   const [defaultPhases, setDefaultPhases] = useState('6d')
    let [isOpen, setIsOpen] = useState(false)

  const [timer, setTimer] = useState(0)
  let events = ['fire','flood']
  let day1 = 1000 * 3600 * 24;
  let today = new Date();
  
  let date1= new Date("10/30/2020, 9:59:12")
  let date2= new Date().toLocaleString()
  

  useEffect(()=>{
    axios.get(`https://ruwassa.herokuapp.com/api/v1/phases`)
    .then(res=>{
     setPhases(res.data)
    }).catch(e=>{console.log(e)})
},[])

const togglePopup = (e) => {
 // setImg(e)
setIsOpen(!isOpen);
}

      if (access !== 'pass'){
       // return alert('nope')
        return <Redirect to='/login'></Redirect>
       };
   
   

const changPhase=(e)=>{
    setDefaultPhases(e.target.value)
}
  return (
    <div>
      <GridContainer>
      <GridItem xs={8} sm={8} md={2} >
  <a href='#/adduser'>      <Card chart>
            
            <CardBody>
  <h4 className={classes.cardTitle} >Add User </h4>                   
              
            
            </CardBody>
           
          </Card></a>
        </GridItem>
        <GridItem xs={8} sm={8} md={2} >
  <a href='#/addamin'>      <Card chart>
            
            <CardBody>
  <h4 className={classes.cardTitle} >Add Admin </h4>                   
              
            
            </CardBody>
           
          </Card></a>
        </GridItem>
  <GridItem xs={8} sm={8} md={2} >
  <a href='#/addphase'>      <Card chart>
            
            <CardBody>
  <h4 className={classes.cardTitle} >Add Phase </h4>                   
              
            
            </CardBody>
           
          </Card></a>
        </GridItem>
        

        <GridItem xs={8} sm={8} md={2} >
        <a href='#/updateprojects'>       <Card chart>
            <CardBody>
              <h4 className={classes.cardTitle}>Update project </h4>         
            
            </CardBody>
           
          </Card></a>
        </GridItem>

        <GridItem xs={8} sm={8} md={2} >
          <Card chart>
          <a href='#/updatereports'> 
            <CardBody>
              <h4 className={classes.cardTitle}>Update report</h4>            
            
            </CardBody>
            </a>
           </Card>
        </GridItem>

        <GridItem xs={8} sm={8} md={2} onClick={()=>{alert('Add admin')}}>
          <Card chart>
            
            <CardBody>
              <h4 className={classes.cardTitle}>set default phase</h4>           
            </CardBody>
           </Card>
        </GridItem>
        <GridItem>
        {isOpen && <Popup 
      content={<>
        <b>Design your Popup</b>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
             sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
               Duis aute irure dolor in reprehenderit in voluptate 
               velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
               non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <button>Test button</button>
      </>}
      handleClose={togglePopup}
    />}
        </GridItem>

      </GridContainer>
        </div>
  );
}
