import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Reto from './components/reto.js';
import Navegador from './components/navegador.js';
import Progreso from './components/progreso.js';
import Contenedor from './components/contenedor.js';

class App extends Component {
  render() {
    return (
      <div>
        <Navegador/>
        <Progreso/>
        <Contenedor/>
      </div>
    );
  }
}

export default App;
