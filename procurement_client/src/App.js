import React from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";

import Routes from '../src/components/includes/Routes';
import TopNavigation from './components/includes/topNavigation';
import SideNavigation from './components/includes/sideNavigation';
import Footer from './components/includes/Footer';
import './index.css';



function App() {
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

export default App;
