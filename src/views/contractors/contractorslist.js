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
import { withRouter } from 'react-router-dom';


import { makeStyles } from "@material-ui/core/styles";





import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);


const ContractorsList=(match)=>{
    const [reports, setReports] = useState([])
    const [phase, setPhase] = useState('6d')
    const [phaseData, setPhasesData]=useState([])
    const [userType, setUserType]= useState( localStorage.getItem('acttype'))
   

   // const [tableData, setReport] = useState([]),


    const classes = useStyles();

    useEffect(()=>{
        axios.get(`https://ruwassa.herokuapp.com/api/v1/contractors/progress/${phase}`)
        .then(res=>{
          //alert(JSON.stringify(res.data))
           setReports(res.data)
        })

        axios.get(`https://ruwassa.herokuapp.com/api/v1/phases`)
        .then(res=>{
            setPhasesData(res.data)
          
        }).catch(e=>{console.log(e)})
    
    },[])

     
    let day1 = 1000 * 3600 * 24;
    let today = new Date();
   

    let tableData1=[]
    if(reports.length>0){
        Object.keys(reports).map((e,i)=>{
           tableData1.push([i+1, <a href={`#/contractor/${phase}/${reports[e].id}`}>{reports[e].company}</a>,Math.round(reports[e].avg)
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
        match.history.push('/allcontractors')

    }
    const gotoAddcontractor=()=>{
        match.history.push('/addcontractor')

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
               {userType=='superadmin' && <div> <button onClick={gotoAllcontractors}>All contractors</button>
                    <button onClick={gotoAddcontractor}>Add contractor</button></div>}

                    <select className='form-control' value={phase} id='phase' name='phase' onChange={handleChangePhase}>
                    {Object.keys(phaseData).map(e=>
                        <option value={phaseData[e].phase}>{phaseData[e].phase=='6'?'6c':phaseData[e].phase                       
                        }</option>
                    )}
                    </select> 

                    <CardBody>
                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "Company", "Progress (%)"]}
                tableData={tableData1}
              />
                   </CardBody>
                    <CardFooter stats>
              <div className={classes.stats}>            
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Total contractors in {phase=='6'?'6c':phase} are {reports.length}
                </a>
              </div>
            </CardFooter>
                </GridItem>
            </GridContainer>
        </div>
    )
}

export default ContractorsList