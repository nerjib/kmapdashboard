import React from 'react';
import axios from 'axios';

export default class UpdateProject extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            state_id: '',
        local_id: "",
        location: "",
        lga: "",
        status: "",
        started: '',
        finish: '',
        wardheadphone: null,
        gps: "",
        contractor_id: "",
        lot:'',
        compartment:'',
        compartmentdisplay:'none',
        facility:'',
        pstatus:'',
        CompanyName:'',
        localIdname:'',
        stateIdname:'',
        localUsers:'',
        stateUsers:'',
        contractorList:''
        }
    }

componentDidMount(){
    const { params } = this.props.match;

    axios.get(`https://ruwassa.herokuapp.com/api/v1/contractors`)
      .then(res=>{
        this.setState({
          contractorList: res.data
        })
      }).catch(e=>{console.log(e)})

   // console.log(params.id)
    axios.get('https://ruwassa.herokuapp.com/api/v1/projects/'+params.id)
    .then(res=>{
      if(res.data[0].title==='Sanitation'){
        this.setState({compartmentdisplay:''})
      }
        this.setState({
            title: res.data[0].title,
            location:res.data[0].location,
            local_id:res.data[0].local_id,
            status:res.data[0].status,
            state_id: res.data[0].state_id,
            lga:res.data[0].lga,
            wardheadphone:res.data[0].wardheadphone,
            gps: res.data[0].gps,
            contractor_id:res.data[0].contractor_id,
            started:res.data[0].started,
            finish:res.data[0].finish,
            lot:res.data[0].lot,
            localIdname:'',
            stateIdname: '',
            compartment: res.data[0].compartment,
            ward:res.data[0].ward,
            facility:res.data[0].facility,
            community:res.data[0].community,
            pstatus:res.data[0].pstatus,
            ggg:''
        })
    }).then(error=>{console.log(error)})

}

handlechangeContractor=(e)=>{
  const { value, name } = e.target;
  this.setState({
      [name]: value
  });
//   alert(name + ' '+ value)
}


