import React,{useState, useEffect} from 'react';

import axios from 'axios'
import {  Redirect, withRouter } from 'react-router-dom';


const UpdateProjects = (props) =>{
 let [phases, setPhases] = useState('')
 let [title, setTitle] = useState('Community Borehole')
 let [lot, setLot] = useState('')
 let [selectedLot, setSelectedLot] = useState('1')
let [selectedPhase, setSelectedPhase]= useState('6')


 const  handleChangePhase = (e) => {
        const { value } = e.target
        
      setSelectedPhase(value)

        e.preventDefault()

    }
    const  handleChangeTitle = (e) => {
        const { value } = e.target
        
      setTitle(value)

        e.preventDefault()

    }

    const  handleChangeLot= (e) => {
        const { value } = e.target
        
      setSelectedLot(value)

        e.preventDefault()

    }

    useEffect(()=>{
        
        axios.get(`https://ruwassa.herokuapp.com/api/v1/phases`)
        .then(res=>{
            setPhases(res.data)          
        }).catch(e=>{console.log(e)})

        axios.get(`https://ruwassa.herokuapp.com/api/v1/phases/lots/${title}/${selectedPhase}`)
        .then(res=>{
            setLot(res.data)          
        }).catch(e=>{console.log(e)})

    },[selectedPhase,title])



const    onSubmit = () => {
        const obj = {
        phases,
      
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

    let pTitle=['Community Borehole', 'Motorized Solar Borehole', 'Force Lift', 'Sanitation']

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
            <select className='form-control' value={selectedPhase} id='phase' name='phase' onChange={handleChangePhase}>
                    {Object.keys(phases).map(e=>
                        <option value={phases[e].phase}>{phases[e].phase                       
                        }</option>
                    )}
                    </select> 

                  
            {//}    <input className='form-control' name='phase' value={this.state.phase}
               //         onChange={this.handleChange} required/>
                       } </div>
                       <div>
                       <select value={title} id='phase' name='phase' onChange={handleChangeTitle}>
                        {pTitle.map(e=>
                            <option value={e}>{e}</option>
                        )}

                   </select>

                       </div>
<div>
<div className='col-md-5'> 
            <select className='form-control'  value={selectedLot} id='phase' name='phase' onChange={handleChangeLot}>
                    {Object.keys(lot).map(e=>
                        <option value={lot[e].lot}>{lot[e].lot                       
                        }</option>
                    )}
                    </select> 
</div>
                        </div>
                  </div>
                 {lot.length} llllll{selectedLot + selectedPhase+ title}
                    <br/>
              
    <button onClick={onSubmit}>Add</button> 

                </form> 
            </div>
        )
    

}
export default withRouter(UpdateProjects)