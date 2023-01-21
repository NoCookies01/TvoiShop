import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarouselGallery } from '../components/productsView/Carousel';
import { FooterPanel } from '../components/FooterPanel';
import {ReactComponent as PhotoTwo} from '../images/6.svg';
import {ReactComponent as PhotoWatches} from '../images/7.svg';
import translationService from '../services/translation.service';
import { getRoute } from '../services/routes.service';

interface IProps {
  products: IProduct[];
}

export const Home = (props: IProps) => {

  const [popularProducts, setPopularProducts] = React.useState<(IProduct)[]>([]);
  const [collectionProducts, setCollectionProducts] = React.useState<(IProduct)[]>([]);
  const [products, setProducts] = React.useState<(IProduct)[]>([]);
  const [watches, setWatches] = React.useState<(IProduct)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const popularItems = [...props.products].sort((a, b) => a.popularity - b.popularity);
    const collectionItems = [...props.products].filter((p) => p.collection === "autumn `22");
    const watches = [...props.products].filter((p) => p.category === "watches");
    setCollectionProducts(collectionItems);
    setWatches(watches);
    setPopularProducts(popularItems.splice(0,10));
    const items = props.products;
    setProducts(items);
  }, [JSON.stringify(props.products)]);

  return(
    <div>
      <br/>
      <br/>
      <div className='break'/>
      <div className="simItemPos">

        <div className="simItemStyle" onClick={() => navigate(getRoute(`search`))}>
        {translationService.translate("catalog|A")}
        </div>
        <div className='btnHomeStylePos'>
          <button className='btnHomeStyleShort' onClick={() => navigate(getRoute(`search`))} >{translationService.translate("view all products|A")}</button>
        </div>

        <div className="simItemStyle">
        {translationService.translate("collection winter`22|A")}
        </div>
      
        <div className='columnStyle positionCenter'>
          <div className='photoBannerPos' ><PhotoTwo className="photoBannerStyle"/></div>
          <div className='txtBanner' onClick={() => navigate(getRoute(`collection`))}> elegance is tvoi</div>
          <button className="btnHomeStyle" onClick={() => navigate(getRoute(`collection`))}>
          {translationService.translate("explore more|A")}
          </button>
        </div>
        <div className="simItemStyle">
        {translationService.translate("best sellers|A")}
        </div>
        <div><CarouselGallery products ={popularProducts} /> </div>
        <div className="simItemStyle">
        {translationService.translate("hot sales|A")}
        </div>
        <div className='photoBannerPos'>
            <PhotoWatches className="photoBannerStyle"/>
        </div>
        <div><CarouselGallery products ={watches} /></div>
        <button className="btnHomeStyle" onClick={() => navigate(getRoute(`watches`))}>
        {translationService.translate("explore more|A")}
        </button>

      </div>
      <FooterPanel/>
    </div>
  )

};

