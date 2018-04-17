import React from 'react';
import '../css/prueba.css';
import axios from 'axios';
import Reto from './reto.js';
import Concepto from './constantes/concepto.js';
import Ejemplo from './constantes/ejemplo.js';

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        this.props.handleTab(event);
    }
    render() {
        return (
            [
                <input id={"tabActividad" + this.props.id}
                    value={this.props.id}
                    type="radio"
                    name="tabs"
                    checked={this.props.checked}
                    onClick={this.handleClick} />,
                <label for={"tabActividad" + this.props.id}
                    style={this.props.marginLeft ? { marginLeft: this.props.marginLeft } : null}>
                    {this.props.label}
                </label>
            ]
        )
    }
}

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleTab = this.handleTab.bind(this);
    }

    handleTab(event){
        this.props.handleTab(event.target.id);
    }

    render() {
        var style = {
            color: this.props.active ? "#fff" : "#32cdff",
            fontSize: "12px",
            lineHeight: "1",
            fontWeight: "bold",
            textTransform: "uppercase",
            textAlign: "center",
            padding: "11px 20px",
            position: "relative",
            zIndex: "2",
            cursor: "pointer",
            display: "inline-block",
            WebkitTransition: "color 250ms ease-in-out",
            transition: "color 250ms ease-in-out",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            MsUserSelect: "none",
            userSelect: "none"
        }
        return ([
            <li style={style} rel="tab1" onClick={this.handleTab} id={this.props.id}>{this.props.label}</li>
        ])
    }
}

class ContenedorEjemplo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {active: [], cantidad: 0, actual: 0};
        this.handleTab = this.handleTab.bind(this);
        this.getCantidad = this.getCantidad.bind(this);
    }

    handleTab(index){
        var activeCopy = this.state.active.slice();
        for(let i=0; i<this.state.cantidad; i++){
            activeCopy[i] = false;
        }
        activeCopy[index] = true;
        this.setState({active: activeCopy, actual: index});
    }
    getCantidad(cantidad){
        var ejemplos = [];
        for(let i=0; i<cantidad; i++){
            ejemplos.push(false);
        }
        ejemplos[0] = true;
        this.setState({cantidad: cantidad, active: ejemplos});
    }
    render() {
        var width = 100/this.state.cantidad;
        var left = this.state.actual * width;
        var style = {
            tab: {
                    display: "block",
                    float: "left",
                    margin: "0",
                    padding: "0",
                    listStyle: "none",
                    position: "relative",
                    borderRadius: "35px",
                    overflow: "hidden",
                    background: "#fff",
                    height: "35px",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    MsUserSelect: "none",
                    userSelect: "none"
            }, after:{
                width: width+"%",
                background: "#32cdff",
                height: "100%",
                position: "absolute",
                top: "0",
                left: left+"%",
                WebkitTransition: "all 250ms ease-in-out",
                transition: "all 250ms ease-in-out",
                borderRadius: "35px"
            }
        }
        return (
            <div className="container">
                <div className="tab-slider--nav">
                    <ul style={style.tab}>
                        {
                            this.state.active.map(function(item, index){
                                return(<ListItem active={item} label={"Ejemplo "+(index+1)} id={index} key={index} handleTab={this.handleTab}/>)
                            }, this)
                        }
                        <div style={style.after}></div>
                    </ul>
                </div>
                <div className="tab-slider--container">
                    <Ejemplo topico={1} getCantidad={this.getCantidad} indice={this.state.actual} active={this.state.active}/>
                </div>
            </div>
        )
    }
}

class Contenedor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tab: [true, false, false], contenedorH: 0};
        this.handleTab = this.handleTab.bind(this);
    }

    handleTab(event) {
        var tabCopy = this.state.tab.slice();
        tabCopy = [false, false, false];
        tabCopy[event.target.value - 1] = true;
        var height = document.getElementById("content"+event.target.value).clientHeight;
        console.log("Altura:", height);
        this.setState({ tab: tabCopy });
    }
    render() {
        return (
            <div className="contenedor">
                <div className="contenedor-actividad">
                    <Tab id="1" checked={this.state.tab[0]} marginLeft="30%" label="Concepto" handleTab={this.handleTab} />
                    <Tab id="2" checked={this.state.tab[1]} label="Ejemplos" handleTab={this.handleTab} />
                    <Tab id="3" checked={this.state.tab[2]} label="Reto" handleTab={this.handleTab} />
                    <section id="content1">
                        <Concepto topico={1} />
                        <div style={{ textAlign: "center" }}>
                            <button className="boton" onClick={this.handleTab} value={2}>Entendido</button>
                        </div>

                    </section>

                    <section id="content2">
                        <ContenedorEjemplo/>
                    </section>
                    <section id="content3" style={{ padding: "20px" }}>
                        <Reto />
                    </section>
                </div>
            </div>
        )
    }
}

export default Contenedor;