import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OnConfirmOrderWindow } from './windows/OnConfirmOrderWindow';
import '../styles/shoppingCart.css'
import {ReactComponent as DeleteIcon} from '../images/delete.svg';
import { Price } from './productsView/Price';
import OutsideAlerter from './helpers/Outside';

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
                        <img className='imgStyle' src={item.image}/>

                        <div className='rowStyle'>
                            <div className='btnPosition'>
                            <button className='btnCart'onClick={() => handleChange(item.id, 1)}>+</button>

                            <div className='txtCartCount'>Count: {item.count}</div>

                            <button className='btnCart'onClick={() => handleChange(item.id, -1)}>-</button>

                            <DeleteIcon className='removeIcon' onClick={() => handleRemove(item.id)}/>

                            </div>
                        </div>

                    </div>
                    
                    <div className='infoPosition'> 
                        <div className='txtCartLabel'>{item.labelName}</div>
                        <div className='txtCartDesc'>{item.category}</div>
                        <div className='txtCartDesc'>{item.size} CM</div>
                        <div className='txtCartDesc'>{item.color} </div>
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
                    Shopping cart
                </div>
                
                <div className="cartList">
                    {viewProducts} 
                </div>

                <div>
                    <div className="simItemStyle">
                        Total Price: {price} UAH
                    </div>
                    <div className="btnHomeStylePos">
                        <button className="btnHomeStyle" onClick={onConfirm}> confirm </button>
                        <button className="btnHomeStyle" onClick={cancel}> cancel </button>
                    </div>
                    <div className="btnHomeStylePos">
                        <button className="btnHomeStyle" onClick={() => {navigate(`/`); cancel()}}>
                            shop more
                        </button>
                    </div>
                </div>

                </div>

            {window && <OnConfirmOrderWindow onOk={handleWindowOk} onCancel ={handleWindowCancel}/>}
            </OutsideAlerter>
        </div>
  );
}