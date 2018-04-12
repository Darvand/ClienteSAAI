import React from 'react';
import '../css/tarea.css';
import axios from 'axios';

class Enunciado extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="puntaje">
                <p>{this.props.enunciado}</p>
            </div>
        )
    }
}

class Cronometro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            milisegundos: 0,
            segundos: 0,
            minutos: 0,
            avanzando: false
        };
        this.comenzarCronometro();
    }

    comenzarCronometro() {
        if (!this.state.avanzando) {
            this.interval = setInterval(() => {
                this.tick();
            }, 100)
            this.setState({ avanzando: true });
        }
    }

    detenerCronometro() {
        if (this.state.avanzando) {
            clearInterval(this.interval);
            this.setState({ running: false })
        }
    }

    resetearCronometro() {
        this.detenerCronometro();
        this.actualizar(0, 0, 0);
    }

    tick() {
        let milisegundos = this.state.milisegundos + 10;
        let segundos = this.state.segundos;
        let minutos = this.state.minutos;

        if (milisegundos === 100) {
            milisegundos = 0;
            segundos = segundos + 1;
        }

        if (segundos === 60) {
            milisegundos = 0;
            segundos = 0;
            minutos = minutos + 1;
        }

        this.actualizar(milisegundos, segundos, minutos);
    }

    zeroPad(value) {
        return value < 10 ? `0${value}` : value;
    }

    actualizar(milisegundos, segundos, minutos) {
        this.setState({
            milisegundos: milisegundos,
            segundos: segundos,
            minutos: minutos
        });
    }

    render() {
        return (
            <div className="tiempo">
                <i className="material-icons">access_time</i>
                <span>{this.zeroPad(this.state.minutos) + ":" +
                    this.zeroPad(this.state.segundos) + ":" +
                    this.zeroPad(this.state.milisegundos)}</span>
            </div>
        )
    }
}

class Actividad extends React.Component {
    render() {
        console.log(this.props);
        if (this.props.opcionMultiple) {
            return (
                <OpcionMultiple
                    actividad={this.props.actividad}
                    soluciones={this.props.soluciones}
                    acertarRespuesta={this.props.acertarRespuesta}
                    errarRespuesta={this.props.errarRespuesta}
                />)
        }
    }
}

class OpcionMultiple extends React.Component {
    render() {
        const soluciones = this.props.soluciones.map(function (item, index) {
            return (<Opcion key={index}
                solucion={item.solucion}
                correcta={item.correcta}
                acertarRespuesta={this.props.acertarRespuesta}
                errarRespuesta={this.props.errarRespuesta} />)
        }, this)
        return (
            <div className="contenedor-actividad">
                <div className="actividad">
                    <span> `{this.props.actividad}`</span>
                </div>
                <div className="contenedor-solucion">
                    <div className="solucion">
                        {soluciones}
                    </div>
                </div>
            </div>
        )
    }
}

class Opcion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            correcta: this.props.correcta,
            color: "#fff"
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        if (this.state.correcta) {
            this.props.acertarRespuesta(50);
            this.setState({ color: "#80dfff" })
        } else {
            this.props.errarRespuesta();
            this.setState({ color: "#555" })
        }
    }
    render() {
        var style = { background: this.state.color };
        return (
            <div style={style} onClick={this.handleClick}>{this.props.solucion}</div>
        )
    }
}

class Vida extends React.Component {
    render() {
        var style = {
            animationPlayState: "paused",
            border: "0px",
            background: "#555"
        };
        if (this.props.activa) {
            return (<li></li>)
        } else {
            return (<li style={style}></li>)
        }
    }
}

class Estatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vidas: this.props.vidas
        };
    }
    render() {
        var style = { height: this.props.altura + "%" };
        return (
            <div className="racha">
                <div className="vidas">
                    <ul>
                        {this.props.vidas.map(function (item, index) {
                            return (<Vida key={index} activa={item} />)
                        })}
                    </ul>
                </div>
                <div className="contenedor-barra">
                    <div className="barra">
                        <div className="barra-progreso" style={style}></div>
                    </div>
                    <div className="contenedor-seguidos">{this.props.puntaje}</div>
                </div>
                <div className="multiplicador">
                    <div>
                        <p>X</p>
                        <span>{this.props.racha}</span>
                    </div>
                </div>
            </div>
        )
    }
}
class Reto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            puntaje: 0,
            altura: 0,
            seguidas: 0,
            racha: 1,
            vidas: [true, true, true, true]
        };
        this.acertarRespuesta = this.acertarRespuesta.bind(this);
        this.errarRespuesta = this.errarRespuesta.bind(this);
    }

    componentDidMount() {
        console.log("entra");
        axios.get("http://localhost:9021/saai/reto?topicoAlgebra=1&tipoReto=1")
            .then(res => {
                console.log(res.data);
                this.setState({
                    id: res.data.idContenidoReto,
                    enunciado: res.data.enunciado,
                    actividad: res.data.actividad,
                    soluciones: res.data.soluciones
                });
            })
    }

    acertarRespuesta() {
        var altura;
        switch (this.state.racha) {
            case 1: altura = 33; break;
            case 2: altura = 20; break;
            case 3: altura = 10; break;
        }
        if (this.state.seguidas + 1 === 3 && this.state.racha === 1) {
            this.setState(function (prevState, props) {
                return {
                    puntaje: prevState.puntaje + (50 * 1),
                    racha: 2,
                    altura: 0,
                    seguidas: prevState.seguidas + 1
                };
            });
        } else if (this.state.seguidas + 1 === 8 && this.state.racha === 2) {
            this.setState(function (prevState, props) {
                return {
                    puntaje: prevState.puntaje + (50 * 2),
                    racha: 3,
                    altura: 0,
                    seguidas: prevState.seguidas + 1
                };
            });
        } else if (this.state.seguidas + 1 === 18 && this.state.racha === 3) {
            this.setState(function (prevState, props) {
                return {
                    puntaje: prevState.puntaje + (50 * 3),
                    racha: 4,
                    altura: 100,
                    seguidas: prevState.seguidas + 1
                };
            });
        } else if (this.state.racha === 4) {
            this.setState(function (prevState, props) {
                return {
                    puntaje: prevState.puntaje + (50 * 4),
                    seguidas: prevState.seguidas + 1
                };
            });
        } else {
            this.setState(function (prevState, props) {
                return {
                    puntaje: prevState.puntaje + (50 * this.state.racha),
                    altura: prevState.altura + altura,
                    seguidas: prevState.seguidas + 1
                };
            });
        }
    }

    errarRespuesta() {
        var vidasCopy = this.state.vidas.slice();
        for (var i = 0; i < vidasCopy.length; i++) {
            if (vidasCopy[i]) {
                vidasCopy[i] = false;
                break;
            }
        }
        this.setState({
            racha: 1,
            altura: 0,
            seguidas: 0,
            vidas: vidasCopy
        });
    }

    render() {
        return (
            <main>
                <Cronometro />
                {
                    !this.state.id
                        ? <p>CARGANDO...</p>
                        : <Enunciado enunciado={this.state.enunciado} />
                }
                {
                    !this.state.id
                        ? <p>CARGANDO...</p>
                        : <Actividad opcionMultiple={true}
                            actividad={this.state.actividad}
                            soluciones={this.state.soluciones}
                            acertarRespuesta={this.acertarRespuesta}
                            errarRespuesta={this.errarRespuesta} />
                }
                <Estatus puntaje={this.state.puntaje}
                    altura={this.state.altura}
                    racha={this.state.racha}
                    vidas={this.state.vidas} />
            </main>
        )
    }
}

export default Reto;