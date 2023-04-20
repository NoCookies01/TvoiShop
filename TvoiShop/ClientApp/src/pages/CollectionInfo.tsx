import React, { useEffect, useState } from 'react';
import { FooterPanel } from '../components/FooterPanel';
import { CardProducts } from '../components/productsView/CardProduct';
import translationService from '../services/translation.service';
import { Helmet } from 'react-helmet';

interface IProps {
    products: IProduct[];
}

export const CollectionInfo = (props: IProps) => {
    const [collection, setCollection] = useState<IProduct[]>([]);
    const items = props.products;


    useEffect(() => {
        const collctn = [...items].filter((p) => p.brand === "Pandora" && p.salePrice > 0).sort((a, b) => a.labelName.localeCompare(b.labelName));
        setCollection(collctn);
      },[JSON.stringify(items), props]);

    return(
        <div>
            <Helmet>
                <title>Розпродаж: срібні прикраси дешево срібло 925 | TVOI</title>
            </Helmet>
            <br/>
            <br/>
            <div className="simItemStyleSpecial">
                {translationService.translate("springSale|A")}
            </div>
            <div className="productInfoView">
                <CardProducts products={collection} />
            </div>
            <FooterPanel/>
        </div>
        
    );
}
