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


const AllContractors=()=>{
    const [reports, setReports] = useState([])
    const [phase, setPhase] = useState('6d')
    const [phaseData, setPhasesData]=useState([])
    const [userType, setUserType]= useState( localStorage.getItem('acttype'))
   

   // const [tableData, setReport] = useState([]),


    const classes = useStyles();

    useEffect(()=>{
        axios.get(`https://ruwassa.herokuapp.com/api/v1/contractors`)
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
           tableData1.push([i+1, reports[e].id, <a href={`#/contractor/${phase}/${reports[e].id}`}>{reports[e].company}</a>,reports[e].phone,reports[e].email,reports[e].address
          ],)
        })

    }

    const handleChangePhase=(e)=>{
        setPhase(e.target.value)
        axios.get(`https://ruwassa.herokuapp.com/api/v1/contractors/progress/${e.target.value}`)
        .then(res => {
            setReports(res.data)
                             }).catch( errors=>{console.log(errors.message)})
    }

    const gotoAllcontractors=()=>{

    }
    return (
        <div>
            <GridContainer>
                 <GridItem xs={12} sm={10} md={12}>
                     <Card>
                        <CardHeader color="warning" stats icon>
                                     <h2 className={classes.cardTitle}></h2>
                        </CardHeader>
                    </Card>
                    <button onClick={gotoAllcontractors}>All contractors</button>
                    <button onClick={gotoAllcontractors}>Add contractor</button>

    
                    <CardBody>
                    <Table
                tableHeaderColor="warning"
                tableHead={["SN","ID", "Company","Phone", "Address"]}
                tableData={tableData1}
              />
                   </CardBody>
                    <CardFooter stats>
              <div className={classes.stats}>            
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Tota {reports.length}
                </a>
              </div>
            </CardFooter>
                </GridItem>
            </GridContainer>
        </div>
    )
}

export default AllContractors