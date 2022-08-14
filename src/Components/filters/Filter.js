import React from "react";
import Navbar from "../home/Navbar";
import FilterMenu from "./Filtermenu";
import axios from 'axios';
import queryString from 'query-string';

class Filter extends React.Component{
      constructor(props)
      {
        super(props);
        this.state={
          restaurantData:[],
          location:[]
        }
      }

      componentDidMount()
      {
        const qs=queryString.parse(this.props.location.search);
        const mealType=qs.mealtype;
          axios(
            {method:'GET',
            url:`https://zomatouserinterface.herokuapp.com/restaurant/getRestaurantsByMealType?type=${mealType}`,
            headers:{'Content-Type':'application/json'}
          }
          ).then(response=> this.setState({restaurantData:response.data})).catch();
          axios.get(`https://zomatouserinterface.herokuapp.com/citylist/getCityList`)
          .then(response=> this.setState({location:response.data})).catch();
      }

  render()
  {
     const {restaurantData,location}=this.state;
    return(
        <div>
        <Navbar/>
        <FilterMenu filterValue={restaurantData} locationValues={location}/>
        </div>
    )
  }
}
export default Filter;
