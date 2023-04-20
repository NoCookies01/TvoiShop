import React from "react";
import translationService from "../../../services/translation.service";

export const ProductGaranty = () => {
    return(
        <div className="prTextDesc">
            <div>{translationService.translate("garantyInfo|A")}</div>
        </div>
    );
}