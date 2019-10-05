
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import UserLogin from '../userManagment/login.component';
import UserRegister from '../userManagment/register.component';
import AddSupplier from '../supplierManagement/AddSuppliers';
import Main from '../pages/MainPage';

import AddItem from '../supplierManagement/addItem';

class MainRoutes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/' exact component={UserLogin} />
                <Route path='/register' component={UserRegister} />
                <Route path='/main' component={Main} />
                <Route path='/addItem' component={AddItem} />
            </Switch>
        );
    }
}

export default MainRoutes;