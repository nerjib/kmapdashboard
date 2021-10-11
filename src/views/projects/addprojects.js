import React from 'react';
import axios from 'axios'
import {  Redirect } from 'react-router-dom';


export default class InsertProject extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            location:'',
            status: 'ongoing',
            supervisor:'',
            supervisorName:'',
            phase: '6d',
            email:'',
            emailname:'',
            localUsers:'',
            stateUsers:'' , 
            contractorList: '',
            phases:''     
      

        }
    }

    componentDidMount=()=>{
      axios.get(`https://ruwassa.herokuapp.com/api/v1/contractors`)
      .then(res=>{
        this.setState({
          contractorList: res.data
        })
      }).catch(e=>{console.log(e)})

      axios.get(`https://ruwassa.herokuapp.com/api/v1/phases`)
      .then(res=>{
        this.setState({
          phases: res.data
        })
      }).catch(e=>{console.log(e)})
    }

    handleChange=(e)=>{
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
        if (name=='supervisor'){
            this.checkSupervisor(value)
        }

        if (name=='local_id'){
          //  this.gotoCheckLocal(value)
            this.gotoCheckLocalName(value)
          }
          else if(name=='state_id'){
         //   this.gototCheckState(value)
            this.gotoCheckStateName(value)

          }
          else if (name=='contractor_id'){
            this.checkcontractor(value);
          }
              }

              handlechangePhase=(e)=>{
                const { value, name } = e.target;
                this.setState({
                    [name]: value
                });
            //    alert(name + ' '+ value)
              }
              handlechangeContractor=(e)=>{
                const { value, name } = e.target;
                this.setState({
                    [name]: value
                });
             //   alert(name + ' '+ value)
              }

              handleEmailChange=(e)=>{
                const { value, name } = e.target;
                this.setState({
                    [name]: value
                });

                if (name=='supervisor'){
                    this.checkSupervisor(value)
                }
        
                if (name=='email'){
                    this.gotoCheckLocalemail(value)
                  }
                  else if(name=='email1'){
                    this.gototCheckState(value)
                  }
                  else if (name=='contractor_id'){
                    this.checkcontractor(value);
                  }
                      }

   gotoCheckLocalName(phone){
if (phone.length<4){
 // alert(phone.length)
 this.setState({localUsers:''})
}else{
    axios.get(`https://ruwassa.herokuapp.com/api/v1/users/searchuser/${phone}`)
    .then(res=>{
      this.setState({
        localUsers: res.data
      })
    }).catch(e=>{console.log(e)})
  }
   }
  
   gotoCheckStateName(phone){
    if (phone.length<4){
     // alert(phone.length)
     this.setState({stateUsers:''})
    }else{
        axios.get(`https://ruwassa.herokuapp.com/api/v1/users/searchuser/${phone}`)
        .then(res=>{
          this.setState({
            stateUsers: res.data
          })
        }).catch(e=>{console.log(e)})
      }
       }
      
      gotoCheckLocal(id){

             axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+id)
        .then(req=>{
            if(req.data[0])(
            this.setState(prevState=>{
              return prevState.localIdname= req.data[0].first_name +" "+ req.data[0].last_name
            })
            )
            else{
                this.setState({
                    localIdname: 'is not Found' 
                })
            }
        })
      }

      handlechangeUser=(e)=>{
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
        this.gotoCheckLocal(value)
      //  alert(name+ ' ' +value)
      }

      handlechangeStateUser=(e)=>{
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
        this.gotoCheckState(value)
   //     alert(name+ ' ' +value)
      }
      gotoCheckLocalemail(e){
          let mail=''
          if(e.length>3){
                mail=e
          }
          else{
            mail=e
          }

        axios.get('https://ruwassa.herokuapp.com/api/v1/users/email/'+mail)
        .then(req=>{
            if(req.data[0])(
         //       alert(JSON.stringify(req.data[0]))
         /*   this.setState(prevState=>{
              return prevState.emailname= req.data[0]
            })*/
           this.setState({
                emailname:req.data[0]
            })
            )
            else{
                this.setState({
                    emailname: 'is not Found' 
            })
          }
      })
   }
      
      gotoCheckState(id){
        axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+id)
        .then(req=>{
            if(req.data[0])(
            this.setState({
                stateIdname: req.data[0].first_name +" "+ req.data[0].last_name
            })
            )
            else{
                this.setState({
                    stateIdname: 'Not found' 
                })
            }
        })
      }
      
      checkcontractor(id){
        axios.get('https://ruwassa.herokuapp.com/api/v1/contractors/'+id)
        .then(req=>{
            if(req.data[0])(
            this.setState({
                CompanyName: req.data[0].company
            })
            )
            else{
                this.setState({
                    CompanyName: 'Not found' 
                })
            }
        })
      }


    checkSupervisor(id){
        axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+id)
        .then(req=>{
            if(req.data[0])(
            this.setState({
                supervisorName: req.data[0].first_name +" "+ req.data[0].last_name
            })
            )
            else{
                this.setState({
                    supervisorName: 'Not found' 
                })
            }
        })
    }

    onSubmit=(e)=>{
        e.preventDefault();
       const obj={
        title: this.state.title,
        location:this.state.location,
        status:this.state.status,
        local_id: this.state.local_id,
        state_id: this.state.state_id,
        contractor_id: this.state.contractor_id,
        ward: this.state.ward,
        community: this.state.community,
        lga: this.state.lga,
        type:this.state.type,
        lot:this.state.lot,
        phase:this.state.phase,
        facility: this.state.facility,        

       }
        axios.post('https://ruwassa.herokuapp.com/api/v1/projects',obj)
        .then((res)=>{
        this.props.history.push('/projects')

        }).catch((error)=>{
            alert(error)
        })
        this.setState({
            title: '',
            location: '',
            status: '',
            supervisor: '',
            lga:'',
            type:'',
            lot:'',
            state_id:'',
            local_id:'',
            contractor_id:'',
            community:'',
            ward:'',
            facility:'',
            phase: ''
           })
    this.props.history.push('/projects')
    }

    render(){
        return(
            <div style={{}}>

              <form>
                <br/>
                  <div className='row'>            
          <div class='col-md-2'>      <label className='text-left text-primary'>      Project Title   </label> </div>  

            <div className='col-md-2'>
                <select className='form-control' id='title' name='title' onChange={this.handleChange}>
                <option >...select</option>
                <option value='Sanitation'>Sanitation</option>
                    <option value='Force Lift'>Force Lift Borehole</option>
                    <option value ='Community Borehole'>Community Borehole</option>
                    <option value ='Motorized Solar Borehole'>Motorized Solar Borehole</option>

                    </select> 
                  </div>
                  </div>
                  <br/>
                  <div className='row'>            
          <div class='col-md-2'>      <label className='text-left text-primary'>     LOT   </label> </div>  

            <div className='col-md-5'> 
                <input className='form-control' name='lot' value={this.state.lot}
                        onChange={this.handleChange} required/>
                  </div>
                  </div>
                  <br/>
                  <div className='row'>            
          <div class='col-md-2'>      <label className='text-left text-primary'>     Phase   </label> </div>  

            <div className='col-md-5'> 
            <select className='form-control' value={this.state.phase} id='phase' name='phase' onChange={this.handlechangePhase}>
                    {Object.keys(this.state.phases).map(e=>
                        <option value={this.state.phases[e].phase}>{this.state.phases[e].phase                       
                        }</option>
                    )}
                    </select> 

            {//}    <input className='form-control' name='phase' value={this.state.phase}
               //         onChange={this.handleChange} required/>
                       } </div>
                  </div>
                  <br/>
                  <div className='row'>
            
            <div class='col-md-2'>      <label className='text-left text-primary'>      Project Supervisor ID    </label>
             </div>  
  
              <div className='col-md-5'> 
             
                    <input className='form-control' name='supervisor' value={this.state.supervisor}
                        onChange={this.handleChange} required/>
                                     <div><label>{this.state.supervisorName}</label></div>   

                         </div>
                  </div>
                  <br/><div className='row'>            
          <div class='col-md-2'>      <label className='text-left text-primary'>      LGA   </label> </div>  

            <div className='col-md-2'>
                <select className='form-control' id='lga' name='lga' onChange={this.handleChange}>
                <option >...select</option>
                <option value='Birnin Gwari'> Birnin Gwari</option>
                    <option value='Chikun'>Chikun</option>
                    <option value ='Giwa'>Giwa</option>
                    <option value ='Igabi'>Igabi</option>
                    <option value='Ikara'> Ikara</option>
                    <option value ='Jaba'>Jaba</option>
                    <option value ='Jemaa'>Jema'a</option>
                    <option value='Kachia'>Kachia</option>
                    <option value ='Kaduna North'>Kaduna North</option>
                    <option value ='Kaduna South'>Kaduna South</option>
                    <option value='Kagarko'> Kagarko</option>
                    <option value ='kajuru'>Kajuru</option>
                    <option value ='Kaura'>Kaura</option>
                    <option value='Kauru'>Kauru</option>
                    <option value ='Kubau'>Kubau</option>
                    <option value ='Kudan'>Kudan</option>
                    <option value='Lere'>Lere</option>
                    <option value ='Makarfi'>Makarfi</option>
                    <option value ='Sabon Gari'>Sabon Gari</option>
                    <option value='Sanga'>Sanga</option>
                    <option value ='Soba'>Soba</option>
                    <option value ='Zangon Kataf'>Zangon Kataf</option>
                    <option value='Zaria'> Zaria</option>
                
                    </select> 
                  </div>
                  </div>                <br/>

                  <div className='row'>            
          <div class='col-md-2'> <label className='text-left text-primary'> Ward </label> </div>  
            <div className='col-md-5'> 
                <input className='form-control' name='ward' value={this.state.ward}
                        onChange={this.handleChange} required/>
                  </div>
                  </div>
                  <br/>
                  <div className='row'>            
          <div class='col-md-2'> <label className='text-left text-primary'>Community Name </label> </div>  
            <div className='col-md-5'> 
                <input className='form-control' name='community' value={this.state.community}
                        onChange={this.handleChange} required/>
                  </div>
                  </div>
                  <br/>

           



                  <div className='row'>            
          <div class='col-md-2'> <label className='text-left text-primary'> Facility Name </label> </div>  
            <div className='col-md-5'> 
                <input className='form-control' name='facility' value={this.state.facility}
                        onChange={this.handleChange} required/>
                  </div>
                  </div>
                  <br/>

                  <div className='row'>
            
            <div class='col-md-2'>      <label className='text-left text-primary'>   Local   Project Supervisor ID    </label> </div>  
  
              <div className='col-md-5'> 
             
                    <input className='form-control' name='local_id' value={this.state.local_id} 
                        onChange={this.handleChange} />
                 {//}       <div>{this.state.localIdname}</div>
    }
                        <select className='form-control' id='local_id' name='local_id' onChange={this.handlechangeUser}>
                        {this.state.localUsers.length>0&& <option value='1'>....        </option>}

                    {Object.keys(this.state.localUsers).map(e=>
                        <option value={this.state.localUsers[e].id}>{this.state.localUsers[e].first_name+ ' '+
                        this.state.localUsers[e].last_name+ ' '+this.state.localUsers[e].other_name
                        }</option>
                    )}
                    </select> 
                         </div>
                  </div>
                  <br/>
                  <div>Pstatus:{this.state.pstatus}</div>
                  <div className='row'>    
        
          <div class='col-md-2'> <label className='text-left text-primary'> State Project Supervisor Id </label> </div>  
            <div className='col-md-5'> 
                <input className='form-control' name='state_id' value={this.state.state_id}
                        onChange={this.handleChange}/>
                  {//}       <div>{this.state.stateIdname}</div>
    }
                         <select className='form-control' id='state_id' name='state_id' onChange={this.handlechangeStateUser}>
                         {this.state.stateUsers.length>0&& <option value='1'>....        </option>}
                    {Object.keys(this.state.stateUsers).map(e=>
                        <option value={this.state.stateUsers[e].id}>{this.state.stateUsers[e].first_name+ ' '+
                        this.state.stateUsers[e].last_name+ ' '+this.state.stateUsers[e].other_name
                        }</option>
                    )}
                    </select> 
                  </div>
                  </div>
                  <br/>
                  
        

                
                  <div className='row'>            
          <div class='col-md-2'> <label className='text-left text-primary'> Contractor ID </label>
             
           </div>  
            <div className='col-md-5'> 
            <select className='form-control' id='contractor_id' name='contractor_id' onChange={this.handlechangeContractor}>
            {this.state.contractorList.length>0&& <option value='1'>....        </option>}
                    {Object.keys(this.state.contractorList).map(e=>
                        <option value={this.state.contractorList[e].id}>{this.state.contractorList[e].company                       
                        }</option>
                    )}
                    </select> 
                <input className='form-control' name='contractor_id' value={this.state.contractor_id}
                        onChange={this.handleChange} />
                           <div>{this.state.CompanyName}</div>
                  
                  </div>

                 
                  </div>
     
         <div className='col-md-8'> 
                 <button className='btn btn-default btn-info' onClick={this.onSubmit}>Add Project</button> 
         </div>
                </form> 

                </div>
            
        )
    }
} 