import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import '../../Styles/navbar.css';
import '../../Styles/imagegallery.css';


class CarouselComponent extends React.Component{
            constructor(props)
            {
              super(props);
            }

  render()
  {
    return(
      
      

 <div className="carousel-wrapper">
          
   <Carousel showThumbs={false} showArrows={false} emulateTouch={true} autoFocus={true} useKeyboardArrows={true} showStatus={false}  >
            {this.props.viewGallery.map((item)=>{
            return(  
           <div className="i2" >
          <img key={item._id} className="i1" src={`${item["uploadedImage"]}`}/>
            </div>
            )
          })}
          </Carousel>
      </div>
       
        
    )
  }
}
export default CarouselComponent;