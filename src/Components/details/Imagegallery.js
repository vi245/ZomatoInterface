import React from "react";
import '../../Styles/navbar.css';
import '../../Styles/imagegallery.css';
import CarouselComponent from "./Carousel";
import { withRouter } from "react-router-dom";


class ImageGallery extends React.Component{
        constructor(props)
        {
          super(props);
          this.state={
            showImage:false
          }
          this.seeImage=this.seeImage.bind(this);
          this.closeImage=this.closeImage.bind(this);
        }
       seeImage()
       {
       this.setState({showImage:true});
       }
      closeImage(){
        this.setState({showImage:false});
      }

  render()
  {
     
 
   
    return(
        <div className="flex imgContainer ">
                   {this.state.showImage ? 
           <div className="imageGallery flex">
               
            <CarouselComponent viewGallery={this.props.restaurantImage.uploadImages}/>
            <button onClick={this.closeImage} className="closeButton "><span  className="close">&times;</span></button>
           {!this.state.showImage && <div className="absolute flex">
               <img className="image" src={this.props.restaurantImage.image}/>
               </div>} 
           </div>:
          <div className="absolute flex">
            <button onClick={this.seeImage} className="imageButton">Click to see Image Gallery</button>
  
            <img className="image" src={this.props.restaurantImage.image}/></div> 
         }
         
         </div>
        
    ) 
  }
}
export default withRouter(ImageGallery);