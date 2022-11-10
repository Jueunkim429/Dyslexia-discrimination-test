import React from "react";
import default_Img from "./none.png";
const Reserve= ({reserveObj, isOwner}) => {
    const onErrorImg = (e) => {
        e.target.src = default_Img;
    }
    return(
        <>
        <div>
        {reserveObj.userName}님의 난독증 테스트 결과 {reserveObj.test}입니다. 
        <br></br>
        예약날짜 : {reserveObj.date}
        <br></br>
        <img src="img/dyslexia.png" width="20%" />
        [난독증]
 
        <img src={reserveObj.attachmentUrl} width="20%" onError={onErrorImg}/>    

        [{reserveObj.userName}님]
        </div>

        </>
        
    );
};
export default Reserve;