import React from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import MainRoutes from '../src/components/includes/MainRoutes';
import './index.css';

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
