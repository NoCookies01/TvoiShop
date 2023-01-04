import React from "react";
import {ReactComponent as InstaIcon} from '../images/insta.svg';
import {ReactComponent as TelegramIcon} from '../images/telegram.svg';
import {ReactComponent as PhoneIcon} from '../images/phone.svg';


export const FooterPanel = () => {
  return(
    <div className="footerStylePos">
      <div className="footerStyle">
        <a href="https://www.instagram.com/love.tvoi/?igshid=YmMyMTA2M2Y%3D" target="_blank"><InstaIcon className="icon" /></a>
        <a href="https://telegram.me/tvoiwatch" target="_blank"><TelegramIcon className="icon" /></a>
        <a href="tel:380977903314" target="_blank"><PhoneIcon className="icon" /></a>
      </div>
    </div>
  );
}
