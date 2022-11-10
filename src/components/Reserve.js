import React from "react";

const Reserve= ({reserveObj, isOwner}) => {
    return(
        <>
        <div>
        {reserveObj.userName}님의 난독증 테스트 결과 {reserveObj.test}입니다. 
        <br></br>
        예약날짜 : {reserveObj.date}
        <br></br>
        <img src="img/dyslexia.png" width="20%" />
        [난독증]
 
        <img src={reserveObj.attachmentUrl} width="20%" />    

        [{reserveObj.userName}님]
        </div>

        </>
        
    );
};
export default Reserve;