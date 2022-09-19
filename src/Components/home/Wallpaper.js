import React from "react";
import '../../Styles/navbar.css'
import '../../Styles/wallpaper.css'
import axios from "axios";
import { Link } from "react-router-dom";
import {withRouter} from 'react-router';


class WallPaper extends React.Component{
         constructor(props){
            super(props);
            this.state={
                restaurants:[],
                suggestions:[],
                showSuggestions:false,
                activeSuggestion:0,
                searchText:''
              
            }
            this.renderSuggestions=this.renderSuggestions.bind(this);
         }
           
         handleLocationChange=(event)=>{
            const myArray=event.target.value.split(",");
            const locationName =myArray[1];
            axios(
                {
                    method:'GET',
                    url:`https://zomatoms.herokuapp.com/restaurant/getRestaurantByCityName?city=${locationName}`,
                    headers:{'Content-Type':'application/json'}
                }
            ).then(response=> this.setState({restaurants:response.data})).catch()
         }
          

           onKeyDown=e=>{
            const{activeSuggestion,suggestions}=this.state;

            if(e.keyCode===13)
            {
                console.log(suggestions[activeSuggestion]._id);
                this.setState({
                    activeSuggestion:0,
                    showSuggestions:false,
                    searchText:""
                })
                this.props.history.push(`/details?restaurant=${suggestions[activeSuggestion]._id}`);
                
            }
            else if(e.keyCode===38){
                if(activeSuggestion===0){
                    return;
                }
                this.setState({activeSuggestion:activeSuggestion-1});
            }
            else if(e.keyCode===40){
                if(activeSuggestion-1===suggestions.length){
                    return;
                }
                this.setState({activeSuggestion:activeSuggestion+1});
            }
           }
          
         
         handleSearch=(event)=>{
            const searchText=event.target.value;
            const {restaurants}=this.state;
            console.log(restaurants);
            let filteredList;
            if(searchText === "")
            {
                filteredList=[];
            }
            else{
                filteredList=restaurants.filter(item=>{
                    return item.name.toLowerCase().includes(searchText.toLowerCase());
                })
                console.log(filteredList);
            }
            this.setState({suggestions:filteredList,searchText:searchText,showSuggestions:true});
         }
         
         handleRestaurantClick=(restaurantList)=>
         {
            
           this.props.history.push(`/details?restaurant=${restaurantList._id}`);
            
         }
         
         renderSuggestions=()=>{
            const{suggestions,searchText,activeSuggestion,showSuggestions}=this.state;
            if(showSuggestions && searchText){
                if(suggestions.length){
                    return(
                        <ul className="suggestions">
                            {suggestions.map((item,index)=> {
                               let className;
                               console.log(index);
                               if(index===activeSuggestion)
                               {
                                className="suggestion-active";
                               }
                               return(
                                <li key={this.props.location.pathname} className={className}  onClick={()=>this.handleRestaurantClick(item)}>{`${item.name},${item.city}`}</li>
                               );
                            })}
                        </ul>
                    );
                }
                else{
                    return(
                        <div className="no-suggestions">
                            <em>No Suggestions</em>
                        </div>
                    );
                }
            }
        }
             render()
  {
    const {locationValues}=this.props;
    return(
<main className="maincontainer align-items center flex direction-column ">
    <div className=" align-items center flex logoHome">e!</div>
        <div className="flex  align-items center heading  ">
           <h1>Find the best restaurants,</h1>
           <h1>cafes,and bars</h1>
        </div>
    <div className="flex searchBar">
        <input className="select" list="location" onChange={this.handleLocationChange}/>
          <datalist id="location">
           <option value="0">Select</option>
           {locationValues && locationValues.map(item=>{
            return <option key={item._id} value={`${item.name},${item.city}`}>{`${item.name},${item.city}`}</option>
           })}
        </datalist>
        <input type="search" value={this.state.searchText} placeholder="Search for Restaurants"  onChange={this.handleSearch} onKeyDown={this.onKeyDown}/>
        <div>{this.renderSuggestions()}</div> 
    </div>
         
</main>
        )
  }
}
export default withRouter(WallPaper);