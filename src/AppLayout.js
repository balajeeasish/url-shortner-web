import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShortUrlGenerateForm from "./pages/ShortUrlGenerateForm";
import ShortIdRedirect from "./pages/ShortIdRedirect";

const AppLayout = () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <ShortUrlGenerateForm />
      </Route>
      <Route path="/:shortId" exact>
        <ShortIdRedirect />
      </Route>
    </Switch>
  </Router>
);

export default AppLayout;
