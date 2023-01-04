import * as React from 'react';
import { useNavigate } from "react-router-dom";
import toastrService from "../../services/toastr.service";
import translationService from '../../services/translation.service';
import { ImageBehaviour, Images } from '../Images';
import { Price } from './Price';

interface IProps {
  products: IProduct[];
}

export const CardProducts = (props: IProps) => {

  const productItems = props.products;
  const navigate = useNavigate();

  const viewProducts = productItems.map((p, index) => {
    return(
      <div className='productCard'>

        <div className="productImagePos" onClick={() => navigate(`/productInfo/${p.id}`)} >
          <div className='ProductIconPos'></div>
          <Images images={p.images} behaviour={ImageBehaviour.Single} />
        </div>
        
        <div className='productLabel' key={index} onClick={() => navigate(`/productInfo/${p.id}`)}>
          <div>{p.labelName}</div>
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

