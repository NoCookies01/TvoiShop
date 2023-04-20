import React from "react";
import { GetAll } from "../../../api/endpoints/products";
import { defaultProduct } from "../../../data/defaults";
import contextBuilderService from "../../../services/context.service";
import { isPrimitive } from "../../../services/object.service";
import toastrService from "../../../services/toastr.service";
import translationService from "../../../services/translation.service";
import '../AdminPanel.css';
import { adminContextKey } from "./SideBarAdmin";

const keys = Object.keys(defaultProduct);

export const actionsContextKey = "actions";

export const GetAllAdmin = () => {
  const [products, setProducts] = React.useState<IProduct[]>([]);

  React.useEffect(() => {
    GetAll().then(p => {
      setProducts(p.data);
      toastrService.callToastr("Loaded");
    }).catch(e => {
      toastrService.callToastr(e, "error");
      console.error(e);
    });
  }, []);

  const edit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, product: IProduct) => {
    e.preventDefault();

    contextBuilderService.createOrOverrideContext(actionsContextKey, product, (_) => {});
    (contextBuilderService.getContextOrUndefined(adminContextKey)!.data as any)(2);
  }

  return(
    <div className="cardElementPanel">
      <table>
        <thead>
          <tr className="tableRow headerRow">
            {keys.map(k => <th className="tableCell tableCellHeader">{k}</th>)}
            <th className="tableCell tableCellHeader">{translationService.translate("product actions|A", "Actions")}</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {
            products.map(p => 
              <tr className="tableRow">
                {
                  keys.map((k, id) => 
                    <th className="tableCell">{<Cell obj={p[k]}/>}</th>
                  )
                }
                <th className="">
                  <button onClick={e => edit(e, p)}>Edit</button>
                  <button>Delete</button>
                </th>
              </tr>  
            )
          }
        </tbody>
      </table>
    </div>
  );
}

function Cell({obj}: {obj: any}) {
  return (<>{obj ? (isPrimitive(obj) ? obj.toString() : "{}") : ""}</>)
}