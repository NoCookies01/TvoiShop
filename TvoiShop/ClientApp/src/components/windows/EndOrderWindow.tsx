import React from "react";
import { useNavigate } from 'react-router-dom';
import { getRoute } from "../../services/routes.service";
import translationService from "../../services/translation.service";

interface IProps {
    onCancel: () => void;
    cancel: () => void;
    handleWindowCancel: () => void;
}

export const EndOrderWindow = ({handleWindowCancel, onCancel, cancel}:IProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        handleWindowCancel(); 
        onCancel(); 
        navigate(getRoute(`search`)); 
        cancel();
    }

    return(
        <div className="windowConfirmPosition"> 
            <div className="windowConfirmStyle">

                <div className="confirmText">{translationService.translate("thanks for order|A")}</div>

                    <div className="btnHomeStylePos">
                        <button className="btnHomeStyle" onClick={handleClick}>{translationService.translate("understand|A")}</button>
                    </div>
            </div>
        </div>
    )
}