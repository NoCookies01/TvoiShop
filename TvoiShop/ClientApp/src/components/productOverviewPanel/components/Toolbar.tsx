import React, { useEffect, useState } from "react";
import { ProductDelivery } from "./ProductDelivery";
import { ProductDescription } from "./ProductDescription";
import "../Toolbar.css"
import translationService from "../../../services/translation.service";
import { ProductGaranty } from "./ProductGaranty";
import { defaultProduct } from "../../../data/defaults";
import { useParams } from "react-router-dom";

interface IOverviewPanel {
  button?: React.ReactNode;
  panel: React.ReactNode;
}

interface IProps {
    products: IProduct[];
}

export const Toolbar = (props: IProps) => {
  const [openedPanel, openPanel] = React.useState<number | undefined>(undefined);
  const [productItemDesc, setProductItemDesc] = useState<(IProduct)[]>([]);

  let {id} = useParams<any>();


  const panels: IOverviewPanel[] = [{
    panel: <ProductDescription products={productItemDesc}/>,
    button: translationService.translate("details|A")
  },{
    panel: <ProductDelivery/>,
    button: translationService.translate("delv|A")
  },{
      panel: <ProductGaranty/>,
      button: translationService.translate("garant|A")
  }];

  useEffect(() => {
    const prodDesc = props.products.filter(e => e.id === id) ?? defaultProduct;
    setProductItemDesc(prodDesc);
}, [props.products]);

  return(
    <div className="toolbarPosition">
      <div className="toolbarStyle">
        {panels.filter(v => v.button).map((p: IOverviewPanel, id: number) => <div className="toolbarBtn" key={id} onClick={() => openPanel(id)}>{p.button}</div>)}
      </div>
      {panels.map((p: IOverviewPanel, id: number) => id === openedPanel && p.panel)}
    </div>
  );
}
