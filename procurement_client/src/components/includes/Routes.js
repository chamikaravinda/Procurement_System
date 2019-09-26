import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import UserLogin from '../userManagment/login.component';
import UserRegister from '../userManagment/register.component';
import AddSupplier from '../supplierManagement/AddSuppliers';


class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={UserLogin} />
        <Route path='/dashboard' component={DashboardPage} />
        <Route path='/supplier' component={AddSupplier} />
        <Route path='/logout' component={DashboardPage} />
        <Route path='/404' component={NotFoundPage} />
        <Route path='/login' component={UserLogin} />
        <Route path='/register' component={UserRegister} />
      </Switch>
    );
  }
}

export default Routes;
