import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home} from './pages/Home';
import {SideBar} from './components/SideBar';
import './custom.css'
import {ProductList} from './components/ProductList';
import { SearchBar } from './components/SearchBar';
import {ProductInfo} from './pages/ProductInfo';
import { productCategoryRoutes } from './route/productsCategoryRoutes';
import { GetAll } from './api/endpoints/products';
import { CollectionInfo } from './pages/CollectionInfo';
import { ToastrList } from './components/toastr/ToastrList';
import { getPropertyFromObject, isPrimitive } from './services/object.service';
import { SearchPage } from './pages/SearchPage';
import IItem from './components/nestedSelect/item';
import { getFilterCriteriaBasedOnProducts } from './services/filter.service';
import localstorageService from './services/localstorage.service';

export default function App() {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<IProduct[]>([]);
  const [filterCriteria, setFilterCriteria] = React.useState<IItem[]>([]);
  const [searchedProducts, setSearchedProducts] = React.useState<IProduct[]>([]);
  const [cart, setCart] = useState<IProductCart[]>([]);

  useEffect(() => {
    GetAll().then(responce => {
      var data = responce.data.sort((a, b) => a.labelName.localeCompare(b.labelName));
      setProducts(data);
      setFilteredProducts(data);
      setSearchedProducts(data);
      setFilterCriteria(getFilterCriteriaBasedOnProducts(data));

      retrieveCartFromStorage(data);
    });
  }, []);

  const search = (sortQuerry: string) => {
    setSearchedProducts(products.filter((p) => {
      return p.labelName.toLowerCase().indexOf(sortQuerry.toLowerCase()) !== -1;
    }));
  };

  const handleClick = (item: IProduct) => {
    // Update cart item quantity if already in cart
    if (cart.some((cartItem) => cartItem.id === item.id)) {
      setCart((prevCart) => {
        const newCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
              ...cartItem,
              count: cartItem.count + 1
            }
            : cartItem
          )

        localstorageService.setSaveProducts(newCart);

        return newCart;
      });
      return;
    }
    // Add to cart
    setCart((prevCart: IProductCart[]) => {
      const newCart = [
        ...prevCart,
        { ...item, count: 1 } // <-- initial amount 1
      ]

      localstorageService.setSaveProducts(newCart);

      return newCart;
    });
  };

  const handleChange = (id:string, d:number) => {
    setCart((cart) => {
      const newCart = cart.flatMap((cartItem) =>
        cartItem.id === id
          ? cartItem.count + d < 1
            ? [] // <-- remove item if count will be less than 1
            : [
              {
                ...cartItem,
                count: cartItem.count + d
              }
            ]
        : [cartItem]
      )

      localstorageService.setSaveProducts(newCart);

      return newCart;
    });
  };

  const retrieveCartFromStorage = (data: IProduct[]) => {
    var localCart = localstorageService
      .getSaveProducts()
      .filter(c => data.findIndex(d => d.id === c.id) !== -1);
    localstorageService.setSaveProducts(localCart);
    setCart(localCart);
  }

  const sortBy = (property: string) => {
    if (products.length === 0) return;

    if (!isPrimitive(products[0][property])) {
      // TO DO make for objects
      return;
    }

    setFilteredProducts([...products].sort((a, b) => {
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    }));
  }

  const filterBy = (value: any, property: string) => {
    setFilteredProducts(products.filter(o => getPropertyFromObject(o, property) === value));
  }

  const resetFilter = () => {
    setFilteredProducts([...products]);
  }

  return (
    <div className='App'>
      <ToastrList/>
        <BrowserRouter>
        <SearchBar cart={cart} setCart={setCart} handleChange={handleChange} search={search}/>
          <Routes>
            <Route path='/' element={<Home products={products} handleClick={handleClick} /> } />
            <Route path='/productInfo/:id' element={<ProductInfo products={products} handleClick={handleClick}/>} />
            <Route path='/collection' element={<CollectionInfo products={products} handleClick={handleClick} />} />
            <Route path='/search' element={
                <SearchPage 
                  products={searchedProducts} 
                  handleClick={handleClick}  
                  resetFilter={resetFilter}
                  sortBy={sortBy}
                  filterCriteria={filterCriteria}
                  filterBy={filterBy}/>} />
            {productCategoryRoutes.map((pcr, index) => (
              <Route key={index} path={pcr.path} element={
                <ProductList 
                  products={filteredProducts} 
                  handleClick={handleClick} 
                  title={pcr.title} 
                  category={pcr.category} 
                  resetFilter={resetFilter}
                  sortBy={sortBy}
                  filterCriteria={filterCriteria}
                  filterBy={filterBy}
                />} 
              />
            ))}
          </Routes>
        </BrowserRouter>
    </div>
  )
}

