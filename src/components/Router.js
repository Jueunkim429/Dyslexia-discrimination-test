import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import My from "routes/My";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      <Switch>
        <>
        {isLoggedIn ? (
          <My userObj={userObj} refreshUser={refreshUser} />
        ) : (
          <>
            <Auth />
          </>
        )}
        </>
      </Switch>
    </Router>
  );
};
export default AppRouter;