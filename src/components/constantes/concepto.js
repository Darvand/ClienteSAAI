import React, { Component } from 'react';

var Aritmetica =
    <div>
        <div className="contenedor-parrafo">
            <p>Para realizar la correcta solución de una operación matemática, 
                es necesario aplicar el orden de las operaciones.
                Primero se resuelve primero, la prioridad más baja.</p>
        </div>
        <h5 style={{ fontWeight: "bold", textAlign: "center" }}>Jerarquía de las operaciones</h5>
        <table>
            <tr>
                <th style={{ width: "20px" }}>Prioridad</th>
                <th>Operación</th>
                <th>Símbolo</th>
                <th>Ejemplo</th>
                <th>Resultado</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Paréntesis</td>
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
        <br />
        <div className="contenedor-parrafo">
            <p><strong>¡IMPORTANTE!</strong> En caso de tener dos o mas operaciones con la misma prioridad, se
                            resuelve el que este más a la izquierda.</p>
        </div>
    </div>;

class Concepto extends Component {
    render() {
        switch (this.props.topico) {
            case 1: return (Aritmetica); break;
            default: return (<div>Error</div>)
        }
    }
}

export default Concepto;