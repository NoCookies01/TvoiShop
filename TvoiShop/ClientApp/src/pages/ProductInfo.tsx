import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { defaultProduct } from '../data/defaults';
import toastrService from "../services/toastr.service";
import { CarouselGallery } from '../components/productsView/Carousel';
import { Price } from '../components/productsView/Price';
import { OnConfirmOrderWindow } from '../components/windows/OnConfirmOrderWindow';
import translationService from '../services/translation.service';
import { ImageBehaviour, Images } from '../components/Images';
import ElementSelect from '../components/elementSelect/ElementSelect';
import { SizeInfoWindow } from '../components/windows/SizeInfoWindow';
import { getRoute } from '../services/routes.service';
import { ProductInfoPrice } from '../components/productsView/ProductInfoPrice';
import { Helmet } from 'react-helmet';
import { CardProducts } from '../components/productsView/CardProduct';
import { Toolbar } from '../components/productOverviewPanel/components/Toolbar';

interface IProps {
    products: IProduct[];
    handleClick: (item: IProductCart) => void;
}

export const ProductInfo = (props: IProps) => {
    let {id} = useParams<any>();
    const [productItem, setProductItem] = useState<IProduct>(defaultProduct);
    const [popularProducts, setPopularProducts] = React.useState<(IProduct)[]>([]);
    const [offeredProduct, setOfferedProduct] = useState<IProduct[]>([]);
    const [window, setWindow] = React.useState(false)
    const [sizeInfoWindow, setSizeInfoWindow] = React.useState(false)
    const [selectedColor, setSelectedColor] = React.useState<string | undefined>(undefined)
    const [selectedSize, setSelectedSize] = React.useState<string | undefined>(undefined)
    const navigate = useNavigate();

    const onBuyNow = () =>{
        if(!selectedColor || selectedColor.length === 0 ||
            !selectedSize || selectedSize.length === 0 ){
            toastrService.callToastr(translationService.translate("error order|A"));
        }
        else{
            setWindow(true);
        }
  
    }
    const handleWindowOk = () => {
        setWindow(false);
    }
    const handleWindowCancel = () => {
        setWindow(false);
    }
    const handleInfoSizeWindowCancel = () => {
        setSizeInfoWindow(false);
    }
    const onSizeInfo = () => {
        setSizeInfoWindow(true);
    }
    const handleSelectedColor = (value: string) => {
        setSelectedColor(value);
    }
    const handleSelectedSize = (value: string) => {
        setSelectedSize(value);
    }
    const isActive = () => {
        return (
            selectedColor && selectedColor.length > 0 &&
            selectedSize && selectedSize.length > 0 
        );
    }
    const addToCart = () => {
        if(!selectedColor || selectedColor.length === 0 ||
            !selectedSize || selectedSize.length === 0){
            toastrService.callToastr(translationService.translate("error order|A"));
        }
        else{
            props.handleClick({...productItem, count: 1, color: selectedColor!, size: selectedSize!}); 
            toastrService.callToastr(translationService.translate("added to cart|A"));
        }
    }

    useEffect(() => {
        var prod = props.products.find(Element => Element.id === id) ?? defaultProduct;
        setProductItem(prod);
        if (!prod.sizes || prod.sizes.length === 0) {
            handleSelectedSize("One Size");
        }
        const offeredItems = [...props.products].sort(() => Math.random() - 0.5);
        setOfferedProduct(offeredItems.splice(0,71));
        const popularItems = [...props.products].sort((a, b) => a.popularity - b.popularity);
        setPopularProducts(popularItems.splice(0,71));
    }, [id, props.products]);

    return(
        <div>
            <Helmet>
                <title>{productItem.labelName + ":" + " " + "купити" + " " + productItem.brand + " " + "|" + " " + "TVOI"}</title>
            </Helmet>
            <br/>
            <br/>
            <div className="productInfoView">
                <div className="infoViewCard">
                    <div className="prLblName">{productItem.labelName}</div>
                    <div className="prRowPos">

                        <Images images={productItem.images} behaviour={ImageBehaviour.Multiple} />
                        <div className='columnStyle'>
                            <div className="prColumnPos">
                                {/*<div>
                                    {translationService.translate("brand|A")}
                                    <p><div className="prTextMain" onClick={() => navigate(getRoute(`brand/${productItem.brand}`))}>{productItem.brand}</div></p>
                                </div>

                                <div>
                                    {translationService.translate("metal|A")}
                                    <p><div className="prTextMain">{productItem.metal}</div></p>
                                </div>

                                <div>
                                    {translationService.translate("weight|A")}
                                    <p><div className="prTextMain">{productItem.weight} g</div></p>
                                    <p className="hrLine"></p>
                                </div>*/}

                                <div className='size-color-margin'>
                                    {translationService.translate("color|A") + "*"}
                                    <div className='rowStyle prTextMain'>
                                        <ElementSelect 
                                            onlyItemPreselected
                                            type="single"
                                            checkbox={true}
                                            options={productItem.colors.map(c => {return {Value: c.name, Title: c.name}})}
                                            onSelectValues={(values: string[]) => handleSelectedColor(values[0])}
                                        />
                                    </div>
                                </div>

                                <div className='size-color-margin'>
                                    {translationService.translate("size|A") + "*"}
                                    <div className='rowStyle prTextMain'>
                                        {productItem.sizes && productItem.sizes.length > 0 ? <ElementSelect 
                                            onlyItemPreselected
                                            type="single"
                                            checkbox={true}
                                            options={productItem.sizes.map(c => {return {Value: c.value.toString(), Title: `${c.value}`}})}
                                            onSelectValues={(values: string[]) => handleSelectedSize(values[0])}
                                        /> : <div>{translationService.translate("one size|A", "one size")}</div>}
                                    </div>
                                    <div className='infoText' onClick={onSizeInfo}>{translationService.translate("choose size|A") + "?"}</div>
                                </div>

                                <div className='priceViewProduct'>
                                    {translationService.translate("price|A")}
                                    <ProductInfoPrice product={productItem}/>
                                </div>
                                        
                            </div>
                            <div className="prDesc">
                                <Toolbar products={props.products}/>
                                <div onClick={() => {navigate(getRoute(`${productItem.category}`))}} className="hyperLinkStyle">{translationService.translate("moreProducts|A")}</div>
                                {/*<div className="prTextDesc"><p>{productItem.description}</p></div>

                                {translationService.translate("package|A")}
                                        <div className="prTextDesc"><p>{productItem.packaging}</p></div>*/}
                            </div>
                        </div>
                    </div>
                        
                    <div className="btnInfoPgStylePos">
                        <div className='btnInfoPgStyle'>
                            <button className="btnInfoPg" onClick={onBuyNow}> {translationService.translate("buy now|A")} </button>
                            <button className="btnInfoPg" onClick={addToCart}> {translationService.translate("add to cart|A")}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="simItemStyleSpecial">
                {translationService.translate("you may also like|A")}
            </div>
            <CardProducts products = {offeredProduct} />
            {window && <OnConfirmOrderWindow clearBasket={() => {}} onOk={handleWindowOk} onCancel={handleWindowCancel} cancel={handleWindowCancel} products={[{...productItem, count: 1, color: selectedColor!, size: selectedSize!}]} />}
            {sizeInfoWindow && <SizeInfoWindow onCancel={handleInfoSizeWindowCancel} />}
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
        
    );
}
