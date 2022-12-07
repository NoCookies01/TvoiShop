import React, { ChangeEvent, useState } from "react";
import {ReactComponent as CartIcon} from '../images/cart.svg';
import {ReactComponent as MenuIcon} from '../images/menu.svg';
import {ReactComponent as MainLogo} from '../images/mainlogo.svg';
import { useNavigate } from "react-router-dom";
import Basket from "./Basket";
import { SideBar } from "./SideBar";
import OutsideAlerter from "./helpers/Outside";

interface IProps {
  cart: IProduct[];
  setCart: (fn: (items: IProduct[]) => IProduct[]) => void;
  handleChange: (id: string, count: number) => void;
  search: (querry: string) => void;
}

export const SearchBar = (props: IProps) => {
  const [openBasket, setOpenBasket] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();

  const cancelBasket = () => {
    setOpenBasket(false);
  }
  const cancelSidebar = () => {
    setOpenSidebar(false);
  }
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    props.search(event.target.value);
  };

  return(
    <div className="sticky">
      <div>
        <MenuIcon className="icon" onClick={() => setOpenSidebar(!openSidebar)} />
        <OutsideAlerter onOutsideClick={cancelSidebar}><SideBar isOpen={openSidebar} {...props} cancel={cancelSidebar} /> </OutsideAlerter>
      </div>

      <div className='positionCenter'>
        <div className='logoStyle' onClick={() => navigate(`/`)}>
          tvoi
        </div>
      </div>
      
        <form role="search">
            <input 
            className="searchBar" 
            type="search" 
            aria-label="Search"
            placeholder = "Search..."
            onClick={() => navigate(`/search`)}
            onChange ={handleSearch}
            />
        </form>
        <div className="searchBarIconPos" >
          <CartIcon className="icon" onClick={() => setOpenBasket(!openBasket)}/>
          {openBasket && <Basket {...props} cancel={cancelBasket} />}
        </div>
    </div>
 
  );
}
