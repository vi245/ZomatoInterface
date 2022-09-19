import React from "react";
import '../../Styles/navbar.css';
import '../../Styles/detail.css';
import Modal from 'react-modal';
import axios from 'axios';



class DetailComponent extends React.Component{

          constructor(props)
          {
            super(props);
            this.state={
              modalIsOpen:false,
              modalState:false,
              open:true,
              menuList:[],
              total:0,
              selectedItems:[],
              name:"",
              email:"",
              address:"",
              number:"",
              message:"",
            }
           
          }

          componentDidMount(){
            const user=JSON.parse(localStorage.getItem('loginData'));
            if(!user)
            {
              this.setState({message:"Please Login first for payment"})
            }
            else{
              this.setState({message:""});
            }
            
          }
          calculate=(itemsArray)=>{
            const arr=[];
            itemsArray.forEach((item)=>{
              if(item.quantity>0)
              {
                arr.push({
                  quantity:item.quantity,
                  meal_name:item.meal_name,
                  meal_price:item.meal_price,
                  meal_desc:item.meal_desc,
                  meal_image:item.meal_image,
                  id:item._id,

                })
              }
              
            })
              this.setState({selectedItems:arr},()=>{return console.log(this.state.selectedItems)});
          }

          handleUserDetail=(e)=>{
            e.preventDefault();
            const cartItems=this.state.selectedItems;
            const user=JSON.parse(localStorage.getItem('loginData'));
            const userEmail=user.email;
           const userId=user._id;
            
    
         const config={
                  method:"POST",
                  url:"https://zomatoms.herokuapp.com/api/create-checkout-session",
                  data:{
                      userId,userEmail,cartItems,
                  },
                 };
                 axios(config).then((response)=>{
                  
                    window.location.href=response.data.url;
                   
                 }).catch((err)=>console.log(err.message));
          }
  handleData=()=>
  {
   const carts=this.props.menu;
   const mcart=[];
   carts.forEach(cart => {
        cart["quantity"]=0;
        cart["buttonClick"]=true;
        mcart.push(cart);
   });
   mcart.map((item)=>{
    return console.log(item["quantity"]*item["meal_price"]);
   })
   const Total=this.totalAmount(mcart);
   this.setState({menuList:mcart});
   this.setState({total:Total});
   
  }
 addHandle=(e,id)=>{
    const {menuList}=this.state;
    const selectCartIndex=menuList.findIndex((cart)=>cart._id===id);
    const selectCart=menuList[selectCartIndex];
    selectCart["buttonClick"]=false;
    menuList[selectCartIndex]=selectCart;
    this.setState({menuList:menuList});
  }
 
