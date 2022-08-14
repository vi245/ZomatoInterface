import React from "react";
import Navbar from "../home/Navbar";
import DetailComponent from "./Detailcomponent";
import ImageGallery from "./Imagegallery";
import '../../Styles/navbar.css';
import '../../Styles/imagegallery.css';
import queryString from 'query-string';
import axios from 'axios';

class RestaurantDetail extends React.Component{
         constructor(props)
         {
          super(props);
          this.state={
            restaurantData:{}
          }
         }

         componentDidMount(){
          const qs=queryString.parse(this.props.location.search);
          const restaurantId=qs.restaurant;
          axios({
            method:'GET',
            url:`http://localhost:3000/restaurant/getRestaurantById/${restaurantId}`,
            headers:{'Content-Type':'application/json'} 
          }
            
          ).then(response=> this.setState({restaurantData:response.data})).catch();
         }
  render()
  {
    const {restaurantData}=this.state;
    return(
        <div>
        <Navbar/>
        <ImageGallery restaurantImage={restaurantData}/>
       <DetailComponent resDetail={restaurantData}/>
        </div>
    )
  }
}
export default RestaurantDetail;