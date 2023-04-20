import React from "react";
import translationService from "../../../services/translation.service";

interface IProps {
    products: IProduct[];
  }

export const ProductDescription = (props: IProps) => {

    const viewInfo = props.products.map((p, index) => {
        return(
          <div key={index} className="prTextDesc">
            <div>
                <div className="textMainDesc">{translationService.translate("brand|A")}</div>
                {p.brand}
            </div>

            <div>
                <div className="textMainDesc">{translationService.translate("metal|A")}</div>
                {p.metal}
            </div>

            <div>
                <div className="textMainDesc">{translationService.translate("weight|A")}</div>
                {p.weight} g
            </div>

            <div>
                <div className="textMainDesc">{translationService.translate("desc|A")}</div>
                {p.description}
            </div>
            <div>
                <div className="textMainDesc">{translationService.translate("package|A")}</div>
                {p.packaging}
            </div>
          </div>
        )
    })

    return(
        <div>
            {viewInfo}
        </div>
    );
}

