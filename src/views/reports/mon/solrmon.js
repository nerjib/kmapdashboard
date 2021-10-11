
import React from 'react';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import axios from 'axios'

 
class ComponentToPrint extends React.Component {
  constructor(props){
    super(props)
    this.state={
      id: 43,
        pid: '',
        mid: '',
        mon: '',
        geo: '',
        setback: '',
        cdate: '',
        casing: '',
        casedepth: '',
        casingd: '',
        casingr: '',
        swl: '',
        yielda: '',
        grout: '',
        pumpd: '',
        pumpt: '',
        watera: '',
        color: '',
        taste: '',
        odour: '',
        platformd: '',
        shuttr: '',
        stability: '',
        soakpit: '',
        signpost: '',
        cordinate: '',
        pumps: '',
        power: '',
        cable: '',
        earth: '',
        tankpvc: '',
        tankc: '',
        tankcap: '',
        stanchion: '',
        antirust: '',
        reticulated: '',
        island: '',
        fenced: '',
        visible: '',
        imgurl1: '',
        imgurl2: '',
        imgurl3: '',
        time: '',
        gentime: '',
        ptitle:'',
        plocation: '',
        plga: '',
        pgps: '',
        contractor_id: '',
        lot: '',
        community: '',
        ward:'',
        company:'',
        Mname:''
    }
}


