import React,{useState, useEffect} from "react";
import axios from 'axios'
import { Link, Route, Redirect } from 'react-router-dom';

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";

import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
  solarChart,
  vipChart,
  contractorChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const access = localStorage.getItem('login');

    const [allhpbh, setAllhpbh]= useState([])
    const [allsmbh, setAllsmbh]= useState([])
    const [allflbh, setAllflbh]= useState([])
    const [allvip, setAllvip]= useState([])
    const [status, setStatus] = useState([])
    const [phase, setPhase] = useState('6d')
    const [phaseData, setPhaseData] = useState('')
    const [contractors, setContractors] = useState('')
    let [cpage, setCpage] = useState(1);
    let [dataPerPage, setDataPerPage] = useState(20)
    let [phasesView, setPhasesView] = useState('none')
    let [moreView, setMoreView] = useState('none')
    let [moreOptionView, setMoreOptionView] = useState('')
    const [phasesData, setPhasesData]=useState([])
    const [userType, setUserType]= useState( localStorage.getItem('acttype'))
  
    
  const [timer, setTimer] = useState(0)
  let events = ['fire','flood']
  let day1 = 1000 * 3600 * 24;
  let today = new Date();
  
  let date1= new Date("10/30/2020, 9:59:12")
  let date2= new Date().toLocaleString()
  let difftime= date2- date1
  let diffdate = Math.round((today.getTime() - date1.getTime())/day1).toFixed(0)
  let diffdate1 =(today.getTime() - date1.getTime())/day1
  
  const handleTimer = () =>{
  //this.inInterval2= setInterval( ()=>this.tick2(), 1000);
      setInterval(
        () => setTimer(new Date().toLocaleString()),
        1000
      )};
      useEffect(()=>handleTimer(),[])

      useEffect(()=>handleTimer(),[])

useEffect(()=>{
  axios.get(`https://ruwassa.herokuapp.com/api/v2/analytics/byphase/${phase}`)
  .then(res=>{
    //  alert(res.data)
      setPhaseData(res.data)
  }).catch(e=>{console.log(e)})


  axios.get(`https://ruwassa.herokuapp.com/api/v1/contractors/progress/${phase}`)
  .then(res=>{
    //  alert(res.data)
      setContractors(res.data)
  }).catch(e=>{console.log(e)})

},[])

  useEffect(()=>{

    axios.get(`https://ruwassa.herokuapp.com/api/v1/phases`)
    .then(res=>{
        setPhasesData(res.data)
      
    }).catch(e=>{console.log(e)})

      axios.get('https://ruwassa.herokuapp.com/api/v2/analytics')
      .then(res=>{
      
          setAllhpbh(res.data.allhpbh)
          setAllsmbh(res.data.allsmbh)
          setAllflbh(res.data.allflbh)
          setAllvip(res.data.allvip)
          setStatus(res.data)
       
      }).catch(err=>{console.log(err)})
  
      
    
  },
      [handleMore])

      const byPhase=(e)=>{
        setMoreView('')
        axios.get(`https://ruwassa.herokuapp.com/api/v1/phases`)
      .then(res=>{
          setPhasesData(res.data)
        
      }).catch(e=>{console.log(e)})
  
        const {value}= e.target
        setPhase(value)
        axios.get(`https://ruwassa.herokuapp.com/api/v2/analytics/byphase/${value}`)
        .then(res=>{
          //  alert(res.data)
            setPhaseData(res.data)
        }).catch(e=>{console.log(e)})
     
        axios.get(`https://ruwassa.herokuapp.com/api/v1/contractors/progress/${value}`)
        .then(res=>{
          //  alert(res.data)
            setContractors(res.data)
        }).catch(e=>{console.log(e)})
     
      //  alert(value)
      }
//https://ruwassa.herokuapp.com/api/v1/contractors/progress/6

 const  data = {
        labels: ["SMBH", "HPBH", "FLBH", "VIP"],
        series: [[allsmbh, allhpbh, allflbh, allvip]]
      }

      const  allData = {
        labels: ["SMBH", "HPBH", "FLBH", "VIP"],
        series: [[allsmbh, allhpbh, allflbh, allvip]]
      }
