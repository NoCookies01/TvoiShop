import * as React from 'react';
import { useEffect } from 'react';
import { CardProducts } from './productsView/CardProduct';
import { InstrumentPanel } from './InstrumentPanel';
import IItem from './nestedSelect/item';
import { SortOrder } from '../data/sortCriteria';

interface IProps {
  products: IProduct[];
  category: string;
  title: string;
  sortBy: (property: string, sortOrder: SortOrder) => void;
  filterBy: (value: any, property: string) => void;
  filterCriteria: IItem[];
  resetFilter: () => void;
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
        <InstrumentPanel 
          resetFilter={props.resetFilter} 
          sortBy={props.sortBy} 
          filterBy={props.filterBy} 
          filterCriteria={props.filterCriteria}
        />
      </div>

      <div className='productView'> 
        <CardProducts products = {products} />
      </div>
    </div>
  )
};

