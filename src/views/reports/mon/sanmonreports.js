
import React from 'react';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import axios from 'axios'
//import WeeklyReportImages from '../weeklyreportimages'
//import ActivityRow from '../activityRow'
//import ruwassa from 'src\img\ruwasa.jpg'

 
class ComponentToPrint extends React.Component {
  constructor(props){
    super(props)
    this.state={
      id: '',
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
        axios.get('https://ruwassa.herokuapp.com/api/v1/monitorsreports/sanitationeval/reports/'+this.props.id)
            .then(res=>{
                         this.setState({
                    id: res.data[0].id,
                    pid: res.data[0].pid,
                    mid: res.data[0].mid,
                    mon: res.data[0].mon,
                    setback: res.data[0].setback,
                    structure: res.data[0].structure,
                    cdate: res.data[0].cdate,
                    usage: res.data[0].usage,
                    restoration: res.data[0].restoration,
                    distance: res.data[0].distance,
                    area: res.data[0].area,
                    pitarea: res.data[0].pitarea,
                    compartment: res.data[0].compartment,
                    urinals: res.data[0].urinals,
                    nourinals: res.data[0].nourinals,
                    tiled: res.data[0].tiled,
                    laterinet: res.data[0].laterinet,
                    tilequality: res.data[0].tilequality,
                    tilec: res.data[0].tilec,
                    nobasins: res.data[0].nobasins,
                    washbasins: res.data[0].washbasins,
                    physicallyaid: res.data[0].physicallyaid,
                    door: res.data[0].door,
                    gauge: res.data[0].gauge,
                    antirust: res.data[0].antirust,
                    subs: res.data[0].subs,
                    slabs: res.data[0].slabs,
                    pit: res.data[0].pit,
                    crack: res.data[0].crack,
                    crackt: res.data[0].crackt,
                    defect: res.data[0].defect,
                    sdefect: res.data[0].sdefect,
                    rendered: res.data[0].rendered,
                    sandblast: res.data[0].sandblast,
                    artwork: res.data[0].artwork,
                    tank: res.data[0].tank,
                    tankembeded: res.data[0].tankembeded,
                    tankcap: res.data[0].tankcap,
                    tankc: res.data[0].tankc,
                    soakpit: res.data[0].soakpit,
                    urinalpit: res.data[0].urinals,
                    imgurl1: res.data[0].imgurl1,
                    imgurl2: res.data[0].imgurl2,
                    imgurl3: res.data[0].imgurl3,
                    imgurl4: res.data[0].imgurl4,
                    time: res.data[0].time,
                    cordinate: res.data[0].cordinate,
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

    return (
      <div>
     <div ><span><h5><strong>(Verification) SANITATION FACILITY FORM</strong></h5></span></div>
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
                         <td colSpan='3'>Information</td>
                         
                         </tr>
                         <tr><td>12</td>
                         <td>Was setback to existing structures and contamination point observed?</td>
                          <td>{this.state.setback}</td>
                         </tr>
                         <tr><td>13</td>
                         <td>Structure: well oriented</td>
                          <td>{this.state.structure}</td>
                         </tr>
                         <tr><td>14</td>
                         <td>Date of completion</td>
                          <td>{this.state.cdate}</td>
                         </tr>
                         <tr><td>15</td>
                         <td>Facility in use?</td>
                          <td>{this.state.usage}</td>
                         </tr>
                         <tr><td>16</td>
                         <td>Site reclamation and restoration done?</td>
                          <td>{this.state.restoration}</td>
                         </tr>
                         <tr><td>17</td>
                         <td>istance between the two blocks (Meters)</td>
                          <td>{this.state.distance}</td>
                         </tr>
                         <tr><td>18</td>
                         <td>Area of building</td>
                          <td>{this.state.area}</td>
                         </tr>
                         <tr><td>19</td>
                         <td>Area of pits/cesspool to specification?</td>
                          <td>{this.state.pitarea}</td>
                         </tr>
                         <tr><td>20</td>
                         <td>Number of compartment</td>
                          <td>{this.state.compartment}</td>
                          </tr>
                          <tr><td>21</td>
                         <td>Urinals?</td>
                          <td>{this.state.urinals}</td>
                         </tr>
                         <tr><td>22</td>
                         <td>Number of urinals compartment</td>
                          <td>{this.state.nourinals}</td>
                         </tr>
                         <tr><td>23</td>
                         <td>All wet areas tiled as specified?</td>
                          <td>{this.state.tiled}</td>
                         </tr>
                         <tr><td>24</td>
                         <td>Latrine compartment tiled?</td>
                          <td>{this.state.laterinet}</td>
                         </tr>
                         <tr><td>25</td>
                         <td>quality of tiling</td>
                          <td>{this.state.tilequality}</td>
                         </tr>
                         <tr><td>26</td>
                         <td>Colour of tile</td>
                          <td>{this.state.tilec}</td>
                         </tr>
                         <tr><td>27</td>
                         <td>Number of wash hand basins installed?</td>
                          <td>{this.state.nobasins}</td>
                         </tr>
                         <tr><td>28</td>
                         <td>Wash hand basins embedded in block?</td>
                          <td>{this.state.washbasins}</td>
                         </tr>
                         <tr><td>29</td>
                         <td>Physically challenged aids installed as specified?</td>
                          <td>{this.state.physicallyaid}</td>
                         </tr>
                         <tr><td>30</td>
                         <td>Doors to specicified size?</td>
                          <td>{this.state.door}</td>
                         </tr>
                         <tr><td>31</td>
                         <td>Gauge and type of all metal work as specicified?</td>
                          <td>{this.state.gauge}</td>
                         </tr>
                         <tr><td>32</td>
                         <td>All metal works treated with anti-rust?</td>
                          <td>{this.state.antirust}</td>
                         </tr>
                         <tr><td>33</td>
                         <td>Substructure walls filled with weak concrete?</td>
                          <td>{this.state.subs}</td>
                         </tr>
                         <tr><td>34</td>
                         <td>Cover slabs well placed?</td>
                          <td>{this.state.slabs}</td>
                         </tr>
                         <tr><td>35</td>
                         <td>Top of pits/cesspool one course above ground level</td>
                          <td>{this.state.pit}</td>
                         </tr>
                         <tr><td>36</td>
                         <td>Cracks on building</td>
                          <td>{this.state.crack}</td>
                         </tr>
                         <tr><td>37</td>
                         <td>If 36 is yes, type of crak</td>
                          <td>{this.state.crack}</td>
                         </tr>
                         <tr><td>38</td>
                         <td>Defect on any part of the structure?</td>
                          <td>{this.state.defect}</td>
                         </tr>
                         <tr><td>39</td>
                         <td>Specify defect</td>
                          <td>{this.state.sdefect}</td>
                         </tr>
                         <tr><td>40</td>
                         <td>Internal and external of building well rendered?</td>
                          <td>{this.state.rendered}</td>
                         </tr>
                         <tr><td>41</td>
                         <td>External walls finished with sandblasting?</td>
                          <td>{this.state.sandblast}</td>
                         </tr>
                         <tr><td>42</td>
                         <td>Artwork done?</td>
                          <td>{this.state.artwork}</td>
                         </tr>
                         <tr><td>43</td>
                         <td>Water tank done?</td>
                          <td>{this.state.tank}</td>
                         </tr>
                         <tr><td>44</td>
                         <td>Tank embedded in concrete as specified?</td>
                          <td>{this.state.tankembeded}</td>
                         </tr>
                         <tr><td>45</td>
                         <td>Size of tank?</td>
                          <td>{this.state.tankcap}</td>
                         </tr>
                         <tr><td>46</td>
                         <td>Colour of tank</td>
                          <td>{this.state.tankc}</td>
                         </tr>
                         <tr><td>47</td>
                         <td>Soak pit urinial installed?</td>
                          <td>{this.state.soakpit}</td>
                         </tr>
                         <tr><td>48</td>
                         <td>Signpost installed?</td>
                          <td>{this.state.signpost}</td>
                         </tr>
                         <tr><td></td>
                         <td><strong>Captures</strong></td>
                          <td><strong>Details</strong></td>
                         </tr>
                         <tr><td>49</td>
                         <td>Coordinates</td>
                          <td>{this.state.cordinate}</td>
                         </tr>                        
                         <tr><td>50</td>
                         <td>Picture 1 (site overview)</td>
                          <td><img className='responsive-image' style={{width:200, height:200}} src={this.imgCompress(this.state.imgurl1)}></img></td>
                         </tr>
                         <tr><td></td>
                         <td>Picture 2 </td>
                          <td><img className='responsive-image' style={{width:200, height:200}} src={this.imgCompress(this.state.imgurl2)}></img></td>
                         </tr>
                         <tr><td></td>
                         <td>Picture 3 </td>
                          <td><img className='responsive-image' style={{width:200, height:200}} src={this.imgCompress(this.state.imgurl3)}></img></td>
                         </tr>
                         <tr><td></td>
                         <td>Picture 4 </td>
                          <td><img className='responsive-image' style={{width:200, height:200}} src={this.imgCompress(this.state.imgurl4)}></img></td>
                         </tr>
                         
                    </tbody>

                </table>
             Report was written on {this.state.gentime}
      </div>
      
    );
  }
}
 
export default class SanEvalReports extends React.Component {
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