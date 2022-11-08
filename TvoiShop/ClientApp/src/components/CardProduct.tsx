import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

interface IProps {
  products: IProduct[];
}

export const CardProducts = (props: IProps) => {

  const productItems = props.products;
  const navigate = useNavigate();

  const viewProducts = productItems.map((p, index) => {
    return(
      <div className='productCard' key={index} onClick={() => navigate(`/productInfo/${p.id}`)}>


        <div className="productImagePos">
            <img className='productImage' src={p.image}/>
        </div>
        

        <div className='productLabel'>
          {p.labelName}
        </div>

        <div className='productPrice'>
            {p.price} UAH
        </div>
      </div>
    )
  })

  return(
      <div className='productView'> 
          {viewProducts} 
      </div>
  )};

