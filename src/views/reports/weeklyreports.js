import React from 'react';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import axios from 'axios'
import WeeklyReportImages from './weeklyreportimages'
import ActivityRow from './activityRow'
//import ruwassa from 'src\img\ruwasa.jpg'

import ruwassa from '../../../src/assets/img/ruwasa.jpg'
import unicef from '../../../src/assets/img/unicef.png'
import ukaid from '../../../src/assets/img/ukaidd.jpg'

 
class ComponentToPrint extends React.Component {
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
        type:''
    }
}


    componentDidMount(){
    //   const { params } = this.props.match;

        axios.get('https://ruwassa.herokuapp.com/api/v1/reports/submitted/weekly/'+this.props.id)
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
                imgurl: this.imgCompress(res.data[0].imgurl)

              })

              axios.get('https://ruwassa.herokuapp.com/api/v1/reports/activity/weekly/'+this.props.id)
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
                  lot: res.data[0].lot,
                  community: res.data[0].community
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

  

            })
        }
               
        imgCompress=(e)=>{
          if(e){
          const intialurl = e.substring(0, 49);
    const finalurl = e.substring(50, e.length);
    return `${intialurl}/q_10/${finalurl}`
          }
      }


  render() {
    let row=[];
    let imgRow=[];
    Object.keys(this.state.Activity).map(e=>{imgRow.push(
    <WeeklyReportImages  imgurl={(this.state.Activity[e].imgurl)}/>)
    }) ;   

                    
    Object.keys(this.state.Activity).map(e=>{row.push(<ActivityRow activity={this.state.Activity[e].activity}
      date={(this.state.Activity[e].date)} outcome={this.state.Activity[e].outcome}/>)})

    return (
      <div>
        <div style={{height:'60px'}}></div>
              <div className='row'>

{//<div className='col-md-3' style={{marginLeft:30}}>
}{}  
 <img style={{zIndex:3, marginLeft:'50px',width:'60px',height:'50px', marginRight:'50px'}} className='responsive-image' id='img'  src={ukaid}
alt='Logo'  />
{/*</div>
<div className='col-md-4'>
*/}<img style={{zIndex:3, width:'60px',height:'50px',marginRight:'250px', marginLeft:'100px'}} className='responsive-image' id='img'  src={ruwassa}
alt='Logo'  /> {//</div>
}
{//<div className='col-md-4'>
}{ 
  <img style={{zIndex:3, height:'60px', marginLeft:'150px', marginRight:'200px' }}  className='responsive-image' id='img'  src={unicef}
alt='Logo'  />
}
</div>
<div style={{height:'30px'}}></div>  
{//</div>
    }    <div ><span><h5><strong>KADUNA FIELD OFFICE: WASH WEEKLY PROGRESS REPORT</strong></h5></span></div>
                <table className='table table-bordered table-sm text-left' style={{border: '1px inset black'}}>
                    <thead>
                        
                        <tr>
                            <th colSpan="3">
                            <strong> NAME OF PROJECT:</strong>KADUNA RUWASSA: {(this.state.ptitle).toUpperCase()}
                            </th>
                            <th>
                            <strong> REPORT ID:</strong> {'WR'+this.state.pid+'#'+this.state.rid}
                            </th>
                        </tr>
                        </thead>
                        
                        <tbody>
                        <tr className='text-left'>
                            <td ><strong>LGA:</strong> {(this.state.plga).toUpperCase()} <div>{this.state.community}</div></td>
                            <td ><strong>CONTRACTOR:</strong> {this.state.companyname}</td>
                            <td><strong>LOT NO:</strong>{this.state.lot}</td>
                            <td><strong>DATE:</strong> {new Date(this.state.date).getDate()+'-'+(new Date(this.state.date).getMonth()+1)+'-'+new Date(this.state.date).getFullYear()}</td>
                        </tr>
                        <tr className='text-left'>
                            <td colSpan="4">
                            <strong>  SUMMARY OF PLANNED ACTIVITIES:</strong> <strong>From </strong>{ this.state.summaryfrom }<strong> to </strong> { this.state.summaryto} {this.state.summary} 
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='4'>
                            <strong>   Summary of KEY ACTIVITIES</strong>
                            </td>
                        </tr>
                   {/*}     <tr>
                            <td colSpan='4'>
                            <strong> DETAILS OF ACTIVITIES CARRIED OUT WITH DATES: (attach photographs)</strong>
                            </td>
                        </tr>*/}
                        <tr>
                            <td><strong>DATE</strong></td>
                            <td colSpan="2"><strong>ACTIVITY</strong></td>
                            <td><strong>OUTPUT/OUTCOME</strong></td>
                        </tr>
                        {row}
                        <tr>
                                                      <td colSpan="4" className='text-left'>
                            <strong>  CONCLUSION AND RECOMMENDATION:</strong> {this.state.conclusion}
                            <br/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4" className='text-left'><strong>
                            <strong>PLANNED FOLLOW-UP ACTIVITIES FOR NEXT WEEK OTHER COMMENT:</strong></strong> {this.state.followup}
                                <br/><br/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4" className='text-left'>
                             <strong>Name of Supervisor:</strong>   {this.state.fname+' '+this.state.lname+' '+this.state.oname}<br/>
                               <br/>
                               <strong>DATE OF SUBMISSION:</strong> {new Date(this.state.date).getDate() +'-'+ (new Date(this.state.date).getMonth()+1)+' '+new Date(this.state.date).getFullYear()}<br/><br/>
                               <strong>PNONE:</strong> {this.state.phone}  <strong>EMAIL:</strong> {this.state.email}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4" className='text-left'>
                            <strong> IS WORK PROGRESSING ACCORDING TO SUBMITED PLAN?</strong> {(this.state.compliance).toUpperCase()}<br/><br/>

                           {// <strong>  GROUP SUPERVISOR'S COMMENTS AND SIGNATURE</strong>
                            
        }</td>
                        </tr>
{/*<tr>
                            <td colSpan="4" className='text-left'>
                            <strong> GENERAL SUPERVISOR'S COMMENTS AND SIGNATURE:</strong> 
                            </td>
                        </tr>*/}
                    </tbody>

                </table>
             
      <div className='row'>
      {imgRow
      }
      </div>
      </div>
      
    );
  }
}
 
export default class WeeklyReportDetails extends React.Component {
  render() {
const {params}= this.props.match
    return (
      <div>
        <ReactToPrint content={() => this.componentRef}>
          <PrintContextConsumer>
            {({ handlePrint }) => (
              <button onClick={handlePrint}>Print Report</button>
            )}
          </PrintContextConsumer>
        </ReactToPrint>
        <ComponentToPrint ref={el => (this.componentRef = el)} id={params.id}/>
      </div>
    );
  }
}

