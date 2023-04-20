import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarouselGallery } from '../components/productsView/Carousel';
import { FooterPanel } from '../components/FooterPanel';
import translationService from '../services/translation.service';
import { getRoute } from '../services/routes.service';
import { BrandsList } from '../components/productsView/BrandsList';
import { Helmet } from 'react-helmet';
import { CardProducts } from '../components/productsView/CardProduct';
import {ReactComponent as RightIcon} from '../images/rightArrow.svg';

interface IProps {
  products: IProduct[];
}

export const Home = (props: IProps) => {

  const [popularProducts, setPopularProducts] = React.useState<(IProduct)[]>([]);
  const [collectionProducts, setCollectionProducts] = React.useState<(IProduct)[]>([]);
  const [offeredProduct, setOfferedProduct] = React.useState<(IProduct)[]>([]);
  const [products, setProducts] = React.useState<(IProduct)[]>([]);
  const [watches, setWatches] = React.useState<(IProduct)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const popularItems = [...props.products].sort((a, b) => a.popularity - b.popularity);
    const collectionItems = [...props.products].filter((p) => p.collection === "autumn `22");
    const watches = [...props.products].filter((p) => p.category === "watches").sort(() => Math.random() - 0.5);
    const offeredItems = [...props.products].sort(() => Math.random() - 0.5);
    setOfferedProduct(offeredItems.splice(0,20));
    setCollectionProducts(collectionItems);
    setWatches(watches);
    setPopularProducts(popularItems.splice(0,10));
    const items = props.products;
    setProducts(items);
  }, [JSON.stringify(props.products)]);

  return(
    <div>
      <Helmet>
        <title>TVOI | Home - Срібні брендові прикраси за низькими цінами купити у Львові у Києві</title>
      </Helmet>
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

        <div className="simItemStyleSpecial">
          {translationService.translate("springSale|A")}
        </div>

        <div className='photoBannerPosSmall'>
            <img src='https://live.staticflickr.com/65535/52785329399_08d751597e_z.jpg' className="photoBannerSmallStyle"/>
            <img src='https://live.staticflickr.com/65535/52784551537_00cffd1ef8_c.jpg' className="photoBannerSmallStyleTwo"/>
            <div className='springSalePos'> 
              <button className='btnHomeStyleWhite' onClick={() => navigate(getRoute(`collection`))}>
                {translationService.translate("gift|A")}
              </button>
            </div>
          </div>

          <div className="simItemStyle">
          {translationService.translate("brands|A")}
          </div>
          <BrandsList products={products}/>
      
        <div className='columnStyle positionCenter'>
          <div className='photoBannerPosSmall' >
            <img src='https://live.staticflickr.com/65535/52644560059_1f10d3f810_h.jpg' className="photoBannerStyle"/>
            <img src='https://live.staticflickr.com/65535/52793922464_ef51b37cc1_b.jpg' className="photoBannerSmallStyle"/>
            <div className='txtBanner' onClick={() => navigate(getRoute(`collection`))}> elegance is tvoi</div>
          </div>
        </div>

        <div className="simItemStyleSpecial">
          {translationService.translate("often bought|A")}
        </div>
          <CarouselGallery products ={popularProducts} />

        <div className="simItemStyleSpecial" onClick={() => navigate(getRoute(`watches`))}>
          {translationService.translate("watch-50|A")}
        </div>
        <CarouselGallery products ={watches} />
        
      </div>
    
      <div className="simItemStyleSpecial" onClick={() => navigate(getRoute(`sales`))}>
        {translationService.translate("more to love|A")}
      </div>
      <CardProducts products ={offeredProduct} />

      <div className='btnHomeStylePos'>
        <button className='btnHomeStyleGray' onClick={() => navigate(getRoute(`sales`))} >{translationService.translate("want more|A")}</button>
      </div>

      <FooterPanel/>
    </div>
  )

};

