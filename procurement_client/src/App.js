import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Routes from '../src/components/Routes';
import TopNavigation from './components/topNavigation';
import SideNavigation from './components/sideNavigation';
import Footer from './components/Footer';
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
