import React,{useState, useEffect} from 'react';

import axios from 'axios'
import {  Redirect, withRouter } from 'react-router-dom';


const AddPhase = (props) =>{
 let [phase, setPhase] = useState('')


 const  handleChange = (e) => {
        const { value } = e.target
        
      setPhase(value)

        e.preventDefault()

    }
const    onSubmit = () => {
        const obj = {
        phase,
      
        }

        axios.post('https://ruwassa.herokuapp.com/api/v1/phases',obj)
        .then((res)=>{
          //  console.log(res.data)
        props.history.push('/admin/settings')
        
        }).catch((error)=>{
            console.log(error)
        })
        props.history.push('/admin/settings')

    }

        return(
            <div style={{}}>
              <form>
                  <div className='row'>
                      <div className='col-md-3'>
                <label className='text-primary'>
                    Phase
                </label>  
                </div>
                    <div className='col-md-5'>
                    <input name='phase'  class="form-control" value={phase}
                        onChange={handleChange} placeholder='New Phase' required/>
                        </div>
                  </div>
                    <br/>
              
    <button onClick={onSubmit}>Add</button> 

                </form> 
            </div>
        )
    

}
export default withRouter(AddPhase)