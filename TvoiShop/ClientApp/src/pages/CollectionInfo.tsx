import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardProducts } from '../components/productsView/CardProduct';

interface IProps {
    products: IProduct[];
    handleClick: (item: IProduct) => void;
}

export const CollectionInfo = (props: IProps) => {
    const [collection, setCollection] = useState<IProduct[]>([]);
    const items = props.products;
    const navigate = useNavigate();


    useEffect(() => {
        const collctn = [...items].filter((p) => p.collection === "autumn `22").sort((a, b) => a.labelName.localeCompare(b.labelName));
        setCollection(collctn);
      },[JSON.stringify(items), props]);

    return(
        <div>
            <br/>
            <div className="productInfoView">
                <CardProducts products={collection} handleClick={props.handleClick}/>
            </div>
        </div>
        
    );
}
