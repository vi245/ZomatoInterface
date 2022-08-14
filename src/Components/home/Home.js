import React from "react";
import Navbar from "./Navbar";
import QuickSearch from "./Quicksearch";
import WallPaper from "./Wallpaper";
import axios  from "axios";
import '../../App.css';

class Home extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      location:[],
      mealType:[]
    }
    
  }
  componentDidMount()
  {
    axios.get(`http://localhost:3000/citylist/getCityList`)
    .then(response=> this.setState({location:response.data})).catch();
    axios(
      {
        method:'GET',
        url:'http://localhost:3000/meals/getMeals',
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
export default Home;