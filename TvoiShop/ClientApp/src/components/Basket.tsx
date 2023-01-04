import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OnConfirmOrderWindow } from './windows/OnConfirmOrderWindow';
import '../styles/shoppingCart.css'
import {ReactComponent as DeleteIcon} from '../images/delete.svg';
import { Price } from './productsView/Price';
import OutsideAlerter from './helpers/Outside';
import translationService from '../services/translation.service';
import { ImageBehaviour, Images } from './Images';

interface IProps {
    cart: IProductCart[];
    setCart: (fn: (items: IProductCart[]) => IProductCart[]) => void;
    handleChange: (product: IProductCart, count: number) => void;
    cancel: () => void;
}

export default function Basket({cart, setCart, handleChange, cancel }: IProps) {
    const [window, setWindow] = React.useState(false)

    const navigate = useNavigate();

    const onConfirm = () =>{
        setWindow(true);
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
    
    const price = cart.reduce((total:number, item:IProduct) => total + item.count * (isSalePrice(item) ?  item.salePrice : item.price), 0);
    
    const viewProducts = cart.map((item:IProductCart, id: number) => {
        return(
            <div className='cartGlobal' key={id}>
                <div className='rowStyle'> 

                    <div className='imgPosition'>
                        <Images images={item.images} behaviour={ImageBehaviour.Single} />
                        <div className='rowStyle'>
                            <div className='btnPosition'>
                                <button className='btnCart'onClick={() => handleChange(item, 1)}>+</button>
                                <div className='txtCartCount'>{translationService.translate("count|A")}: {item.count}</div>
                                <button className='btnCart'onClick={() => handleChange(item, -1)}>-</button>
                                <DeleteIcon className='removeIcon' onClick={() => handleRemove(item)}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className='infoPosition'> 
                        <div className='txtCartLabel'>{item.labelName}</div>
                        <div className='txtCartDesc'>{item.category}</div>
                        <div className='txtCartDesc'>{item.color}</div>
                        <div className='txtCartDesc'>{item.size}CM</div>
                        <div className='txtCartPrice'><Price product={item}/></div>
                    </div>



                </div>
            </div>
        )
      })

    return (
        <div className='cartPos'>
            <OutsideAlerter onOutsideClick={cancel}>
            <div className='cartComponent'>

                <div className="simItemStyle">
                    {translationService.translate("shopping cart|A")}
                </div>
                
                <div className="cartList">
                    {viewProducts} 
                </div>

                <div>
                    <div className="simItemStyle">
                    {translationService.translate("total price|A")}: {price} UAH
                    </div>
                    <div className="btnHomeStylePos">
                        <button className="btnHomeStyle" onClick={onConfirm}> {translationService.translate("confirm|A")} </button>
                        <button className="btnHomeStyle" onClick={cancel}> {translationService.translate("cancel|A")} </button>
                    </div>
                    <div className="btnHomeStylePos">
                        <button className="btnHomeStyle" onClick={() => {navigate(`/search`); cancel()}}>
                            {translationService.translate("shop more|A")}
                        </button>
                    </div>
                </div>

                </div>

            {window && <OnConfirmOrderWindow onOk={handleWindowOk} onCancel ={handleWindowCancel} cancel={cancel} products={cart} />}
            </OutsideAlerter>
        </div>
  );
}