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


const ContractorProjects=({match})=>{
    const [reports, setReports] = useState([])
    const [phase, setPhase] = useState(match.params.phase)
    const [phaseData, setPhasesData]=useState([])
    const [userType, setUserType]= useState( localStorage.getItem('acttype'))
   // const [tableData, setReport] = useState([]),


    const classes = useStyles();

    useEffect(()=>{
        axios.get(`https://ruwassa.herokuapp.com/api/v1/contractors/allprojects/${match.params.cid}`)
        .then(res=>{
          //alert(JSON.stringify(res.data))
           setReports(res.data)
        })

        axios.get(`https://ruwassa.herokuapp.com/api/v1/phases`)
        .then(res=>{
            setPhasesData(res.data)
          
        }).catch(e=>{console.log(e)})
    },[])


    //    alert(name + ' '+ value)
      
    
     
      const   handlechangePhase=(e)=>{
        const { value, name } = e.target;
        setPhase(value)
      }

    let day1 = 1000 * 3600 * 24;
    let today = new Date();
   

    let tableData1=[]
    let KK=0
    if(reports.length>0){
        Object.keys(reports).map((e,i)=>{
            if(reports[e].phase==phase){
                KK++
           tableData1.push([KK, <a href={`#/projects/${reports[e].id}`}>{reports[e].title}</a> , (reports[e].phase=='6'?'6c':reports[e].phase),reports[e].lot,Math.round(reports[e].totalcov)
          ],)
        }
        })

    }
    return (
        <div>
            <GridContainer>
                 <GridItem xs={12} sm={10} md={12}>
                     <Card>
                        <CardHeader color="warning" stats icon>
    <h2 className={classes.cardTitle}>Projects by</h2>
                        </CardHeader>
                    </Card>
                    <select className='form-control' value={phase} id='phase' name='phase' onChange={handlechangePhase}>
                    {Object.keys(phaseData).map(e=>
                        <option value={phaseData[e].phase}>{phaseData[e].phase=='6'?'6c':phaseData[e].phase                       
                        }</option>
                    )}
                    </select> 

                    <CardBody>
                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "Facility","Phase", "Lot", "Progress (%)"]}
                tableData={tableData1}
              />
                   </CardBody>
                    <CardFooter stats>
              <div className={classes.stats}>            
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Total location in phase {phase} {KK>1?"are":"is"} {KK}
                </a>
              </div>
            </CardFooter>
                </GridItem>
            </GridContainer>
        </div>
    )
}

export default ContractorProjects