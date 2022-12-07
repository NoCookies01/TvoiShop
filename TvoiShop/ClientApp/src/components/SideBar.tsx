import * as React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import {ReactComponent as MenuIcon} from '../images/menuWhite.svg';

interface IProps {
    cancel: () => void;
    isOpen: boolean;
}

export const SideBar = ({cancel, isOpen}: IProps) => {

    const className = (state:{isActive: boolean, isPending: boolean}) => {
        return "navItem " + (state.isActive ? "activeLink" : "");
    }

    return (
        <div className={`sidenav ${!isOpen ? "hiddenNav" : ''}`}>
            <MenuIcon className='icon' onClick={() => cancel()}/>
            <div className='logoSidebarPosition'>
                <NavLink onClick={cancel} className="logoSidebar" to={"/"}>
                    tvoi
                </NavLink> 
            </div>
            <div className='navItemsPosition'>
                <NavLink onClick={cancel} className={className} to={"/watches"}>
                    watches
                </NavLink> 
                <NavLink onClick={cancel} className={className} to={"/bracelets"}>
                    bracelet
                </NavLink> 
                <NavLink onClick={cancel} className={className} to={"/necklaces"}>
                    necklace
                </NavLink> 
                <NavLink onClick={cancel} className={className} to={"/earrings"}>
                    earrings
                </NavLink> 
                <NavLink onClick={cancel} className={className} to={"/rings"}>
                    rings
                </NavLink> 
                <NavLink onClick={cancel} className={className} to={"/charms"}>
                    charm
                </NavLink> 
            </div>

        </div>
    );
};