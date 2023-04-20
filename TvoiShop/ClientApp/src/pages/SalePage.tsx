import React, { useEffect, useState } from 'react';
import { FooterPanel } from '../components/FooterPanel';
import { CardProducts } from '../components/productsView/CardProduct';
import translationService from '../services/translation.service';
import { Helmet } from 'react-helmet';

interface IProps {
    products: IProduct[];
}

export const SalePage = (props: IProps) => {
    const [saleProducts, setSaleProducts] = useState<IProduct[]>([]);
    const items = props.products;


    useEffect(() => {
        const salePrdct = [...items].filter((p) => p.salePrice > 0).sort(() => Math.random() - 0.5);
        setSaleProducts(salePrdct);
      },[JSON.stringify(items), props]);

    return(
        <div>
            <Helmet>
                <title>Знижки: акції на срібло, позолота до -50%, дешеві прикраси | TVOI</title>
            </Helmet>
            <br/>
            <br/>
            <div className="simItemStyleSpecial">
                {translationService.translate("more to love|A")}
            </div>
            <div className="productInfoView">
                <CardProducts products={saleProducts} />
            </div>
            <FooterPanel/>
        </div>
        
    );
}
