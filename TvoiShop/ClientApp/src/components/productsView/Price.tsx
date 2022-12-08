import React from 'react'

interface IProps {
    product: IProduct;
}

export const Price = (props: IProps) => {
    const isSalePrice = props.product.salePrice > 0;

    return (
        <div className='rowStyle'>
            <div className={`productPrice ${isSalePrice ? "oldPrice" : ""}`}>{props.product.price} UAH</div>
            {isSalePrice && <div className='productSalePrice'>{props.product.salePrice} UAH</div>}
        </div>
    )
}