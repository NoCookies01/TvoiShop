import React, { ChangeEvent, useState } from "react";
import {ReactComponent as CartIcon} from '../images/cart.svg';
import {ReactComponent as MenuIcon} from '../images/menu.svg';
import {ReactComponent as CartFullIcon} from '../images/circle.svg';
import { useNavigate } from "react-router-dom";
import Basket from "./Basket";
import { SideBar } from "./SideBar";
import OutsideAlerter from "./helpers/Outside";
import translationService from "../services/translation.service";

interface IProps {
  cart: IProductCart[];
  setCart: (fn: (items: IProductCart[]) => IProductCart[]) => void;
  handleChange: (product: IProductCart, count: number) => void;
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

  /*const enterKey = (event: any) =>{
    if(event.key === 'Enter'){
      navigate(`/search`)
    }      
  }*/

  return(
    <div className="sticky">
      <div>
        <MenuIcon className="icon" onClick={() => setOpenSidebar(!openSidebar)} />
        <OutsideAlerter onOutsideClick={cancelSidebar}><SideBar isOpen={openSidebar} {...props} cancel={cancelSidebar} /> </OutsideAlerter>
      </div>

        <form role="search" className="searchBarPos" >
            <input 
            className="searchBar"
            type="search" 
            aria-label={translationService.translate("search|A")}
            placeholder={translationService.translate("search|A") + "..."}
            onClick={() => navigate(`/search`)}
           //onKeyDown={enterKey}
            onChange ={handleSearch}
            />
        </form>
        <div className="searchBarIconPos" >
          <CartIcon className="icon" onClick={() => setOpenBasket(!openBasket)}/>
          <CartFullIcon/>
          {openBasket && <Basket {...props} cancel={cancelBasket} />}
        </div>
    </div>
 
  );
}
