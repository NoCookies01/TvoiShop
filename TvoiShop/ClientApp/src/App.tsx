import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home} from './pages/Home';
import {SideBar} from './components/SideBar';
import './custom.css'
import {ProductList} from './components/Jewelry/ProductList';
import { SearchBar } from './components/SearchBar';
import {ProductInfo} from './pages/ProductInfo';
import { products as db } from './data/db';
import { productCategoryRoutes } from './route/productsCategoryRoutes';
import Basket from './components/shoppingCart/Basket';
import { ShoppingCart } from './pages/ShoppingCart';
import { GetAll } from './api/endpoints/products';

export default function App() {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [sortedPproduct, setSortedProduct] = React.useState<(IProduct)[]>([]);

  useEffect(() => {
    GetAll().then(responce => setProducts(responce.data));
  }, [])

  const search = (sortQuerry: string) => {
    setSortedProduct(products.filter((p) => {
      return p.labelName.toLowerCase().indexOf(sortQuerry.toLowerCase()) !== -1;
    }));
  };

  const [show, setShow] = useState(true);
  const [cart, setCart] = useState<IProduct[]>([]);

  const handleClick = (item: any) => {
    // Update cart item quantity if already in cart
    if (cart.some((cartItem) => cartItem.id === item.id)) {
      setCart((cart) =>
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                amount: cartItem.count + 1
              }
            : cartItem
        )
      );
      return;
    }

    // Add to cart
    setCart((cart) => [
      ...cart,
      { ...item, amount: 1 } // <-- initial amount 1
    ]);
  };

  const handleChange = (id:string, d:number) => {
    setCart((cart) =>
      cart.flatMap((cartItem) =>
        cartItem.id === id
          ? cartItem.count + d < 1
            ? [] // <-- remove item if amount will be less than 1
            : [
                {
                  ...cartItem,
                  amount: cartItem.count + d
                }
              ]
          : [cartItem]
      )
    );
  };

    return (
        <div className='App'>
            <BrowserRouter>
            <SideBar/>
            <SearchBar sort={search}/>
              <Routes>
                <Route path='/' element={<Home products={products}/> } />
                <Route path='/productInfo/:id' element={<ProductInfo products={products} handleClick={handleClick} />} />
                {productCategoryRoutes.map(pcr => (
                  <Route path={pcr.path} element={<ProductList products={products} title={pcr.title} category={pcr.category} />} />
                ))}
                <Route path='/cart' element={<Basket products={products} cart={cart} setCart={setCart} handleChange={handleChange}/>} />
              </Routes>
            </BrowserRouter>
        </div>
    )
}