   totalAmount=(cart)=>{
       const total=cart.reduce((sum,b)=>{
         return sum + b["meal_price"] * b["quantity"];
       },0);
       return total;
   }
  increment=(e,id)=>{
    const {menuList}=this.state;
    const selectCartIndex=menuList.findIndex((cart)=>cart._id===id);
    const selectCart=menuList[selectCartIndex];
    const mqty=selectCart.quantity+1;
   selectCart["quantity"]=mqty;
   menuList[selectCartIndex]=selectCart;
  
   this.setState({menuList:menuList});
   
   const Total=this.totalAmount(menuList);
   this.setState({total:Total});
  }
  decrement=(e,id)=>{
   const {menuList}=this.state;
      const selectCartIndex=menuList.findIndex((cart)=>cart._id===id);
      const selectCart=menuList[selectCartIndex];
      const mqty=selectCart.quantity-1;
      if(mqty>=0)
     {
      this.setState({buttonClick:false});
      selectCart["quantity"]=mqty;
     menuList[selectCartIndex]=selectCart;
   
     this.setState({menuList:menuList});
     
     const Total=this.totalAmount(menuList);
     this.setState({total:Total});
    }
    if(mqty<0)
    {
      selectCart["buttonClick"]=true;
      menuList[selectCartIndex]=selectCart;
      this.setState({menuList:menuList});
      const Total=this.totalAmount(menuList);
      this.setState({total:Total});
    }
      
    
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
              
              <input type="radio" id="radio2"className="togRadio " defaultChecked name="restaurantInfo"/>
           <label for="radio2" className="tab1 flex align-items center">Contacts</label>
             
       
           <div className="tablist2 flex direction-column " >
              <h3>Phone Number</h3>
              <h4 className="mvalue">{`${detail.contact}`}</h4>
              <h3>{`${detail.name}`}</h3>
              <h4 className="mvalue">{`${detail.address},${detail.locality},${detail.city}`}</h4>
            
            </div>
            <div className="flex orderButton"><button onClick={()=>{this.setState({modalIsOpen:true});this.setState({modalState:false});this.handleData();}}>Place Online Order</button></div>
            {!this.state.modalState ?
            <Modal
                    isOpen={this.state.modalIsOpen}
                     onRequestClose={()=>this.setState({modalIsOpen:false})}
                    className="ModalMenu"
                  overlayClassName="Overlay"
                  onAfterOpen={()=>{document.body.style.overflow='hidden'}}
                  onAfterClose={()=>{document.body.style.overflow='visible'}}
                   >
                    <div>
                    <div className="flex space-between MenuHeader">
                      <h3>{detail.name}</h3>
                      <button className="crossMenu"onClick={()=>this.setState({modalIsOpen:false})}><span className="crossStyle">&times;</span></button>
                      </div>
                    <div className="flex direction-column MainMenu">
                      { this.state.menuList.map((item)=>{
                        return(                          
                        <div key={item._id}className="flex MenuItem">
                          <div className="flex direction-column MenuDesc ">
                          <h4 className="marginGap marginTop">{item.meal_name}</h4>
                          <h4 className="marginGap marginTop">{item.meal_price}</h4>
                          <h6 className="marginGap marginTop">{item.meal_desc}</h6>
                          </div>
                           <div className="flex direction-column MenuImage ">
                            
                            <div className="marginLeft marginTop itemImage"><img className="itemImage" alt="" src={item.meal_image}/></div>
                            {
                            item.buttonClick ?
                            <button onClick={(e)=>this.addHandle(e,item._id)} className="addButton">ADD</button> :
                            <div className="flex addMeal">
                            <button  onClick={(e)=>this.decrement(e,item._id)}className="dimension">-</button>
                            <input type="text" value={item.quantity} readOnly></input>
                            <button  onClick={(e)=>this.increment(e,item._id)} className="dimension">+</button>
                            </div>
                            }
                           </div>
                        </div>
                        
                        )
                      })}
                        <div className="flex paynow">
                        <span className="subtotal"><strong>Subtotal</strong>
                        &nbsp;&nbsp;<span><strong>`{this.state.total}</strong></span>
                        </span>
                        <button onClick={()=>{this.setState({modalState:true});this.calculate(this.state.menuList);}}>Pay Now</button>
                        </div>
                      </div>
                      </div>
                    </Modal>
                    : <Modal
                    isOpen={this.state.modalIsOpen}
                     onRequestClose={()=>this.setState({modalIsOpen:false})}
                    className="ModalMenu"
                  overlayClassName="Overlay"
                  onAfterOpen={()=>{document.body.style.overflow='hidden'}}
                  onAfterClose={()=>{document.body.style.overflow='visible'}}
                   >
                    
                     <div className="flex space-between MenuHeader">
                     <h4>{detail.name}</h4>
                        <button className="crossMenu"onClick={()=>this.setState({modalIsOpen:false})}><span className="crossStyle">&times;</span></button>
                    </div>
                    {!this.state.message ?
                    <div className="flex direction-column MainMenu">
                   
                    <div  className="orderForm flex direction-column ">
                      <h3>Hi,You have ordered</h3>
                    <table>
                       <tbody>
                          <tr>
                       <td>Meal Name</td>
                       <td>Quantity</td>
                       <td>Price</td>
                   </tr>
                    {
                        this.state.selectedItems.map((curr)=>{
                            return(
                                <tr>
                                    <td>{curr.meal_name}</td>
                                    <td>{curr.quantity}</td>
                                    <td>{curr.meal_price}</td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                       <td>Total Amount</td>
                       <td></td>
                       <td>Rs.{this.state.total}</td>
                   </tr>
                   </tbody>
             </table>
                    <button  onClick={this.handleUserDetail}className="marginAbove">Proceed</button>
                      </div>
                      
                    </div>
                    :
                    <div className="flex direction-column MainMenu">
                      <h3>{this.state.message}</h3>
                    </div>

                    }
                    
                    </Modal>
                  }
          </div>
          </div>
        
    )
  }
}
export default DetailComponent;