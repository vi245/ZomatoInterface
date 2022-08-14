import React from "react";
import '../../Styles/navbar.css'
import '../../Styles/filter.css'
import Result from "./Result";
import FilterForm from "./Filterform";

class FilterMenu extends React.Component{
   constructor(props){
    super(props);
    this.state={
      
      displayOutput:'',
      itemsPerPage:2,
       filterValue:[],
       select:false,
       Cu:false,
       cuisine:[],
       price:false,
       sort:false,
       sortvalue:1,
       filterLoc:[],
       filterCuisine:[],
       filterPrice:[],
       filterSort:[],
        output:[]
    }
   }
  
   static getDerivedStateFromProps(nextProps,state)
   {
    if((nextProps.filterValue!==state.filterValue) )
    {
    
      return{
        filterValue:nextProps.filterValue,
        displayOutput:''
      }
    }
    return null;
   }
 
  
  handleCheck=(event)=>{
    
    
    const{cuisine}=this.state;
     var  updatedList=[...cuisine];
    if(event.target.checked)
    {
     this.setState({Cu:true});
     updatedList=[...cuisine,event.target.value]
   
    }
    else{
     updatedList.splice(cuisine.indexOf(event.target.value),1);
       this.setState({Cu:false})
    }
    this.setState({cuisine:updatedList});
    
    this.handleCheckData(updatedList);
   }
      handleCheckData=(updatedList)=>{
      
       let filteredRestaurants=[];
      
       const {filterValue}=this.props;
     
       filterValue.map(item=>{
     console.log(updatedList.indexOf(item.cuisine));
       if(updatedList.indexOf(item.cuisine)!== -1)
       {
         filteredRestaurants.push(item);
         
       }
        return filteredRestaurants;
        
    });
       this.setState({filterCuisine:filteredRestaurants});
      
      }

      handleRadio=(event)=>{
       let filteredRestaurants=[];
       const   {filterValue}=this.props;
           let cost,lcost,hcost;
           if(event.target.checked)
           {  
             this.setState({price:true});
             cost=event.target.value.split(',');
             
              if(cost.length===1)
              {
               cost=Number(cost[0]);
               if(cost===500){
               
                 filterValue.map(item=>{
                   if(item.min_price<cost)
                   filteredRestaurants.push(item);
                   return filteredRestaurants;
                 })
                 
               }
               if(cost===2000){
             
                 filterValue.map(item=>{
                 if(item.min_price>cost)
                 filteredRestaurants.push(item);
                 return filteredRestaurants;
               })
              
               }
              }
              else {
               lcost=Number(cost[0]);
               hcost=Number(cost[1]);
               filterValue.map(item=>{
                 if(item.min_price>=lcost && item.min_price<hcost)
                 filteredRestaurants.push(item);
                 return filteredRestaurants;
               })
               
              }
            
           }
           else{
             this.setState({price:false});
           }
           this.setState({filterPrice:filteredRestaurants});
           
         }
         handleSort=(event)=>{
           this.setState({sort:true});
           const    {filterValue}=this.props;
           let filteredRestaurants=[];
           const sort=event.target.value;
           if(event.target.checked)
           {
             
           if(sort==="1")
           {
            this.setState({sortvalue:1})
             filterValue.sort((a,b)=>{
               return a.min_price-b.min_price;
             });
             filterValue.map(item=>{
                 filteredRestaurants.push(item);
                 return filteredRestaurants
             });
           
           }
           if(sort==="-1")
           {
             this.setState({sortvalue:-1})
             filterValue.sort((a,b)=>{
               return b.min_price-a.min_price;
             });
             filterValue.map(item=>{
                 filteredRestaurants.push(item);
                 return filteredRestaurants
             });
           
           }
         }
         else{
           this.setState({sort:false});
         }
          this.setState({filterSort:filteredRestaurants});
        
         }

        
        
