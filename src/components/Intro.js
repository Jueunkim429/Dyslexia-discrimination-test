import React from "react";

function Intro() {
    return(
        <>
        <img className="intro_logo" src="img/main.png" />
        <img src="./main.png" />
        <img src={require("./main.png" ).default} />
        <p>사용방법 소개</p>
        </>
    );
}
export default Intro;