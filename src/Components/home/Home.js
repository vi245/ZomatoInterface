import React from "react";
import Navbar from "./Navbar";
import QuickSearch from "./Quicksearch";
import WallPaper from "./Wallpaper";
import axios  from "axios";
import '../../App.css';
import {withRouter} from 'react-router';
import {browserHistory} from 'react-router';

class Home extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      location:[],
      mealType:[],
      locationKeys:[]
    }
    
  }
  componentDidMount()
  {
     
      window.addEventListener('popstate',()=>{
        window.location.reload();
      })
    axios.get(`https://zomatoms.herokuapp.com/citylist/getCityList`)
    .then(response=> this.setState({location:response.data})).catch();
    axios(
      {
        method:'GET',
        url:'https://zomatoms.herokuapp.com/meals/getMeals',
        headers:{'Content-Type':'application/json'}
      }
    ).then(response=> this.setState({mealType:response.data})).catch()
   
    }
  
  render()
  {
    const {location,mealType}=this.state;
    return(
        <div>
        <Navbar/>
        <WallPaper locationValues={location}/>
        <QuickSearch quickSearch={mealType}/>
        </div>
    )
  }
}
export default withRouter(Home);