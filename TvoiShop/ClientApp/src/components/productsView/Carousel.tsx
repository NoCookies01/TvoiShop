import React from 'react'
import { useNavigate } from 'react-router-dom';
import {ReactComponent as RightIcon} from "../../images/rightIcon.svg";
import {ReactComponent as LeftIcon} from "../../images/leftIcon.svg";

interface IProps {
    products: IProduct[];
    handleClick: (item: IProduct) => void;
}

export const CarouselGallery = (props: IProps) => {
    const productItems = props.products;
    const navigate = useNavigate();

    const sliderLeft = () => {
      var slider = document.getElementById('slider');
      if (slider) slider.scrollLeft = slider?.scrollLeft - 500;
    };
    
    const sliderRight = () => {
      var slider = document.getElementById('slider');
      if (slider )slider.scrollLeft = slider?.scrollLeft + 500;
    };

    const viewCarousel = productItems.map((p, index) => {
        return(
          <div className='productCard' key={index} onClick={() => navigate(`/productInfo/${p.id}`)}>

              <div className="productImagePos">
                <div className='ProductIconPos'></div>
                <img className='productImage' src={p.image}/>
              </div>

              <div className='productLabel'>
                <div>{p.labelName}</div>
                <div className='productPrice'>{p.price} UAH</div>
              </div>
          </div>
        )
      })

  return (
    <div>
      <div className='productViewCarouselParent'> 
      <button onClick={sliderLeft} className ='btnCarouselLeft'> <LeftIcon/> </button>
      <button onClick={sliderRight} className ='btnCarouselRight'> <RightIcon/> </button>
        <div id='slider' className='carousel'>
          {viewCarousel}
        </div>
      </div>
    </div>
    )
}