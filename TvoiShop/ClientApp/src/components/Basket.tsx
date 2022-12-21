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
    cart: IProduct[];
    setCart: (fn: (items: IProduct[]) => IProduct[]) => void;
    handleChange: (id: string, count: number) => void;
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
    const handleRemove = (productId: string) => {
        setCart((cart: IProduct[]) => cart.filter(item => item.id !== productId));
    };

    const isSalePrice = (item:IProduct) => {
        return item.salePrice > 0;
    }
    
    const price = cart.reduce((total:number, item:IProduct) => total + item.count * (isSalePrice(item) ?  item.salePrice : item.price), 0);
    
    const viewProducts = cart.map((item:IProduct) => {
        return(
            <div className='cartGlobal' key={item.id}>
                <div className='rowStyle'> 

                    <div className='imgPosition'>
                        <Images images={item.images} behaviour={ImageBehaviour.Single} />

                        <div className='rowStyle'>
                            <div className='btnPosition'>
                            <button className='btnCart'onClick={() => handleChange(item.id, 1)}>+</button>

                            <div className='txtCartCount'>{translationService.translate("count|A")}: {item.count}</div>

                            <button className='btnCart'onClick={() => handleChange(item.id, -1)}>-</button>

                            <DeleteIcon className='removeIcon' onClick={() => handleRemove(item.id)}/>

                            </div>
                        </div>

                    </div>
                    
                    <div className='infoPosition'> 
                        <div className='txtCartLabel'>{item.labelName}</div>
                        <div className='txtCartDesc'>{item.category}</div>
                        <div className='txtCartDesc'>{item.sizes.length} CM /// CHANGE TO SELECT SIZE</div>
                        <div className='txtCartDesc'>{item.colors.length} /// CHANGE TO SELECT COLOR</div>
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
                        <button className="btnHomeStyle" onClick={() => {navigate(`/`); cancel()}}>
                            {translationService.translate("shop more|A")}
                        </button>
                    </div>
                </div>

                </div>

            {window && <OnConfirmOrderWindow onOk={handleWindowOk} onCancel ={handleWindowCancel} cancel={cancel}/>}
            </OutsideAlerter>
        </div>
  );
}