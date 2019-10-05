import React from 'react';
import {Route, Switch} from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import UserLogin from '../userManagment/login.component';
import UserRegister from '../userManagment/register.component';
import AddSupplier from '../supplierManagement/AddSuppliers';
import Main from '../pages/MainPage';
import AddSite from '../siteManagement/AddSite.component';

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/' exact component={UserLogin}/>
                <Route path='/dashboard' component={DashboardPage}/>
                <Route path='/supplier' component={AddSupplier}/>
                <Route path='/404' component={NotFoundPage}/>
                <Route path='/add-site' component={AddSite}/>
            </Switch>
        );
    }
}

export default Routes;
