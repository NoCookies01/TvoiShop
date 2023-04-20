import React from "react";
import { DeleteById } from "../../../api/endpoints/products";
import toastrService from "../../../services/toastr.service";
import '../AdminPanel.css';

export const DeleteAdmin = () => {
  const [idToDelete, setIdToDelete] = React.useState<string>("");

  const procced = () => {
    if (!/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(idToDelete)) {
      toastrService.callToastr("Bad uuid", "error");
      return;
    }

    DeleteById(idToDelete)
    .then(_ => toastrService.callToastr("Success", 'info'))
    .catch(e => {
      toastrService.callToastr(e, "error");
      console.error(e);
    });
  }

  return(
    <div className="cardElementPanel">
      <div className="headerCardElement">Delete Product</div>
      <form className="columnStyle">
        <input value={idToDelete} onChange={e => setIdToDelete(e.target.value)} type="text" placeholder="id" className="inputStyleAdmin"/>
      </form>
      <div onClick={procced} className="headerCardElement">Ok</div>
    </div>
  );
}