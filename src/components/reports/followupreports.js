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


const FollowupReports=()=>{
    const [reports, setReports] = useState([])
    // const [tableData, setReport] = useState([]),
 
 
     const classes = useStyles();
 
     useEffect(()=>{
         axios.get('https://kd-sema.herokuapp.com/api/v1/reports/getfollowupreports')
         .then(res=>{
           //alert(JSON.stringify(res.data))
            setReports(res.data)
         })
     },[])
 
      
     let day1 = 1000 * 3600 * 24;
     let today = new Date();
    
 
     let tableData1=[]
     if(reports.length>0){
         Object.keys(reports).map((e,i)=>{
            tableData1.push([i+1,reports[e].event,reports[e].ward+', '+reports[e].lga,
            new Date(reports[e].date).getDate()+'/'+new Date(reports[e].date).getMonth() +'/'+ new Date(reports[e].date).getFullYear(),
            new Date(reports[e].date).getHours()+ ':' + new Date(reports[e].date).getMonth() + ':' + new Date(reports[e].date).getSeconds(),
            Math.round((today.getTime() - (new Date(reports[e].date)).getTime())/day1).toFixed(0),
            reports[e].type,
            <a href={`#draft/followup/followup/${reports[e].id}`}><button className='btn btn-primary'>View</button></a>],)
         })
 
     }
    return (
        <div>
            <GridContainer>
                 <GridItem xs={12} sm={10} md={12}>
                     <Card>
                        <CardHeader color="warning" stats icon>
                                     <h2 className={classes.cardTitle}>Followup</h2>
                        </CardHeader>
                    </Card>
                    <CardBody>
                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "Event", "Location", "Date", "Time","Days", "Source",""]}
                tableData={tableData1}
              />
                   </CardBody>
                    <CardFooter stats>
              <div className={classes.stats}>            
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Draft Table {reports.length}
                </a>
              </div>
            </CardFooter>
                </GridItem>
            </GridContainer>
        </div>
    )

}

export default FollowupReports