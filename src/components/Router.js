import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation2 from "components/Navigation2";
import Detaillist from "../routes/Detaillst";
import QnA from "routes/QnA";
import Test from "routes/Test";
import Navigation from "./Navigation";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation2 userObj={userObj} />}
      {<Navigation />}
      <Switch>
        <>
        {isLoggedIn ? (
          <div
            style={{
              marginLeft:"10%",
              marginRight:"10%",
              marginTop: 80,
              justifyContent: "center",
            }}
          >
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </Route>
            <Route exact path="/qna" >
              <QnA userObj={userObj} />
            </Route>
            <Route exact path="/qna/:id" >
              <Detaillist userObj={userObj} />
            </Route>
               
          </div>
        ) : (
          <>
          <img src="img/main.png" width="50%"></img>
            <Route exact path="/">
              <Auth />
            </Route>
            <Route exact path="/test">
              <Test />
            </Route>
          </>
        )}
        </>
      </Switch>
    </Router>
  );
};
export default AppRouter;