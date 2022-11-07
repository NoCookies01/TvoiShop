import React from 'react';
import { useNavigate } from 'react-router-dom';
import IProduct from '../../data/models/IProduct';
import { OnConfirmOrderWindow } from '../windows/OnConfirmOrderWindow';

interface IProps {
    products: IProduct[];
  }

export default function Basket(props: IProps) {

    const [window, setWindow] = React.useState(false)
    const productItems = props.products;
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


    const viewProducts = productItems.map((p, index) => {
        return(
        <div>
            <div className='productCardShopCart' key={index}>
                <div className="productImagePosShopCart">
                    <img className='productImageShopCart' src={p.image}/>
                </div>

                <div className='productInfoShopCart'>
                    {p.labelName}
                    <p>{p.category}</p>
                    <p>{p.price} UAH</p>
                    <div className='removeBntCartPos'>
                        <button className='removeBntCart'>remove</button>
                        <button className='removeBntCartsymbol'>+</button>
                        <button className='removeBntCartsymbol'>-</button>
                        count:
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