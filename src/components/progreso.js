import React from 'react';
import '../css/prueba.css';
import axios from 'axios';

class Progreso extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="avance">
                <ul>
                    <li>
                        <a className="boton active">
                            <i className="fa fa-cubes"></i>
                            <p>Aritmética</p>
                        </a>
                    </li>

                    <li>
                        <a className="boton">
                            <i className="fa fa-lock"></i>
                            <p>Bloqueado</p>
                        </a>
                    </li>
                    <li>
                        <a className="boton">
                            <i className="fa fa-lock"></i>
                            <p>Bloqueado</p>
                        </a>
                    </li>
                    <li>
                        <a className="boton">
                            <i className="fa fa-lock"></i>
                            <p>Bloqueado</p>
                        </a>
                    </li>
                    <li>
                        <a className="boton">
                            <i className="fa fa-lock"></i>
                            <p>Bloqueado</p>
                        </a>
                    </li>
                    <li>
                        <a className="boton">
                            <i className="fa fa-lock"></i>
                            <p>Bloqueado</p>
                        </a>
                    </li>
                    <li>
                        <a className="boton">
                            <i className="fa fa-lock"></i>
                            <p>Bloqueado</p>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Progreso;