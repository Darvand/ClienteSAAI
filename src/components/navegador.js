import React from 'react';
import '../css/prueba.css';
import icono from '../img/image.jpg';
import axios from 'axios';

class Navegador extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="header">
                <span className="saai">SAAI</span>
                <img src={icono} alt="Avatar"/>
                <span className="perfil"> David Montoya Pérez</span>
                <div className="nivel">
                    <span>3</span>
                    <div className="progreso">
                        <div className="barra-progreso"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navegador;