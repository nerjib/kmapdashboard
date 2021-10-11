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

const FollowupDetails = ({match}) => {

  const [report, setReport] = useState('')
  const [msg, setMsg]=useState('')
  const [gps, setGPS]=useState('')
  const [vname, setVname]=useState('')
  const [oname, setOname]=useState('')
  const [draftdate, setDate]=useState('')
  const [imgurl1, setImgurl1]=useState('')
  const [imgurl2, setImgurl2]=useState('')
  const [aidname, setAid]=useState('')
  const [followup, setFollowup]=useState([])
  const [followupdata, setFollowupdata]=useState([])

  const [phone, setPhone]=useState('')
  const [users, setUsers]= useState('')
  const [userSelect, setUserselect]= useState('')
  const [category, setCategory]= useState('followup')
  const [ridd, setRid]= useState('')

  const categorytype=['followup','close','rejected']

const onchangePhone = (e) =>{
    const { value, name } = e.target;
    setPhone(value)
    axios.get(`https://kd-sema.herokuapp.com/api/v1/users/searchuser/${value}`)
    .then(res=>{
        setUsers(res.data)
    }).catch(e=>{console.log(e)})

}


  useEffect(()=>{
    //    alert(JSON.stringify(match))
       // alert(match.params.id)
       axios.get('https://kd-sema.herokuapp.com/api/v1/reports/getfollowup/'+match.params.id)
       .then(res=>{
           setFollowupdata(res.data[0])
           setRid(res.data[0].rid)
          
       axios.get('https://kd-sema.herokuapp.com/api/v1/reports/getdraft/'+res.data[0].rid)
       .then(res=>{
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
    })
    }                
    ,[])

    const load=()=>{
        setInterval(()=>  
            axios.get('https://kd-sema.herokuapp.com/api/v1/reports/followup/'+match.params.id)
            .then(res=>{
                setFollowup(res.data)
            })            
        ,1000)
    }
    useEffect(()=> load(),[])

 const   onchangeMsg=(e)=>{
 const { value, name } = e.target;
//    alert(value)
        setMsg(value)
    }
    const submit=(e)=>{
        const data = {
            rid: match.params.id,
            senderid: 10,
            receiverid: report.aid,
            msg,
            imgurl1,
            imgurl2
        }
        axios.post('https://kd-sema.herokuapp.com/api/v1/reports/feedback', data)
        .then(res=>{
            alert('sent')
            setMsg('')
            setImgurl1('')
            setImgurl2('')
        })

    }

    const changecategory =(e)=>{
        //   alert(e)
           const {value}=e.target
           setCategory(value)
       }
       const update=()=>{
           const data ={
               rid:ridd ,
               category
           }
           axios.put('https://kd-sema.herokuapp.com/api/v1/reports/updatecategory',data)
           .then(res=>{
               alert('updated')
           }).catch(e=>{alert(e)})
       }

   const classes = useStyles();

    return (
        <div>
            <GridContainer>
                 <GridItem xs={12} sm={10} md={12}>
                     <Card>
                        <CardHeader color="warning" stats icon>
                                     <h1 className={classes.cardTitle}>Hello</h1>
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
                      [`Category: ${report.category}`,'',                     <div>
                       <button>Edit</button>
                      <select className='form-control' id='title' value={category} name='title' onChange={changecategory}>
                              {categorytype.map((e,i)=>
                                  <option value={e}>{e}</option>
                                )}
                              </select> 
                              <button onClick={update}>Update</button>
                              </div>
                    
                    ],
                      [` Volunteer incharge: ${vname}`,'', <a href={`#/updatevid/${ridd}`}> <button>Edit</button></a>],
                      [ ` Officer incharge: ${oname}`,'', <a href={`#/updateoid/${match.params.id}`}> <button>Edit</button></a>]
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
                                     <h1 className={classes.cardTitle}>Hello</h1>
                        </CardHeader>
                    </Card>


                    <CardBody>
                    <table >
              <tbody>
                  <tr>
                    <td>
                        <tr><td>Killed</td><td>{followupdata.killed}</td></tr>
                        <tr><td>Men</td><td>{followupdata.killedmen}</td></tr>
                        <tr><td>Women</td><td>{followupdata.killedwomen}</td></tr>
                        <tr><td>Children</td><td>{followupdata.killedchildren}</td></tr>
                        <tr><td>Elder</td><td>{followupdata.killedelder}</td></tr>
                    </td>
                       <td>
                        <tr><td>Missing</td><td>{followupdata.missing}</td></tr>
                        <tr><td>Men</td><td>{followupdata.missingmen}</td></tr>
                        <tr><td>Women</td><td>{followupdata.missingwomen}</td></tr>
                        <tr><td>Children</td><td>{followupdata.missingchildren}</td></tr>
                        <tr><td>Elder</td><td>{followupdata.missingelder}</td></tr>
                    </td>
                    <td>
                        <tr><td>Injured</td><td>{followupdata.injured}</td></tr>
                        <tr><td>Men</td><td>{followupdata.injuredmen}</td></tr>
                        <tr><td>Women</td><td>{followupdata.injuredwomen}</td></tr>
                        <tr><td>Children</td><td>{followupdata.injuredchildren}</td></tr>
                        <tr><td>Elder</td><td>{followupdata.injuredelder}</td></tr>
                    </td>
                    
                    <td>Magnitude {followupdata.missing}</td>
                      </tr>
                      <tr>
                    <td>
                        <tr><td>Affected</td><td>{followupdata.affected}</td></tr>
                        <tr><td>Families</td><td>{followupdata.affectedfamilies}</td></tr>
                        <tr><td>Men</td><td>{followupdata.affectedmen}</td></tr>
                        <tr><td>Women</td><td>{followupdata.affectedwomen}</td></tr>
                        <tr><td>Children</td><td>{followupdata.affectedchildren}</td></tr>
                        <tr><td>Elder</td><td>{followupdata.affectedelder}</td></tr>
                    </td>
                    <td>
                        <tr><td>Victim</td><td>{followupdata.victim}</td></tr>
                        <tr><td>Families</td><td>{followupdata.victimfamilies}</td></tr>
                        <tr><td>Men</td><td>{followupdata.victimmen}</td></tr>
                        <tr><td>Women</td><td>{followupdata.victimwomen}</td></tr>
                        <tr><td>Children</td><td>{followupdata.victimchildren}</td></tr>
                        <tr><td>Elder</td><td>{followupdata.victimelder}</td></tr>
                    </td>
                    <td>
                        <tr><td>Transferred</td><td>{followupdata.transferred}</td></tr>
                        <tr><td>Families</td><td>{followupdata.transferredfamilies}</td></tr>
                        <tr><td>Men</td><td>{followupdata.transferredmen}</td></tr>
                        <tr><td>Women</td><td>{followupdata.transferredwomen}</td></tr>
                        <tr><td>Children</td><td>{followupdata.transferredchildren}</td></tr>
                        <tr><td>Elder</td><td>{followupdata.transferredelder}</td></tr>
                    </td>
                    
                    <td>
                        <tr><td>Evacuated</td><td>{followupdata.evacuated}</td></tr>
                        <tr><td>Families</td><td>{followupdata.evacuatedfamilies}</td></tr>
                        <tr><td>Men</td><td>{followupdata.evacuatedmen}</td></tr>
                        <tr><td>Women</td><td>{followupdata.evacuatedwomen}</td></tr>
                        <tr><td>Children</td><td>{followupdata.evacuatedchildren}</td></tr>
                        <tr><td>Elder</td><td>{followupdata.evacuatedelder}</td></tr>
                    </td>
                      </tr>
                      <tr>
                    <td>
                        <tr><td>Houses Destroyed</td><td>{followupdata.housesdestroyed}</td></tr>
                        <tr><td>Brick/Concrete</td><td>{followupdata.housesdestroyedbrick}</td></tr>
                        <tr><td>Wood/Bamboo</td><td>{followupdata.housesdestroyedwood}</td></tr>
                     </td>
                    <td>
                        <tr><td>Houses damaged</td><td>{followupdata.housesdamaged}</td></tr>
                        <tr><td>Brick/Concrete</td><td>{followupdata.housesdamagedbrick}</td></tr>
                        <tr><td>Wood/Bamboo</td><td>{followupdata.housesdamagedwood}</td></tr>
                     </td>
                    <td>
                        <tr><td>Schools destroyed</td><td>{followupdata.schoolsdestroyed}</td></tr>
                        <tr><td>Classes</td><td>{followupdata.schoolsdestroyedclass}</td></tr>
                        <tr><td>Student</td><td>{followupdata.schoolsdestroyedstudents}</td></tr>
                     </td>
                    
                    <td>
                        <tr><td>Schools Damaged</td><td>{followupdata.schoolsdamaged}</td></tr>
                        <tr><td>Classes</td><td>{followupdata.schoolsdamagedclass}</td></tr>
                        <tr><td>Students</td><td>{followupdata.schoolsdamagedstudents}</td></tr>
                     </td>
                      </tr>

                      <tr>
                    <td>
                        <tr><td>Hospital destroyed</td><td>{followupdata.hospitaldestroyed}</td></tr>
                        <tr><td>Hospital damaged</td><td>{followupdata.hospitaldamaged}</td></tr>
                     </td>
                    <td>
                        <tr><td>Health centers destroyed</td><td>{followupdata.healthcentersdestroyed}</td></tr>
                        <tr><td>Health centers damaged</td><td>{followupdata.healthcentersdamaged}</td></tr>
                     </td>
                    <td>
                        <tr><td>Health posts destroyed</td><td>{followupdata.healthpostsdestroyed}</td></tr>
                        <tr><td>health posts damaged</td><td>{followupdata.healthpostsdamaged}</td></tr>
                     </td>                    
                   
                      </tr>

                      <tr>
                    <td>
                        <tr><td>Religious buildings destroyed</td><td>{followupdata.religiousbuildingsdestroyed}</td></tr>
                        <tr><td>Religious buildings damaged</td><td>{followupdata.religiousbuildingsdamaged}</td></tr>
                     </td>
                    <td>
                        <tr><td>Public buildings destroyed</td><td>{followupdata.publicbuildingdestroyed}</td></tr>
                        <tr><td>Public buildings damaged</td><td>{followupdata.publicbuildingdamaged}</td></tr>
                     </td>
                    <td>
                        <tr><td>Cost damages(local)</td><td>{followupdata.costdamageslocal}</td></tr>
                        <tr><td>Cost damages ($usd)</td><td>{followupdata.costdamagesdolar}</td></tr>
                     </td>                    
                   
                      </tr>

              </tbody>
          </table>
                        
                   </CardBody>
                    <CardFooter stats>
              <div className={classes.stats}>            
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Details 
                </a>
              </div>
            </CardFooter>
                </GridItem>
            </GridContainer>
        </div>
    )

}

export default FollowupDetails