import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigation } from 'react-router-dom';
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
import { comparePorductsPropertyToValue, getFilterCriteriaBasedOnProducts } from './services/filter.service';
import localstorageService from './services/localstorage.service';
import ServiceLayer from './components/ServiceLayer';
import { SortOrder } from './data/sortCriteria';
import ScrollToTop from './components/scroller/ScrollToTop';
import { FooterPanel } from './components/FooterPanel';
import { AdminPanel } from './components/adminPanel/AdminPanel';
import { InfoPage } from './pages/Info';
import { BrandsList } from './components/productsView/BrandsList';
import { BrandInfo } from './pages/BrandInfo';
import translationService from './services/translation.service';
import { Helmet } from 'react-helmet';
import { SalePage } from './pages/SalePage';

const productsFn = (products: IProduct[]) => products;

export default function App() {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<((products: IProduct[]) => IProduct[])[]>([productsFn, productsFn]);

  const [filterCriteria, setFilterCriteria] = React.useState<IItem[]>([]);
  const [searchedProducts, setSearchedProducts] = React.useState<(products: IProduct[]) => IProduct[]>(() => (prod: IProduct[]) => productsFn(prod));
  const setSearchedProductsState = (fn: (products: IProduct[]) => IProduct[]) => setSearchedProducts(() => fn);
  
  const [cart, setCart] = useState<{data: IProductCart[], loadedFromStorage: boolean}>({data: [], loadedFromStorage: false});

  useEffect(() => {
    GetAll().then(responce => {
      var data = responce.data.sort((a, b) => a.labelName.localeCompare(b.labelName));
      setProducts(data);
      setFilterCriteria(getFilterCriteriaBasedOnProducts(data));

      retrieveCartFromStorage(data);
    });
  }, []);

  useEffect(() => {
    if (cart.loadedFromStorage) {
      localstorageService.setSaveProducts(cart.data);
    }
  }, [cart]);

  const search = (sortQuerry: string) => {
    setSearchedProductsState((prod) => prod.filter((p) => {
      return `${p.labelName} ${p.description}`.toLowerCase().indexOf(sortQuerry.toLowerCase()) !== -1;
    }));
  };

  const resetSearch = () => {
    setSearchedProductsState(productsFn);
  }

  const handleClick = (item: IProductCart) => {
    // Update cart item quantity if already in cart
    if (cart.data.some((cartItem) => cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size)) {
      setCart((prevCart) => {
        const newCart = prevCart.data.map((cartItem) =>
          cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size
            ? {
              ...cartItem,
              count: cartItem.count + 1
            }
            : cartItem
          )

        return {data: newCart, loadedFromStorage: prevCart.loadedFromStorage};
      });
      return;
    }
    // Add to cart
    setCart((prevCart) => {
      const newCart = [
        ...prevCart.data,
        { ...item, count: 1 } // <-- initial amount 1
      ]

      return {data: newCart, loadedFromStorage: prevCart.loadedFromStorage};
    });
  };

  const clearBasket = () => {
    localstorageService.setSaveProducts([]);
    setCart({data: [], loadedFromStorage: true});
  }

  const handleChange = (product:IProductCart, d:number) => {
    setCart((cart) => {
      const newCart = cart.data.flatMap((cartItem) =>
        cartItem.id === product.id && cartItem.color === product.color && cartItem.size === product.size
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

      return {data: newCart, loadedFromStorage: cart.loadedFromStorage};
    });
  };

  const retrieveCartFromStorage = (data: IProduct[]) => {
    var localCart = localstorageService
      .getSaveProducts()
      .filter(c => data.findIndex(d => d.id === c.id) !== -1);
    localstorageService.setSaveProducts(localCart);
    setCart({data: localCart, loadedFromStorage: true});
  }

  const getFilteredProducts = (prod: IProduct[]) => {
    filteredProducts.forEach(fn => prod = fn(prod));
    return prod;
  }

  const getSearchProducts = (prod: IProduct[]) => {
    return searchedProducts(prod);
  }

  const sortBy = (property: string, sortOrder: SortOrder) => {
    if (products.length === 0) return;

    if (!isPrimitive(products[0][property])) {
      // TO DO make for objects
      return;
    }
    
    const sortFn = (a: any, b: any) => {
      if (a[property] > b[property]) {
        return -1;
      }
      if (b[property] > a[property]) {
        return 1;
      }
      return 0;
    };

    setFilteredProducts([filteredProducts[0], (prod) => [...prod].sort((a: any, b: any) => {
      if (sortOrder === SortOrder.Ascending) {
        return sortFn(a, b);
      }
      return sortFn(a, b) * -1;
    })]);
  }

  const filterBy = (value: any, property: string) => {
    setFilteredProducts([(prod) => [...prod].filter(o => comparePorductsPropertyToValue(o, value, property)), filteredProducts[1]]);
  }

  const resetFilter = () => {
    setFilteredProducts([productsFn, productsFn]);
  }

  const handleSetCart = (fn: (items: IProductCart[]) => IProductCart[]) => {
    setCart(prevCart => {
      return {data: fn(prevCart.data), loadedFromStorage: prevCart.loadedFromStorage};
    });
  }
  
  return (
    <div className='App'>
        <ToastrList/>
        <BrowserRouter>
      <ScrollToTop>
        <SearchBar cart={cart.data} setCart={handleSetCart} handleChange={handleChange} search={search} resetSearch={resetSearch} clearBasket={clearBasket} />
          <Routes>
            <Route path='/:lang' element={<ServiceLayer />}>
                <Route path='' element={<Home products={products} />}/>
                <Route path='admin' element={<AdminPanel/>}/>
                <Route path='info' element={<InfoPage/>}/>
                <Route path='productInfo/:id' element={<ProductInfo products={products} handleClick={handleClick}/>} />
                <Route path='brand/:brand' element={<BrandInfo products={products}/>} />
                <Route path='collection' element={<CollectionInfo products={products} />} />
                <Route path='sales' element={<SalePage products={products} />} />
                <Route path='search' element={
                    <SearchPage 
                      products={getFilteredProducts(getSearchProducts(products))} 
                      resetFilter={resetFilter}
                      sortBy={sortBy}
                      filterCriteria={filterCriteria}
                      filterBy={filterBy}/>} 
                    />
                {productCategoryRoutes.map((pcr, index) => (
                  <Route key={index} path={pcr.path} element={
                    <ProductList 
                      products={getFilteredProducts(products)} 
                      title={pcr.title} 
                      header={pcr.header}
                      category={pcr.category} 
                      resetFilter={resetFilter}
                      sortBy={sortBy}
                      filterCriteria={filterCriteria}
                      filterBy={filterBy}
                    />} 
                  />
                ))}
            </Route>
            <Route path='*' element={<Navigate to={`/${translationService.getPrefferedLanguageOrDefault('uk')}`} />}/>
          </Routes>
      </ScrollToTop>
        </BrowserRouter>
    </div>
  )
}

