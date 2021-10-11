import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
//import './Login.css'

export default class SignOut extends Component {
  constructor(props) {
    super(props)
    }
    componentDidMount(){
        localStorage.removeItem('login');
        localStorage.removeItem('token');
        localStorage.removeItem('acttype');

        // return <Redirect to = "/login"/>
    }

    render() {
   
     return <Redirect to='/'> </Redirect>
}

}