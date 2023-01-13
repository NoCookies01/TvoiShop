import * as React from 'react';
import { NavLink} from "react-router-dom";
import translationService from '../services/translation.service';
import {ReactComponent as LogoIcon} from '../images/logo.svg';
import { getRoute } from '../services/routes.service';

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
            <div className='logoSidebarPosition'>
                <NavLink onClick={cancel} className="logoSidebar" to={"/"}>
                    <LogoIcon className='logoIcon'/>
                </NavLink> 
            </div>
            <div className='navItemsPosition'>
                <NavLink onClick={cancel} className={className} to={getRoute("watches")}>
                    {translationService.translate("watches|A")}
                </NavLink> 
                <NavLink onClick={cancel} className={className} to={getRoute("bracelets")}>
                    {translationService.translate("bracelet|A")}
                </NavLink> 
                <NavLink onClick={cancel} className={className} to={getRoute("necklaces")}>
                    {translationService.translate("necklace|A")}
                </NavLink> 
                <NavLink onClick={cancel} className={className} to={getRoute("earrings")}>
                    {translationService.translate("earrings|A")}
                </NavLink> 
                <NavLink onClick={cancel} className={className} to={getRoute("rings")}>
                    {translationService.translate("rings|A")}
                </NavLink> 
                <NavLink onClick={cancel} className={className} to={getRoute("charms")}>
                    {translationService.translate("charm|A")}
                </NavLink> 
            </div>
            <div className='langPos'>
                <div className='langStyle'>
                    ua 
                </div>
            </div>

        </div>
    );
};