import React from 'react';

interface IProps {
    product: IProduct;
}

export const ProductInfoPrice = (props: IProps) => {
    const isSalePrice = props.product.salePrice > 0;

    return (
        <div className='rowStyle'>
            <div className={`productInfoPrice ${isSalePrice ? "oldProductInfoPrice" : ""}`}>{props.product.price} UAH</div>
            {isSalePrice && <div className='productInfoSalePrice'>{props.product.salePrice} UAH</div>}
        </div>
    )
}