    componentDidMount=async()=>{
        axios.get('https://ruwassa.herokuapp.com/api/v1/monitorsreports/watereval/reports/'+this.props.id)
            .then(res=>{
                         this.setState({
                rid: res.data[0].id,
         pid: res.data[0].pid,
        mid: res.data[0].mid,
        mon: res.data[0].mon,
        geo: res.data[0].geo,
        setback: res.data[0].setback,
        cdate: res.data[0].cdate,
        casing:res.data[0].casing,
        casedepth: res.data[0].casedepth,
        casingd: res.data[0].casingd,
        casingr: res.data[0].casingr,
        swl: res.data[0].swl,
        yielda: res.data[0].yielda,
        grout: res.data[0].grout,
        pumpd: res.data[0].pumpd,
        pumpt: res.data[0].pumpt,
        watera: res.data[0].watera,
        color: res.data[0].color,
        taste: res.data[0].taste,
        odour: res.data[0].odour,
        platformd: res.data[0].platformd,
        shuttr: res.data[0].shuttr,
        stability: res.data[0].stability,
        soakpit: res.data[0].soakpit,
        signpost: res.data[0].signpost,
        cordinate: res.data[0].cordinate,
        pumps: res.data[0].pumps,
        power: res.data[0].power,
        cable: res.data[0].cable,
        earth: res.data[0].earth,
        tankpvc: res.data[0].tankpvc,
        tankc: res.data[0].tankc,
        tankcap: res.data[0].tankcap,
        stanchion: res.data[0].stanchion,
        antirust: res.data[0].antirust,
        reticulated: res.data[0].reticulated,
        island: res.data[0].island,
        fenced: res.data[0].fenced,
        visible: res.data[0].visible,
        imgurl1: res.data[0].imgurl1,
        imgurl2: res.data[0].imgurl2,
        imgurl3: res.data[0].imgurl2,
        time: res.data[0].time,
        gentime: res.data[0].gentime
              })

          

              axios.get('https://ruwassa.herokuapp.com/api/v1/projects/'+res.data[0].pid)
              .then(res=>{
                this.setState({
                  ptitle:res.data[0].title,
                  plocation: res.data[0].location,
                  plga: res.data[0].lga,
                  pgps: res.data[0].gps,
                  contractor_id: res.data[0].contractor_id,
                  lot: res.data[0].lot,
                  community: res.data[0].community,
                  ward: res.data[0].ward

                })        
                axios.get('https://ruwassa.herokuapp.com/api/v1/contractors/'+res.data[0].contractor_id)
            .then(res=>{
              this.setState({
                company: res.data[0].company,
            

              })        

          })  

            })  
            
            axios.get('https://ruwassa.herokuapp.com/api/v1/users/monitors/'+res.data[0].mid)
            .then(res=>{
              this.setState({
                Mname:res.data[0].name,
                             
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
    /*
    Object.keys(this.state.Activity).map(e=>{imgRow.push(
    <WeeklyReportImages  imgurl={(this.state.Activity[e].imgurl)}/>)
    }) ;   

                    
    Object.keys(this.state.Activity).map(e=>{row.push(<ActivityRow activity={this.state.Activity[e].activity}
      date={(this.state.Activity[e].date)} outcome={this.state.Activity[e].outcome}/>)})
*/
let facility

    return (
      <div>
     <div ><span><h5><strong>(Verification) SMBH FACILITY FORM</strong></h5></span></div>
                <table className='table table-bordered table-sm text-left' style={{border: '1px inset black'}}>
                    <thead>                        
                        <tr>
                            <th>
                            <strong> SN</strong>
                            </th>
                            <th>
                            <strong> Description</strong>
                            </th>
                            <th>
                              <strong>
                                Site Information
                              </strong>
                            </th>
                        </tr>
                        </thead>
                        
                        <tbody>
                         <tr><td>1</td>
                         <td>State</td>
                         <td>Kaduna</td>
                         </tr>
                         <tr><td>2</td>
                         <td>LGA</td>
                          <td>{this.state.plga}</td>
                         </tr>
                         <tr><td>3</td>
                         <td>Council Ward</td>
  <td>{this.state.ward}</td>
                         </tr>
                         <tr><td>4</td>
                         <td>Reporter's Id</td>
                          <td>{this.state.mid}</td>
                         </tr>
                         <tr><td>5</td>
                         <td>Reporter's Name</td>
                          <td>{this.state.Mname}</td>
                         </tr>
                         <tr><td>6</td>
                         <td>Lot</td>
                          <td>{this.state.lot}</td>
                         </tr>
                         <tr><td>7</td>
                         <td>Community Name</td>
                          <td>{this.state.community}</td>
                         </tr>
                         <tr><td>8</td>
                         <td>Name/Address of Project Location</td>
                          <td>{this.state.community}</td>
                         </tr>
                         <tr><td>9</td>
                         <td>Contractor Code</td>
                          <td>{'-'}</td>
                         </tr>
                         <tr><td>10</td>
                         <td>Name of Contractor</td>
                          <td>{this.state.company}</td>
                         </tr>
                         <tr><td>11</td>
                         <td>Type of Facility</td>
                          <td>{this.state.ptitle}</td>
                         </tr>
                         <tr>
                         <td colSpan='3'>Borehole Information</td>
                         
                         </tr>
                         <tr><td>12</td>
                         <td>Was geophysical surveydone?</td>
                          <td>{this.state.geo}</td>
                         </tr>
                         <tr><td>13</td>
                         <td>Was setback to existing structures and contamination point observed?</td>
                          <td>{this.state.setback}</td>
                         </tr>
                         <tr><td>14</td>
                         <td>Date of completion</td>
                          <td>{this.state.cdate}</td>
                         </tr>
                         <tr><td>15</td>
                         <td>Material of casing/screen (uPVC)</td>
                          <td>{this.state.casing}</td>
                         </tr>
                         <tr><td>16</td>
                         <td>Diameter of Casing/screen (Inches)</td>
                          <td>{this.state.casingd}</td>
                         </tr>
                         <tr><td>17</td>
                         <td>asing/screen pressure rating (bar)</td>
                          <td>{this.state.casingr}</td>
                         </tr>
                         <tr><td>18</td>
                         <td>Cased depth of the borehole/well (m)</td>
                          <td>{this.state.casedepth}</td>
                         </tr>
                         <tr><td>19</td>
                         <td>Estimated SWL (meters)</td>
                          <td>{this.state.swl}</td>
                         </tr>
                         <tr><td>20</td>
                         <td>Borehole/well yield sustained?</td>
                          <td>{this.state.yielda}</td>
                          </tr>
                          <tr><td>21</td>
                         <td>Grouting done?</td>
                          <td>{this.state.grout}</td>
                         </tr>
                         <tr><td>22</td>
                         <td>Depth of pump installation (meters)</td>
                          <td>{this.state.pumpd}</td>
                         </tr>
                         <tr><td>23</td>
                         <td>Type of pump install</td>
                          <td>{this.state.pumpt}</td>
                         </tr>
                         <tr><td>24</td>
                         <td>Pump security installed</td>
                          <td>{this.state.pumps}</td>
                         </tr>
                         <tr><td>25</td>
                         <td> Power source</td>
                          <td>{this.state.power}</td>
                         </tr>
                         <tr><td>26</td>
                         <td>Cable installed complete with jointing kit?</td>
                          <td>{this.state.cable}</td>
                         </tr>
                         <tr><td>27</td>
                         <td>Earthing done?</td>
                          <td>{this.state.earth}</td>
                         </tr>
                         <tr><td>28</td>
                         <td>Water quality analysis carried out by contractor?</td>
                          <td>{this.state.watera}</td>
                         </tr>
                         <tr><td>29</td>
                         <td>Colour</td>
                          <td>{this.state.color}</td>
                         </tr>
                         <tr><td>30</td>
                         <td>Taste</td>
                          <td>{this.state.taste}</td>
                         </tr>
                         <tr><td>31</td>
                         <td>Odour</td>
                          <td>{this.state.odour}</td>
                         </tr>
                         <tr><td>32</td>
                         <td>Storage tanks PVC</td>
                          <td>{this.state.tankpvc}</td>
                         </tr>
                         <tr><td>33</td>
                         <td>Colour of storage tank</td>
                          <td>{this.state.tankc}</td>
                         </tr>
                         <tr><td>34</td>
                         <td>Capacity of storage tank (Liters)</td>
                          <td>{this.state.tankcap}</td>
                         </tr>
                         <tr><td>35</td>
                         <td>Height of stanchion</td>
                          <td>{this.state.stanchion}</td>
                         </tr>
                         <tr><td>36</td>
                         <td>Stanchion structurally stable?</td>
                          <td>{this.state.stability}</td>
                         </tr>
                         <tr><td>37</td>
                         <td>Stanchion treated with anti-rust</td>
                          <td>{this.state.antirust}</td>
                         </tr>
                         <tr><td>38</td>
                         <td>Reticulated?</td>
                          <td>{this.state.reticulated}</td>
                         </tr>
                         <tr><td>39</td>
                         <td>Tap islands done?</td>
                          <td>{this.state.island}</td>
                         </tr>
                         
                           <tr><td>40</td>
                         <td>Soak pit done?</td>
                          <td>{this.state.soakpit}</td>
                         </tr>
                         <tr><td>41</td>
                         <td>Fenced?</td>
                          <td>{this.state.fenced}</td>
                         </tr>
                         <tr><td>42</td>
                         <td>Signpost installed</td>
                          <td>{this.state.signpost}</td>
                         </tr>
                         <tr><td>43</td>
                         <td>Coordinates</td>
                          <td>{this.state.cordinate}</td>
                         </tr>
                         <tr><td>44</td>
                         <td>Picture 1 (site overview)</td>
                          <td><img className='responsive-image' style={{width:200, height:200}} src={this.imgCompress(this.state.imgurl1)}></img></td>
                         </tr>
                         <tr><td></td>
                         <td>Picture 2 (Tank and panels)</td>
                          <td><img className='responsive-image' style={{width:200, height:200}} src={this.imgCompress(this.state.imgurl2)}></img></td>
                         </tr>
                         <tr><td></td>
                         <td>Picture 3 (Tap island with water running)</td>
                          <td><img className='responsive-image' style={{width:200, height:200}} src={this.imgCompress(this.state.imgurl3)}></img></td>
                         </tr>
                    </tbody>

                </table>
             Report was written on {this.state.gentime}
      </div>
      
    );
  }
}
 
export default class SolarEvalReports extends React.Component {
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

/*
import React, { Component } from 'react';
//import Printer, { print } from 'react-pdf-print'
import axios from 'axios'
import WeeklyReportImages from '../weeklyreportimages'
import ActivityRow from '../activityRow'

const ids = ['1']

class Print extends Component{

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
            const { params } = this.props.match;
    
            axios.get('https://ruwassa.herokuapp.com/api/v1/reports/submitted/weekly/'+params.id)
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
    
                  axios.get('https://ruwassa.herokuapp.com/api/v1/reports/activity/weekly/'+params.id)
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
    const { params } = this.props.match;
    let row=[];
    let imgRow=[];
    Object.keys(this.state.Activity).map(e=>{imgRow.push(
    <WeeklyReportImages  imgurl={(this.state.Activity[e].imgurl)}/>)
    }) ;                 
    Object.keys(this.state.Activity).map(e=>{row.push(<ActivityRow activity={this.state.Activity[e].activity}
                    date={(this.state.Activity[e].date)} outcome={this.state.Activity[e].outcome}/>)})
    
        const options={
            orientation: 'landscape',
            unit: 'px',
            format: [900,400]
        }
    return (
      <div className='App'>
     {//*}   <Printer>
         }   <div id={ids[0]} style={{ width:'210mm', height: '297mm' }}>
                Hello World!

                <table className='table table-bordered table-sm' style={{border: '1px inset black'}}>
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
                            <strong>  SUMMARY OF PLANNED ACTIVITIES:</strong> {this.state.summary} <strong>From </strong>{ this.state.summaryfrom }<strong> to </strong> { this.state.summaryto}
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
                        </tr>*/  
                      
      /*//                }
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
                            <strong> IS WORK PROGRESSING ACCORDING TI SUBMITED PLAN?</strong> {(this.state.compliance).toUpperCase()}<br/><br/>

                           {// <strong>  GROUP SUPERVISOR'S COMMENTS AND SIGNATURE</strong>
                            
        }</td>
                        </tr>
                        <tr>
                            <td colSpan="4" className='text-left'>
                            <strong> GENERAL SUPERVISOR'S COMMENTS AND SIGNATURE:</strong> 
                            </td>
                        </tr>
                        <tr>
                            <td>
                            {imgRow}
                            </td>
                        </tr>
                    </tbody>

                </table>
                           </div>

        {//</Printer>
        }
        <input type='button' style={{ position: 'relative', float: 'right' }}
          onClick={() => print(ids)} value='Stampa' />
      </div>
    )
  }
}
*/
//export default Print