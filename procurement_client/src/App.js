import React from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";

import MainRoutes from '../src/components/includes/MainRoutes';
import TopNavigation from './components/includes/topNavigation';
import SideNavigation from './components/includes/sideNavigation';
import Footer from './components/includes/Footer';
import './index.css';
import Login from './components/userManagment/login.component';
import UserRegister from './components/userManagment/register.component'
import DashboardPage from "./components/pages/DashboardPage";



function App() {
  return (
    <Router>
        <div className="flexible-content" >
      {/*  <TopNavigation />*/}
      {/*  <SideNavigation />*/}
      {/*  <main id="content" className="p-5" style={{minHeight:'100vh'}}>*/}
          <MainRoutes/>
      {/*  </main>*/}

      {/*<Footer />*/}
      </div>
    </Router>
  );
}

export default App;
