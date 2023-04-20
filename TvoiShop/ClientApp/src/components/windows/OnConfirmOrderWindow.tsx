import React, { useState } from "react";
import { ProceedOrder } from "../../api/endpoints/order";
import toastrService from "../../services/toastr.service";
import translationService from "../../services/translation.service";
import OutsideAlerter from "../helpers/Outside";
import { EndOrderWindow } from "./EndOrderWindow";
import '../../styles/shoppingCart.css'
import { Helmet } from 'react-helmet';

interface IProps {
    onCancel: () => void;
    cancel: () => void;
    onOk: () => void;
    clearBasket: () => void;
    products: IProductCart[];
}

export const OnConfirmOrderWindow = ({onCancel, cancel, products, clearBasket}:IProps) => {
    const[phone, setPhone] = useState("");

    const[orderWindow, setOrderWindow] = useState(false);

    const [checkedPhone, setPhoneChecked] = React.useState(false);
    const [checkedViber, setCheckedViber] = React.useState(false);
    const [checkedTelegram, setCheckedTelegram] = React.useState(false);

    const handleCheckedPhone = () => {
        setPhoneChecked(!checkedPhone);
    };
    const handleCheckedViber = () => {
        setCheckedViber(!checkedViber);
    };
    const handleCheckedTelegram = () => {
        setCheckedTelegram(!checkedTelegram);
    };

    const isFieldValid = (event: any) => {
        if(phone.trim().length > 9 && phone.trim().length < 15 && (checkedPhone || checkedViber || checkedTelegram)){
            toastrService.callToastr(translationService.translate("loading|A"))
            var contactType = "";
            if (checkedPhone) {
                contactType += " Phone";
            }
            if (checkedViber) {
                contactType += " Viber";
            }
            if (checkedTelegram) {
                contactType += " Telegram";
            }
    
            ProceedOrder({
                contactType: contactType,
                phone: phone,
                products: products
            })
            .then(a => onEndOrderOk())
            .catch(e => toastrService.callToastr("Error on sending", "error"));
        }
        else{
            toastrService.callToastr(translationService.translate("error confirm order|A"));
        }
    }

    const onEndOrderOk = () =>{
        clearBasket();
        setOrderWindow(true);
    }
    const handleWindowCancel = () =>{
        setOrderWindow(false);
    }

    const onCalcSymbolsOnlyChange = (event: any) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const isValidNumber = new RegExp("[0-9]").test(keyValue);

            if (!isValidNumber) {
                event.preventDefault();
                return;
            }
    };
    
    return(
        <div className="windowConfirmPosition"> 
        <OutsideAlerter onOutsideClick={onCancel}>
            <Helmet>
                <title>Останній крок до підтвердження замовлення | TVOI</title>
            </Helmet>
            <div className="windowConfirmStyle">

                <div className="confirmText">{translationService.translate("confirm order|A")}..</div>
                <p className="hrLine"></p>

                    <br/>

                    <p className="inputStyle">&nbsp;&nbsp;&nbsp;&nbsp;{translationService.translate("phone|A")}:</p>
                    <div className="positionCenter">
                        <div className="fullwidth">
                        <input type="text"
                        placeholder="+380"
                        className="inputNameStyle" 
                        onKeyPress={onCalcSymbolsOnlyChange}
                        onChange={(event) => setPhone(event.target.value)}/>
                        </div>
                    </div>

                    <div className="orderWindowPos">
                        <div className="inputStyle" >
                            {translationService.translate("post|A")}?
                                <div className="checkboxStyle">
                                    <input type="checkbox" 
                                    onChange={handleCheckedPhone}
                                    checked = {checkedPhone}/>
                                    <div> &nbsp;{translationService.translate("call|A")}</div>
                                </div>
                                <div className="checkboxStyle">
                                    <input type="checkbox" 
                                    onChange={handleCheckedViber}
                                    checked = {checkedViber}/>
                                    <div> &nbsp;{translationService.translate("viber|A")}</div>
                                </div>
                                <div className="checkboxStyle">
                                    <input type="checkbox" 
                                    onChange={handleCheckedTelegram}
                                    checked = {checkedTelegram}/>
                                    <div> &nbsp;{translationService.translate("telegram|A")}</div>
                                </div>
                        </div>
                    </div>
                <div>
                    <button className="btnConfirmCartStyle" onClick={() => isFieldValid(event)}>{translationService.translate("ok|A")}</button>
                    <button className="onCancelButton"onClick={() => onCancel()}>{translationService.translate("cancel|A")}</button>
                </div>
            </div>
            {orderWindow && <EndOrderWindow handleWindowCancel ={handleWindowCancel} onCancel={onCancel} cancel={cancel}/>}
            </OutsideAlerter>
        </div>
    )
}