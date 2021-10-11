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
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { makeStyles } from "@material-ui/core/styles";





import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);


const Functionality=({match})=>{
    const [FunctionalR, setFunctionality] = useState([])
    const [NonFunctional, setNonFunctional] = useState('')
    const [ussdReports, setUssdReports] = useState('')
    const [acceptedReports, setAcceptedReprts] = useState('')


    const [title, setTitle] = useState('')

    const [dv, setDv] = useState('')
    const [wv, setWk]= useState('none')
    const [me, setMe]= useState('none')
    const [func, setFunc] = useState('none')
    const [ussdv, setUssdv]= useState('none')
    const [allFunc, setAllFunc]= useState('none')


 
     const classes = useStyles();
 
     useEffect(()=>{
        
        axios.get('https://ruwassa.herokuapp.com/api/v1/vlc/followup')
         .then(res=>{
             
                 setFunctionality(res.data)
             
         }).catch(error=>{console.log(error.message)})

         axios.get('https://ruwassa.herokuapp.com/api/v1/vlc/nonfunctionalprojects')
         .then(res=>{
             
                 setAcceptedReprts(res.data)
             
         }).catch(error=>{console.log(error.message)})
       
       
        axios.get(`https://ruwassa.herokuapp.com/api/v1/vlc/followupstatus/nonfunctional`)
         .then(res=>{
                 setNonFunctional(res.data)
             
         }).catch(error=>{console.log(error.message)})
         axios.get('https://ruwassa.herokuapp.com/api/v1/ussd')
         .then(res=>{
             
                 setUssdReports(res.data)
             
         }).catch(error=>{console.log(error.message)})
    
     },[])
 
      
     let day1 = 1000 * 3600 * 24;
     let today = new Date();
    
 
     let tableData1=[]
     let tableData2=[]
     let tableData3=[["SN", "Facility", "Community","ward","LGA","Functional","sender","date",""]]
     let tableData4=[]
     let tableData5=[]

     let AllFuncData=[["SN", "Facility","community","Ward","LGA","Functionality Status","Date of Func. Report",
     "Project Started","Project Completed", "Problem","Duration of problem","Supervisors Remark","Project status"," gps"]]

     if(FunctionalR.length>0){
         Object.keys(FunctionalR).map((e,i)=>{
             tableData1.push([i+1,FunctionalR[e].title,FunctionalR[e].community,FunctionalR[e].ward,
                FunctionalR[e].lga,FunctionalR[e].functionality,FunctionalR[e].type,FunctionalR[e].time,<a  href={`#/functionalitydetails/${FunctionalR[e].fid}`} ><button >view</button></a>],)
         })
     }

     
     if(acceptedReports.length>0){
        Object.keys(acceptedReports).map((e,i)=>{
            tableData5.push([i+1,acceptedReports[e].title,acceptedReports[e].community,acceptedReports[e].ward,
                acceptedReports[e].lga,acceptedReports[e].functionality,
                acceptedReports[e].gentime,acceptedReports[e].started,acceptedReports[e].lastdate,acceptedReports[e].problem,
                acceptedReports[e].problemduration,acceptedReports[e].remark,acceptedReports[e].status,
                acceptedReports[e].cordinate,<a  href={`#/functionalitydetails/${acceptedReports[e].fid}`} ><button >view</button></a>],)
        })
    }

    if(acceptedReports.length>0){
        Object.keys(acceptedReports).map((e,i)=>{
            AllFuncData.push([i+1,acceptedReports[e].title,acceptedReports[e].community,acceptedReports[e].ward,
                acceptedReports[e].lga,acceptedReports[e].functionality,
                acceptedReports[e].gentime,acceptedReports[e].started,acceptedReports[e].lastdate,acceptedReports[e].problem,
                acceptedReports[e].problemduration,acceptedReports[e].remark,acceptedReports[e].status,
                acceptedReports[e].cordinate,<a  href={`#/functionalitydetails/${acceptedReports[e].fid}`} ><button >view</button></a>],)
        })
    }


     
     if(NonFunctional.length>0){
         Object.keys(NonFunctional).map((e,i)=>{
            tableData2.push([i+1,NonFunctional[e].title,NonFunctional[e].community,NonFunctional[e].ward,
                NonFunctional[e].lga,NonFunctional[e].phase, NonFunctional[e].company,NonFunctional[e].functionality,NonFunctional[e].type,NonFunctional[e].time,<a  href={`#/functionalitydetails/${NonFunctional[e].fid}`} ><button >view</button></a>],)
        })
     }
     if(NonFunctional.length>0){
        Object.keys(NonFunctional).map((e,i)=>{
            tableData3.push([i+1,NonFunctional[e].title,NonFunctional[e].community,NonFunctional[e].ward,
                NonFunctional[e].lga,NonFunctional[e].phase, NonFunctional[e].company,NonFunctional[e].functionality,NonFunctional[e].type,NonFunctional[e].time,<a  href={`#/functionalitydetails/${NonFunctional[e].fid}`} ><button >view</button></a>],)
        })
    }
    if(ussdReports.length>0){
        Object.keys(ussdReports).map((e,i)=>{
            tableData4.push([i+1,ussdReports[e].fid,ussdReports[e].community,ussdReports[e].ward,ussdReports[e].lga,ussdReports[e].fault==='1'?'Not working completely':ussdReports[e].fault==='2'?
            'Low yield':ussdReports[e].fault==='3'?'Water not pumpimg to tank':ussdReports[e].fault==='4'?
            'Hard to pump':ussdReports[e].fault==='5'?'Leaking pipe':ussdReports[e].fault==='6'?
            'Solar panel vandalized':ussdReports[e].fault==='7'?'Other':'',ussdReports[e].sender==='+2348065671336'?'+2348065671336-Test':ussdReports[e].sender,
                ussdReports[e].time],)
        })
    }

        const handleDailyView=()=>{
            setDv('')
            setWk('none')
            setMe('none')
            setFunc('none')
            setUssdv('none')

        }
        const handleFunctionality=()=>{
            setDv('none')
            setWk('none')
            setMe('none')
            setFunc('')
            setUssdv('none')


        }

        const handleME=()=>{
            setDv('none')
            setWk('none')
            setMe('')
            setFunc('none')
            setUssdv('none')

        }

        const handleWeeklyView=()=>{
            setDv('none')
            setWk('')
            setMe('none')
            setFunc('none')
            setUssdv('none')

        }

        const handleUssdView=()=>{
            setDv('none')
            setWk('none')
            setMe('none')
            setFunc('none')
            setUssdv('')

        }
        const handleAllFuncView=()=>{
            setDv('none')
            setWk('none')
            setMe('none')
            setFunc('none')
            setUssdv('none')
            setAllFunc('')

        }


        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const ws1 = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'functionality': ws }, SheetNames: ['functionality',] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    const exportToCSV2 = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'functionality': ws }, SheetNames: ['functionality',] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }


    return (
        <div>
            <GridContainer>
                 <GridItem xs={12} sm={10} md={12}>
                     <Card>
                        <CardHeader  color="warning" stats icon>
                                     <h2 className={classes.cardTitle}>Functionality Reports {match.params.id}</h2>
                        </CardHeader>
                    </Card>
                    <div>
                    <button onClick={handleDailyView} className={classes.dropdownItem}> Non Fuctional</button>
                    <button onClick={handleWeeklyView}  className={classes.dropdownItem}> Functionality Reports</button>
                    <button onClick={handleUssdView}  className={classes.dropdownItem}> USSD Reports</button>
                    <button onClick={handleAllFuncView}  className={classes.dropdownItem}> All Reports</button>

                    <button variant="warning" onClick={(e) => exportToCSV(tableData3,'Functionality '+(new Date()))}>Export</button>
                    <button variant="warning" onClick={(e) => exportToCSV2(AllFuncData,'Functionality '+(new Date()))}>Export all</button>

                 {//}   <a href='#/admin/dashboard'><button   className={classes.dropdownItem}> Home</button></a>
}</div>
                    <CardBody style={{display:dv}}>
                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "Facility", "Community","ward","LGA","Lot","contractor","Functional","sender","date",""]}
                tableData={tableData2}
              />
                   </CardBody>
                   <CardBody style={{display:wv}}>
                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "Facility", "Community","ward","LGA","Functional","sender","date",""]}
                tableData={tableData1}
              />
                   </CardBody>
                   <CardBody style={{display:ussdv}}>
                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "FID","community","Ward","LGA", "Problem","sender","Time"]}
                tableData={tableData4}
              />
                   </CardBody>
                   <CardBody style={{display:allFunc}}>
                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "Facility","community","Ward","LGA","Functionality Status","Date of Func. Report",
                "Project Started","Project Completed", "Problem","Duration of problem","Remark","Project status","gps"]}
                tableData={tableData5}
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

export default Functionality