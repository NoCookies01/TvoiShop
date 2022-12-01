import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { defaultProduct } from '../data/defaults';
import { CardProducts } from '../components/productsView/CardProduct';
import toastrService from "../services/toastr.service";
import { CarouselGallery } from '../components/productsView/Carousel';

interface IProps {
    products: IProduct[];
    handleClick: (item: IProduct) => void;
}

export const ProductInfo = (props: IProps) => {
    let {id} = useParams<any>();
    const [productItem, setProductItem] = useState<IProduct>(defaultProduct);
    const [popularProducts, setPopularProducts] = React.useState<(IProduct)[]>([]);
    const [offeredProduct, setOfferedProduct] = useState<IProduct[]>([]);
    const navigate = useNavigate();


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
                        <div className="prImg">
                            <img className='productInfPgImage' src={productItem.image}/>
                        </div>
                        <div className="prColumnPos">
                            <div>
                                Brand
                                <p><div className="prTextMain">{productItem.brand}</div></p>
                            </div>

                            <div>
                                Metal
                                <p><div className="prTextMain">{productItem.metal}</div></p>
                            </div>

                            <div>
                                Weight
                                <p><div className="prTextMain">{productItem.weight} g</div></p>
                                <p className="hrLine"></p>
                            </div>

                            <div>
                                Color
                                <p><div className="prTextMain">{productItem.color}</div></p>
                            </div>

                            <div>
                                Size
                                <p><div className="prTextMain">{productItem.size} cm</div></p>
                                <p className="hrLine"></p>
                            </div>

                            <div>
                                Price
                                <p><div className="prPrice">{productItem.price} UAH</div></p>
                            </div>
                        </div>
                        <div className="prDesc">
                            <p>{productItem.description}</p>
                            <div>
                                <p><div className="prTextMain">{productItem.collection}</div></p>
                            </div>
                            <div onClick={() => {navigate(`/${productItem.category}`)}} className="hyperLinkStyle">more {productItem.category}</div>
                        </div>
                    </div>
                        
                    <div className="btnInfoPgStylePos">
                        <button className="btnInfoPgStyle"onClick={() => {navigate(`/cart/`); props.handleClick(productItem)}}> buy now </button>
                        <button className="btnInfoPgStyle" onClick={() => {props.handleClick(productItem); toastrService.callToastr("Added to Cart")}}> add to cart</button>
                    </div>
                </div>
            </div>

            <div className="simItemPos">
                <div className="simItemStyle">
                    You may like also:
                </div>
                <div><CarouselGallery products ={popularProducts} handleClick={props.handleClick}/></div>
            </div>
            <br/>
            <br/>
        </div>
        
    );
}
