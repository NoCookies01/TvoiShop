import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarouselGallery } from '../components/productsView/Carousel';
import {ReactComponent as PhotoBanner} from '../images/8.svg';

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
            <br/>
            <div className='simItemPos'>

                <div className="simItemStyle">
                    winter `22
                </div>

                <div className='photoBannerPos'>
                    <PhotoBanner className="photoBannerStyle"/>
                </div>

                <div className="simItemStyle">
                    Beauty is inside
                </div>

                <div className="productInfoView">
                    <CarouselGallery products={collection} handleClick={props.handleClick}/>
                </div>

            </div>
        </div>
        
    );
}