const  statusData = {
        labels: ["Abandoned", "Ongoing", "Completed"],
        series: [[status.abandoned, status.ongoing, status.completed]]
      }

      const  SMBHStatusData = {
        labels: ["Abandoned", "Ongoing", "Completed"],
        series: [[status.abandonedsmbh, status.ongoingsmbh, status.completedsmbh]]
      }
      const  HPBHStatusData = {
        labels: ["Abandoned", "Ongoing", "Completed"],
        series: [[status.abandonedhpbh, status.ongoinghpbh, status.completedhpbh]]
      }

      const  FLBHStatusData = {
        labels: ["Abandoned", "Ongoing", "Completed"],
        series: [[status.abandonedflbh, status.ongoingflbh, status.completedflbh]]
      }

      const  VIPStatusData = {
        labels: ["Abandoned", "Ongoing", "Completed"],
        series: [[status.abandonedvip, status.ongoingvip, status.completedvip]]
      }

      const  SMBHPhaseData = {
        labels: ["Abandoned", "Ongoing", "Completed"],
        series: [[phaseData.abandonedsmbhphase, phaseData.ongoingsmbhphase, phaseData.comsmbhphase]]
      }

      const  HPBHPhaseData = {
        labels: ["Abandoned", "Ongoing", "Completed"],
        series: [[phaseData.abandonedhpbhphase, phaseData.ongoinghpbhphase, phaseData.comhpbhphase]]
      }
      const  FLBHPhaseData = {
        labels: ["Abandoned", "Ongoing", "Completed"],
        series: [[phaseData.abandonedflbhphase, phaseData.ongoingflbhphase, phaseData.comflbhphase]]
      }
      const  VIPPhaseData = {
        labels: ["Abandoned", "Ongoing", "Completed"],
        series: [[phaseData.abandonedvipphase, phaseData.ongoingvipphase, phaseData.comvipphase]]
      }
const handleNextpage=(e)=>{
 // currentPage: Number(event.target.id)
// alert(e.target.id)
  setCpage(e.target.id)


}

