import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import Routes from '../includes/Routes';
import TopNavigation from '../includes/topNavigation';
import SideNavigation from '../includes/sideNavigation';
import Footer from '../includes/Footer';
// import '../../index.css';


function Main() {
    return (
        <Router>
            <div className="flexible-content" >
                <TopNavigation />
                <SideNavigation />
                <main id="content" className="p-5" style={{minHeight:'100vh'}}>
                    <Routes />
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default Main;
