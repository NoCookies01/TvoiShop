import React from "react";
import translationService from "../../services/translation.service";
import OutsideAlerter from "../helpers/Outside";


interface IProps {
    onCancel: () => void;
}

export const SizeInfoWindow = ({onCancel}:IProps) => {

    return(
        <div className="sizeInfoPosition"> 
            <OutsideAlerter onOutsideClick={onCancel}>
            <div className="sizeInfoStyle">
                <div className="sizeInfoText">
                    <h3>{translationService.translate("right size|A") + "?"}</h3>
                    <p><h3>{translationService.translate("bracelet|A")}</h3></p>
                        <p><h6>
                        {translationService.translate("insctruction bracelet|A")}
                        </h6></p>
                    <p><h3>{translationService.translate("rings|A")}</h3></p>
                        <p><h5>{translationService.translate("dimensional grid|A") + ":"}</h5></p>
                        <ul>
                            <li><h6>50 = 16</h6></li>
                            <li><h6>52 = 16.5</h6></li>
                            <li><h6>54 = 17</h6></li>
                            <li><h6>56 = 17.5</h6></li>
                            <li><h6>58 = 18</h6></li>
                        </ul>
                </div>
            </div>
            </OutsideAlerter>
        </div>
    )
}