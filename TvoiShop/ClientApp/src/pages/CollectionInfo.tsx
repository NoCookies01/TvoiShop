import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardProducts } from '../components/productsView/CardProduct';
import {ReactComponent as CollectionPhotoOne} from '../images/collection1.svg';
import {ReactComponent as CollectionPhotoTwo} from '../images/collection2.svg';
import {ReactComponent as CollectionPhotoThree} from '../images/collection3.svg';
import {ReactComponent as CollectionPhotoFour} from '../images/collection4.svg';
import {ReactComponent as CollectionPhotoFive} from '../images/collection5.svg';

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
                    winter`23
                </div>

                <div className='bannerCarousel'>
                    <div>
                        <div className='photoBannerCardPos'>
                            <CollectionPhotoFour className="photoBannerStyle"/>
                            <div className='bannerCardText'>
                                tvoi
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='photoBannerCardPos'>
                            <CollectionPhotoOne className="photoBannerStyle"/>
                            <div className='bannerCardText'>
                                tvoi
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='photoBannerCardPos'>
                            <CollectionPhotoTwo className="photoBannerStyle"/>
                            <div className='bannerCardText'>
                                tvoi
                            </div>
                        </div>
                    </div>
                </div>

                <div className="productInfoView">
                    <CardProducts products={collection} handleClick={props.handleClick}/>
                </div>

            </div>
        </div>
        
    );
}
