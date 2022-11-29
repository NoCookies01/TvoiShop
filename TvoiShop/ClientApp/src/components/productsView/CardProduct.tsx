import * as React from 'react';
import { useNavigate } from "react-router-dom";
import toastrService from "../../services/toastr.service";

interface IProps {
  products: IProduct[];
  handleClick: (item: IProduct) => void;
}

export const CardProducts = (props: IProps) => {

  const productItems = props.products;
  const navigate = useNavigate();

  const viewProducts = productItems.map((p, index) => {
    return(
      <div className='productCard'>

        <div className="productImagePos">
          <img className='productImage' src={p.image} onClick={() => navigate(`/productInfo/${p.id}`)} />
        </div>
        
        <div className='productLabel' key={index} onClick={() => navigate(`/productInfo/${p.id}`)}>
          <div>{p.labelName}</div>
          <div className='productPrice'>{p.price} UAH</div>
        </div>

        <div className='positionCenter addToStyle'onClick={() => {props.handleClick(productItems[index]); toastrService.callToastr("Added to Cart")}}> 
          add to cart
        </div>

      </div>
    )
  })

  return(
      <div className='productView'> 
          {viewProducts} 
      </div>
  )};

