import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { defaultProduct } from '../data/defaults';
import { CardProducts } from '../components/productsView/CardProduct';
import toastrService from "../services/toastr.service";
import { CarouselGallery } from '../components/productsView/Carousel';
import { Price } from '../components/productsView/Price';
import { OnConfirmOrderWindow } from '../components/windows/OnConfirmOrderWindow';
import translationService from '../services/translation.service';
import { ImageBehaviour, Images } from '../components/Images';

interface IProps {
    products: IProduct[];
    handleClick: (item: IProduct) => void;
}

export const ProductInfo = (props: IProps) => {
    let {id} = useParams<any>();
    const [productItem, setProductItem] = useState<IProduct>(defaultProduct);
    const [popularProducts, setPopularProducts] = React.useState<(IProduct)[]>([]);
    const [offeredProduct, setOfferedProduct] = useState<IProduct[]>([]);
    const [window, setWindow] = React.useState(false)
    const navigate = useNavigate();

    const onBuyNow = () =>{
        setWindow(true);
    }
    const handleWindowOk = () => {
        setWindow(false);
    }
    const handleWindowCancel = () => {
        setWindow(false);
    }

    useEffect(() => {
        var prod = props.products.find(Element => Element.id === id) ?? defaultProduct;
        setProductItem(prod);
        const offeredItems = [...props.products].sort((a, b) => b.customPopularity - a.customPopularity);
        setOfferedProduct(offeredItems.splice(0,3));
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

                            <div>
                                {translationService.translate("color|A")}
                                {productItem.colors.map(c => (
                                    <p><div className="prTextMain">{c.name}</div></p>
                                ))}
                            </div>

                            <div>
                                {translationService.translate("size|A")}
                                {productItem.sizes.map(s => (
                                    <p><div className="prTextMain">{s.value} cm</div></p>
                                ))}
                                <p className="hrLine"></p>
                            </div>

                            <div>
                                {translationService.translate("price|A")}
                                <p><Price product={productItem}/></p>
                            </div>
                        </div>
                        <div className="prDesc">
                            <p>{productItem.description}</p>
                            <div>
                                <p><div className="prTextMain">{productItem.collection}</div></p>
                            </div>
                            <div onClick={() => {navigate(`/${productItem.category}`)}} className="hyperLinkStyle">{translationService.translate("more|A")} {productItem.category}</div>
                        </div>
                    </div>
                        
                    <div className="btnInfoPgStylePos">
                        <button className="btnInfoPgStyle"onClick={onBuyNow}> {translationService.translate("buy now|A")} </button>
                        <button className="btnInfoPgStyle" onClick={() => {props.handleClick(productItem); toastrService.callToastr("Added to Cart")}}> {translationService.translate("add to cart|A")}</button>
                    </div>
                </div>
            </div>

            <div className="simItemPos">
                <div className="simItemStyle">
                    {translationService.translate("you may also like|A")}
                </div>
                <div><CarouselGallery products ={popularProducts} handleClick={props.handleClick}/></div>
            </div>
            <br/>
            <br/>
            {window && <OnConfirmOrderWindow onOk={handleWindowOk} onCancel ={handleWindowCancel} cancel={handleWindowCancel}/>}
        </div>
        
    );
}