             handleLocationChange=(event)=>{
             this.setState({select:true});
             if(event.target.value==="0")
             {
               this.setState({select:false});
             }
             let filteredRestaurants=[];
             const myArray=event.target.value.split(",");
             const locationName =myArray[1];
             this.state.filterValue.map(item=>{
               if(item.city===locationName)
               {
                 filteredRestaurants.push(item);
               }
 
               return (filteredRestaurants);
            });
           
               this.setState({filterLoc:filteredRestaurants});
               
             }
     
  handleSubmit=(e)=>{
  
    const{select,Cu,sort,sortvalue,price,filterCuisine,filterPrice}=this.state;
    this.setState({displayOutput:'display'},()=>{return console.log(this.state.displayOutput)});
    e.preventDefault();
       console.log("hellloo") 
        if(select && !Cu && !price && !sort )
        {
            let    filterdata=this.state.filterLoc;
            this.setState( {output:filterdata},()=>{return console.log(this.state.output)});
          
        }
        if(Cu && !select && !price && !sort )
        {
            let    filterdata=filterCuisine;
            this.setState( {output:filterdata},()=>{return console.log(this.state.output)});
            
        }
      if(price && !Cu && !select && !sort )
        {
            let filterdata=filterPrice;
            this.setState( {output:filterdata},()=>{return console.log(this.state.output)});
            
        }
       if(sort && !select && !price && !Cu)
        {
          const {filterValue}=this.props;
          let    filterdata;
          if(sortvalue===1)
          {
               filterdata=filterValue.sort((a,b)=> { return (a.min_price-b.min_price)});
          }
          if(sortvalue===-1)
          {
              filterdata=filterValue.sort((a,b)=> { return (b.min_price-a.min_price)});
          }
          this.setState( {output:filterdata},()=>{return console.log(this.state.output)});
        }
     if(select && Cu && !price && !sort)
        {
          let arr1=this.state.filterLoc;
          let arr2=filterCuisine;
         let    filterdata=arr1.filter(x=>{return arr2.find(e=>{return e.cuisine === x.cuisine;});});
         this.setState( {output:filterdata},()=>{return console.log(this.state.output)});
        }
       if(select && price && !Cu && !sort)
        {
          let arr1=this.state.filterLoc;
          let arr2=filterPrice;
          let    filterdata=arr2.filter(x=>{return arr1.find(e=>{return e.city === x.city;});});
          this.setState( {output:filterdata},()=>{return console.log(this.state.output)});
        }
        if(select && sort && !Cu && !price)
        {
          let arr1=this.state.filterLoc;
          let    filterdata;
         if(sortvalue=== 1)
             filterdata=arr1.sort((a,b)=>{return a.min_price-b.min_price});
          if(sortvalue=== -1)
           filterdata=arr1.sort((a,b)=>{return b.min_price-a.min_price});
           this.setState( {output:filterdata},()=>{return console.log(this.state.output)});
        }
         if(select && sort && Cu && !price)
        {
          let arr1=this.state.filterLoc;
          let arr2=filterCuisine;
         let    filterdata=arr1.filter(x=>{return arr2.find(e=>{return e.cuisine === x.cuisine;});});
         if(sortvalue=== 1)
             filterdata.sort((a,b)=>{return a.min_price-b.min_price});
          if(sortvalue=== -1)
           filterdata.sort((a,b)=>{return b.min_price-a.min_price});
           this.setState( {output:filterdata},()=>{return console.log(this.state.output)});
        }
   if(select && price && sort && !Cu)
        {
          let arr1=this.state.filterLoc;
          let arr2=filterPrice;
          let    filterdata=arr2.filter(x=>{return arr1.find(e=>{return e.city === x.city;});});
           if(sortvalue=== 1)
             filterdata.sort((a,b)=>{return a.min_price-b.min_price});
          if(sortvalue=== -1)
           filterdata.sort((a,b)=>{return b.min_price-a.min_price});
           this.setState( {output:filterdata},()=>{return console.log(this.state.output)});
        }
       if(select && price && Cu && !sort)
        {
          let arr1=this.state.filterLoc;
          let arr2=filterPrice;
          let arr3=filterCuisine;
          let arr4=arr2.filter(x=>{return arr1.find(e=>{return e.city === x.city;});});
          let    filterdata=arr4.filter(x=>{return arr3.find(e=>{return e.cuisine === x.cuisine;});});
          this.setState( {output:filterdata},()=>{return console.log(this.state.output)});
        
        }
        if( price && Cu && !sort && !select)
        {
          let arr1=filterPrice;
          let arr2=filterCuisine;
          let    filterdata=arr1.filter(x=>{return arr2.find(e=>{return e.cuisine === x.cuisine;});});                        
          this.setState( {output:filterdata},()=>{return console.log(this.state.output)});
        }
        if( sort && Cu && !price && !select)
        {
          let arr1=filterCuisine;
          let    filterdata;
          if(sortvalue=== 1)
           filterdata=arr1.sort((a,b)=>{return a.min_price-b.min_price});
         if(sortvalue=== -1)
           filterdata=arr1.sort((a,b)=>{return b.min_price-a.min_price});                       
           this.setState( {output:filterdata},()=>{return console.log(this.state.output)});
        }
        if( price && Cu && sort && !select)
        {
          let arr1=filterPrice;
          let arr2=filterCuisine;
          let    filterdata=arr1.filter(x=>{return arr2.find(e=>{return e.cuisine === x.cuisine;});}); 
          if(sortvalue=== 1)
           filterdata.sort((a,b)=>{return a.min_price-b.min_price});
         if(sortvalue=== -1)
           filterdata.sort((a,b)=>{return b.min_price-a.min_price});                        
           this.setState( {output:filterdata},()=>{return console.log(this.state.output)});
        }
      if( price && sort && !Cu && !select)
        {
          let arr1=filterPrice;
          let    filterdata;
          if(sortvalue=== 1)
           filterdata=arr1.sort((a,b)=>{return a.min_price-b.min_price});
         if(sortvalue=== -1)
           filterdata=arr1.sort((a,b)=>{return b.min_price-a.min_price});                        
           this.setState( {output:filterdata},()=>{return console.log(this.state.output)});
        }
        if( price && sort && Cu && select)
        {
          let arr1=this.state.filterLoc;
          let arr2=filterPrice;
          let arr3=filterCuisine;
          let arr4=arr2.filter(x=>{return arr1.find(e=>{return e.city === x.city;});});
          let    filterdata=arr4.filter(x=>{return arr3.find(e=>{return e.cuisine === x.cuisine;});});
          

          if(sortvalue=== 1)
           filterdata=filterdata.sort((a,b)=>{return a.min_price-b.min_price});
         if(sortvalue=== -1)
           filterdata=filterdata.sort((a,b)=>{return b.min_price-a.min_price});                        
           this.setState( {output:filterdata},()=>{return console.log(this.state.output)});
        }
        this.setState({displayOutput:'display'},()=>{console.log(this.state.displayOutput)});
   } 
  
  render()
  {
    const {locationValues}=this.props;
   const{displayOutput,filterValue,output}=this.state
    
    return(
        <div className="flex direction-column filterContainer">
         <h1 className="head">Breakfast places in Mumbai</h1>
        <div className=" flex main">
       <label for="check" className="togButton show">Filters/Sort<i className="arrow down"></i></label>
        <input type="checkbox" className="togCheck show" id="check"/>
        <div className="flex direction-column filterBar ">
          <h4 className="mx2 my2">Filters</h4>
           <FilterForm locationValues={locationValues}  handleCheck={this.handleCheck}handleRadio={this.handleRadio}
           handleLocationChange={this.handleLocationChange} handleSort={this.handleSort} handleSubmit={this.handleSubmit} ></FilterForm>
            </div>
         
         
           { (displayOutput==='') &&
           <Result   filterValue={filterValue}>
  </Result>}
  { (displayOutput==='display') &&
           <Result filterValue={output}>
  </Result>}
          
         
        
       </div>
        </div>
    )
  }
}
export default FilterMenu;