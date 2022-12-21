import React, { useState } from "react";
import translationService from "../../services/translation.service";
import OutsideAlerter from "../helpers/Outside";
import { EndOrderWindow } from "./EndOrderWindow";

interface IProps {
    onCancel: () => void;
    cancel: () => void;
    onOk: () => void;
}

export const OnConfirmOrderWindow = ({onCancel, cancel}:IProps) => {

    const[vorName, setVorName] = useState("");
    const[lastName, setLastName] = useState("");
    const[phone, setPhone] = useState("");
    const[town, setTown] = useState("");
    const[post, setPost] = useState("");
    const[department, setDepartment] = useState("");

    const[orderWindow, setOrderWindow] = useState(false);

    const [checked, setChecked] = React.useState(false);

    const handleChecked = () => {
        setChecked(!checked);
    };

    const checkTextInput = (event: any) => {
        onEndOrderOk()
    };

    const isFieldValid = () => {
        return (
            vorName.trim().length > 0 &&
            lastName.trim().length > 0 &&
            phone.trim().length > 0 &&
            town.trim().length > 0 &&
            post.trim().length > 0 &&
            department.trim().length > 0 
        );
    }

    const onEndOrderOk = () =>{
        setOrderWindow(true);
    }
    const handleWindowCancel = () =>{
        setOrderWindow(false);
    }
    
    return(
        <div className="windowConfirmPosition"> 
        <OutsideAlerter onOutsideClick={onCancel}>
            <div className="windowConfirmStyle">

                <div className="confirmText">{translationService.translate("confirm order|A")}</div>

                <form>
                    <div>
                    <input type="text" 
                    placeholder={translationService.translate("vorname|A") + "*"}
                    className="inputStyle" 
                    onChange={(event) => setVorName(event.target.value)}/>
                    </div>

                    <div>
                    <input type="text" 
                    placeholder={translationService.translate("lastname|A") + "*"}
                    className="inputStyle" 
                    onChange={(event) => setLastName(event.target.value)}/>
                    </div>

                    <div>
                    <input type="text" 
                    placeholder={translationService.translate("phone|A") + "*"}
                    className="inputStyle" 
                    onChange={(event) => setPhone(event.target.value)}/>
                    </div>

                    <div>
                        <label className="inputStyle" >
                            {translationService.translate("post|A") + "*"}
                            <input type="checkbox" 
                            onChange={handleChecked}
                            checked = {checked}/>
                            Нова Пошта
                        </label>
                    </div>

                    <div>
                    <input type="text" 
                    placeholder={translationService.translate("town|A") + "*"}
                    className="inputStyle" 
                    onChange={(event) => setTown(event.target.value)}/>
                    </div>

                    <div>
                    <input type="text" 
                    placeholder={translationService.translate("department|A") + "*"}
                    className="inputStyle" 
                    onChange={(event) => setDepartment(event.target.value)}/>
                    </div>
                </form>

                    <div className="btnHomeStylePos">
                        <button disabled={!isFieldValid()} className="btnHomeStyle" onClick={() => checkTextInput(event)}>{translationService.translate("ok|A")}</button>
                        <button className="btnHomeStyle"onClick={() => onCancel()}>{translationService.translate("cancel|A")}</button>
                    </div>
            </div>
            {orderWindow && <EndOrderWindow onPressOk={checkTextInput} handleWindowCancel ={handleWindowCancel} onCancel={onCancel} cancel={cancel}/>}
            </OutsideAlerter>
        </div>
    )
}