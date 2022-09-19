import React from "react";
import Navbar from "../home/Navbar";
import DetailComponent from "./Detailcomponent";
import ImageGallery from "./Imagegallery";
import '../../Styles/navbar.css';
import '../../Styles/imagegallery.css';
import queryString from 'query-string';
import axios from 'axios';
import { withRouter } from "react-router-dom";

class RestaurantDetail extends React.Component{
         constructor(props)
         {
          super(props);
          this.state={
            restaurantData:{},
            menu:[],
          }
         }

         componentDidMount(){
          
      window.addEventListener('popstate',()=>{
        window.location.reload();
      })
          const qs=queryString.parse(this.props.location.search);
          const restaurantId=qs.restaurant;
          axios({
            method:'GET',
            url:`https://zomatoms.herokuapp.com/restaurant/getRestaurantById/${restaurantId}`,
            headers:{'Content-Type':'application/json'} 
          }
          ).then(response=> this.setState({restaurantData:response.data})).catch();
           
          axios(
            {
              method:'GET',
              url:`https://zomatoms.herokuapp.com/menu/getItemsByRestaurantId?restaurantid=${restaurantId}`,
              headers:{'Content-Type':'application/json'}
            }
          ).then(response=> this.setState({menu:response.data})).catch();
         }
        
  render()
  {
    const {restaurantData,menu}=this.state;
    return(
        <div>
        <Navbar/>
        <ImageGallery restaurantImage={restaurantData}/>
       <DetailComponent resDetail={restaurantData} menu={menu}/>
        </div>
    )
  }
}
export default withRouter(RestaurantDetail);