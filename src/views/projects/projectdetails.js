import React, {useEffect, useState} from 'react'
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from 'components/Grid/GridItem';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";
import axios from 'axios'

import { makeStyles } from "@material-ui/core/styles";





import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);


const ProjectDetails=({match})=>{
    const [reports, setReports] = useState([])
    const [projects, setProject] = useState('')
    // const [tableData, setReport] = useState([]),
 const [weeklyreport, setWeeklyreport] = useState([])
    const  [projectId, setProjectId] = useState([])
    const [monReps, setMonReps] = useState([])
    const [sanMonReps, setSanmonReps] = useState([])
    const [Lid, setLid] = useState([])
    const [status, setStatus]= useState([])
    const [functionalityReport, setFunctionalityReport] = useState([])
    const [title, setTitle] = useState('')

    const [dv, setDv] = useState('')
    const [wv, setWk]= useState('none')
    const [me, setMe]= useState('none')
    const [func, setFunc] = useState('none')
 
     const classes = useStyles();
 
     useEffect(()=>{
        
        axios.get('https://ruwassa.herokuapp.com/api/v1/projects/details/'+match.params.id)
         .then(res=>{
             
                 setProject(res.data[0])
                 setTitle(res.data[0].title)
             
         }).catch(error=>{console.log(error.message)})
       
        axios.get('https://ruwassa.herokuapp.com/api/v1/reports/project/'+match.params.id)
         .then(res=>{
                 setReports(res.data)
             
         }).catch(error=>{console.log(error.message)})
 
  
         axios.get('https://ruwassa.herokuapp.com/api/v1/reports/activity/projectweekly/'+match.params.id)
         .then(res=>{
            
                 setWeeklyreport(res.data)
            
         }).catch(error=>{console.log(error.message)})
 
         axios.get('https://ruwassa.herokuapp.com/api/v1/projects/'+match.params.id)
         .then(res=>{
            setProjectId(res.data[0])
              
             if(res.data[0].title=='Community Borehole' || res.data[0].title=='Motorized Solar Borehole' || res.data[0].title== 'Force Lift'){
               //  
             
               axios.get('https://ruwassa.herokuapp.com/api/v1/monitorsreports/watereval/'+match.params.id)
               .then(res=>{
                   
                       setMonReps(res.data)
                   
               }).catch(error=>{console.log(error.message)})
       
             }else if(res.data[0].title=='Sanitation'){
                 axios.get('https://ruwassa.herokuapp.com/api/v1/monitorsreports/sanitationeval/'+match.params.id)
               .then(res=>{
                   //alert(res.data)
                       setSanmonReps(res.data)
                   
               }).catch(error=>{console.log(error.message)})
 
             }
 
             axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+res.data[0].local_id)
            // alert(res.data[0].local_id+2)
             .then(res=>{
                     
                         setLid(res.data[0].first_name+' '+res.data[0].last_name)
                         setStatus(false)
                     
             }).catch(error=>{console.log(error.message)})
         }).catch(error=>{console.log(error.message)})
       
         axios.get('https://ruwassa.herokuapp.com/api/v1/vlc/followup/byprojects/'+match.params.id)
         .then(res=>{
            // alert(res.data)
                 setFunctionalityReport(res.data)
         }).catch(error=>{console.log(error.message)})
    
     },[])
 
      
     let day1 = 1000 * 3600 * 24;
     let today = new Date();
    
 
     let tableData1=[]
     let tableData2=[]
     let tableData3=[]
     let tableData4=[]


     if(reports.length>0){
         Object.keys(reports).map((e,i)=>{
             tableData1.push([i+1,reports[e].date,reports[e].activity,reports[e].activityoutcome,
                reports[e].first_name+' '+reports[e].last_name,<a  href={`/#/reports/${reports[e].id}`} ><button >view</button></a>],)
         })
     }
     
     if(weeklyreport.length>0){
         Object.keys(weeklyreport).map((e,i)=>{
             tableData2.push([i+1,weeklyreport[e].summaryfrom+' - '+weeklyreport[e].summaryto,projects.first_name+' '+projects.last_name,
         <a  href={`/#/weeklyreportdetails/${weeklyreport[e].id}`} ><button >view</button></a>])
         })
     }

     if(monReps.length>0){
        (title=='Community Borehole' ||  title=='Motorized Solar Borehole') &&
         Object.keys(monReps).map((e,i)=>{
             tableData3.push([i+1, monReps[e].gentime,title=='Community Borehole'?<a target='_blank' href={`/#/waterevalreport/${monReps[e].id}`} ><button >view 
             </button></a>:<a href={`/#/solarevalreport/${monReps[e].id}`} ><button >view 
                                </button></a>, monReps[e].mon])

         })        
        
     }
     if(sanMonReps.length>0){
        Object.keys(sanMonReps).map((e,i)=>{
            tableData3.push([i+1, sanMonReps[e].gentime,<a target='_blank' href={`/#/sanevalreport/${sanMonReps[e].id}`} ><button >view 
            </button></a>, sanMonReps[e].mon])

        })
     }


        Object.keys(functionalityReport).map((e,i)=>{
            tableData4.push([i+1, functionalityReport[e].functionality, functionalityReport[e].problem,functionalityReport[e].problemduration,
                functionalityReport[e].type,
            <a  href={`/#/functionalitydetails/${functionalityReport[e].fid}`} ><button >view 
            </button></a>])

        })
     
        const handleDailyView=()=>{
            setDv('')
            setWk('none')
            setMe('none')
            setFunc('none')

        }
        const handleFunctionality=()=>{
            setDv('none')
            setWk('none')
            setMe('none')
            setFunc('')

        }

        const handleME=()=>{
            setDv('none')
            setWk('none')
            setMe('')
            setFunc('none')

        }

        const handleWeeklyView=()=>{
            setDv('none')
            setWk('')
            setMe('none')
            setFunc('none')

        }

    return (
        <div>
            <GridContainer>
                 <GridItem xs={12} sm={10} md={12}>
                     <Card>
                        <CardHeader  color="warning" stats icon>
                                     <h2 className={classes.cardTitle}>Projects Details </h2>
                        </CardHeader>
                       
                    </Card>
                    <div>
                            Facility: {projects.title} <br/>
                            Commmunity: {projects.community} <br/>
                            Ward: {projects.ward} <br/>
                            LGA: {projects.lga} <br/>
                            Contractor: {projects.company}<br/>

                            State Supervisor:<a target='_blank' href={`#/user/${projects.state_id}`}> {projects.first_name+' '+projects.last_name} </a><br/>
                            Local Supervisor:<a target='_blank' href={`#/user/${projects.local_id}`}> {Lid}</a> <br/>

                        </div>
                    <div>
                    <button onClick={handleDailyView} className={classes.dropdownItem}> Daily Reports</button>
                    <button onClick={handleWeeklyView}  className={classes.dropdownItem}> Weekly Reports</button>
                    <button onClick={handleME}  className={classes.dropdownItem}> M&E Reports</button>
                    <button onClick={handleFunctionality}  className={classes.dropdownItem}> Functionality</button>
                    </div>
                    <CardBody style={{display:dv}}>
                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "Date", "Activity", "Outcome", "Supervisor",""]}
                tableData={tableData1}
              />
                   </CardBody>
                   <CardBody style={{display:wv}}>
                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "Date",  "Supervisor",""]}
                tableData={tableData2}
              />
                   </CardBody>


                    <CardBody style={{display: me}}>
                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "Date", "Supervisor",""]}
                tableData={tableData3}
              />
                   </CardBody>

                   <CardBody style={{display: func}}>
                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "Functional", "Problem","Duration","Type",""]}
                tableData={tableData4}
              />
                   </CardBody>
                    <CardFooter stats>
              <div className={classes.stats}>            
               
              </div>
            </CardFooter>
                </GridItem>
            </GridContainer>
        </div>
    )

}

export default ProjectDetails