import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { getRoute } from '../../services/routes.service';
import {ReactComponent as RightIcon} from "../../images/rightIcon.svg";
import {ReactComponent as LeftIcon} from "../../images/leftIcon.svg";

interface IProps {
  products: IProduct[];
}

export const BrandsList = (props: IProps) => {

  const productBrands = props.products;
  const navigate = useNavigate();

  const sliderLeft = () => {
    var slider = document.getElementById('slider');
    if (slider) slider.scrollLeft = slider?.scrollLeft - 500;
  };
  
  const sliderRight = () => {
    var slider = document.getElementById('slider');
    if (slider )slider.scrollLeft = slider?.scrollLeft + 500;
  };

  const viewBrands = productBrands.map(p => p.brand).filter((value, index, array) => array.indexOf(value) === index).map((p, index) => {
    return(
        <div className='brandStyle' onClick={() => navigate(getRoute(`brand/${p}`))} key={index}>
            {p}
        </div>
    )
  })

  return(
      <div className='productViewCarouselParentBrand'> 
      <button onClick={sliderLeft} className ='btnCarouselLeft'> <LeftIcon/> </button>
      <button onClick={sliderRight} className ='btnCarouselRight'> <RightIcon/> </button>
        <div id='slider' className='carousel'>
          {viewBrands}
        </div>
      </div>
  )
}

