import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarouselGallery } from '../components/productsView/Carousel';
import { FooterPanel } from '../components/FooterPanel';
import { CollectionInfo } from './CollectionInfo';
import {ReactComponent as PhotoOne} from '../images/1.svg';
import {ReactComponent as PhotoTwo} from '../images/6.svg';
import {ReactComponent as MainLogo} from '../images/mainlogo.svg';
import { Categories } from '../components/productsView/Categories';

interface IProps {
  products: IProduct[];
  handleClick: (item: IProduct) => void;
}

export const Home = (props: IProps) => {

  const [popularProducts, setPopularProducts] = React.useState<(IProduct)[]>([]);
  const [products, setProducts] = React.useState<(IProduct)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const popularItems = [...props.products].sort((a, b) => a.popularity - b.popularity);
    setPopularProducts(popularItems.splice(0,6));
    const items = props.products;
    setProducts(items);
  }, [JSON.stringify(props.products)]);

  return(
    <div>
        <br/>
        <br/>
       <div className="simItemPos">

          <div className="simItemStyle">
              Categories
          </div>
          <div><Categories products={products} handleClick={props.handleClick}/> </div>

          <div className="simItemStyle">
              Collection winter '22
          </div>
        
          <div className='columnStyle positionCenter'>

          <div className='positionCenter'>
            <div className='photoBannerPos' onClick={() => navigate(`/collection`)}><PhotoTwo className="photoBannerStyle"/></div>
            <div className='txtBanner'> elegance is tvoi</div>
          </div>

            <button className="btnHomeStyle" onClick={() => navigate(`/collection`)}>
              explore more
            </button>

            <CollectionInfo products={products} handleClick={props.handleClick}/>

          </div>

          <div className="simItemStyle">
              Best Sellers
          </div>
          <div><CarouselGallery products ={popularProducts} handleClick={props.handleClick}/> </div>

          <div className="btnHomeStylePos">
            <button className="btnHomeStyle" onClick={() => navigate(`/bracelet/`)}>
                shop now
              </button>
          </div>
        </div>
        <FooterPanel/>
    </div>
  )

};

