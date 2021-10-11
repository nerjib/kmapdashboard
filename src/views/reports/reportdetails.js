import React from 'react';
import axios from 'axios';
import ActivityRow from './activityRow';
import Pdf from 'react-to-pdf';
import ruwassa from '../../../src/assets/img/ruwasa.jpg'
import unicef from '../../../src/assets/img/unicef.png'
import ukaid from '../../../src/assets/img/ukaidd.jpg';


///var geocoding = new require('reverse-geocoding')


const ref=React.createRef();
const ref1=React.createRef();


export default class ReportDetails extends React.Component {
constructor(props){
    super(props)
    this.state={
        rid: '',
        pid: '',
        uid: '',
        summary: '',
        summaryfrom: '',
        summaryto: '',
        conclusion: '',
        followup: '',
        date: '',
        compliance: '',
        ptitle: '',
        plocation: '',
        plga: '',
        pgps: '',
        fname: '',
        lname: '',
        phone: '',
        oname: '',
        email: '',
        Activity:'',
        gps:'',
        contractor_id:'',
        companyname:'',
        imgdisplay:'none',
        reportdisplay:'',
        activity1:'',
        activitydate:'',
        activityoutcome:'',
        imgurl:'',
        lot:'',
        projectstage:'',
        thirdremark:'',
        thirdparty: '',
        thirdimg: '',
        thirdname:''
    }
}


