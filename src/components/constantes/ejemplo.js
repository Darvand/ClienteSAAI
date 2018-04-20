import React, { Component } from 'react';

class Tab extends Component {
    render() {
        return (
            <div id={"tab" + this.props.id} style={{ display: this.props.active ? "block" : "none", marginBottom: "20px" }} >
                {this.props.contenido}
            </div>
        )
    }
}

class Aritmetica extends Component {
    constructor(props) {
        super(props);
        var ejemplos = [];
        ejemplos.push(
            <div className="contenedor-parrafo">
                <h5 style={{ fontWeight: "bold", textAlign: "center" }}>Ejemplo 1</h5>
                `3-3*2+2`
                                    <hr />
                Se identifica <b>resta</b>, <b>multiplicación</b> y <b>suma</b>
                <br />Por prioridad, resolvemos primero la multiplicación
                                    <hr />`3-6+2`<hr />
                Ahora queda <b>resta</b> y <b>suma</b>, ambos con igual prioridad.
                                    Por ende solucionamos la que este mas a la izquierda.
                                    <hr />`-3+2`<hr />
                Por ultimo, operamos la <b>suma</b>.
                                    <hr />`-1`
            </div>);
        ejemplos.push(
            <div className="contenedor-ejemplo">
                <div className="paso-ejemplo">
                    <span className="expresion">`3-3*2+2`</span>
                    <i className="fa fa-chevron-circle-left"></i>
                    <span>Se identifica <b>resta</b>, <b>multiplicación</b> y <b>suma</b></span>
                </div>
                <div className="paso-ejemplo">
                    <span style={{ textAlign: "right" }}>Por prioridad, resolvemos primero la <b>multiplicación</b></span>
                    <i className="fa fa-chevron-circle-right"></i>
                    <span className="expresion">`3-6+2`</span>
                </div>
                <hr />
                <div className="paso-ejemplo">
                    <span className="expresion">`3-6+2`</span>
                    <i className="fa fa-chevron-circle-left"></i>
                    <span>Ahora queda <b>resta</b> y <b>suma</b>, ambos con igual prioridad.</span>
                </div>
                <div className="paso-ejemplo">
                    <span style={{ textAlign: "right" }}>Por ende solucionamos la que este mas a la <b>izquierda</b>.</span>
                    <i className="fa fa-chevron-circle-right"></i>
                    <span className="expresion">`-3+2`</span>
                </div>
                <hr />
                <div className="paso-ejemplo">
                    <span style={{ textAlign: "right" }}>Por ultimo, operamos la <b>suma</b>.</span>
                    <i className="fa fa-chevron-circle-right"></i>
                    <span className="expresion">`-1`</span>
                </div>
            </div>)
        ejemplos.push(<div className="contenedor-parrafo">
            <h5 style={{ fontWeight: "bold", textAlign: "center" }}>Ejemplo 1</h5>
            `3-3*2+2`
                                    <hr />
            Se identifica <b>resta</b>, <b>multiplicación</b> y <b>suma</b>
            <br />Por prioridad, resolvemos primero la multiplicación
                                    <hr />`3-6+2`<hr />
            Ahora queda <b>resta</b> y <b>suma</b>, ambos con igual prioridad.
                                    Por ende solucionamos la que este mas a la izquierda.
                                    <hr />`-3+2`<hr />
            Por ultimo, operamos la <b>suma</b>.
                                    <hr />`-1`
</div>);
        ejemplos.push(<div className="contenedor-parrafo">
            <h5 style={{ fontWeight: "bold", textAlign: "center" }}>Ejemplo 1</h5>
            `3-3*2+2`
                                    <hr />
            Se identifica <b>resta</b>, <b>multiplicación</b> y <b>suma</b>
            <br />Por prioridad, resolvemos primero la multiplicación
                                    <hr />`3-6+2`<hr />
            Ahora queda <b>resta</b> y <b>suma</b>, ambos con igual prioridad.
                                    Por ende solucionamos la que este mas a la izquierda.
                                    <hr />`-3+2`<hr />
            Por ultimo, operamos la <b>suma</b>.
                                    <hr />`-1`
            </div>);
        this.state = { ejemplos };
    }

    componentDidMount() {
        this.props.getCantidad(this.state.ejemplos.length);
    }
    render() {

        return (
            <div style={{ height: "calc(100% - 80px)" }}>
                {this.state.ejemplos.map(function (item, index) {
                    return (<Tab id={index} active={this.props.active[index]} contenido={item} />)
                }, this)}
            </div>
        );
    }
}

class Ejemplo extends Component {
    constructor(props) {
        super(props);
        this.getCantidad = this.getCantidad.bind(this);
    }
    getCantidad(cantidad) {
        this.props.getCantidad(cantidad);
    }
    render() {
        switch (this.props.topico) {
            case 1: return (<Aritmetica getCantidad={this.getCantidad} indice={this.props.indice} active={this.props.active} />); break;
            default: return (<div>Error</div>)
        }
    }
}

export default Ejemplo;