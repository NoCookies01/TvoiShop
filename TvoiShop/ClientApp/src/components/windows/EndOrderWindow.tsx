import React from "react";
import { useNavigate } from 'react-router-dom';

interface IProps {
    onCancel: () => void;
    cancel: () => void;
    handleWindowCancel: () => void;
}

export const EndOrderWindow = ({handleWindowCancel, onCancel, cancel}:IProps) => {
    const navigate = useNavigate();

    return(
        <div className="windowConfirmPosition"> 
            <div className="windowConfirmStyle">

                <div className="confirmText">thank you for your order. Our manager will contact you in a few seconds to clarify the details</div>

                    <div className="btnHomeStylePos">
                        <button className="btnHomeStyle"onClick={() => {handleWindowCancel(); onCancel(); navigate(`/`); cancel()}}>Understand</button>
                    </div>
            </div>
        </div>
    )
}