import React from "react";
import { useNavigate } from 'react-router-dom';
import translationService from "../../services/translation.service";

interface IProps {
    onCancel: () => void;
    cancel: () => void;
    handleWindowCancel: () => void;
    onPressOk: (event) => void;
}

export const EndOrderWindow = ({handleWindowCancel, onCancel, cancel}:IProps) => {
    const navigate = useNavigate();

    return(
        <div className="windowConfirmPosition"> 
            <div className="windowConfirmStyle">

                <div className="confirmText">{translationService.translate("thanks for order|A")}</div>

                    <div className="btnHomeStylePos">
                        <button className="btnHomeStyle"onClick={() => {handleWindowCancel(); onCancel(); navigate(`/`); cancel()}}>{translationService.translate("understand|A")}</button>
                    </div>
            </div>
        </div>
    )
}