import React, { Component } from 'react';
import { render } from 'react-dom';
import GoogleMapReact from 'google-map-react';
//import './style.css';
import ruwasa from '../map/ruwassa.PNG';
import axios from 'axios';
//import MapComp from './mapcom'
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from 'components/Grid/GridItem';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";

import { makeStyles } from "@material-ui/core/styles";





import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);



export default class ProjectsMap extends Component {

  

  constructor(props) {
    super(props);

    this.state = {
        phase: '7',
        //This is where the center of map is going to be10.5368909,7.4786129
      center : {
        lat: 10.5368909, 
        lng: 7.4786129
      },
      locations:[],
      loading:'',
      //This is how much you want to zoom in
      zoom : 10,

      //This is the list of markers.
      myMarkers : [],
      title:[]

    };


    //Adding to the list of markers
   /* let aMarker = {
      name : 'Mountain View High School',
      lat: 10.5368909, 
        lng: 7.4786129
    }
    this.state.myMarkers.push(aMarker);

    aMarker = {
      name : 'FreeStyle',
      lat: 10.5368509, 
      lng: 7.47864129
    }
    this.state.myMarkers.push(aMarker);

    aMarker = {
      name : 'Alta Vista',
      lat : 37.360188,
      lng : -122.064,
          }
    this.state.myMarkers.push(aMarker);

*/


/*


    axios.get('https://ruwassa.herokuapp.com/api/v1/analytics/reports/date/all')
    .then(res =>{
        let mon=0; 
        let tod=0;
        let wk= 0;
        
        let pidd=[1,2,3]
       
        Object.keys(res.data).map(e=>{
            if (new Date(res.data[e].date).getDate()== new Date().getDate() && new Date(res.data[e].date).getMonth()== new Date().getMonth()){
            
            // this.state.pidd.push(res.data[e].pid)
             
             //alert(res.data[e].pid)
             axios.get('https://ruwassa.herokuapp.com/api/v1/projects/details/'+res.data[e].pid)
             .then(res3=>{
               // alert((res3.data[0].gps.split(','))[0])
                 let data={
                    name : res3.data[0].title,
                    lat: (res3.data[0].gps.split(','))[0], 
                    lng: (res3.data[0].gps.split(','))[1]
                 }
             //    alert(res3.data[0].title)
            // markerlist={...markerlist,...data}
            this.state.myMarkers.push(data);

                })
            }
        })

    })

  









    this.setState( {myMarkers : this.state.myMarkers} );*/
   // this.setState({myMarkers: this.props.markerid})


  }

  loader=()=>{
    this.setState({   
       myMarkers: [], loading:'.....'})

    axios.get('https://ruwassa.herokuapp.com/api/v1/projects/completeprojects/all')
    .then(res =>{
        let mon=0; 
        let tod=0;
        let wk= 0;
        
        let pidd=[1,2,3]
        this.setState({locations:res.data, loading:''})
       
        Object.keys(res.data).map(e=>{
           if(this.state.phase==='all'){
            // this.state.pidd.push(res.data[e].pid)
             
             //alert(res.data[e].pid)
               // alert((res3.data[0].gps.split(','))[0])
               let lat=0;
               let long=0;
               if (res.data[e].gps){
                 lat=(res.data[e].gps.split(','))[0];
                 long=(res.data[e].gps.split(','))[1]
               }
                 let data={
                    name : res.data[e].title,
                    lat: lat, 
                    lng: long,
                    id:  Number(res.data[e].id)
                 }
                
             //    alert(res.data[e].id)
             //    alert(res3.data[0].title)
            // markerlist={...markerlist,...data}
           this.state.myMarkers.push(data);
                }else{
                  if(res.data[e].phase===this.state.phase){
                    // this.state.pidd.push(res.data[e].pid)
                     
                     //alert(res.data[e].pid)
                       // alert((res3.data[0].gps.split(','))[0])
                       let lat=0;
                       let long=0;
                       if (res.data[e].gps){
                         lat=(res.data[e].gps.split(','))[0];
                         long=(res.data[e].gps.split(','))[1]
                       }
                         let data={
                            name : res.data[e].title,
                            lat: lat, 
                            lng: long,
                            id:  Number(res.data[e].id)
                         }
                        
                     //    alert(res.data[e].id)
                     //    alert(res3.data[0].title)
                    // markerlist={...markerlist,...data}
                   this.state.myMarkers.push(data);
                        }
                }
            
        })
        this.setState( {myMarkers : this.state.myMarkers} );


    })



  }
  componentDidMount=()=>{
      this.loader()
this.interval=setInterval(()=>this.loader(),600000)
}

 
componentWillUnmount=()=>{
    clearInterval(this.interval)
}
 



handleChangePhase=(e)=>{
  const { value, name } = e.target;
  this.setState({
    //  project:'',
    myMarkers:[],
      phase: value,    
  })
this.loader()
}


  render() {



    //Marker Component
    const Marker = ({text, id}) => {
        let colorr='green'
        let name='';
        if(text=='Community Borehole'){
            colorr='blue'
            name='CHPBH'
        }else  if(text=='Motorized Solar Borehole'){
            colorr='green'
            name='SMBH'
        } else  if(text=='Sanitation'){
            colorr='red'
            name='VIP'
        }else if(text=='Force Lift'){
          name='FLBH'
        }
        return (
              <div>         
              <a target='_blank' href={`/#/projects/${id}`}> <b style={{color:colorr}}>{name}</b><img style={{width:20}} className='responsive-image' id='img'  src={ruwasa}
              alt='Logo'  /></a></div>
        );
    }

   // key1: 'AI zaSyAVT4-Uzdp9LaBGtIFlw7iGEKbPQ8fZxHI',

//apikey AIzaSyAVT4-Uzdp9LaBGtIFlw7iGEKbPQ8fZxHI
    return (
      <div>
           <GridContainer>
                 <GridItem xs={12} sm={10} md={12}>
                     <CardBody>
 
        <center> 
        <div className='col-xs-2'  style={{margin:3}}>
            <select className='form-control' id='pstatus'  onChange={this.handleChangePhase}>
                <option >Select Phase</option>
                <option value='all'> All Projects</option>
                <option value='6'>Phase 6C projects</option>
                <option value='6d'> Phase 6D projects</option>
                <option value='7'> Phase 7 projects</option>

                </select>
            </div>
   

      {//}  <MapComp locations={this.state.locations} phase={this.state.phase}/>
  }
            <div>Sites Location {this.state.loading} </div>
        <div style={{ height: '100vh', width: '90%' }}>

          <GoogleMapReact
            bootstrapURLKeys={{ 
              key:'AI zaSyC8wjDwqKGAhfCUmMRJGPYutiKE7aI5Crw',

              key1:'AI zaSyC8wjDwqKGAhfCUmMRJGPYutiKE7aI5Crw',
              region: 'NG'
             }}
          
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom} 
          >

          
          {
            //Add a list of Markers to Your Map
            this.state.myMarkers.map( (each) =>
                          <Marker
                lat = {each.lat}
                lng = {each.lng}
              text = {each.name}
              id= {each.id}
              />
            )
          }
          </GoogleMapReact>
        </div>

        </center>
        </CardBody>
            </GridItem>
            </GridContainer>
        
      </div>
      
    );
  }
}