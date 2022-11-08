import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home} from './pages/Home';
import {SideBar} from './components/SideBar';
import './custom.css'
import {ProductList} from './components/Jewelry/ProductList';
import { SearchBar } from './components/SearchBar';
import {ProductInfo} from './pages/ProductInfo';
import { ShoppingCart } from './pages/ShoppingCart';
import { productCategoryRoutes } from './route/productsCategoryRoutes';
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

  return (
    <div className='App'>
      <BrowserRouter>
      <SideBar/>
      <SearchBar sort={search}/>
        <Routes>
          <Route path='/' element={<Home products={products}/> } />
          <Route path='/productInfo/:id' element={<ProductInfo products={products} />} />
          {productCategoryRoutes.map((pcr, index) => (
            <Route key={index} path={pcr.path} element={<ProductList products={products} title={pcr.title} category={pcr.category} />} />
          ))}
          <Route path='/cart' element={<ShoppingCart products={products}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

