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
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


import { makeStyles } from "@material-ui/core/styles";





import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);


const Projects=({match})=>{
    const [projects, setProjects] = useState([])
    const [phase, setPhase] = useState('6d')
    const [title, setTitle] = useState('Community Borehole')
    const [phaseData, setPhasesData]=useState([])
    const [userType, setUserType]= useState( localStorage.getItem('acttype'))
    const [loading, setLoading]= useState(false)
    const [sort, setSort] = useState('ongoing')

   // const [tableData, setReport] = useState([]),


    const classes = useStyles();

    useEffect(()=>{
        setLoading(true)
         axios.get('https://ruwassa.herokuapp.com/api/v1/update/hpbh')
         axios.get('https://ruwassa.herokuapp.com/api/v1/update/vip')
         axios.get('https://ruwassa.herokuapp.com/api/v1/update/solar')
         axios.get('https://ruwassa.herokuapp.com/api/v1/update/updateallprojects')
        

       axios.get('https://ruwassa.herokuapp.com/api/v1/projects/completeprojects/all')
    .then(res =>{
        setProjects(res.data)
        setLoading(false)
      //  this.setState({projects: res.data})
    })
    .catch(function(error){
         console.log(error)
         setLoading(false)
    })
    axios.get(`https://ruwassa.herokuapp.com/api/v1/phases`)
    .then(res=>{
        setPhasesData(res.data)
      
    }).catch(e=>{console.log(e) })

},[])

     
    let day1 = 1000 * 3600 * 24;
    let today = new Date();
   
    const checkWardNullity=(e)=>{
        // this.componentDidUpdate()
         if(e){
             return(e)
         }
         return ''
     }

    let tableData1=[]
    let tableData2=[]
    let hpbhData=[["SN", "Lot", "Community","Ward","LGA","State Supervisor","LGA Supervisor","Contractor","%","Date"]]
    let smbhData=[["SN", "Lot", "Community","Ward","LGA","State Supervisor","LGA Supervisor","Contractor","%","Date"]]
    let vipData=[["SN", "Lot", "Community","Ward","LGA","State Supervisor","LGA Supervisor","Contractor","%","Date"]]
    let sortrow=[];
    let sortedProjects=''

    if(projects.length>0){
        let kk = 0;

        Object.keys(projects).map((e,i)=>{
            if(projects[e].phase == phase && projects[e].title == title ){      
                kk ++        
           tableData1.push([ <a target='_blank' href={`#/projects/${projects[e].id}`}>{kk}</a>,projects[e].lot,projects[e].community,checkWardNullity(projects[e].ward), projects[e].lga, projects[e].gps,
            checkWardNullity(projects[e].first_name)+' '+checkWardNullity(projects[e].other_name)+' '+checkWardNullity(projects[e].last_name),
            projects[e].fn+' '+projects[e].on+' '+projects[e].ln, projects[e].company, projects[e].totalcov, 
          userType=='superadmin' && new Date((projects[e].started).replace(/^"|"$/g,'')).getDate()+'/'+(new Date((projects[e].started).replace(/^"|"$/g,'')).getMonth()+1) +'/'+ new Date((projects[e].started).replace(/^"|"$/g,'')).getFullYear(),
          userType=='superadmin' && Math.round((today.getTime() - (new Date((projects[e].started).replace(/^"|"$/g,''))).getTime())/day1).toFixed(0) ,
          userType=='superadmin' && (projects[e].lastdate==null?'-': Math.round((today.getTime() - (new Date((projects[e].lastdate))).getTime())/day1).toFixed(0)), 
           <a target='_blank' href={`#/projects/${projects[e].id}`}><button className='btn btn-primary'>View</button></a>,
           userType=='masteradmin' && <a target='_blank' href={`#/updateproject/${projects[e].id}`}><button className='btn btn-primary'>Edit</button></a>],)
           }
        })
    }

    if(projects.length>0){
        let kk = 0;
        Object.keys(projects).map((e,i)=>{
            if(projects[e].phase == phase && projects[e].title == 'Community Borehole'){      
                kk ++        
           hpbhData.push([ kk,projects[e].lot,projects[e].community,checkWardNullity(projects[e].ward), projects[e].lga,
            checkWardNullity(projects[e].first_name)+' '+checkWardNullity(projects[e].other_name)+' '+checkWardNullity(projects[e].last_name),
            projects[e].fn+' '+projects[e].on+' '+projects[e].ln, projects[e].company, projects[e].totalcov,new Date((projects[e].started).replace(/^"|"$/g,'')).getDate()+'/'+(new Date((projects[e].started).replace(/^"|"$/g,'')).getMonth()+1) +'/'+ new Date((projects[e].started).replace(/^"|"$/g,'')).getFullYear(),
          ],)
           }
        })
    }
    
    if(projects.length>0){
        let kk = 0;

        Object.keys(projects).map((e,i)=>{
            if(projects[e].phase == phase && projects[e].title == 'Motorized Solar Borehole'){      
                kk ++        
           smbhData.push([ kk,projects[e].lot,projects[e].community,checkWardNullity(projects[e].ward), projects[e].lga,
            checkWardNullity(projects[e].first_name)+' '+checkWardNullity(projects[e].other_name)+' '+checkWardNullity(projects[e].last_name),
            projects[e].fn+' '+projects[e].on+' '+projects[e].ln, projects[e].company, projects[e].totalcov,new Date((projects[e].started).replace(/^"|"$/g,'')).getDate()+'/'+(new Date((projects[e].started).replace(/^"|"$/g,'')).getMonth()+1) +'/'+ new Date((projects[e].started).replace(/^"|"$/g,'')).getFullYear(),
         ],)
           }
        })
    }

    if(projects.length>0){
        let kk = 0;

        Object.keys(projects).map((e,i)=>{
            if(projects[e].phase == phase && projects[e].title == 'Sanitation'){      
                kk ++        
           vipData.push([ kk,projects[e].lot,projects[e].community,checkWardNullity(projects[e].ward), projects[e].lga,
            checkWardNullity(projects[e].first_name)+' '+checkWardNullity(projects[e].other_name)+' '+checkWardNullity(projects[e].last_name),
            projects[e].fn+' '+projects[e].on+' '+projects[e].ln, projects[e].company, projects[e].totalcov,new Date((projects[e].started).replace(/^"|"$/g,'')).getDate()+'/'+(new Date((projects[e].started).replace(/^"|"$/g,'')).getMonth()+1) +'/'+ new Date((projects[e].started).replace(/^"|"$/g,'')).getFullYear(),
        ],)
           }
        })
    }

    const handleChangePhase=(e)=>{
        setPhase(e.target.value)
    }
    const handleChangeTitle=(e)=>{
        setTitle(e)
    }
    const handleSort =async()=>{
         let projectsss = [ ]

              if(projects.length>0){
                let kk = 0;
        
                Object.keys(projects).map((e,i)=>{
                       
                   projectsss.push({lot:projects[e].lot, community:projects[e].community, ward:checkWardNullity(projects[e].ward), lga:projects[e].lga,
                    first_name: checkWardNullity(projects[e].first_name)+' '+checkWardNullity(projects[e].other_name)+' '+checkWardNullity(projects[e].last_name),
                   second_name: projects[e].fn+' '+projects[e].on+' '+projects[e].ln, company:projects[e].company, total:projects[e].totalcov, date:new Date((projects[e].started)),
                   })
                   
                })
                
            }

            let proo =[{date:'2/03/2020'},{date:'3/04/2021'},{date:'4/01/2033'}]

             sortedProjects = proo.sort((a, b) => b.date - a.date)
             if (sortedProjects.length>0){
                sortedProjects.map(e=>
                   sortrow.push(<tr><td>{sortedProjects.date}</td></tr>)
                )
            }
        
    }


    const handleViewSort=()=>{
        if (sortedProjects.length>0){
            sortedProjects.map(e=>
               sortrow.push(<tr><td>{sortedProjects.date}</td></tr>)
            )
        }
    }

    
    
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (fileName) => {
        const hpbh = XLSX.utils.json_to_sheet(hpbhData);
        const smbh = XLSX.utils.json_to_sheet(smbhData);
        const vip = XLSX.utils.json_to_sheet(vipData);

        const wb = { Sheets: { 'hpbh': hpbh,'smbh':smbh, 'vip':vip }, SheetNames: ['hpbh','smbh','vip'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

     
    return (
        <div>
            <GridContainer>
         <div style={{display:'flex', marginLeft:'30%',marginTop:50, width:'30%', justifySelf:'center', alignSelf:'center'}}>  
              {loading &&  <Loader type="Circles" color="Blue"/>}
         </div>
    {/*}     <button onClick={handleSort}  className={classes.dropdownItem}> Sort</button>
  {/*}       <button onClick={handleViewSort}  className={classes.dropdownItem}> Display</button>
{/*
<hr/>
{sortrow}
old
<hr/><br/>*/}
            {projects.length>0 &&     <GridItem xs={12} sm={10} md={12}>
                     <Card>
                        <CardHeader color="warning" stats icon>
    <h2 className={classes.cardTitle}>{title +' Phase '+ phase}</h2>
                        </CardHeader>
                    </Card>
           {userType=='masteradmin' &&        <a href='#/addproject' target='_blank'> <button  className={classes.dropdownItem}> Add Projects</button></a>}
           <a href='/' > <button  className={classes.dropdownItem}>Home</button></a>
                    <button onClick={()=>handleChangeTitle('Community Borehole')} className={classes.dropdownItem}> HPBH</button>
                    <button onClick={()=>handleChangeTitle('Motorized Solar Borehole')}  className={classes.dropdownItem}> SMBH</button>
                    <button onClick={()=>handleChangeTitle('Sanitation')}  className={classes.dropdownItem}> VIP</button>
                    <button onClick={()=>handleChangeTitle('Force Lift')}  className={classes.dropdownItem}> FLBH</button>
                    <select className='form-control' value={phase} id='phase' name='phase' onChange={handleChangePhase}>
                    {Object.keys(phaseData).map(e=>
                        <option value={phaseData[e].phase}>{phaseData[e].phase=='6'?'6c':phaseData[e].phase                       
                        }</option>
                    )}
                    </select> 

                    <CardBody>

                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "Lot", "Community","Ward","LGA","State Supervisor","LGA Supervisor","Contractor","%",userType=='superadmin'&& "Started", userType=='superadmin'&&"Days",userType=='superadmin'&&"Last Report","",userType=='superadmin'&&""]}
                tableData={tableData1}
              />
                   </CardBody>
                    <CardFooter stats>
              <div className={classes.stats}>   
              Total Projects {projects.length}
   
              <button variant="warning" onClick={(e) => exportToCSV(`Phase ${phase} progress report `+(new Date()))}>Export to excel</button>

              </div>
            </CardFooter>
                </GridItem>}
            </GridContainer>
        </div>
    )
}

export default Projects