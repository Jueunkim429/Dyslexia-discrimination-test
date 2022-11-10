import React, { useState } from "react";
import { authService } from "fbase";
import "../style.css";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
    <div  className="auth_main">
      <form onSubmit={onSubmit} className="auth_form" >
      <div className="auth_title">
          EMAIL : &nbsp;
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          className="auth_text"
          onChange={onChange}
        />
        </div>
        
        <div className="auth_title">
        &nbsp;&nbsp;&nbsp;PW : &nbsp;
  
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          className="auth_text"
          onChange={onChange}
        />
        </div>
        
        <br></br>
        <div>
        <input
        className="all_button"
          type="submit"
          value={newAccount ? "회원가입" : "로그인"}
        />
        <span onClick={toggleAccount} className="all_button">
          {newAccount ? "로그인" : "회원가입"}
        </span>
        {error && <span>{error}</span>}
        </div>
        
      </form>
      
    </div>
      
    </>
  );
};
export default AuthForm;