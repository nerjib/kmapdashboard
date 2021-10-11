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

const FullFollowup = ({match}) => {

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
    const [vname, setVname]=useState('')
  const [oname, setOname]=useState('')
  




  useEffect(()=>{
    //    alert(JSON.stringify(match))
       // alert(match.params.id)
       axios.get('https://kd-sema.herokuapp.com/api/v1/reports/getfollowup/'+match.params.id)
       .then(res=>{
           setFollowupdata(res.data[0])
          
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
                      [`Category: ${report.category}`,'', <a href={`#/updatecategory/${match.params.id}`}> <button>Edit</button></a>],
                      [` Volunteer incharge: ${vname}`,'', <a href={`#/updatevid/${match.params.id}`}> <button>Edit</button></a>],
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
            </GridContainer>
        </div>
    )

}

export default FullFollowup