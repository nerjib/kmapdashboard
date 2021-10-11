import React, {useEffect, useState} from 'react'
import GridContainer from "components/Grid/GridContainer.js";
import MenuItem from "@material-ui/core/MenuItem";

import GridItem from 'components/Grid/GridItem';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";
import axios from 'axios'
import Loader from 'react-loader-spinner'

import { makeStyles } from "@material-ui/core/styles";





import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);


const Reports=()=>{
    const [reports, setReports] = useState([])
    const [phase, setPhase] = useState('6d')
    const [title, setTitle] = useState('Sanitation')
    const [reportfocs, setReportFocus]=useState('all')
  const [status, setStatus] = useState('')
  const [reportsPerPage, setReportsPerPage] = useState(150)
  const [currentPage, setCurrentPage]= useState(1)
  const [loading, setLoading]= useState(false)

   // const [tableData, setReport] = useState([]),


    const classes = useStyles();

    useEffect(()=>{
        setLoading(true)
        axios.get(`https://ruwassa.herokuapp.com/api/v1/reports/completereports/all/${phase}`)
        .then(res => {
            setReports(res.data)
            setLoading(false)
            setStatus('')
            setReportFocus('all')
                   }).catch( errors=>{console.log(errors.message)
                setLoading(false)})


    },[phase])

     
    let day1 = 1000 * 3600 * 24;
    let today = new Date();
   
    const checkWardNullity=(e)=>{
        // this.componentDidUpdate()
         if(e){
             return(e)
         }
         return ''
     }

const handleClick=(e)=>{
   setCurrentPage(Number(e.target.id))

}

let facilityReports=[]
if(reports>0){
reports.keys(reports).map(e=>{
    if(reports[e].phase == phase && reports[e].title == title){
        facilityReports.push(reports[e])
    }
})

}
  
     // Logic for displaying todos
     const indexOfLastReport = currentPage * reportsPerPage;
     const indexOfFirstReport = indexOfLastReport - reportsPerPage
     const currentProjects = Object.keys(reports).slice(indexOfFirstReport, indexOfLastReport);
 
     const pageNumbers = [];
     for (let i = 1; i <= Math.ceil(Object.keys(reports).length / reportsPerPage); i++) {
       pageNumbers.push(<button key={i}  id={i} onClick={handleClick}>{i}</button>);
     }
 



    let tableData1=[]
    let tableData2=[]

    if(reports.length>0){
        let kk = 0;

        currentProjects.map((e,i)=>{
            if(reports[e].phase == phase && reports[e].title == title){      
                kk ++        
           tableData1.push([ <a target='_blank' href={`/#/projects/${reports[e].pid}`}>{kk}</a>,reports[e].lot,reports[e].community,checkWardNullity(reports[e].ward), reports[e].lga,
           reports[e].activity, reports[e].activityoutcome,
            checkWardNullity(reports[e].first_name)+' '+checkWardNullity(reports[e].other_name)+' '+checkWardNullity(reports[e].last_name),
            reports[e].company, 
           new Date(reports[e].date).getDate()+'/'+(new Date(reports[e].date).getMonth()+1) +'/'+ new Date(reports[e].date).getFullYear(),
           <a target='_blank' href={`#/reports/${reports[e].id}`}><button className='btn btn-primary'>View</button></a>],)
           }
        })

    }

    

    const handleChangePhase=(e)=>{
        setPhase(e.target.value)
        axios.get(`https://ruwassa.herokuapp.com/api/v1/reports/completereports/all/${e}`)
        .then(res => {
            setReports(res.data)
            setStatus('')
            setReportFocus('all')
                   }).catch( errors=>{console.log(errors.message)})
    }
    const handleChangeTitle=(e)=>{
        setTitle(e)
    }

    
   const nextPage = () =>{
        //    alert('hello')
        setCurrentPage(currentPage + 1)

        }
  const      backPage =()=>{
      setCurrentPage(currentPage - 1)
        
        }
    
     
    return (
        <div>
            <GridContainer>
            <div style={{display:'flex', marginLeft:'30%',marginTop:50, width:'30%', justifySelf:'center', alignSelf:'center'}}>  
              {loading &&  <Loader type="Circles" color="Blue"/>}
         </div>
      {reports.length>0 &&           <GridItem xs={12} sm={10} md={12}>
                     <Card>
                        <CardHeader color="warning" stats icon>
    <h2 className={classes.cardTitle}>{title +' Phase '+ phase}</h2>
                        </CardHeader>
                    </Card>
                    <button onClick={()=>handleChangeTitle('Community Borehole')} className={classes.dropdownItem}> HPBH</button>
                    <button onClick={()=>handleChangeTitle('Motorized Solar Borehole')}  className={classes.dropdownItem}> SMBH</button>
                    <button onClick={()=>handleChangeTitle('Sanitation')}  className={classes.dropdownItem}> VIP</button>
                    <button onClick={()=>handleChangeTitle('Force Lift')}  className={classes.dropdownItem}> FLBH</button>
                    <select   className='form-control' id='pstatus'  onChange={handleChangePhase}>
                <option >Select Phase</option>
                <option value='6'>Phase 6C projects</option>
                <option value='6d'> Phase 6D projects</option>
                <option value='7'> Phase 7 projects</option>
                <option value='Covid-19 Response'> Covid-19 Response</option>

                </select>

                    <CardBody>
                        {//pageNumbers
                        }
                                  

                        <button onClick={backPage}>Back</button>
            <button onClick={nextPage}>Next</button>

                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "Lot", "Community","Ward","LGA","Activity","Outcome","Supervisor","Contractor","Date",""]}
                tableData={tableData1}
              />
                   </CardBody>
                   <button onClick={backPage}>Back</button>
            <button onClick={nextPage}>Next</button>
                    <CardFooter stats>

              <div className={classes.stats}>            
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Draft Table {reports.length}
                </a>
              </div>
            </CardFooter>
                </GridItem>}
            </GridContainer>
        </div>
    )
}

export default Reports