
import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import  Loader from 'react-loader-spinner'
class NonFunctionalReports extends React.Component{
constructor(props){
    super(props)
    this.state={
            reports:'',
            displayAll:'none',
            currentPage: 1,
            reportsPerPage: 100,
            allreports:'',
            reportfocus:'',
            day:new Date().getDate(),
            month:new Date().getMonth(),
            title:'Community Borehole',
            phase:7,
                status:''
    }
}

onLoad=()=>{
    this.setState({
        status: 'Loadinng ...'
    })
  /* 

        axios.get('https://ruwassa.herokuapp.com/api/v1/reports')
                .then(res => {
                    this.setState({
                            reports:res.data
                    })
                }).catch( errors=>{console.log(errors.message)})
*/
                axios.get(`https://ruwassa.herokuapp.com/api/v1/vlc/followupstatus/nonfunctional`)
                .then(res => {
                    this.setState({
                            allreports:res.data,
                            reportfocus:'all',
                            status:''
                    })
                }).catch( errors=>{console.log(errors.message)}) 
 
}

componentDidMount(){
    this.onLoad();
  //  this.inTerval=setInterval(()=>this.onLoad(),60000)
}
componentWillMount(){
    clearInterval(this.inTerval)
}
 
handleClick = (event) => {
    this.setState({
        currentPage: Number(event.target.id)
      });
}



handleCalender=(day=new Date().getDate(),month=new Date().getMonth(),title='all')=>{
    this.setState({
            day,
            month,
            title
    })
}

nextPage = () =>{
    //    alert('hello')
        this.setState({
            currentPage: this.state.currentPage+1
        })
    
    }
    backPage =()=>{
        this.setState({
            currentPage: this.state.currentPage - 1
        })
    
    }

render() {
    let row =[];

    const { currentPage, reportsPerPage } = this.state;
  
    // Logic for displaying todos
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage
    const currentProjects = Object.keys(this.state.allreports).slice(indexOfFirstReport, indexOfLastReport);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(Object.keys(this.state.allreports).length / reportsPerPage); i++) {
      pageNumbers.push(<button key={i}  id={i} onClick={this.handleClick}>{i}</button>);
    }

//(new Date(this.props.date).getMonth()+1)
let kk=0
currentProjects.map((e,i)=>{
        row.push(<tr><td>{Number(e)+1}</td><td>{this.state.allreports[e].title}</td><td>{this.state.allreports[e].community}</td>
        <td>{this.state.allreports[e].ward}</td>
        <td>{this.state.allreports[e].lga}</td><td>{this.state.allreports[e].functionality}</td>
        <td>{this.state.allreports[e].phase}</td>
        <td>{this.state.allreports[e].company}</td>
        <td>{this.state.allreports[e].type}</td>
        <td>{this.state.allreports[e].time}</td>
        <td><a target='_blank' href={`#/functionalitydetails/${this.state.allreports[e].fid}`}><button >View</button></a></td>
        </tr>)

    })          
            
            return(
        <div>
      <div>
 {/*  <div className='row'>
          <div>
      {//}              <Calender onCalender={this.handleCalender}/>
}
                    </div>
               <div style={{margin:3}}> <button className='btn btn-defult btn-primary' onClick={this.goToPhase6} ></button></div>
               <div style={{margin:3}}> <button className='btn btn-defult btn-primary' onClick={this.goToPhase6d} >Phase 6D</button></div>
            </div>
            */}
            <div>
                {//this.state.day
                }
            </div>
            <h1>Non Functioning Facilities</h1>
            {this.state.allreports.length>this.state.reportsPerPage &&  

            <div>
      <button onClick={this.backPage}>Back</button><button onClick={this.nextPage}>Next</button>
       </div>}

            <table  className='table table-hover text-left'>      
                <thead>
                    <tr><th>S/N</th>
                {//}        <th>LOTS</th>
                   //     <th>Title</th>
                   <th>Facility</th>
             }     <th>Community</th>
                        <th>Ward</th>
                        <th>LGA</th>
                        <th>Functional</th>
                        <th>Phase</th>
                        <th>Company</th>
                        <th>Reporter</th>
                       <th>Time of report</th>

                    </tr>
                </thead>
                <tbody style={{fontWeight:"bold"}}>
                   {row}
                </tbody>
              {// <ReportTable reports={this.state.reports}/>
              }
{//style={{display:this.state.displayAll}}
            }
            </table>
            {this.state.allreports.length>this.state.reportsPerPage &&  

            <div> {//pages {pageNumbers}
            }
            <button onClick={this.backPage}>Back</button><button onClick={this.nextPage}>Next</button>
            </div>}
               </div>
       {//     <StatusReports reports={this.state.allreports}/>
       }
        </div>
    )
}

}



export default NonFunctionalReports;