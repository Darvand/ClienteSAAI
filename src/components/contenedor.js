import React from 'react';
import '../css/prueba.css';
import axios from 'axios';
import Reto from './reto.js';

class Tab extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="pruebaDiv">
                <input id={"tabActividad"+this.props.id} 
                type="radio" 
                name="tabs" 
                checked={this.props.checked}/>
                <label for={"tabActividad"+this.props.id}
                style={this.props.marginLeft ? {marginLeft: this.props.marginLeft}: null}>
                {this.props.label}
                </label>
            </div>
        )
    }
}

class Contenedor extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="contenedor">
            <div className="contenedor-actividad">
                <Tab id="1" checked={true} marginLeft="30%" label="Concepto"/>
                <Tab id="2" checked={false} label="Ejemplos"/>
                <Tab id="3" checked={false} label="Reto"/>
                <section id="content1">
                    <div className="contenedor-parrafo">
                        <p>Para realizar la correcta solución de una operación matematica,
                            es necesario aplicar el orden de las operaciones.</p>
                    </div>
                    <h5 style={{fontWeight: "bold", textAlign: "center"}}>Jerarquía de las operaciones</h5>
                    <table>
                        <tr>
                            <th style={{width: "20px"}}>Prioridad</th>
                            <th>Operación</th>
                            <th>Simbolo</th>
                            <th>Ejemplo</th>
                            <th>Resultado</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Parentesís</td>
                            <td>`()`</td>
                            <td>`4*(5+2)`</td>
                            <td>`4*7`</td>
                        </tr>
                        <tr>
                            <td rowspan="2">2</td>
                            <td>Potencias</td>
                            <td>`^`</td>
                            <td>`4^2+3`</td>
                            <td>`16+3`</td>
                        </tr>
                        <tr>
                            <td>Raíces</td>
                            <td>`sqrt `</td>
                            <td>`sqrt 4 +3`</td>
                            <td>`2+3`</td>
                        </tr>
                        <tr>
                            <td rowspan="2">3</td>
                            <td>Multiplicación</td>
                            <td>`*`</td>
                            <td>`5*3-2`</td>
                            <td>`15-2`</td>
                        </tr>
                        <tr>
                            <td>División</td>
                            <td>`/`</td>
                            <td>`-3+6/2`</td>
                            <td>`-3+3`</td>
                        </tr>
                        <tr>
                            <td rowspan="2">4</td>
                            <td>Suma</td>
                            <td>`+`</td>
                            <td>`4+2`</td>
                            <td>`6`</td>
                        </tr>
                        <tr>
                            <td>Resta</td>
                            <td>`-`</td>
                            <td>`6-7`</td>
                            <td>`-1`</td>
                        </tr>
                    </table>
                    <br/>
                    <div className="contenedor-parrafo">
                        <p><strong>¡IMPORTANTE!</strong> En caso de tener dos o mas operaciones con la misma prioridad, se
                            resuelve el que este más a la izquierda.</p>
                    </div>
                    <button className="boton" onclick="conceptoClick()">Entendido</button>
                </section>

                <section id="content2">
                    <div className="container">
                        <div className="tab-slider--nav">
                            <ul className="tab-slider--tabs">
                                <li className="tab-slider--trigger active" rel="tab1">Ejemplo 1</li>
                                <li className="tab-slider--trigger" rel="tab2">Ejemplo 2</li>
                            </ul>
                        </div>
                        <div className="tab-slider--container">
                            <div id="tab1" className="tab-slider--body">
                                <div className="contenedor-parrafo">
                                    <h5 style={{fontWeight: "bold", textAlign:"center"}}>Ejemplo 1</h5>
                                    `3-3*2+2`
                                    <hr/>
                                    Se identifica <b>resta</b>, <b>multiplicacion</b> y <b>suma</b>
                                    <br/>Por prioridad, resolvemos primero la multiplicacion
                                    <hr/>`3-6+2`<hr/>
                                    Ahora queda <b>resta</b> y <b>suma</b>, ambos con igual prioridad.
                                    Por ende solucionamos la que este mas a la izquierda.
                                    <hr/>`-3+2`<hr/>
                                    Por ultimo, operamos la <b>suma</b>.
                                    <hr/>`-1`
                                </div></div>
                            <div id="tab2" className="tab-slider--body">
                                <div className="contenedor-ejemplo">
                                    <div className="paso-ejemplo">
                                        <span className="expresion">`3-3*2+2`</span>
                                        <i className="fa fa-chevron-circle-left"></i>
                                        <span>Se identifica <b>resta</b>, <b>multiplicacion</b> y <b>suma</b></span>
                                    </div>
                                    <div className="paso-ejemplo">
                                        <span style={{textAlign: "right"}}>Por prioridad, resolvemos primero la <b>multiplicacion</b></span>
                                        <i className="fa fa-chevron-circle-right"></i>
                                        <span className="expresion">`3-6+2`</span>
                                    </div>
                                    <hr/>
                                    <div className="paso-ejemplo">
                                        <span className="expresion">`3-6+2`</span>
                                        <i className="fa fa-chevron-circle-left"></i>
                                        <span>Ahora queda <b>resta</b> y <b>suma</b>, ambos con igual prioridad.</span>
                                    </div>
                                    <div className="paso-ejemplo">
                                        <span style={{textAlign: "right"}}>Por ende solucionamos la que este mas a la <b>izquierda</b>.</span>
                                        <i className="fa fa-chevron-circle-right"></i>
                                        <span className="expresion">`-3+2`</span>
                                    </div>
                                    <hr/>
                                    <div class="paso-ejemplo">
                                        <span style={{textAlign: "right"}}>Por ultimo, operamos la <b>suma</b>.</span>
                                        <i className="fa fa-chevron-circle-right"></i>
                                        <span className="expresion">`-1`</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="content3" style={{padding: "20px"}}>
                    <Reto/>
                </section>
            </div>
        </div>
        )
    }
}

export default Contenedor;