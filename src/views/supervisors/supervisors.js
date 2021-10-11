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


const SupervisorsList=(match)=>{
    const [reports, setReports] = useState([])
    const [phase, setPhase] = useState('6d')
    const [phaseData, setPhasesData]=useState([])
    const [userType, setUserType]= useState( localStorage.getItem('acttype'))
    const [localsuper, setLocalSuper]= useState([]);
    const [statesuper, setStateSuper] = useState([])
   

   // const [tableData, setReport] = useState([]),


    const classes = useStyles();

    useEffect(()=>{
        axios.get(`https://ruwassa.herokuapp.com/api/v1/superinfo/state/${phase}`)
        .then(res=>{
          //alert(JSON.stringify(res.data))
           setStateSuper(res.data)
        })

        axios.get(`https://ruwassa.herokuapp.com/api/v1/superinfo/local/${phase}`)
        .then(res=>{
            setLocalSuper(res.data)
          
        }).catch(e=>{console.log(e)})

        
        axios.get(`https://ruwassa.herokuapp.com/api/v1/phases`)
        .then(res=>{
            setPhasesData(res.data)
          
        }).catch(e=>{console.log(e)})
    
    },[phase])

     
    let day1 = 1000 * 3600 * 24;
    let today = new Date();
   
   const checkNullity=(e)=>{
        // this.componentDidUpdate()
         if(e){
             return(e)
         }
         return ''
     }
    let tableData1=[]
    let tableData2=[]

    let kk=0;
    if(localsuper.length>0){
        Object.keys(localsuper).map((e,i)=>{
            if(localsuper[e].title!='Force Lift' ){
                kk++
           tableData2.push([kk, <a href={`#/user/${localsuper[e].id}`}>{checkNullity(localsuper[e].first_name)+' '+checkNullity(localsuper[e].other_name)+' '+checkNullity(localsuper[e].last_name)}</a>,
           localsuper[e].title,localsuper[e].lot,userType=='superadmin' && localsuper[e].actno,userType=='superadmin' &&localsuper[e].bank, Math.round(localsuper[e].avg)
          ],)
        }
        })

    }
    if(statesuper.length>0){
        Object.keys(statesuper).map((e,i)=>{
            if(statesuper[e].title!='Force Lift' ){
                kk++
           tableData1.push([kk, <a href={`#/user/${statesuper[e].id}`}>{checkNullity(statesuper[e].first_name)+' '+checkNullity(statesuper[e].other_name)+' '+checkNullity(statesuper[e].last_name)}</a>,
           statesuper[e].title,statesuper[e].lot,userType=='superadmin' &&statesuper[e].actno,userType=='superadmin' && statesuper[e].bank, Math.round(statesuper[e].avg)
          ],)
        }
        })

    }
    let kkk=0
   

    const handleChangePhase=(e)=>{
        setPhase(e.target.value)
    /*    axios.get(`https://ruwassa.herokuapp.com/api/v1/contractors/progress/${e.target.value}`)
        .then(res => {
            setReports(res.data)
                             }).catch( errors=>{console.log(errors.message)})
    */
          }

    const gotoAllUsers=()=>{
        match.history.push('/allusers')

    }
    const gotoAddUser=()=>{
        match.history.push('/adduser')

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
               {userType=='masteradmin' && <div> <button onClick={gotoAllUsers}>All Users</button>
                    <button onClick={gotoAddUser}>Add User</button></div>}

                    <select className='form-control' value={phase} id='phase' name='phase' onChange={handleChangePhase}>
                    {Object.keys(phaseData).map(e=>
                        <option value={phaseData[e].phase}>{phaseData[e].phase=='6'?'6c':phaseData[e].phase                       
                        }</option>
                    )}
                    </select> 

                    <CardBody>
            
                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "Name", "Facility","Lot",userType=='superadmin' &&"Account No.",userType=='superadmin' &&"Bank", "Progress (%)"]}
                tableData={tableData2}
              />
                      <Table
                tableHeaderColor="warning"
                tableHead={["SN", "Name", "Facility","Lot",userType=='superadmin' &&" Account No.",userType=='superadmin' &&"Bank", "Progress (%)"]}
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

export default SupervisorsList