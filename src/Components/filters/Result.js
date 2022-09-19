import React from "react";
import '../../Styles/navbar.css'
import '../../Styles/filter.css'
import {withRouter} from 'react-router';

class Result extends React.Component{
        constructor(props)
        {
          super(props);
           this.state={
            filterValue:[],
            currPage:1,
            upperPageBound:3,
            lowerPageBound:0,
            isPrevBtnActive:'disabled',
            isNextBtnActive:'',
             itemsPerPage:2,
             pageBound:3
           }
        }
       
        static getDerivedStateFromProps(nextProps,state){
         
          if(nextProps.filterValue!== state.filterValue)
          {
             return{
              filterValue:nextProps.filterValue
             };
          }
          return null;
        }
         
    handleClick=(e)=>{
          
        let page=Number(e.target.id);
        this.setState({currPage:page});
     
        this.setPrevandNextArrow(page);
    }
    setPrevandNextArrow(page){
     let totalPage=Math.ceil(this.state.filterValue.length/this.state.itemsPerPage);
     console.log(totalPage +""+ page);
     
     
       if(totalPage === page && totalPage > 1)
       {
         this.setState((state,props)=>{ return ({isPrevBtnActive:state.isPrevBtnActive.replace('disabled','')})},()=>{return console.log(this.state.isPrevBtnActive)});
         this.setState((state,props)=>{return ({isNextBtnActive:state.isNextBtnActive.replace('','disabled')})},()=>{return console.log(this.state.isNextBtnActive)});
     
       }
       else if(page===1 && totalPage > 1)
       {
        
        this.setState((state,props)=>{ return ({isPrevBtnActive:state.isPrevBtnActive.replace('','disabled')})},()=>{return console.log(this.state.isPrevBtnActive)});
        this.setState((state,props)=>{return ({isNextBtnActive:state.isNextBtnActive.replace('disabled','')})},()=>{return console.log(this.state.isNextBtnActive)});
    
      }
      else if(totalPage>1)
      {
        this.setState((state,props)=>{return ({isNextBtnActive:state.isNextBtnActive.replace('disabled','')})},()=>{return console.log(this.state.isNextBtnActive)});
        this.setState((state,props)=>{return ({isPrevBtnActive:state.isPrevBtnActive.replace('disabled','')})},()=>{return console.log(this.state.isPrevBtnActive)});  }
     
    }
    btnIncrementClick=()=>{
    this.setState({upperPageBound:this.state.upperPageBound+this.state.pageBound});
    this.setState({lowerPageBound:this.state.lowerPageBound+this.state.pageBound});
    
    
    let page=this.state.upperPageBound+1;
    console.log(page);
    this.setState({currPage:page});
    this.setPrevandNextArrow(page);
    }
    btnDecrementClick=()=>{
    this.setState({upperPageBound:this.state.upperPageBound-this.state.pageBound});
    this.setState({lowerPageBound:this.state.lowerPageBound-this.state.pageBound});
    
    let page=this.state.upperPageBound-this.state.pageBound;
    this.setState({currPage:page});
    this.setPrevandNextArrow(page);
    }
    prevArrowClick=()=>{
    if((this.state.currPage-1)%(this.state.pageBound)===0)
    {
      this.setState({upperPageBound:this.state.upperPageBound-this.state.pageBound});
      this.setState({lowerPageBound:this.state.lowerPageBound-this.state.pageBound});
    }
    
    let page=this.state.currPage-1;
    this.setState({currPage:page});
    this.setPrevandNextArrow(page);
    }
    nextArrowClick=()=>{
    if((this.state.currPage+1)>this.state.upperPageBound)
    {
      this.setState({upperPageBound:this.state.upperPageBound+this.state.pageBound});
      this.setState({lowerPageBound:this.state.lowerPageBound+this.state.pageBound});
    }
    
    let page=this.state.currPage+1;
    this.setState({currPage:page});
    this.setPrevandNextArrow(page);
    }
    
    
      

