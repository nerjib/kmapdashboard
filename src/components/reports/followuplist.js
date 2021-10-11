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

const FollowupList = ({match}) => {

  const [report, setReport] = useState('')
  const [msg, setMsg]=useState('')
  const [gps, setGPS]=useState('')
  const [vname, setVname]=useState('')
  const [oname, setOname]=useState('')
  const [draftdate, setDate]=useState('')

  const [followup, setFollowup]=useState([])

  const [phone, setPhone]=useState('')
  const [users, setUsers]= useState('')
  const [userSelect, setUserselect]= useState('')
  const [category, setCategory]= useState('followup')

const categorytype=['followup','close','rejected']
const [OIDphone, setOIDPhone]=useState('')
const [oidusers, setOIDUsers]= useState('')
const [OIDuserSelect, setOIDUserselect]= useState('')



let day1 = 1000 * 3600 * 24;
let today = new Date();

let date1= new Date(draftdate)
let diffdate = Math.round((today.getTime() - date1.getTime())/day1).toFixed(0)



useEffect(()=>{
  //    alert(JSON.stringify(match))
     // alert(match.params.id)
        
     axios.get('https://kd-sema.herokuapp.com/api/v1/reports/getdraft/'+match.params.id)
     .then(res=>{

          setDate(res.data[0].date)
         setReport(res.data[0])
        
         axios.get('https://kd-sema.herokuapp.com/api/v1/users/userid/'+res.data[0].oid)
         .then(res=>{
          if(res.data[0]){

             setOname(res.data[0].first_name+' '+res.data[0].last_name)
          }else{
              setOname('Not assign')
          }
         }
         )
     
         axios.get('https://kd-sema.herokuapp.com/api/v1/users/userid/'+res.data[0].vid)
         .then(res=>{
             if(res.data[0]){
             setVname(res.data[0].first_name+' '+res.data[0].last_name)
             }else{
                 setVname('Not assign')
             }
         })
     
     })


     



  }           
     
  ,[])

  
  const load=()=>{
      setInterval(()=>  
          axios.get('https://kd-sema.herokuapp.com/api/v1/reports/followuplist/'+match.params.id)
          .then(res=>{
              setFollowup(res.data)
          })            
      ,1000)
      
  }
  useEffect(()=> load(),[])


  let tabledata2 = []

 if(followup.length>0) { 
      Object.keys(followup).map((e,i)=>{

          tabledata2.push([i+1,followup[e].first_name+' '+followup[e].last_name,followup[e].time, followup[e].type,<a href={`#/followup/${followup[e].id}`}><button>View</button></a>])
      }
                                    
  )}




//update start here
const onchangeOIDPhone = (e) =>{
    const { value, name } = e.target;
    setOIDPhone(value)
    axios.get(`https://kd-sema.herokuapp.com/api/v1/users/searchuser/${value}`)
    .then(res=>{
        setOIDUsers(res.data)
    }).catch(e=>{console.log(e)})

}

const handlechangeOIDUser =(e)=>{
    const {value}=e.target
    setOIDUserselect(value)
}
const updateOID=()=>{
    const data ={
        rid : match.params.id,
        oid: OIDuserSelect
    }
    axios.put('https://kd-sema.herokuapp.com/api/v1/reports/oid',data)
    .then(res=>{
        alert('updated')
    }).catch(e=>{alert(e)})
}


const onchangePhone = (e) =>{
    const { value, name } = e.target;
    setPhone(value)
    axios.get(`https://kd-sema.herokuapp.com/api/v1/users/searchuser/${value}`)
    .then(res=>{
        setUsers(res.data)
    }).catch(e=>{console.log(e)})

}

const handlechangeUser =(e)=>{
    const {value}=e.target
    setUserselect(value)
}
const updateVID=()=>{
    const data ={
        rid : match.params.id,
        vid: userSelect
    }
    axios.put('https://kd-sema.herokuapp.com/api/v1/reports/vid',data)
    .then(res=>{
        alert('updated')
    }).catch(e=>{alert(e)})
}


const changecategory =(e)=>{
    //   alert(e)
       const {value}=e.target
       setCategory(value)
   }
   const update=()=>{
       const data ={
          rid: match.params.id ,
           category
       }
       axios.put('https://kd-sema.herokuapp.com/api/v1/reports/updatecategory',data)
       .then(res=>{
           alert('updated')
       }).catch(e=>{alert(e)})
   }

//updates end here
  



    const classes = useStyles();

    return (
        <div>
            <GridContainer>
                 <GridItem xs={12} sm={10} md={12}>
                     <Card>
                        <CardHeader color="warning" stats icon>
                                     <h1 className={classes.cardTitle}>{(match.params.action).toUpperCase()}</h1>
                        </CardHeader>
                    </Card>
                    <CardBody>
                      <Table
                       tableHeaderColor="warning"
                       tableHead={["", "", ""]}
                       tableData={[[`Reporter's name: ${report.first_name + ' '+ report.last_name}`,`Date: ${report.date}`,`soure: ${report.type}`],
                      [`State: Kaduna`,`LGA: ${report.lga}`,`Ward: ${report.ward}`],
                      [`Event: ${report.event}`,'',`Place: ${report.place}`],
                      [`Cause: ${report.cause}`, `Descr. Cause: ${report.descrcause}`,''],
                      [  '',    <img src={report.imgurla} alt='icident img' width='250px' height='250px'/>,''],
                      [`GPS: ${report.gps}`, <a href={`#/incidentmap/${report.gps}`}> <button>View location in google map</button></a>,''],
                      [`Category: ${report.category}`,'',     (match.params.action!='closed'&& match.params.action!='lga') &&     ( <div>
                      <button>Edit</button>
                     <select className='form-control' id='title' value={category} name='title' onChange={changecategory}>
                             {categorytype.map((e,i)=>
                                 <option value={e}>{e}</option>
                               )}
                             </select> 
                             <button onClick={update}>Update</button>
                             </div>)
                    
                    ],
                      [` Volunteer incharge: ${vname}`,'', 
                      (match.params.action!='closed'&& match.params.action!='lga') &&( <div>
                      <input type='text' onChange={onchangePhone} value={phone}/>
                      {users.length}
                      {userSelect}
                      <select className='form-control' id='title' name='title' onChange={handlechangeUser}>
                          <option >...select</option>
                              {Object.keys(users).map(e=>
                                  <option value={users[e].id}>{users[e].first_name}</option>
                              )}
                              </select> 
                              <button onClick={updateVID}>Update</button>
                  </div>)],
                      [ ` Officer incharge: ${oname}`,'',
                      (match.params.action!='closed'&& match.params.action!='lga') &&(<div>
            <input type='text' onChange={onchangeOIDPhone} value={OIDphone}/>
            {oidusers.length}
            {OIDuserSelect}
            <select className='form-control' id='title' name='title' onChange={handlechangeOIDUser}>
                <option >...select</option>
                    {Object.keys(oidusers).map(e=>
                        <option value={oidusers[e].id}>{oidusers[e].first_name}</option>
                    )}
                    </select> 
                    <button onClick={updateOID}>Update</button>
        </div>)]
                    
                    ]}                      
                      />
                        
                   </CardBody>
                    <CardFooter stats>
              <div className={classes.stats}>            
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Details 
                </a>
              </div>
            </CardFooter>
                </GridItem>
                <GridItem xs={12} sm={10} md={12}>
                    <Card>
                    <CardHeader color="warning" stats icon>
                                     <h1 className={classes.cardTitle}>Followup List</h1>
                        </CardHeader>
                    </Card>
                    <CardBody>
                        <Table
                         tableHeaderColor="warning"
                         tableHead={["", "", "","",""]}
                         tableData={tabledata2}
                        
                        />
                    </CardBody>
                </GridItem>
            </GridContainer>
        </div>
    )



}

export default FollowupList