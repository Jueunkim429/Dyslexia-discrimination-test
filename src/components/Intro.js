import React from "react";
import "../style.css";
import default_Img11 from "./main.png";
import default_Img2 from "./step1.png";
import default_Img3 from "./step2.png";
import default_Img4 from "./step3.png";
import default_Img5 from "./step4.png";
function Intro() {
    const onErrorImg11 = (e) => {
        e.target.src = default_Img11;
    }
    const onErrorImg2 = (e) => {
        e.target.src = default_Img2;
    }
    const onErrorImg3 = (e) => {
        e.target.src = default_Img3;
    }
    const onErrorImg4 = (e) => {
        e.target.src = default_Img4;
    }
    const onErrorImg5 = (e) => {
        e.target.src = default_Img5;
    }
    return(
        <>
        <img className="intro_logo" src="img/main.png" onError={onErrorImg11}/>
        <br></br>
        <img className="intro_step" src="img/step1.png" onError={onErrorImg2}/>
        <img className="intro_step" src="img/step2.png" onError={onErrorImg3}/>
        <img className="intro_step" src="img/step3.png" onError={onErrorImg4}/>
        <img className="intro_step" src="img/step4.png" onError={onErrorImg5}/>
        </>
    );
}
export default Intro;