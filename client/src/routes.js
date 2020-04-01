import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Expense, ExpenseForm } from './scenes';

// eslint-disable-next-line arrow-body-style
const Routes = (props) => {
  const { match: { path } } = props;

  return (
    <Switch>
      <Route
        exact
        path={`${path}/expenses`}
        component={Expense}
      />
      <Route
        exact
        path={`${path}/expenses/create`}
        component={ExpenseForm}
      />
      <Route
        exact
        path={`${path}/expenses/edit/:id`}
        component={() => <ExpenseForm edit/>}
      />
      <Redirect to={`${path}/sign-in`} />
    </Switch>
  );
}

export default Routes;