const handleMore=()=>{
  setPhasesView('')
  setMoreOptionView('none')
}

      if (access !== 'pass'){
       // return alert('nope')
        return <Redirect to='/login'></Redirect>
       };
        let contaractorsLabel=[]
        let contaractorsSeries=[]

        let indexOfLastTodo = cpage * dataPerPage;
        let indexOfFirstTodo = indexOfLastTodo - dataPerPage;
     //   Object.keys(this.props.projects).map(e)
        let currentData = Object.keys(contractors).slice(indexOfFirstTodo, indexOfLastTodo);
    
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(Object.keys(contractors).length / dataPerPage); i++) {
          pageNumbers.push(<button key={i}  onClick={handleNextpage} id={i} >{i}</button>);
        }

      // if(contractors.length>0){
          currentData.map((e,i)=>{
           contractors[e].company !=null && contaractorsLabel.push((contractors[e].company).substring(0,5))
           contaractorsSeries.push(Math.round(contractors[e].avg))
          })
       //}

     const  contractorsData={
         labels: contaractorsLabel,
        series: [contaractorsSeries]}


        const nextPage = () =>{
          //    alert('hello')
          setCpage(cpage + 1)
  
          }
    const      backPage =()=>{
        setCpage(cpage - 1)
          
          }
     

  return (
    <div>
      <GridContainer>

      <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={allData}
                type="Bar"
                options={dailySalesChart.options}
               
              />
            </CardHeader>
            <CardBody>
  <h4 className={classes.cardTitle}>All Projects </h4>

                   
              <Table
                 tableData={[
                   ["SMBH", allsmbh],["VIP", allvip],["HPBH",allhpbh],["FLBH", allflbh]
                  
                  ]}
               />
            
            </CardBody>
           
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={statusData}
                type="Line"
                options={completedTasksChart.options}
              
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Status</h4>
              <Table
                 tableData={[
                  ["Completed", status.completed],["Ongoing", status.ongoing],["Abandoned",status.abandoned],[]
                   
                  ]}
               />
            
            </CardBody>
           
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={SMBHStatusData}
                type="Line"
                options={solarChart.options}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>SMBH</h4>
             <Table
                 tableData={[
                  ["Completed", status.completedsmbh],["Ongoing", status.ongoingsmbh],["Abandoned",status.abandonedsmbh],[]
                   
                  ]}
               />
            
            </CardBody>
           </Card>
        </GridItem>


        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={FLBHStatusData}
                type="Line"
                options={vipChart.options}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>FLBH</h4>
        
              <Table
                 tableData={[
                  ["Completed", status.completedflbh],["Ongoing", status.ongoingflbh],["Abandoned",status.abandonedflbh],[]
                   
                  ]}
               />
            
            </CardBody>
           </Card>
        </GridItem>


        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={VIPStatusData}
                type="Line"
                options={vipChart.options}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Laterines</h4>
         
              <Table
                 tableData={[
                  ["Completed", status.completedvip],["Ongoing", status.ongoingvip],["Abandoned",status.abandonedvip],[]
                   
                  ]}
               />
            
            </CardBody>
           </Card>
        </GridItem>
        
        
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={HPBHStatusData}
                type="Line"
                options={completedTasksChart.options}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>HPBH</h4>
          
              <Table
                 tableData={[
                  ["Completed", status.completedhpbh],["Ongoing", status.ongoinghpbh],["Abandoned",status.abandonedhpbh],[]
                   
                  ]}
               />
            
            </CardBody>
           </Card>
        </GridItem>

      </GridContainer>
    
    
  {/*}    <GridContainer style={{display:moreOptionView}}>
      <GridItem xs={12} sm={12} md={3}>
       <Card >
         <MenuItem onClick={handleMore}                    
            className={classes.dropdownItem}
                  >
          Click for more analytics ...
          </MenuItem>
           </Card>
         
      </GridItem>
      </GridContainer>
      */}
      <GridContainer  >
                
      <GridItem xs={12} sm={12} md={3}>
       <Card  >
         <MenuItem                  
            className={classes.dropdownItem}
                  >
             <select  className={classes.dropdownItem} style={{width:'100%', height:'100%', border:0}} value={phase} id='phase' name='phase' onChange={byPhase}>
             <option value=''>Select Phase</option>
                    {Object.keys(phasesData).map(e=>
                        <option value={phasesData[e].phase}>{phasesData[e].phase=='6'?'6c':phasesData[e].phase                       
                        }</option>
                    )}
                    </select> 

          </MenuItem>
           </Card>
         
      </GridItem>
      </GridContainer>



      




      <GridContainer >


  <GridItem xs={12} sm={12} md={4}>
    <Card chart>
      <CardHeader color="success">
        <ChartistGraph
          className="ct-chart"
          data={SMBHPhaseData}
          type="Line"
          options={solarChart.options
          }
        />
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>SMBH</h4>
       <Table
           tableData={[
            ["Completed", phaseData.comsmbhphase],["Ongoing",phaseData.ongoingsmbhphase],["Abandoned", phaseData.abandonedsmbhphase],[]
            ]}
         />
      
      </CardBody>
    </Card>
  </GridItem>


  <GridItem xs={12} sm={12} md={4}>
    <Card chart>
      <CardHeader color="success">
        <ChartistGraph
          className="ct-chart"
          data={FLBHPhaseData}
          type="Line"
          options={vipChart.options}
        />
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>FLBH</h4>
  
        <Table
           tableData={[
            ["Completed", phaseData.comflbhphase],["Ongoing",phaseData.ongoingflbhphase],["Abandoned", phaseData.abandonedflbhphase],[]
             
            ]}
         />
      
      </CardBody>
    </Card>
  </GridItem>


  <GridItem xs={12} sm={12} md={4}>
    <Card chart>
      <CardHeader color="success">
        <ChartistGraph
          className="ct-chart"
          data={VIPPhaseData}
          type="Line"
          options={vipChart.options}
        />
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>Laterines</h4>
   
        <Table
           tableData={[
            ["Completed", phaseData.comvipphase],["Ongoing",phaseData.ongoingvipphase],["Abandoned", phaseData.abandonedvipphase],[]

            ]}
         />
      
      </CardBody>
    </Card>
  </GridItem>
  
  
  <GridItem xs={12} sm={12} md={4}>
    <Card chart>
      <CardHeader color="success">
        <ChartistGraph
          className="ct-chart"
          data={HPBHPhaseData}
          type="Line"
          options={completedTasksChart.options}
        />
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>HPBH</h4>
    
        <Table
           tableData={[
            ["Completed", phaseData.comhpbhphase],["Ongoing",phaseData.ongoinghpbhphase],["Abandoned", phaseData.abandonedhpbhphase],[]
             
            ]}
         />
      
      </CardBody>
    </Card>
  </GridItem>

</GridContainer>



<GridContainer >
      <GridItem xs={12} sm={12} md={12}>
       <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={contractorsData}
                type="Bar"
                options={contractorChart.options}
              
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Contractors performance in phase {phase} {contractors.length}</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 
                                  </span>{" "}
              </p>
                  {pageNumbers}
            {//}      <button onClick={backPage}>Back</button>
            //<button onClick={nextPage}>Next</button>
          }
            
            </CardBody>
           </Card>
         
      </GridItem>
      </GridContainer>






    </div>
  );
}
