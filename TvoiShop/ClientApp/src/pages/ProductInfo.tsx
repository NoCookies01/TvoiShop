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
    const [selectedSize, setSelectedSize] = React.useState<number | undefined>(undefined)
    const navigate = useNavigate();

    const onBuyNow = () =>{
        if(!selectedColor || selectedColor.length === 0 ||
            !selectedSize || selectedSize === 0 ){
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
    const handleSelectedSize = (value: number) => {
        setSelectedSize(value);
    }
    const isActive = () => {
        return (
            selectedColor && selectedColor.length > 0 &&
            selectedSize && selectedSize > 0 
        );
    }
    const addToCart = () => {
        if(!selectedColor || selectedColor.length === 0 ||
            !selectedSize || selectedSize === 0 ){
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
        const offeredItems = [...props.products].sort((a, b) => b.customPopularity - a.customPopularity);
        setOfferedProduct(offeredItems.splice(0,6));
        const popularItems = [...props.products].sort((a, b) => a.popularity - b.popularity);
        setPopularProducts(popularItems);
    }, [id, props.products]);

    return(
        <div>
            <br/>
            <br/>
            <div className="productInfoView">
                <div className="infoViewCard">
                    <div className="prLblName">{productItem.labelName}</div>
                    <div className="prRowPos">

                        <Images images={productItem.images} behaviour={ImageBehaviour.Multiple} />
                        
                        <div className="prColumnPos">
                            <div>
                                {translationService.translate("brand|A")}
                                <p><div className="prTextMain">{productItem.brand}</div></p>
                            </div>

                            <div>
                                {translationService.translate("metal|A")}
                                <p><div className="prTextMain">{productItem.metal}</div></p>
                            </div>

                            <div>
                                {translationService.translate("weight|A")}
                                <p><div className="prTextMain">{productItem.weight} g</div></p>
                                <p className="hrLine"></p>
                            </div>

                            <div className='size-color-margin'>
                                {translationService.translate("color|A") + "*"}
                                <div className='rowStyle prTextMain'>
                                    <ElementSelect 
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
                                    <ElementSelect 
                                        type="single"
                                        checkbox={true}
                                        options={productItem.sizes.map(c => {return {Value: c.value.toString(), Title: `${c.value}`}})}
                                        onSelectValues={(values: string[]) => handleSelectedSize(Number(values[0]))}
                                    />
                                </div>
                                <div className='infoText' onClick={onSizeInfo}>{translationService.translate("choose size|A") + "?"}</div>
                            </div>
                            <p className="hrLine"></p>

                            <div>
                                {translationService.translate("price|A")}
                                <p><Price product={productItem}/></p>
                            </div>
                            
                        </div>
                        <div className="prDesc">
                            {translationService.translate("collection|A")}
                            <div>
                                <p><div className="prTextMain">{productItem.collection}</div></p>
                            </div>
                            <div onClick={() => {navigate(getRoute(`${productItem.category}`))}} className="hyperLinkStyle">{translationService.translate("more|A")} {productItem.category}</div>
                        </div>
                        
                    </div>
                        
                    <div className="btnInfoPgStylePos">
                        <button className="btnInfoPgStyle" onClick={onBuyNow}> {translationService.translate("buy now|A")} </button>
                        <button className="btnInfoPgStyle" onClick={addToCart}> {translationService.translate("add to cart|A")}</button>
                    </div>
                </div>
            </div>

            <div className="simItemPos">
                <div className="simItemStyle">
                    {translationService.translate("you may also like|A")}
                </div>
                <div><CarouselGallery products ={offeredProduct} /></div>
            </div>
            <br/>
            <br/>
            {window && <OnConfirmOrderWindow clearBasket={() => {}} onOk={handleWindowOk} onCancel={handleWindowCancel} cancel={handleWindowCancel} products={[{...productItem, count: 1, color: selectedColor!, size: selectedSize!}]} />}
            {sizeInfoWindow && <SizeInfoWindow onCancel={handleInfoSizeWindowCancel} />}
        </div>
        
    );
}
