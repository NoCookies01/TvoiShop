import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OnConfirmOrderWindow } from './windows/OnConfirmOrderWindow';
import '../styles/shoppingCart.css'
import {ReactComponent as DeleteIcon} from '../images/delete.svg';
import {ReactComponent as BackIcon} from '../images/leftIcon.svg';
import { Price } from './productsView/Price';
import OutsideAlerter from './helpers/Outside';
import translationService from '../services/translation.service';
import { ImageBehaviour, Images } from './Images';
import useWindowSize from '../hooks/UseWindowSize';
import { Helmet } from 'react-helmet';
import {ReactComponent as UpIcon} from "../images/arrowUp.svg";
import {ReactComponent as DownIcon} from "../images/arrowDown.svg";

interface IProps {
    cart: IProductCart[];
    setCart: (fn: (items: IProductCart[]) => IProductCart[]) => void;
    handleChange: (product: IProductCart, count: number) => void;
    clearBasket: () => void;
    cancel: () => void;
}

export default function Basket({cart, setCart, handleChange, cancel, clearBasket }: IProps) {
    const [window, setWindow] = React.useState(false)
    const [details, setDetails] = React.useState(false)
    const { height } = useWindowSize();

    const navigate = useNavigate();

    const onConfirm = () =>{
        if(cart.length > 0){
            setWindow(true);
        }
    }
    const handleWindowOk = () => {
        setWindow(false);
    }
    const handleWindowCancel = () => {
        setWindow(false);
    }
    const handleRemove = (product: IProductCart) => {
        setCart((cart: IProductCart[]) => cart.filter(item => !(item.id === product.id && item.color === product.color && item.size === product.size)));
    };

    const isSalePrice = (item:IProduct) => {
        return item.salePrice > 0;
    }

    const isProductSale = () => {
        return totalProductSale > 0;
    }
    const price = cart.reduce((total:number, item:IProduct) => total + item.count * (isSalePrice(item) ?  item.salePrice : item.price), 0);
    const totalProductPrice = cart.reduce((total:number, item:IProduct) => total + item.count * item.price, 0);
    const totalProductSale = totalProductPrice - price;
    
    
    const viewProducts = cart.map((item:IProductCart, id: number) => {
        return(
            <div className='cartGlobal' key={id}>
                <Helmet>
                    <title>Корзина: оформляй замовлення швидко, зручно та безпечно | TVOI</title>
                </Helmet>
                <div className='rowStyle'> 

                    <div className='imgPosition'>
                        <Images images={item.images} behaviour={ImageBehaviour.Single} />
                    </div>

                    <div className='infoPosition'> 
                        <div className='txtCartLabel'>{item.labelName}</div>
                        <div className='txtCartDesc'>{item.category}</div>
                        <div className='txtCartDesc'>{item.color}</div>
                        <div className='txtCartDesc'>{item.size}</div>
                        <div className='txtCartPrice'><Price product={item}/></div>
                    </div>
                    
                    <div className='btnPosition'>
                        <button className='btnCart'onClick={() => handleChange(item, 1)}>+</button>
                        <div className='txtCartCount'>{item.count}</div>
                        <button className='btnCart'onClick={() => handleChange(item, -1)}>-</button>
                        <DeleteIcon className='removeIcon' onClick={() => handleRemove(item)}/>
                    </div>
                </div>
            </div>

        )
      })

    return (
        <div className='cartPos' style={{height: `${height}px`}}>
            <OutsideAlerter onOutsideClick={cancel}>
            <div className='cartComponent' style={{height: `${height}px`}}>

                <div className="simItemStyle">
                    <div className='positionLeft'><BackIcon onClick={cancel}/></div>
                    {translationService.translate("shopping cart|A")}
                </div>
                
                <div className="cartList" style={{height: `calc(${height}px - 148px)`}}>
                    {viewProducts} 
                </div>

                <div className='cartPosFixed'>
                    <div className='cartTotalPrice'>
                        <div className='rowStyle'>
                            {translationService.translate("total|A")}: {price} UAH
                            {details ? <DownIcon onClick={() => setDetails(false)}/> : <UpIcon onClick={() => setDetails(true)}/>}
                        </div>
                    </div>
                    
                    {details && <div className='cartPriceSalePos'>
                        <div className='flexview'>Разом: {totalProductPrice} UAH</div>
                        <div className={`${!isProductSale() ? 'cartPriceSalePosHide' : 'cartTotalSale'}`}>Економія: {totalProductSale} UAH</div>
                    </div>}

                    <button disabled={cart.length === 0} className="btnConfirmCartStyle" onClick={onConfirm}> {translationService.translate("confirm|A")} </button>
                </div>

                </div>

            {window && <OnConfirmOrderWindow clearBasket={clearBasket} onOk={handleWindowOk} onCancel ={handleWindowCancel} cancel={cancel} products={cart} />}
            </OutsideAlerter>
        </div>
  );
}