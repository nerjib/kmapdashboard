import React from 'react';


export default class ActivityRow extends React.Component{
constructor(props){
    super(props)
}

    render() {
        return (
            
                <tr >
                    <td className='text-center'>{this.props.date}</td>
                    <td className='text-left' colSpan='2'>{this.props.activity}</td>
                    <td>{this.props.outcome}</td>
                </tr>
        
        )
    }
}