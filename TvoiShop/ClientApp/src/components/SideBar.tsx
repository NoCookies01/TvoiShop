import * as React from 'react';
import { NavLink } from "react-router-dom";

export const SideBar = () => {
    return (
        <div className="sidenav">
            <div className='logoSidebarPosition'>
                <NavLink className="logoSidebar" to={"/"}>
                    tvoi
                </NavLink> 
            </div>
            <div className='navItemsPosition'>
                <NavLink className="navItem" to={"/watches"}>
                    watches
                </NavLink> 
                <NavLink className="navItem" to={"/bracelet"}>
                    bracelet
                </NavLink> 
                <NavLink className="navItem" to={"/necklace"}>
                    necklace
                </NavLink> 
                <NavLink className="navItem" to={"/earrings"}>
                    earrings
                </NavLink> 
                <NavLink className="navItem" to={"/rings"}>
                    rings
                </NavLink> 
                <NavLink className="navItem" to={"/charm"}>
                    charm
                </NavLink> 
                </div>
            </div>
 );
};