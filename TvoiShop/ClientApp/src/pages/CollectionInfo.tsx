import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardProducts } from '../components/productsView/CardProduct';
import {ReactComponent as CollectionPhotoOne} from '../images/collection1.svg';
import {ReactComponent as CollectionPhotoTwo} from '../images/collection2.svg';
import {ReactComponent as CollectionPhotoFour} from '../images/collection4.svg';
import translationService from '../services/translation.service';

interface IProps {
    products: IProduct[];
}

export const CollectionInfo = (props: IProps) => {
    const [collection, setCollection] = useState<IProduct[]>([]);
    const items = props.products;


    useEffect(() => {
        const collctn = [...items].filter((p) => p.collection === "winter`23").sort((a, b) => a.labelName.localeCompare(b.labelName));
        setCollection(collctn);
      },[JSON.stringify(items), props]);

    return(
        <div>
            <br/>
            <br/>
            <div className='simItemPos'> 
                <div className="simItemStyle">
                    {translationService.translate("winter`23|A")}
                </div>

                <div className='bannerCarousel'>
                    <div>
                        <div className='photoBannerCardPos'>
                            <CollectionPhotoOne className="photoBannerStyle"/>
                            <div className='bannerCardText'>
                                <img src='https://live.staticflickr.com/65535/52646464775_6046ab08df_z.jpg' />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='photoBannerCardPos'>
                            <CollectionPhotoFour className="photoBannerStyle"/>
                            <div className='bannerCardText'>
                                <img src='https://live.staticflickr.com/65535/52646464775_6046ab08df_z.jpg' />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='photoBannerCardPos'>
                            <CollectionPhotoTwo className="photoBannerStyle"/>
                            <div className='bannerCardText'>
                                <img src='https://live.staticflickr.com/65535/52646464775_6046ab08df_z.jpg' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="productInfoView">
                    <CardProducts products={collection} />
                </div>

            </div>
        </div>
        
    );
}
