import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CardProducts } from '../components/productsView/CardProduct';
import '../styles/brandInfo.css'
import { Helmet } from 'react-helmet';

interface IProps {
    products: IProduct[];
}

export const BrandInfo = (props: IProps) => {
    let {brand} = useParams<any>();
    const navigate = useNavigate();
    const [brandItem, setBrandItem] = React.useState<(IProduct)[]>([]);

    useEffect(() => {
        var brandProd = props.products.filter(Element => Element.brand === brand);
        setBrandItem(brandProd);
    }, [brand, props.products]);

    const bannerBrand = brandItem.map(b => b.brand).filter((value, index, array) => array.indexOf(value) === index).map((b, index) => {
        return(
            <div key={index} className="bannerBrand">{b}</div>
        )
    })

    return(
        <div className='container'>
            <Helmet>
                <title>Бренди: Оригінальні бренди, брендові прикраси купити у Львові дешево браслети, годинники, ланцюжки, каблучки | TVOI</title>
            </Helmet>
            {bannerBrand}
            <CardProducts products={brandItem}/>
        </div>
    );
}
