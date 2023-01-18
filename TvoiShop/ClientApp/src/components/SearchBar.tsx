import React, { ChangeEvent, useState } from "react";
import {ReactComponent as CartIcon} from '../images/cart.svg';
import {ReactComponent as MenuIcon} from '../images/menu.svg';
import {ReactComponent as SearchIcon} from '../images/search.svg';
import {ReactComponent as CancelIcon} from '../images/cancel.svg';
import { useNavigate } from "react-router-dom";
import Basket from "./Basket";
import { SideBar } from "./SideBar";
import OutsideAlerter from "./helpers/Outside";
import translationService from "../services/translation.service";
import { getRoute } from "../services/routes.service";

interface IProps {
  cart: IProductCart[];
  setCart: (fn: (items: IProductCart[]) => IProductCart[]) => void;
  handleChange: (product: IProductCart, count: number) => void;
  clearBasket: () => void;
  search: (querry: string) => void;
}

export const SearchBar = (props: IProps) => {
  const [openBasket, setOpenBasket] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const navigate = useNavigate();

  const cancelBasket = () => {
    setOpenBasket(false);
  }
  const cancelSidebar = () => {
    setOpenSidebar(false);
    setOpenSearch(false);
  }
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    props.search(event.target.value);
  };
  const handleSearchClick = () => {
    navigate(getRoute(`search`));
    setOpenSearch(true);
  };
  const cancelSearch = () => {
    setOpenSearch(false);
  }

  var count = 0;

  props.cart.forEach(c => count += c.count);

  return(
    <div className="sticky">

      <div className="menuIconPos">
        <MenuIcon className="icon" onClick={() => setOpenSidebar(!openSidebar)} />
      </div>

      <OutsideAlerter onOutsideClick={cancelSidebar}>
        <SideBar isOpen={openSidebar} {...props} cancel={cancelSidebar}/>
        {openSearch && <form role="search" className="searchBarPos" >
        <input 
        className="searchBar"
        type="text" 
        aria-label={translationService.translate("search|A")}
        placeholder={translationService.translate("search|A") + "..."}
        onChange ={handleSearch} 
        onClick ={() => {navigate(getRoute(`search`))}}/>
        <CancelIcon className="icon" onClick={cancelSearch}/> 
        </form>}
      </OutsideAlerter>

      <div className="logoPos">
        <div className="logoStyle" onClick ={() => {navigate(getRoute(``))}}>
          tvoi
        </div>
      </div>
      
      <div className="searchBarIconPos">
        <SearchIcon className="icon" onClick={handleSearchClick}/>
        <CartIcon className="icon" onClick={() => setOpenBasket(!openBasket)} />
        { props.cart.length > 0 && <><div className="cartFullIconCount" onClick={() => setOpenBasket(!openBasket)}>{count}</div></>}
        {openBasket && <Basket {...props} cancel={cancelBasket} />}
      </div>

    </div>
 
  );
}
