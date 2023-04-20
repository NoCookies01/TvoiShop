import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { getRoute } from '../../services/routes.service';
import toastrService from "../../services/toastr.service";
import translationService from '../../services/translation.service';
import { ImageBehaviour, Images } from '../Images';
import { Loader } from '../loading/Loader';
import { Price } from './Price';

interface IProps {
  products: IProduct[];
}

export const CardProducts = (props: IProps) => {

  const productItems = props.products;
  const navigate = useNavigate();
  const isPopular = props.products.map((p) => {
    return (p.popularity < 3)
  })

  const viewProducts = productItems.map((p, index) => {
    return(
      <div key={index} className='productCard'>
          <div className="productImagePos" onClick={() => navigate(getRoute(`productInfo/${p.id}`))} >
            <Images images={p.images} behaviour={ImageBehaviour.Single} />
          </div>

          <div className='productLabel' key={index} onClick={() => navigate(getRoute(`productInfo/${p.id}`))}>
            <div className='productLabelOverflow'>{p.labelName}</div>
            <Price product={p} />
          </div>
      </div>
    )
  })

  return(
    <div className='productView'>
        {viewProducts} 
    </div>
  )
}

