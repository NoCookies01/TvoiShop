import React, { useEffect } from "react";
import '../AdminPanel.css';
import {ReactComponent as Red} from '../iconsAdmin/redCircle.svg';
import {ReactComponent as Blue} from '../iconsAdmin/blueCircle.svg';
import {ReactComponent as Green} from '../iconsAdmin/greenCircle.svg';
import {ReactComponent as Yellow} from '../iconsAdmin/yellowCircle.svg';
import { actionsContextKey, GetAllAdmin } from "./GetAllAdmin";
import OutsideAlerter from "../../helpers/Outside";
import { PostAdmin } from "./PostAdmin";
import { DeleteAdmin } from "./DeleteAdmin";
import contextBuilderService from "../../../services/context.service";
import { PostProduct } from "../../../api/endpoints/products";
import { defaultProduct } from "../data/defaults";

interface IAdminPanel {
  button?: React.ReactNode;
  panel: React.ReactNode;
}

const panels: IAdminPanel[] = [{
  panel: <GetAllAdmin/>,
  button: <Blue/>
},{
  panel: <PostAdmin obj={defaultProduct} label="Post Product" onOk={PostProduct}/>,
  button: <Green/>
},{
  panel: <PostAdmin label="Edit Product" onOk={PostProduct}/>
},{
  panel: <DeleteAdmin/>
}];

export const adminContextKey = "admin";

export const SideBarAdmin = () => {
  const [openedPanel, openPanel] = React.useState<number | undefined>(undefined);

  useEffect(() => {
    contextBuilderService.createOrOverrideContext(adminContextKey, openPanel, (_) => {});
    return () => {
      contextBuilderService.removeContextIfExists(adminContextKey);
      contextBuilderService.removeContextIfExists(actionsContextKey);
    }
  }, []);

  return(
    <div className="sideBarAdminPositioin">
      <div className="sideBarAdminStyle">
        {panels.filter(v => v.button).map((p: IAdminPanel, id: number) => <div key={id} onClick={() => openPanel(id)}>{p.button}</div>)}
      </div>
      {panels.map((p: IAdminPanel, id: number) => id === openedPanel && p.panel)}
    </div>
  );
}
