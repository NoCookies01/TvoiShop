import React, { useState } from "react";
import { ProceedOrder } from "../../api/endpoints/order";
import toastrService from "../../services/toastr.service";
import translationService from "../../services/translation.service";
import OutsideAlerter from "../helpers/Outside";
import { EndOrderWindow } from "./EndOrderWindow";

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

    const checkTextInput = (event: any) => {
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
    };

    const isFieldValid = () => {
        return (
            phone.trim().length > 9 && phone.trim().length < 15 && (checkedPhone || checkedViber || checkedTelegram)
        );
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
            <div className="windowConfirmStyle">

                <div className="confirmText">{translationService.translate("confirm order|A")}</div>
                <br/>

                    <div className="positionCenter">
                        <div>
                        <input type="text"
                        placeholder={translationService.translate("phone|A") + "*"}
                        className="inputNameStyle" 
                        onKeyPress={onCalcSymbolsOnlyChange}
                        onChange={(event) => setPhone(event.target.value)}/>
                        </div>
                    </div>

                    <div className="orderWindowPos">
                        <div className="inputStyle" >
                            {translationService.translate("post|A") + "*"}
                            <p>
                                <div className="checkboxStyle">
                                    <input type="checkbox" 
                                    onChange={handleCheckedPhone}
                                    checked = {checkedPhone}/>
                                    <div> &nbsp;Зателефонувати мені</div>
                                </div>
                                <div className="checkboxStyle">
                                    <input type="checkbox" 
                                    onChange={handleCheckedViber}
                                    checked = {checkedViber}/>
                                    <div> &nbsp;Написати у Viber</div>
                                </div>
                                <div className="checkboxStyle">
                                    <input type="checkbox" 
                                    onChange={handleCheckedTelegram}
                                    checked = {checkedTelegram}/>
                                    <div> &nbsp;Написати у Telegram</div>
                                </div>
                            </p>
                        </div>
                    </div>
                    <small className="txtStyle">{"*" + translationService.translate("required field|A")}</small>
                

                    <div className="btnHomeStylePos">
                        <button disabled={!isFieldValid()} className="btnHomeStyle" onClick={() => checkTextInput(event)}>{translationService.translate("ok|A")}</button>
                        <button className="btnHomeStyle"onClick={() => onCancel()}>{translationService.translate("cancel|A")}</button>
                    </div>
            </div>
            {orderWindow && <EndOrderWindow handleWindowCancel ={handleWindowCancel} onCancel={onCancel} cancel={cancel}/>}
            </OutsideAlerter>
        </div>
    )
}