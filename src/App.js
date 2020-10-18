import React from 'react';
import logo from './logo.svg';
import './App.css';
import HealthTest from './components/HealthTest'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Marche ese airbnb
        </p>
        <HealthTest serverName='Profile Server' healthTestUrl={'https://taller2airbnb-profile.herokuapp.com/health'}/>
        <HealthTest serverName='Business Core' healthTestUrl={'https://taller2airbnb-businesscore.herokuapp.com/health'}/>
      </header>      
    </div>
  );
}

export default App;
