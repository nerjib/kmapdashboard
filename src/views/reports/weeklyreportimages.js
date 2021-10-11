import React from 'react';


export default class WeeklyReportImages extends React.Component {
    constructor(props){
        super(props)
        this.state={

        }
    }

    imgCompress=(e)=>{
        if(e){
        const intialurl = e.substring(0, 49);
  const finalurl = e.substring(50, e.length);
  return `${intialurl}/q_10/${finalurl}`
        }
    }

    render (){
        return(
            <div>
          <div className='col-md-4' style={{margin:20, marginTop:40}}> 
          <img style={{width:300, heigth:300}} 
          src={this.imgCompress(this.props.imgurl)}/></div>

            </div>
        )
    }
}