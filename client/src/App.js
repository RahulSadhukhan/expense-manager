import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { MainLayout } from './layouts';
import { SignIn, SignUp } from './scenes';
import security from './lib/security';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/expense-manager/sign-in" component={SignIn} />
          <Route exact path="/expense-manager/sign-up" component={SignUp} />
          <Route path="/expense-manager" component={security(MainLayout)} />
          <Redirect to="/expense-manager" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
