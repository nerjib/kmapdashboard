import React, { Component, useState, useEffect } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import axios from 'axios'
import  Loader from 'react-loader-spinner'

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import ruwasa from '../../../src/assets/img/ruwasa.PNG'

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

const Login=()=>{
const [pword, setPword] = useState('')
const [email, setEmail] = useState('')
const [ loading, setLoading]= useState(false)
const [redirect, setRedirect] = useState(false)
const [login, setLogin] = useState('fail')


useEffect(()=>{
    const access = ( localStorage.getItem('login'))
    if(access=='pass'){
        setRedirect(true)
    }
},[])
const handlePword=(e)=>{
    const {value} = e.target
    setPword(value)
}

const handleEmail=(e)=>{
    const {value} = e.target
    setEmail(value)
}

  const  onSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    
    let data={
      pword,
      email
    }
    axios.post('https://ruwassa.herokuapp.com/api/v1/users/authsign',data)
    .then(res => {
      if (res.data['status'] === 'success') {
      localStorage.setItem('acttype', res.data['data'].type);
   //   localStorage.setItem('token', 'res.data.token');     
      
       setLogin('pass')
       setLoading(false)
       setRedirect(true)
       localStorage.setItem('login', 'pass');
       return <Redirect to='/home'> </Redirect>
      }else{
        setLoading(false)
        localStorage.setItem('login', 'stop');
        const error = new Error(res.error);
        throw error;
      }
    //  return < Redirect to="/home"/>
    //  alert(JSON.stringify(res.data['data'].userId))
    }).catch(e=>{
      console.error(e);
      setLoading(false)
      localStorage.setItem('login', 'stop');
    // return <Redirect to='/home'> </Redirect>
      alert('Error logging in  please try again');
      alert(e)
    
    })

      }

    const classes = useStyles();
    if(redirect){
     //   alert('kk')
   return <Redirect to='/admin/dashboard'/>
    }
    return (
     
     
      <div style={{display:'flex', marginLeft:'30%',marginTop:50, width:'30%', justifySelf:'center', alignSelf:'center'}}>
          <div>
        {loading &&  <Loader type="Circles" color="Blue"/>}
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Login</h4>
              </CardHeader>
              <CardBody>
              <img className='  responsive-image' style={{display:'block', width:'50%',height:'70%',marginLeft:'auto',marginRight:'auto'}}
                                                        src={ruwasa}

                    alt='Logo'
                                    />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <input onChange={handleEmail} style={{width:'90%', height:'70%', margin:10, borderRadius:10}}
                     type='email' name='email' placeholder='email'/>

                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                      <input  onChange={handlePword}
                      style={{width:'90%', height:'70%', margin:10, borderRadius:10}}
                      type='password' name='pword' id="password" placeholder='password'/>
                    
                  </GridItem>
                </GridContainer>
               </CardBody>
              <CardFooter xs={4} sm={12} md={4}>
                <div style={{display:'block', marginRight:'10%',marginLeft:'auto'}}>
                <Button onClick={onSubmit} color="info">Submit</Button>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
                </GridContainer>
                </div>
      </div>
    );
  
}

export default Login

/*
export default class Login extends Component {
  constructor(props) {
    super(props)
    let login = 'stop';
    this.state = {
      email : '',
      pword: '',
      login,
      token: {
        status: 'dd',
        data:{
          token: 'ttttggdvd',
          id: 'id'
        },
      },
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
   //   alert(this.state.pword+' '+this.state.email)
    event.preventDefault();
    fetch('https://ruwassa.herokuapp.com/api/v1/users/authsign', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.status === 'success') {
          alert(res)
       // return < Redirect to="/home"/>
       this.setState({
         login: 'pass',
         token:  res,
        });
        localStorage.setItem('login', this.state.login);
        localStorage.setItem('token', res.data.token);

       // return < Redirect to="/home"/>
              // this.props.history.push('/home');
      } else {
        localStorage.setItem('login', 'stop');
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
       localStorage.setItem('login', 'stop');
     // return <Redirect to='/home'> </Redirect>
       alert('Error logging in  please try again');
    });
  }

  render() {
   
    if (this.state.login === 'pass'){
   return <Redirect to='/maps'> </Redirect>
 }
  

    
      
   
    
    return (
      <div >
      <form className="Container" onSubmit={this.onSubmit}>
        <h1>Login Below!</h1>
        <div className="table">
<table align="center" ><tr><td>        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        /></td></tr>
       
       <tr><td> <input
          type="password"
          name="pword"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        /></td></tr>
<tr><td>        <input type="submit" value="Submit"/>
    </td></tr></table></div>  </form>
  </div>
    );
  }
}
*/