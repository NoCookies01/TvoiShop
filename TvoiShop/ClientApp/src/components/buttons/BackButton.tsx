import React from "react";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
    const navigate = useNavigate();
    return (
      <>
        <button className="ButtonStyle" onClick={() => navigate(-1)}></button>
      </>
    );
};