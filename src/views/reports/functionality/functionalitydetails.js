import React from 'react';
import axios from 'axios';
//import ActivityRow from './activityRow';
import Pdf from 'react-to-pdf';
//import ReportPie from './reportpie';
//import uncef from '../../../src/img/uncef.jpg'
import ruwassa from '../../../../src/assets/img/ruwasa.jpg'
import unicef from '../../../../src/assets/img/unicef.png'
import ukaid from '../../../../src/assets/img/ukaidd.jpg';




const ref=React.createRef();
const ref1=React.createRef();


export default class FunctionalityDetails extends React.Component {
constructor(props){
    super(props)
    this.state={
        followup:[],
        status:'xx',
        acttype:''
    }
}


    componentDidMount=()=>{
      const acttype= localStorage.getItem('acttype')
      this.setState({
          acttype
      })

        const { params } = this.props.match;
//alert(params.id)
        axios.get('https://ruwassa.herokuapp.com/api/v1/vlc/followup/getreport/'+params.id)
            .then(res=>{
            //    alert(res.data[0])
              this.setState({
                followup: res.data[0],
                status: res.data[0].status
              })

            }).catch(e=>{console.log(e)})
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

      gotoAccept=()=>{
        const { params } = this.props.match;

        const data={
          pid: this.state.followup.id,
          id: params.id,
          status: 'accepted',
          functionality:  this.state.followup.functionality

        }
        axios.put('https://ruwassa.herokuapp.com/api/v1/reports/functionalitystatus/update', data)
        .then(req=>{
          this.setState({
            status:'updated'
          })
        }).catch(e=>{alert(e)})


      }
      gotoDecline=()=>{
        const { params } = this.props.match;

        const data={
          pid: this.state.followup.id,
          id: params.id,
          status: 'declined',
          functionality:  this.state.followup.functionality

        }
        axios.put('https://ruwassa.herokuapp.com/api/v1/reports/functionalitystatus/update', data)
        .then(req=>{
          this.setState({
            status:'updated'
          })
        }).catch(e=>{alert(e)})


      }

      render(){
        const { params } = this.props.match;
        let row=[]; 
            const options={
                orientation: 'landscape',
                unit: 'px',
                format: [900,400]
            }

            const getpdf=({toPdf})=>{
return (<div>

{/*}                <Pdf  targetRef={ref} filename={this.state.lot+'_'+this.state.pid+'_'+this.state.ptitle+'_'+this.state.plga+'_'+this.state.summaryfrom+'_'+this.state.summaryto} 
              x={1} y={1}
              >
                {toPdf}
             </Pdf>
*/}
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
      {/*}          <Pdf  targetRef={ref} filename={this.state.lot+'_'+this.state.pid+'_'+this.state.ptitle+'_'+this.state.plga+'_'+this.state.summaryfrom+'_'+this.state.summaryto} 
                x={1} y={1}
                >
                    {({toPdf})=><button className='btn btn-default btn-info' onClick={toPdf}>Download Report{this.state.ppstatus}</button>}
                </Pdf>
   */}           
                </div>
                {this.state.followup &&
                <div className='row'>
    
                  <div className='fluid-container col-md-12'ref={ref}>
                <br/><br/>
                <div className='col-md-12 row'>
    
 



       
        
    </div>

    <br/>
<br/>
                <div className=' col-md-7' style={{display:this.state.reportdisplay }}>
    <div ><span><h5><strong>Functionality Report {this.state.followup.length}</strong></h5></span></div>
                <table className='table table-bordered table-sm ' style={{border: '1px inset black'}}>
                    <thead>
                        
                        <tr>
                            <th colSpan="3">
                            <strong> NAME OF PROJECT:</strong>KADUNA RUWASSA: {(this.state.followup.title)}
                            </th>
                            <th>
                  <strong> REPORT ID:<a href={`#/projects/${this.state.followup.id}`}>{this.state.followup.id+'/'+this.state.followup.fid }</a></strong> 
                            </th>
                        </tr>
                        </thead>
                        
                        <tbody>
                        <tr className='text-left'>
                            <td >
                            
                              <strong>Community:</strong> {this.state.followup.community}</td>
                            <td > Ward: {this.state.followup.ward}</td>
    <td> LGA: {this.state.followup.lga}</td>
                            <td><strong>DATE:</strong> {new Date(this.state.followup.time).getDate()+'-'+(new Date(this.state.followup.time).getMonth()+1)+'-'+new Date(this.state.followup.time).getFullYear()}<br/><strong>GPS:</strong><a href={`#/sitemap/${this.state.followup.cordinate}`}>  {this.state.followup.cordinate}</a></td>
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
                      <td>Lot No: {this.state.followup.lot}<br/> Phase: {this.state.followup.phase}</td><td colSpan='3' >Contractor: {this.state.followup.company}</td>
                        </tr>
                      
                      <tr>
                            <td colSpan="4" className='text-left'>
                            <strong> Is the facility funtional?</strong> {(this.state.followup.functionality)}<br/><br/>
                            <strong>Problem</strong> { this.state.followup.problem}<br/>
                            <strong>Problem duration</strong>{this.state.followup.problemduration}<br/>
                            <strong>Cause</strong>{this.state.followup.cause }<br/>
                            </td>
                        </tr>
                        <tr><td colSpan='5'>
                        <div className='row'>
                        <div className='col-xd-2' style={{margin:20}}> <img className='responsive-image' style={{width:200, height:200}} src={this.state.followup.imgurl1}/>
                        </div>
      {  this.state.followup.imgurl2 !='' &&                <div className='col-xd-2' style={{margin:20}}> <img className='responsive-image' style={{width:200, height:200}} src={this.state.followup.imgurl2}/>
</div>}
                        </div>
                            </td></tr>
                    <tr><td colSpan='5'> Reported by: {this.state.followup.first_name+' '+this.state.followup.last_name+' '+this.state.followup.other_name}<br/>
                        Phone no. {this.state.followup.phone}<br/>
                        Role  {this.state.followup.type}<br/>

                    </td></tr>
            {/*}           <tr> <td>{this.state.activitydate}</td><td colSpan='2'>{this.state.activity1}</td><td>{this.state.activityoutcome}</td></tr>
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
                    */}                  
                       
                    </tbody>

                </table>
                Status:  {this.state.followup.status}

         { (!this.state.status & this.state.acttype=='superadmin') &&      <div>
                <button onClick={this.gotoAccept}> Accept</button>
                <button onClick={this.gotoDecline}> Decline</button>
                </div>}

                </div>
              </div>
             
            
            
                     </div>}
                     </div>

        )
    }
}