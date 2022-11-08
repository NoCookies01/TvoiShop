import * as React from 'react';
import { useEffect } from 'react';
import { CardProducts } from '../CardProduct';
import { InstrumentPanel } from '../InstrumentPanel';

interface IProps {
  products: IProduct[];
  category: string;
  title: string;
}

export const ProductList = (props: IProps) => {
  const [products, setProducts] = React.useState<(IProduct)[]>([]);
  
  useEffect(() => {
    const prod = [...props.products].filter((p) => p.category === props.category).sort((a, b) => a.labelName.localeCompare(b.labelName));
    setProducts(prod);
  },[JSON.stringify(props.products), props]);

  return(
    <div>
      <div className="simItemPos">
        <div className="simItemStyle">
          {props.title}
        </div>
        <InstrumentPanel products = {products}/>
      </div>


      <div className='productView'> 
        <CardProducts products = {products}/>
      </div>
    </div>
  )
};