handleChange=(e)=>{

    const { value, name } = e.target;
this.setState({
  //  project:'',
    [name]: value,

})
if (name=='local_id'){
 // this.gotoCheckLocal(value)
  this.gotoCheckLocalName(value)

}
else if(name=='state_id'){
 // this.gototCheckState(value)
 this.gotoCheckStateName(value)

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

gototCheckState(id){
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

onUpdate=(e)=>{
e.preventDefault();

const obj = {
              title: this.state.title,
            location:this.state.location,
            local_id: this.state.local_id,
            status:  this.state.status,
            state_id:  this.state.state_id,
            lga: this.state.lga,
            wardheadphone: this.state.wardheadphone,
            gps: this.state.gps,
            contractor_id:this.state.contractor_id,
            started:this.state.started,
            finish:this.state.finish,
            ward: this.state.ward,
            facility: this.state.facility,
            community: this.state.community,
            compartment:this.state.compartment,
           lot: this.state.lot,
           pstatus: this.state.pstatus

}
const {params}=this.props.match;
axios.put('https://ruwassa.herokuapp.com/api/v1/projects/'+params.id, obj)
.catch((error)=>{console.log(error)});
this.props.history.push('/projects')

}
change=()=>{

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
  this.gototCheckState(value)
//     alert(name+ ' ' +value)
}

handlechange1=(e)=>{
  const {value, name} = e.target;
  this.setState((k)=>{
    alert(JSON.stringify(k))
    let gggs= k.ggg
          return gggs
  
  })
  alert(value)
}
    render() {
        return(
                <div>
                Update
                <form>
                <br/>
         
                  <div className='row'>            
       {//   <div class='col-md-2'> <label className='text-left text-primary'>Type </label> </div>  
          //  <div className='col-md-5'> 
            //    <input className='form-control' name='title' value={this.state.title}
               //          required/>
        
             //     </div>
           }   </div>
                  <br/>
                  <div className='row' style={{display:this.state.compartmentdisplay}}>            
          <div class='col-md-2'> <label className='text-left text-primary'>Compartment</label> </div>  
            <div className='col-md-5'> 
                <input className='form-control' name='compartment' onChange={this.handleChange} value={this.state.compartment}
                         required/>
                         
                  </div>
                  </div>
                  <br/>
                 
                  <div className='row'>
            
            <div class='col-md-2'><label className='text-left text-primary'>      LGA    </label> </div>  
  
              <div className='col-md-5'> 
             
              <select className='form-control' id='lga' name='lga' value={this.state.lga} onChange={this.handleChange}>
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
                  </div>
                  <br/>
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
                        <div>{this.state.localIdname}</div>

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

                  <div className='row'>    
                  <div>Pstatus:{this.state.pstatus}</div>
        
          <div class='col-md-2'> <label className='text-left text-primary'> State Project Supervisor Id </label> </div>  
            <div className='col-md-5'> 
                <input className='form-control' name='state_id' value={this.state.state_id}
                        onChange={this.handleChange}/>
                         <div>{this.state.stateIdname}</div>

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
          <div class='col-md-2'> <label className='text-left text-primary'> LOT </label> </div>  
            <div className='col-md-5'> 
                <input className='form-control' name='lot' value={this.state.lot}
                        onChange={this.handleChange}/>
                  </div>
                  </div>
                  <br/>

                  <div className='row'> 

          <div class='col-md-2'> <label className='text-left text-primary'> Contractor ID </label>
             
           </div>  
            <div className='col-md-5'> 
            <select className='form-control' id='contractor_id' name='contractor_id' value={this.state.contractor_id} onChange={this.handlechangeContractor}>
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
                  <br/>

      { /*          <div className='row'>            
          <div class='col-md-2'> <label className='text-left text-primary'> Ward Head Phone. No </label> </div>  
            <div className='col-md-5'> 
                <input className='form-control' name='wardheadphone' value={this.state.wardheadphone}
                        onChange={this.handleChange} />
                  </div>
                  </div>*/}
                  <br/>

                  <div className='row'>            
          <div class='col-md-2'> <label className='text-left text-primary'> GPS Coordinate </label> </div>  
            <div className='col-md-5'> 
                <input className='form-control' name='gps' value={this.state.gps}
                        onChange={this.handleChange} placeholder='latitude,longitude' />
                  </div>
                  </div>
                  <br/>

                  <div className='row'>            
          <div class='col-md-2'> <label className='text-left text-primary'> Project Starting Date </label> </div>  
            <div className='col-md-5'> 
                <input className='form-control' name='started' value={(this.state.started).substring(0,10)}
                        onChange={this.handleChange} />
                  </div>
                  </div>
                  <br/>

                  <div className='row'>            
          <div class='col-md-2'> <label className='text-left text-primary'> Project Completion Date </label> </div>  
            <div className='col-md-5'> 
                <input className='form-control' name='finish' value={this.state.finish}
                        onChange={this.handleChange} />
                  </div>
                  </div>
                  <br/>
<div className='row'>
    <div className='col-md-3 text-primary'>Status</div>
                  <div class="col-md-3">
        <label><input type="radio" value='completed' onChange={this.handleChange} name="status"/> Completed </label>
      </div>
      <div class="col-md-3">
        <label><input type="radio"  value='ongoing' onChange={this.handleChange} name="status"/> Ongoing </label>
      </div>
      <div class="col-md-3">
        <label><input type="radio"  value='abandoned' onChange={this.handleChange} name="status"/> Abandoned </label>
      </div>

      </div>
                  <br/>





         <div className='col-md-8'> 
                 <button className='btn btn-default btn-info' onClick={this.onUpdate}>Update</button> 
         </div>

                </form> 
            </div>
        )
    }
}