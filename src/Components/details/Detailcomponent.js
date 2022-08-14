import React from "react";
import '../../Styles/navbar.css';
import '../../Styles/detail.css';


class DetailComponent extends React.Component{

          constructor(props)
          {
            super(props);
          }

  render()
  {
    const detail=this.props.resDetail;
    return(
        <div className="flex direction-column">
          <div className="restaurantName">
          <h1>{detail.name}</h1>
          </div>

          <div className="flex tabs ">

          <input type="radio" id="radio1"className="togRadio " name="restaurantInfo"/>
           <label for="radio1" className="tab1 flex align-items center">Overview</label>
            <div className="tablist1 flex direction-column ">
         
             
              <h3>About this place</h3>
              <h4>Cuisine</h4>
              <h5 className="mvalue">{`${detail.cuisine}`}</h5>
              <h4 className="mheader">Cost</h4>
              <h5 className="mvalue">Rs{`${detail.min_price}`} for two people (approx)</h5>
            </div>
              
              <input type="radio" id="radio2"className="togRadio " checked name="restaurantInfo"/>
           <label for="radio2" className="tab1 flex align-items center">Contacts</label>
             
       
           <div className="tablist2 flex direction-column " >
              <h3>Phone Number</h3>
              <h4 className="mvalue">{`${detail.contact}`}</h4>
              <h3>{`${detail.name}`}</h3>
              <h4 className="mvalue">{`${detail.address},${detail.locality},${detail.city}`}</h4>
            
            </div>
          </div>
          </div>
        
    )
  }
}
export default DetailComponent;