import * as React from 'react';
import { NavLink } from "react-router-dom";
import {ReactComponent as MenuIcon} from '../images/menuWhite.svg';

interface IProps {
    cancel: () => void;
    isOpen: boolean;
}

export const SideBar = ({cancel, isOpen}: IProps) => {

    return (
        <div className={`sidenav ${!isOpen ? "hiddenNav" : ''}`}>
            <MenuIcon className='icon' onClick={() => cancel()}/>
            <div className='logoSidebarPosition'>
                <NavLink className="logoSidebar" to={"/"}>
                    tvoi
                </NavLink> 
            </div>
            <div className='navItemsPosition'>
                <NavLink className="navItem" to={"/watches"}>
                    watches
                </NavLink> 
                <NavLink className="navItem" to={"/bracelets"}>
                    bracelet
                </NavLink> 
                <NavLink className="navItem" to={"/necklaces"}>
                    necklace
                </NavLink> 
                <NavLink className="navItem" to={"/earrings"}>
                    earrings
                </NavLink> 
                <NavLink className="navItem" to={"/rings"}>
                    rings
                </NavLink> 
                <NavLink className="navItem" to={"/charms"}>
                    charm
                </NavLink> 
            </div>

        </div>
    );
};