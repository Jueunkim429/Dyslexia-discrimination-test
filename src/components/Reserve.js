import React from "react";
import default_Img from "./none.png";
import default_Img2 from "./dyslexia.png";
const Reserve= ({reserveObj, isOwner}) => {
    const onErrorImg = (e) => {
        e.target.src = default_Img;
    }

    const onErrorImg2 = (e) => {
        e.target.src = default_Img2;
    }
    return(
        <>
        <div className="reserve_all">
         &nbsp; <b>예약번호 : {reserveObj.createdAt}</b>
            <div className="reserve_title">
            <br></br>
            예약날짜 : {reserveObj.date} <br></br>
            <h4>{reserveObj.userName}님의 난독증 테스트 결과 <span id="reserve_return">{reserveObj.test}</span>입니다.</h4> 
            </div>
        
            <div className="reserve_img">
                <div className="reserve_detailimg">
                    <img src="img/dyslexia.png" className="reserve_dy" onError={onErrorImg2} />
                    <p>[난독증]</p>
                </div>

                <div className="reserve_detailimg">
                    <img src={reserveObj.attachmentUrl} className="reserve_dy" onError={onErrorImg}/>    
                    <p>[{reserveObj.userName}님]</p>
                </div>
            </div>
        </div>
        </> 
    );
};
export default Reserve;