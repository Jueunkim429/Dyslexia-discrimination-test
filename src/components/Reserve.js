import React from "react";
import default_Img from "./none.png";
const Reserve= ({reserveObj, isOwner}) => {
    const onErrorImg = (e) => {
        e.target.src = default_Img;
    }
    return(
        <>
        <div className="reserve_all">
            <div className="reserve_title">
            <br></br>
            예약날짜 : {reserveObj.date}<br></br>
            <h4>{reserveObj.userName}님의 난독증 테스트 결과 <span id="reserve_return">{reserveObj.test}</span>입니다.</h4> 
            </div>
        
            <div className="reserve_img">
                <div className="reserve_detailimg">
                    <img src="img/dyslexia.png" width="20%" />
                    <p>[난독증]</p>
                </div>

                <div className="reserve_detailimg">
                    <img src={reserveObj.attachmentUrl} width="20%" onError={onErrorImg}/>    
                    <p>[{reserveObj.userName}님]</p>
                </div>
            </div>
        
        </div>
        </> 
    );
};
export default Reserve;