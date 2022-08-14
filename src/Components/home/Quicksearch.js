import React from "react";
import '../../Styles/navbar.css';
import '../../Styles/quicksearch.css';
import {withRouter} from 'react-router-dom';


class QuickSearch extends React.Component{
      constructor(props)
      {
        super(props);
        this.state={
          isActive:false
        }
      }
      navigateToFilter = (item)=>{
        
          
          console.log(item);
        this.props.history.push(`/filter?mealtype=${item}`);
         
        
       
      }

  render()
  {
    const {quickSearch} =this.props;
    return(
   <section className="flex mealContainer direction-column">
    <div className="quicksearchHeader">
    <h1>QuickSearch</h1>
    <h4>Discover restaurants by type of meal</h4>
    </div>
    <div className="flex mealTypes  ">
    {quickSearch && quickSearch.map(item=>{
       return (<div className="mealType flex mx2 my2"key={item._id}  onClick={()=>this.navigateToFilter(item.name)}>
            <div className="mealImage"> <img src={item.image} alt="" /> </div>
            <div className="mealDesc flex  direction-column ">
              <h4>{item.name}</h4>
              <p>{item.content}</p>
            </div>
        </div>)
    }
        )}
      
       </div>
   </section>

        )
  }
}
export default withRouter(QuickSearch);