    componentDidMount(){
        const { params } = this.props.match;

        axios.get('https://ruwassa.herokuapp.com/api/v1/reports/'+params.id)
            .then(res=>{
              this.setState({
                rid: res.data[0].id,
                pid: res.data[0].pid,
                uid: res.data[0].uid,
                summary: res.data[0].summary,
                summaryfrom:res.data[0].summaryfrom,
                summaryto:res.data[0].summaryto,
                conclusion:res.data[0].conclusion,
                followup:res.data[0].followup,
                date:res.data[0].date,
                compliance:res.data[0].compliance,
                gps:res.data[0].gps,
                activity1: res.data[0].activity,
                activitydate: res.data[0].activitydate,
                activityoutcome: res.data[0].activityoutcome,
                imgurl: this.imgCompress(res.data[0].imgurl),
                projectstage: res.data[0].pstatus,
                thirdparty: res.data[0].thirdparty,
                thirdremark: res.data[0].thirdremark,
                thirdimg: res.data[0].imgurl2,
                thirdname: res.data[0].thirdname
              })
              axios.get('https://ruwassa.herokuapp.com/api/v1/reports/activity/'+params.id)
            .then(res=>{
              this.setState({
               Activity: res.data
              })
            }).catch(error=>{console.log(error)})

              axios.get('https://ruwassa.herokuapp.com/api/v1/projects/'+this.state.pid)
              .then(res=>{
                this.setState({
                  ptitle:res.data[0].title,
                  plocation: res.data[0].location,
                  plga: res.data[0].lga,
                  pgps: res.data[0].gps,
                  contractor_id: res.data[0].contractor_id,
                  lot:res.data[0].lot,
                  ppstatus: res.data[0].status,
                  comunity: res.data[0].community
                })

                axios.get('https://ruwassa.herokuapp.com/api/v1/contractors/'+res.data[0].contractor_id)
                .then(res=>{
                    this.setState({
                        companyname: res.data[0].company
                    })
                })

            })  

            axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+this.state.uid)
              .then(res=>{
                this.setState({
                  fname:res.data[0].first_name,
                  lname: res.data[0].last_name,
                  phone: res.data[0].phone,
                  oname: res.data[0].other_name,
                  email: res.data[0].email,                 
                })
            })  

            axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+this.state.contractor_id)
            .then(res=>{
              this.setState({
           //     companyname:res.data[0].company,
                           
              })
          })  
  

            })
        }

        imgCompress=(e)=>{
          if(e){
          const intialurl = e.substring(0, 49);
    const finalurl = e.substring(50, e.length);
    return `${intialurl}/q_10/${finalurl}`
          }
      }

      geocode=(e)=>{
        const f=e.split
        let config = {
          'latitude': e[0],
          'longitude': e[1]
        }

        let lat=0;
        let lon=0
        if(e){
          lat=((e).split(","))[0];
          lon=((e).split(","))[1]
        }
      if (lat!=0){
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyAVT4-Uzdp9LaBGtIFlw7iGEKbPQ8fZxHI`)
          .then(req=>{
         //  alert(lat)
          alert(req.data.results[0].address_components[0].long_name)
          })
        }
      }

      render(){
        const { params } = this.props.match;
        let row=[];
        Object.keys(this.state.Activity).map(e=>{row.push(<ActivityRow activity={this.state.Activity[e].activity}
                        date={new Date(this.state.Activity[e].date).getDate()} outcome={this.state.Activity[e].outcome}/>)})
        
            const options={
                orientation: 'landscape',
                unit: 'px',
                format: [900,400]
            }

            const getpdf=({toPdf})=>{
return (<div>

                <Pdf  targetRef={ref} filename={this.state.lot+'_'+this.state.pid+'_'+this.state.ptitle+'_'+this.state.plga+'_'+this.state.summaryfrom+'_'+this.state.summaryto} 
              x={1} y={1}
              >
                {toPdf}
             </Pdf>
              </div>)
            }

        return(
            <div className='fluid-container'>
{/*
<Pdf>
    {({toPdf, targetRef}) =>  (
        <div style={{width: 500, height: 500, background: 'red'}} onClick={toPdf} ref={targetRef}/>
    )}
</Pdf>
*/}
                <div className='col-md-12'  >
                <Pdf  targetRef={ref} filename={this.state.lot+'_'+this.state.pid+'_'+this.state.ptitle+'_'+this.state.plga+'_'+this.state.summaryfrom+'_'+this.state.summaryto} 
                x={1} y={1}
                >
                    {({toPdf})=><button className='btn btn-default btn-info' onClick={toPdf}>Download Report{this.state.ppstatus}</button>}
                </Pdf>
              
                </div>
                <div className='row'>
    
                  <div className='fluid-container col-md-12'ref={ref}>
                <br/><br/>
                <div className='col-md-12 row'>
    
 



  {  <img style={{zIndex:3, width:50, position:'relative', height:50, flex:1}} className='responsive-image' id='img'  src={ukaid}
   alt='Logo'  />
/*<div className='col-md-3'>
 <img style={{zIndex:3, width:'50%', height:'50%', marginLeft:40}} className='responsive-image' id='img'  src={ruwassa}
alt='Logo'  /></div>
<div className='col-md-4'>
<img style={{zIndex:3, width:'50%'}} className='responsive-image' id='img'  src={ukaid}
alt='Logo'  />
</div>
*/
      }
     <img style={{zIndex:3, width:'50px',height:'50px',flex:1,  marginLeft:0}} className='responsive-image' id='img'  src={ruwassa}
    alt='Logo'  />

  {}  <img style={{zIndex:3, height:'50px' }}  className='responsive-image' id='img'  src={unicef}
   alt='Logo'  />

        
    </div>

    <br/>
<br/>
                <div className=' col-md-7' style={{display:this.state.reportdisplay }}>
                <div ><span><h5><strong>KADUNA FIELD OFFICE: WASH DAILY PROGRESS REPORT</strong></h5></span></div>
                <table className='table table-bordered table-sm ' style={{border: '1px inset black'}}>
                    <thead>
                        
                        <tr>
                            <th colSpan="3">
                            <strong> NAME OF PROJECT:</strong>KADUNA RUWASSA: {(this.state.ptitle).toUpperCase()}
                            </th>
                            <th>
                            <strong> REPORT ID:</strong> {this.state.rid+'#'+this.state.pid}
                            </th>
                        </tr>
                        </thead>
                        
                        <tbody>
                        <tr className='text-left'>
                            <td >
                            
                              <strong>LGA:</strong> {(this.state.plga).toUpperCase()} <div>{this.state.comunity}</div></td>
                            <td ><strong>CONTRACTOR:</strong> {this.state.companyname}</td>
                            <td><strong>LOT NO:</strong> {this.state.lot}</td>
                            <td><strong>DATE:</strong> {new Date(this.state.date).getDate()+'-'+(new Date(this.state.date).getMonth()+1)+'-'+new Date(this.state.date).getFullYear()}<br/><strong>GPS:</strong><a href={`#/sitemap/${this.state.gps}`}>  {this.state.gps}</a></td>
                       {//     <td>{(new Date(this.state.date).toString()).substr(0,3)}</td>
                       }
                       </tr>
                      
                     {/*}
                        <tr>
                            <td colSpan='4'>
                            <strong> DETAILS OF ACTIVITIES CARRIED OUT WITH DATES: (attach photographs)</strong>
                            </td>
                        </tr>*/
                        }
                        <tr>
                            <td><strong>DATE</strong></td>
                            <td colSpan="2"><strong>ACTIVITY</strong></td>
                            <td><strong>OUTPUT/OUTCOME</strong></td>
                        </tr>
                        {row}
                       <tr> <td>{this.state.activitydate}</td><td colSpan='2'>{this.state.activity1}</td><td>{this.state.activityoutcome}</td></tr>
                        <tr><td colSpan='5'>
                        <div className='row'>
                        <div className='col-xd-2' style={{margin:20}}> <img className='responsive-image' style={{width:200, height:200}} src={this.state.imgurl}/>
                      <div> {this.state.projectstage}</div>
                        </div>
      {  this.state.thirdimg !='' &&                <div className='col-xd-2' style={{margin:20}}> <img className='responsive-image' style={{width:200, height:200}} src={this.state.thirdimg}/>
</div>}
                        </div>
                            </td></tr>
                            <tr>
                            <td colSpan="4" className='text-left'>
                            <strong> IS WORK PROGRESSING ACCORDING TO SUBMITED PLAN?</strong> {(this.state.compliance).toUpperCase()}<br/><br/>
                           <strong>Is third party on site</strong>{this.state.thirdparty +', '+this.state.thirdname}
                            <strong>Remark by third party</strong> { this.state.thirdremark}
                            </td>
                        </tr>
                        
                        <tr>
                                                      <td colSpan="4" className='text-left'>
                            <strong>  CONCLUSION AND RECOMMENDATION:</strong> {this.state.conclusion}
                            <br/>
                            </td>
                        </tr>
                  
                        <tr>
                            <td colSpan="4" className='text-left'>
                             <strong>Name of Supervisor:</strong>   {this.state.fname+' '+this.state.lname+' '+this.state.oname}<br/>
                               <br/>
                               <strong>DATE OF SUBMISSION:</strong> {new Date(this.state.date).getDate() +'-'+ (new Date(this.state.date).getMonth()+1)+'-'+new Date(this.state.date).getFullYear()}<br/><br/>
                               <strong>PNONE:</strong> {this.state.phone}  <strong>EMAIL:</strong> {this.state.email}
                            </td>
                        </tr>
                      
                       
                    </tbody>

                </table>
                </div>
              </div>
             
            
            
                     </div>
                     </div>

        )
    }
}