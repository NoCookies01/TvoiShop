import React, { useState } from "react";
import { LogIn } from "./components/Login";
import { SideBarAdmin } from "./components/SideBarAdmin";

import './AdminPanel.css';

interface IProps {
  cancelLogin: () => void;
}

export const AdminPanel = () => {

  const [windowLogin, setWindowLogin] = useState(true);
  const onSuccessfulyLogedin = () =>{
    setWindowLogin(false)
  }

  return(
    <div className="containerAdmin">
      {windowLogin && <LogIn onSuccessfulyLogedin={onSuccessfulyLogedin}/>}
      <SideBarAdmin/>
    </div>
  );
}
