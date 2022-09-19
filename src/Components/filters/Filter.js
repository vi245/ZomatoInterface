import React from "react";
import Navbar from "../home/Navbar";
import FilterMenu from "./Filtermenu";
import axios from 'axios';
import queryString from 'query-string';
import {withRouter} from 'react-router';

class Filter extends React.Component{
      constructor(props)
      {
        super(props);
        this.state={
          restaurantData:[],
          locationValues:[]
        }
      }

      componentDidMount()
      {
      
      window.onpopstate=(event)=>{
       setTimeout(()=>{window.location.reload()},1000); 
      }
        const qs=queryString.parse(this.props.location.search);
        const mealType=qs.mealtype;
          axios(
            {method:'GET',
            url:`https://zomatoms.herokuapp.com/restaurant/getRestaurantsByMealType?type=${mealType}`,
            headers:{'Content-Type':'application/json'}
          }
          ).then(response=> this.setState({restaurantData:response.data})).catch();
          axios.get(`https://zomatoms.herokuapp.com/citylist/getCityList`)
          .then(response=> this.setState({locationValues:response.data})).catch();
        
        }
        
  

  render()
  {
     const {restaurantData,locationValues}=this.state;
    return(
        <div>
        <Navbar/>
        <FilterMenu filterValue={restaurantData} locationValues={locationValues}/>
        </div>
    )
  }
}
export default withRouter(Filter);