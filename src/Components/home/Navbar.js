import React from "react";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import Modal from 'react-modal';
import '../../Styles/navbar.css'

Modal.setAppElement('#root');
class Navbar extends React.Component{
          constructor(props)
          {
            super(props);
            this.state={
              modalIsOpen:false
            }
          }
   
  render()
  {
    return(
        <header className="container flex space-between ">
            <div className="container flex space-between navbar" >
            <div className="left align-items center flex logo">e!</div>
            <nav className="flex ">
              <div className="right flex align-items  ">
                <ul className="flex align-items center">
                   <li><button onClick={()=>this.setState({modalIsOpen:true})}>Login</button></li>
                   <Modal
                    isOpen={this.state.modalIsOpen}
                     onRequestClose={()=>this.setState({modalIsOpen:false})}
                    className="Modal"
                  overlayClassName="Overlay"
                  onAfterOpen={()=>{document.body.style.overflow='hidden'}}
                  onAfterClose={()=>{document.body.style.overflow='visible'}}
                   >
                    <div className="flex direction-column sign">
                        <div className="flex space-between loginHeader"><h2>Login</h2>
                        <button className="cross"onClick={()=>this.setState({modalIsOpen:false})}><span className="crossStyle">&times;</span></button></div>
                       <form className="loginForm flex direction-column ">
                       <input className="marginAbove" type="email" placeholder="enter your email"></input>
                        <input className="marginAbove"type="password" placeholder="enter your password"></input>
                        <button className="marginAbove"type="submit">Sign In</button>
                       </form>
                        
                        </div>
                   </Modal>
                   <li><button>SignUp</button></li>
                </ul>
                </div>
            </nav>
            </div>
        </header>
        )
  }
}
export default Navbar;