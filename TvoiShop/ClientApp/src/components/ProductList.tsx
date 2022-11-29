import * as React from 'react';
import { useEffect } from 'react';
import { CardProducts } from './productsView/CardProduct';
import { InstrumentPanel } from './InstrumentPanel';

interface IProps {
  products: IProduct[];
  category: string;
  title: string;
  sortBy: (property: string) => void;
  filterBy: (value: any, property: string) => void;
  handleClick: (item: IProduct) => void;
}

export const ProductList = (props: IProps) => {
  const [products, setProducts] = React.useState<(IProduct)[]>([]);
  
  useEffect(() => {
    const prod = [...props.products].filter((p) => p.category === props.category);
    
    setProducts(prod);
  }, [props.products, props]);

  return(
    <div>
      <br/>
      <br/>
      <div className="simItemPos">
        <div className="simItemStyle">
          {props.title}
        </div>
        <InstrumentPanel sortBy={props.sortBy} filterBy={props.filterBy}/>
      </div>

      <div className='productView'> 
        <CardProducts products = {products} handleClick={props.handleClick}/>
      </div>
    </div>
  )
};

