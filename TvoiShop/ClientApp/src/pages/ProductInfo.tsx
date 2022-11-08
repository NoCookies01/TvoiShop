import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { defaultProduct } from '../data/defaults';
import IProduct from '../data/models/IProduct';
import { CardProduct } from '../components/CardProduct';

interface IProps {
    products: IProduct[];
    handleClick: (item: any) => void;
}

export const ProductInfo = (props: IProps) => {

    let {id} = useParams<any>();
    const [productItem, setProductItem] = useState<IProduct>(defaultProduct);
    const [offeredProduct, setOfferedProduct] = useState<IProduct[]>([]);
    const items = props.products;
    const navigate = useNavigate();


    useEffect(() => {
        var prod = items.find(Element => Element.id === Number(id)) ?? defaultProduct;
        setProductItem(prod);
        const offeredItems = [...items].filter((p) => p.category === "Necklace");
        setOfferedProduct(offeredItems.splice(0,3));
    }, [items, id]);

    return(
        <div>
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
                                Size
                                <p><div className="prTextMain">{productItem.size} cm</div></p>
                            </div>

                            <div>
                                Color
                                <p><div className="prTextMain">{productItem.color}</div></p>
                            </div>

                            <div>
                                Weight
                                <p><div className="prTextMain">{productItem.weight} g</div></p>
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
                        </div>
                    </div>
                    <div className="btnInfoPgStylePos">
                        <button className="btnInfoPgStyle"onClick={() => navigate(`/cart/`)}> buy now </button>
                        <button className="btnInfoPgStyle" onClick={() => props.handleClick(items)}> add to cart</button>
                    </div>
                </div>
            </div>

            <div className="simItemPos">
                <div className="simItemStyle">
                    You may like also:
                </div>
                <CardProduct products={offeredProduct}/>
            </div>
        </div>
        
    );
}
