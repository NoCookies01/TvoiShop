import React, { useEffect } from 'react';
import { CardProducts } from '../components/CardProduct';
import {ReactComponent as Photo1} from '../images/1.svg';
import {ReactComponent as Photo3} from '../images/3.svg';
import { useNavigate } from 'react-router-dom';
import { stringify } from 'querystring';

interface IProps {
  products: IProduct[];
}

export const Home = (props: IProps) => {

  const [popularProducts, setPopularProducts] = React.useState<(IProduct)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const popularItems = [...props.products].sort((a, b) => a.popularity - b.popularity);
    setPopularProducts(popularItems.splice(0,3));
  }, [JSON.stringify(props.products)]);

  return(
    <div>
       <div className="simItemPos">
          <div className="simItemStyle">
              Best Sellers
          </div>
          <div><CardProducts products = {popularProducts}/> </div>

          <div className="btnHomeStylePos">
            <button className="btnHomeStyle" onClick={() => navigate(`/bracelet/`)}>
                shop now
              </button>
          </div>

          <div className="simItemStyle">
              Collection autumn '22
          </div>
              <div className="phtBannerPos">
                <Photo3 className="phtBanSize"/>
                <Photo1 className="phtBanSize"/>
                  <div className="txtBan">
                    enjoy your
                    <p>moments</p> 
                    <div className="txtBanTvoi"><p>with tvoi</p></div>
                    <div>
                      <button className="btnHomeStyle" onClick={() => navigate(`/productInfo/6`)}>
                        explore more
                      </button>
                    </div>
                  </div>
              </div>
        </div>
    </div>
  )

};