          navigateToDetail = (item)=>{
        
          this.props.history.push(`/details?restaurant=${item}`);
        }
       
  
  render()
  {
    
    const {itemsPerPage,pageBound}=this.state;
const{currPage,upperPageBound,lowerPageBound,filterValue}=this.state;

const si=currPage*itemsPerPage-itemsPerPage;
  const ei=currPage*itemsPerPage;
  const filteredResponse=filterValue.slice(si,ei);
  console.log(filterValue);
  console.log(this.state.isNextBtnActive);
  console.log(this.state.isPrevBtnActive);
    const renderRestaurants=filteredResponse.map((item)=>{
      return(
        <div className="flex direction-column outputBar1 my2" onClick={()=>this.navigateToDetail(item._id)}>
        <div className="flex upperBlock">
             <div className="flex imgBlock"></div>
             <div className="flex direction-column infoBlock mx2">
                  <h1>{item.name}</h1>
                  <h5>{item.address}</h5>
                  <h5>{`${item.locality},${item.city}`}</h5>
             </div>
        </div>
       <hr className="line"></hr>
          <div className="flex lowerBlock">
            <div className="flex direction-column typeBlock  ">
                  <h5 className="flex left">Cuisine:</h5>
                  <h5 className="flex left">Cost For two:</h5>
            </div>
            <div className="flex direction-column descBlock mx2">
                  <h5>{item.cuisine}</h5>
                  <h5>Rs{item.min_price}</h5>
            </div>
        </div>
     </div>
      )});
    
    const noOfPages=[];
    for(let i=1;i<=Math.ceil(filterValue.length/itemsPerPage);i++)
    {
       noOfPages.push(i);
    }
    const renderPagination=noOfPages.map(number=>{
          if(number===1 && currPage===1)
          {
            return(
             
                <div key={number} className="link active">&nbsp;&nbsp;<button id={number} onClick={this.handleClick}>{number}</button></div>
             
            )
          }
          else if((number<upperPageBound +1)&&(number>lowerPageBound))
          {return(
            <div key={number} className="link">&nbsp;&nbsp;<button id={number} onClick={this.handleClick}>{number}</button></div>
              )
          }
    })
    let pageIncrementBtn=null;
       if(noOfPages.length>upperPageBound)
       {
       pageIncrementBtn= <div className="link">&nbsp;&nbsp;<button onClick={this.btnIncrementClick}>&hellip;</button></div>
       }
       let pageDecrementBtn=null;
       if(lowerPageBound>=1)
       {
        pageDecrementBtn= <div className="link">&nbsp;&nbsp;<button onClick={this.btnDecrementClick}>&hellip;</button></div>
        }
       let renderPrevArrow=null;
        
       if (this.state.isPrevBtnActive==='disabled'){
        renderPrevArrow= <div className="link ">&nbsp;&nbsp;<span>&lt;</span></div>
      }
        if(this.state.isPrevBtnActive===''){
          renderPrevArrow= <div className="link ">&nbsp;&nbsp;<button onClick={this.prevArrowClick}>&lt;</button></div>
        }
    
    let renderNextArrow=null;
    
     if (this.state.isNextBtnActive==='disabled'){
      renderNextArrow= <div className="link ">&nbsp;&nbsp;<span>&gt;</span></div>
    }
      if(this.state.isNextBtnActive===''){
        renderNextArrow= <div className="link ">&nbsp;&nbsp;<button onClick={this.nextArrowClick}>&gt;</button></div>
      }
  
   
  return(
        <div className="flex direction-column outputContainer mx2" >
            
               <div className="flex direction-column outputBar" id="output">
              
               {renderRestaurants}
                 
                 </div>
  
       
            <div className="flex pagination align-items center">
      
                 {renderPrevArrow}
                 {pageDecrementBtn}
                {renderPagination}
                {pageIncrementBtn}
                {renderNextArrow}
            </div>
          </div>
      
        
    )
  }
}
export default withRouter(Result);