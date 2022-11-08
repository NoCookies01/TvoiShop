import React from 'react';
import { useNavigate } from 'react-router-dom';
import IProduct from '../../data/models/IProduct';
import { OnConfirmOrderWindow } from '../windows/OnConfirmOrderWindow';

export default function Basket({cart, setCart, handleChange}: any) {

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
    const handleRemove = (productId:number) => {
        setCart((cart: any[]) => cart.filter(item => item.productId !== productId));
      };
    
      const price = cart.reduce((total:number, item:any) => total + item.amount * item.price, 0);


    const viewProducts = cart.map((item:any) => {
        return(
        <div>
            <div className='productCardShopCart' key={item.id}>
                <div className="productImagePosShopCart">
                    <img className='productImageShopCart' src={item.image}/>
                </div>

                <div className='productInfoShopCart'>
                    {item.labelName}
                    <p>{item.category}</p>
                    <p>{item.price} UAH</p>
                    <div className='removeBntCartPos'>
                        <button className='removeBntCart'onClick={() => handleRemove(item.productCode)}>remove</button>
                        <button className='removeBntCartsymbol'onClick={() => handleChange(item.productCode, 1)}>+</button>
                        <button className='removeBntCartsymbol'onClick={() => handleChange(item.productCode, -1)}>-</button>
                        {item.count}
                    </div>
                </div>
            </div>

        </div>
          
        )
      })

  return (
    <div className="cartPagePos">
        <div>
            <div className="simItemStyle">
                Shopping cart
            </div>

            <div className='productViewShopCart'> 
                 {viewProducts} 
            </div>

            <div className="simItemStyle">
                Totap price: 
            </div>

            <div className="btnHomeStylePos">
                <button className="btnHomeStyle" onClick={onConfirm}> confirm </button>
                <button className="btnHomeStyle" onClick={() => navigate(-1)}> cancel </button>
            </div>

            <div className="btnHomeStylePos">
                <button className="btnHomeStyle" onClick={() => navigate(`/bracelet/`)}>
                    shop more
                </button>
            </div>
        </div>
        {window && <OnConfirmOrderWindow onOk={handleWindowOk} onCancel ={handleWindowCancel}/>}
    </div>
  );
}