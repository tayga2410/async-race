import React from 'react';
import './App.css';
import Header from './Components/Header/Header.tsx';
import Garage from './Components/Garage/Garage.tsx';

const App: React.FC = () => (
  <div>
    <Header title="Async Race" />
    <Garage />
  </div>
);

export default App;
