import React from "react";

function HeaderCard(props) {
  const {img, heading, text}= props;
    return(
        
      
          <div className='col-sm-12 col-md-4'>
           
           <div className=" box ">
            <div className="img-box">
              <img  src={img} alt="Fast-Delivery"/>
            </div>
            <div className="detail-box">
              <h5>
                {heading}
              </h5>
              <p>
                variations of passages of Lorem Ipsum available
              </p>
            </div>
          </div>
           
          </div>
     

         
        
       
    )
    
}

export default HeaderCard;