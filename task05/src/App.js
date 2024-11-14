import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Filter from './Filter';
import WrappedDetails from './Details';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
          <Route path="/" element={<Filter />} />
          <Route path="/details/:subtype" element={<WrappedDetails />} />
          </Routes>
        </Router>
        
    </div>
  );
}

export default App;
