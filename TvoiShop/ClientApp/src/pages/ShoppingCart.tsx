import { useState } from 'react';
import IProduct from '../data/models/IProduct';
import Basket from '../components/shoppingCart/Basket';

interface IProps {
    products: IProduct[];
}

export const ShoppingCart = (props: IProps) => {
  const [cartItems, setCartItems] = useState<(IProduct)[]>([]);
  const products = props.products;

  const onAdd = (product: IProduct) => {
    const exist = cartItems.find((p) => p.id === product.id);
  };
  
  const onRemove = (product: IProduct) => {
    const exist = cartItems.find((x) => x.id === product.id);
};

  return (
    <div>
      <div>
        <Basket products={products}/>
      </div>
    </div>
  );
}