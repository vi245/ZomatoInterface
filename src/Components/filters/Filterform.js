import React from "react";
import '../../Styles/navbar.css'
import '../../Styles/filter.css'
import {withRouter} from 'react-router-dom';

class FilterForm extends React.Component
{
      constructor(props)
      {
        super(props);
      
      }
             
  render()
  { 
    const {locationValues}=this.props;
   
    return(
    
        <form onSubmit={this.props.handleSubmit}>
        <label className="mx2 color">Select Location
        <select className="mx2 my2 selectBox" id="location" onChange={this.props.handleLocationChange}>
            <option value="0">
            Select
            </option>
            {locationValues && locationValues.map(item=>{
            return (<option value={`${item.name},${item.city}`}>{`${item.name},${item.city}`}</option>)
           })}
        </select></label>
            <fieldset className="flex direction-column">
            <legend >Cuisine</legend>
            <label ><input  type="checkbox" value="North Indian"  onClick={this.props.handleCheck}></input>North Indian</label>
            <label><input type="checkbox" value="South Indian"  onClick={this.props.handleCheck}></input>South Indian</label>
            <label><input type="checkbox" value="Chinese"  onClick={this.props.handleCheck}></input>Chinese</label>
            <label><input type="checkbox" value="Fast Food"  onClick={this.props.handleCheck}></input>Fast Food</label>
            <label><input type="checkbox" value="Street Food"  onClick={this.props.handleCheck}></input>Street Food</label>
        </fieldset>
        <fieldset className="flex direction-column">
            <legend>Price</legend>
            <label><input type="radio" name="price" value="500" onClick={this.props.handleRadio}></input>Less than Rs. 500</label>
            <label><input type="radio" name="price" value="500,1000" onClick={this.props.handleRadio}></input>Rs. 500 to Rs. 1000</label>
            <label><input type="radio" name="price" value="1000,1500" onClick={this.props.handleRadio}></input>Rs. 1000 to Rs. 1500</label>
            <label><input type="radio" name="price" value="1500,2000" onClick={this.props.handleRadio}></input>Rs. 1500 to Rs. 2000</label>
            <label><input type="radio" name="price" value="2000"onClick={this.props.handleRadio}></input>Rs. 2000+</label>
        </fieldset>
        <fieldset className="flex direction-column">
            <legend>Sort</legend>
            <label><input type="radio" name="sort" value="1" onClick={this.props.handleSort}></input>Price low to high</label>
            <label><input type="radio" name="sort" value="-1" onClick={this.props.handleSort}></input>Price high to low</label>
            
        </fieldset>
        <button type="submit"  >Apply</button>
    </form>
    
    )
}
      
}
export default FilterForm;