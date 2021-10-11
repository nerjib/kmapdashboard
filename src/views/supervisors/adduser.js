import React from 'react';

import axios from 'axios'
import {  Redirect, withRouter } from 'react-router-dom';


class AddSupervisor extends React.Component{
    constructor(props){
        super(props)
        this.state={
            fname:'',
            lname:'',
            oname: '',
            role:'',
            lga:'',
            active:'active',
            email:''

        }
    }

    handleChange = (e) => {
        const { value, name } = e.target
        
        this.setState({
            [name]: value
        })

        e.preventDefault()

    }
    onSubmit = () => {
        const obj = {
        fname: this.state.fname,
        lname: this.state.lname,
        oname: this.state.oname,
        phone: this.state.phone,
        email: this.state.email,
        role: this.state.role,
        lga:this.state.lga,
        active: this.state.active,
        }

        axios.post('https://ruwassa.herokuapp.com/api/v1/users',obj)
        .then((res)=>{
          //  console.log(res.data)
        this.props.history.push('/allusers')
        
        }).catch((error)=>{
            console.log(error)
        })
        this.props.history.push('/allusers')

    }

    render(){
        return(
            <div style={{}}>
              <form>
                  <div className='row'>
                      <div className='col-md-3'>
                <label className='text-primary'>
                    first Name
                </label>  
                </div>
                    <div className='col-md-5'>
                    <input name='fname'  class="form-control" value={this.state.fname}
                        onChange={this.handleChange} placeholder='First Name' required/>
                        </div>
                  </div>
                    <br/>
                  <div className='row'>
                      <div className='col-md-3'>
                <label className='text-primary'>
                    Last Name
                </label>  
                </div>
                    <div className='col-md-5'>
                    <input name='lname'  class="form-control" value={this.state.lname}
                        onChange={this.handleChange} placeholder='Last Name' required/>
                        </div>
                  </div>
                  <br/>
                  <div className='row'>
                      <div className='col-md-3'>
                <label className='text-primary'>
                    Other Name
                </label>  
                </div>
                    <div className='col-md-5'>
                    <input name='oname'  class="form-control" value={this.state.oname}
                        onChange={this.handleChange} placeholder='Other Name' />
                        </div>
                  </div>
                  <br/>
                  <div className='row'>
                      <div className='col-md-3'>
                <label className='text-primary text-left'>
                    Phone
                </label>  
                </div>
                    <div className='col-md-5'>
                    <input name='phone'  class="form-control" value={this.state.phone}
                        onChange={this.handleChange} placeholder='0801234567' required/>
                        </div>
                  </div>
                  <br/>
                  <div className='row'>
                      <div className='col-md-3'>
                <label className='text-primary text-left'>
                  Email Address
                </label>  
                </div>
                    <div className='col-md-5'>
                    <input name='email' type='email'  class="form-control" value={this.state.email}
                        onChange={this.handleChange} placeholder='xyz@gmail.com' required/>
                        </div>
                  </div>
                  <br/>
                  <div class="row">
                      <div className='col-md-3'>
                        <label className='text-primary text-left'>Role</label>
                      </div>
      <div class="col-md-3">
        <label><input type="radio" value='State Supervisor' onChange={this.handleChange} name="role"/> State Supervisor </label>
      </div>
      <div class="col-md-3">
        <label><input type="radio" value='Local Supervisor' onChange={this.handleChange} name="role"/> Local Supervisor </label>
      </div>
    </div>
    <div class="row">
                      <div className='col-md-3'>
                        <label className='text-primary text-left'>LGA</label>
                      </div>
      <div class="col-md-3">
      
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
      </div>
    <br/>
    <button onClick={this.onSubmit}>Add</button> 

                </form> 
            </div>
        )
    }

}
export default withRouter(AddSupervisor)