import React from "react";
//import ReactPlayer from 'react-player'
//import { ReactVideo } from "reactjs-media";

import './style.css';
const Popup = props => {

 
//alert(parts[parts.length-1]);
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        hellllllo 
 </div>
             <form>     <div className='row'>
                <label className='text-primary'>
                    first Name
                </label>  
                    <input name='fname'  class="form-control" 
                        onChange={(e)=>alert(e)} placeholder='First Name' required/>
                  </div>
                    <br/>
                  <div className='row'>
                      <div className='col-md-3'>
                <label className='text-primary'>
                    Last Name
                </label>  
                </div>
                </div>
                </form>
            
 <button onClick={props.handleClose}>close</button>
    </div>
  );
};
 
export default Popup;