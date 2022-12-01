import React from 'react'
import Carousel from 'better-react-carousel'
import { useNavigate } from 'react-router-dom';

interface IProps {
    products: IProduct[];
    handleClick: (item: IProduct) => void;
}

export const CarouselGallery = (props: IProps) => {
    const productItems = props.products;
    const navigate = useNavigate();

    const viewProducts = productItems.map((p, index) => {
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
    <div className='productViewCarouselParent'> 
          {viewProducts}
    </div>
  )
}