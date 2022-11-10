import React from "react";
import { useHistory, useLocation } from "react-router-dom";


const Reserve= ({reserveObj, isOwner}) => {
    return(
        <>
        {reserveObj.date}
        <img src={reserveObj.attachmentUrl} ></img>
        </>
        
    );
};
export default Reserve;