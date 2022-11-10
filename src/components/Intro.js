import React from "react";
import "../style.css";

function Intro() {
    return(
        <>
        <img className="intro_logo" src="img/main.png" />

        <img className="intro_step" src="img/step1.png"/>
        <img className="intro_step" src="img/step2.png"/>
        <img className="intro_step" src="img/step3.png"/>

        </>
    );
}
export default Intro;