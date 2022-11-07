import * as React from 'react';
import { useEffect } from 'react';
import IProduct from '../../data/models/IProduct';
import { CardProduct } from '../CardProduct';
import { InstrumentPanel } from '../InstrumentPanel';

interface IProps {
  products: IProduct[];
  category: string;
  title: string;
}

export const ProductList = (props: IProps) => {
  const [product, setProduct] = React.useState<(IProduct)[]>([]);
  
  const productItems = props.products;

  useEffect(() => {
    const prod = [...productItems].filter((p) => p.category === props.category).sort((a, b) => a.labelName.localeCompare(b.labelName));
    setProduct(prod);
  },[...productItems, props]);

  return(
    <div>
      <div className="simItemPos">
        <div className="simItemStyle">
          {props.title}
        </div>
        <InstrumentPanel products = {product}/>
      </div>


      <div className='productView'> 
          <CardProduct products = {product}/>
      </div>
    </div>
  )
};

