import * as React from 'react';
import { NavLink } from "react-router-dom";
import translationService from '../services/translation.service';
import { getRoute } from '../services/routes.service';
import SelectLanguage from './selectLang/SelectLanguage';

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
                    <img src='https://live.staticflickr.com/65535/52644337846_6a70023182_z.jpg' className='logoIcon'/>
                </NavLink> 
            </div>

            <div className='navItemsPosition'>
                <NavLink onClick={cancel} className={className} to={getRoute("sales")}>
                    {translationService.translate("hot sales|A")}
                </NavLink> 
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
                    <SelectLanguage />
                </div>
            </div>

        </div>
    );
};