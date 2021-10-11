import React from 'react';
import axios from 'axios';
import { Link, Route, Redirect } from 'react-router-dom';


export default class SupervisorDetails extends React.Component{
    constructor(props){
        super(props);

        this.state={
            supervisors:'',
            currentPage: 1,
            supervisorsPerPage: 100,
            phase:6,
            stages:'',
            weeklystages:'',
            name:'',
            phone:'',
            email:'',
            tasks:'',
            tasks2:'',
            accno:'',
            bank:''
        }
    }
    load=()=>{
        const {params} = this.props.match
        axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+params.id)
        .then((res) =>{

            this.setState({
                name: res.data[0].last_name +' '+res.data[0].first_name+' '+res.data[0].other_name,
                phone: res.data[0].phone,
                email: res.data[0].email,
                accno: res.data[0].actno,
                bank: res.data[0].bank,

            })
        })
        .catch(function(error){
             console.log(error)
        })
        axios.get('https://ruwassa.herokuapp.com/api/v1/users/reportssend/'+params.id)
        .then((res) =>{

            this.setState({stages: res.data})
        })
        .catch(function(error){
             console.log(error)
        })
        axios.get('https://ruwassa.herokuapp.com/api/v1/users/weeklyreportssend/'+params.id)
        .then((res) =>{

            this.setState({weeklystages: res.data})
        })
        .catch(function(error){
             console.log(error)
        })

        axios.get('https://ruwassa.herokuapp.com/api/v1/projects/localsupervisors/'+params.id)
  .then(res=>{
  //    alert(this._isMounted)
 //     if(this._isMounted){
     
      this.setState({
          tasks: res.data                
      })
  //}
  }).catch(error=>{console.log(error)})

  axios.get('https://ruwassa.herokuapp.com/api/v1/projects/statesupervisors/'+params.id)
  .then(res=>{
  //    alert(this._isMounted)
 //     if(this._isMounted){
     
      this.setState({
          tasks2: res.data                
      })
  //}
  }).catch(error=>{console.log(error)})
 

    }
    componentDidMount(){
     this.load()
    }

    componentWillMount(){
        this.setState({
            supervisors:''
        })
    }

    handleClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
          });
    }
    reload=()=>{this.props.reload()}
    
    render(){
        // daily stages
        let row1=[]
        // weekly reports by stages
        let row3=[]
        //local task
        let row=[]
        //state task
        let row2=[]

Object.keys(this.state.stages).map((e,i)=>{row1.push(<tr>
        <td>{i+1}</td><td>{this.state.stages[e].title}</td><td>{this.state.stages[e].phase}</td>
   <td>{this.state.stages[e].pstatus}</td><td>{this.state.stages[e].count}</td>
    </tr>)
        })
        Object.keys(this.state.weeklystages).map((e,i)=>{row3.push(<tr>
            <td>{i+1}</td><td>{this.state.weeklystages[e].title}</td><td>{this.state.weeklystages[e].phase}</td>
       <td>{this.state.weeklystages[e].pstatus}</td><td>{this.state.weeklystages[e].count}</td>
        </tr>)
            })
Object.keys(this.state.tasks).map((e,i)=>{row.push(<tr>
            <td>{i+1}</td><td><a  href={`/#/projects/${this.state.tasks[e].id}`}>{this.state.tasks[e].title}</a></td><td>{this.state.tasks[e].lot}</td><td>{this.state.tasks[e].phase}</td>
            <td>{this.state.tasks[e].lga}</td><td>{this.state.tasks[e].community}</td>  <td>{this.state.tasks[e].pstatus}</td><td>{this.state.tasks[e].status}</td>
        </tr>)
            })
            Object.keys(this.state.tasks2).map((e,i)=>{row.push(<tr>
                <td>{i+1}</td><td><a  href={`/#/projects/${this.state.tasks2[e].id}`}>{this.state.tasks2[e].title}</a></td><td>{this.state.tasks2[e].lot}</td><td>{this.state.tasks2[e].phase}</td>
                <td>{this.state.tasks2[e].lga}</td><td>{this.state.tasks2[e].community}</td>  <td>{this.state.tasks2[e].pstatus}</td><td>{this.state.tasks2[e].status}</td>
            </tr>)
                })
            return(
                <div><div>
                <Link to='/home'>    <button>Home</button></Link>
                
                </div >
                <div className='row'>
                    <div className='col-md-4'>
                <img src='https://monitoring.kadruwassa.ng/img/profilepic.png'></img>
                </div>
                <div className='col-md-4'>
                    <table className='table bordered'>
                        <tbody  className='text-left'>
                            <tr>
            <td  className='text-left'>Name</td><td  className='text-left'>{this.state.name}</td>
                            </tr>
                            <tr>
            <td  className='text-left'>Phone</td><td  className='text-left'>{this.state.phone}</td>
                            </tr>
                            <tr>
            <td  className='text-left'>Email</td><td  className='text-left'>{this.state.email}</td>
                            </tr>
                            <tr>
            <td  className='text-left'>Account No</td><td>{this.state.accno}</td>
                            </tr>
                            <tr>
            <td>Bank</td><td>{ this.state.bank}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                </div>
                Task Details
                <table className='table'>
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>facility</th>
                                <th>Lot</th>
                                <th>Phase</th>
                                <th>LGA</th>
                                <th>Community</th>
                                <th>Stage</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                    {row}
                    {row2}
                    </table>
                Reports Table
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>Facility</th>
                                <th>Phase</th>
                                <th>Stage</th>
                                <th>No. of reports</th>
                            </tr>
                        </thead>
                    {row1}

                    </table>

                    WeeklyReports Table
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>Facility</th>
                                <th>Phase</th>
                                <th>Stage</th>
                                <th>No. of reports</th>
                            </tr>
                        </thead>
                    {row3}

                    </table>
                </div>
            )
        }
    }
