import React from "react";
import {ReactComponent as InstaIcon} from '../images/insta.svg';
import {ReactComponent as TelegramIcon} from '../images/telegram.svg';
import {ReactComponent as PhoneIcon} from '../images/phone.svg';


export const FooterPanel = () => {

const onInstaClick = () => {
    location.href = "https://instagram.com/tvoii.ua?igshid=YmMyMTA2M2Y=";
}
const onTgClick = () => {
    alert("Telegram: TVOIWATCH")
}
const onPhoneClick = () => {
    alert("Phone: +380 97 790 33 14")
}
  
  return(
    <div className="footerStylePos">
        <div className="footerStyle">
        <InstaIcon className="icon" onClick={onInstaClick}/> 
        <TelegramIcon className="icon" onClick={onTgClick}/>
        <PhoneIcon className="icon" onClick={onPhoneClick}/>
        </div>
    </div>
 
  );
}
