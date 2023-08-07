import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AllTrainsPage from './components/AllTrainsPage';
import SingleTrainPage from './components/SingleTrainPage';

function App() {
  return (
    <Router>
      <Link>
        <Route path="/" exact component={AllTrainsPage} />
        <Route path="/train/:trainId" component={SingleTrainPage} />
      </Link>
    </Router>
  );
}

export default App;