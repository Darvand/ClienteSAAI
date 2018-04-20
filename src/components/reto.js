import React from 'react';
import '../css/tarea.css';
import axios from 'axios';
import imagen from '../img/explicacion.png';
import MathJax from 'react-mathjax2';

const leftPad = (width, n) => {
    if ((n + '').length > width) {
        return n;
    }
    const padding = new Array(width).join('0');
    return (padding + n).slice(-width);
};

class Popup extends React.Component {
    constructor() {
        super();
        this.state = { seconds: 3, isRunning: 0 };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    startTimer() {
        if (this.timer == 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
        this.setState({ isRunning: 1, seconds: 3 });
    }
    reset() {
        setTimeout(() => {
            this.setState({ isRunning: 0 });
        }, 3000);
    }

    countDown() {
        //var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        //audio.play();
        this.setState({ seconds });

        // Check if we're at zero.
        if (seconds == 0) {
            this.props.toggleTime();
            setTimeout(() => { this.setState({ isRunning: 2 }) }, 400);
        }
    }
    render() {
        var style = {
            popup: {
                width: this.props.running ? "0%" : "100%",
                opacity: this.props.running ? "0.01" : "1"
            }, div: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%"
            }
        }
        const inicio = <div style={{ height: "100%" }}>
            <button style={{ margin: "0 auto" }} onClick={this.startTimer}>Comenzar</button>
            <div style={{ overflow: "auto", height: "92%" }}>
                <img src={imagen} style={{ width: "80%" }} />
            </div>
        </div>
        return (
            <div className="popup" style={style.popup}>
                {
                    this.state.isRunning == 0 ? inicio
                        : this.state.isRunning == 1 ? <div style={style.div}> <span>{this.state.seconds}</span> </div>
                            : <div style={style.div}> <span style={{ fontSize: "100px" }}>Vuelve a intentarlo</span> </div>
                }
            </div>
        )
    }
}

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

class TimeElapsed extends React.Component {
    getUnits() {
        const seconds = this.props.timeElapsed / 1000;
        return {
            min: Math.floor(seconds / 60).toString(),
            sec: Math.floor(seconds % 60).toString(),
            msec: (seconds % 1).toFixed(3).substring(2)
        };
    }
    render() {
        const units = this.getUnits();
        return (
            <div id={this.props.id}>
                <span>{leftPad(2, units.min)}:</span>
                <span>{leftPad(2, units.sec)}.</span>
                <span style={{ fontSize: "25px" }}>{units.msec}</span>
            </div>
        );
    }
}

class Cronometro extends React.Component {
    constructor(props) {
        super(props);
        ["update", "reset", "toggle"].forEach((method) => {
            this[method] = this[method].bind(this);
        });
        this.state = this.initialState = {
            isRunning: false,
            timeElapsed: 0,
        };
    }
    toggle() {
        this.setState({ isRunning: !this.state.isRunning }, () => {
            this.state.isRunning ? this.startTimer() : clearInterval(this.timer)
        });
    }
    reset() {
        clearInterval(this.timer);
        this.setState(this.initialState);
    }
    startTimer() {
        this.startTime = Date.now();
        this.timer = setInterval(this.update, 10);
    }
    update() {
        const delta = Date.now() - this.startTime;
        this.setState({ timeElapsed: this.state.timeElapsed + delta });
        this.startTime = Date.now();
    }
    render() {
        return (
            <div className="tiempo">
                <i className="material-icons">access_time</i>
                <TimeElapsed id="timer" timeElapsed={this.state.timeElapsed} />
            </div>
        )
    }
}

class Actividad extends React.Component {
    reset() {
        this.child.reset();
    }
    render() {
        var contenido;
        switch (this.props.tipoReto) {
            case 1:
            case 2: contenido = <OpcionMultiple
                actividad={this.props.actividad}
                acertarRespuesta={this.props.acertarRespuesta}
                errarRespuesta={this.props.errarRespuesta}
                tipoReto={this.props.tipoReto}
                ref={instance => { this.child = instance; }} />
                break;
            case 3: contenido = <Editor actividad={this.props.actividad}
                acertarRespuesta={this.props.acertarRespuesta}
                errarRespuesta={this.props.errarRespuesta}
                ref={instance => { this.child = instance; }} />
                break;
            default: contenido = <div>ERRO!</div>
        }
        return (
            <div className="cardBox">
                <div className="card" style={{ transform: !this.props.isChanging ? "rotateX(0)" : "rotateX(180deg)" }}>
                    <div className="card-front">
                        {contenido}
                    </div>
                    <div className="card-back"></div>
                </div>
            </div>
        )
    }
}

class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            actual: "",
            steps: [],
            value: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.onDone = this.onDone.bind(this)
        this.onSimplified = this.onSimplified.bind(this)
    }
    handleChange(event) {
        this.setState({ value: event.target.value })
    }
    onDone(event) {
        if (this.state.value != "") {
            var stepsCopy = this.state.steps.slice();
            stepsCopy.push(this.state.value)
            this.setState({ steps: stepsCopy, value: "", actual: this.state.value })
        }
    }
    onSimplified() {
        if (this.props.actividad.soluciones[0].solucion == this.state.actual) {
            this.props.acertarRespuesta(50);
        } else {
            this.props.errarRespuesta();
        }
    }
    reset() {
        this.setState({ actual: "", steps: [], value: "" })
    }
    render() {
        var style = { opacity: this.state.isChanging ? "0" : "1" }
        const steps = this.state.steps.map(function (item, index) {
            return (<Row key={index} index={index + 1} value={item} />)
        })
        return (
            <div className="contenedor-reto" style={style}>
                <div className="actividad">
                    <MathJax.Context input='ascii'>
                        <MathJax.Node inline>{this.props.actividad.actividad}</MathJax.Node>
                    </MathJax.Context>
                </div>
                <div className="contenedor-editor">
                    <div className="row">
                        <input onChange={this.handleChange}
                            name={this.state.name}
                            value={this.state.value} />
                        <button onClick={this.onDone}><i class="material-icons">done</i></button>
                    </div>
                    <div className="row">
                        <div className="paso">{"Visualizar"}</div>
                        <div style={{ width: "100%" }}>
                            <MathJax.Context input='ascii'>
                                <MathJax.Node inline>{this.state.value}</MathJax.Node>
                            </MathJax.Context>
                        </div>
                    </div>
                    {steps}
                    <button onClick={this.onSimplified}>Simplificado</button>
                </div>
            </div>
        )
    }
}

class Row extends React.Component {
    render() {
        var style = {
            width: "100%"
        }
        return (
            <div className="row">
                <div className="paso">{"Paso " + this.props.index}</div>
                <div style={style}>
                    <MathJax.Context input='ascii'>
                        <MathJax.Node inline>{this.props.value}</MathJax.Node>
                    </MathJax.Context>
                </div>
            </div>
        )
    }
}

class OpcionMultiple extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isChanging: false };
        this.cambiarReto = this.cambiarReto.bind(this);
    }
    cambiarReto() {
        this.setState({ cambiarReto: true });
    }
    reset() {
        for (let i = 0; i < this.props.actividad.soluciones.length; i++) {
            this["child" + i].resetOpcion();
        }
    }
    render() {
        const soluciones = this.props.actividad.soluciones.map(function (item, index) {
            return (<Opcion key={index}
                solucion={item.solucion}
                correcta={item.correcta}
                acertarRespuesta={this.props.acertarRespuesta}
                errarRespuesta={this.props.errarRespuesta}
                cambiarReto={this.cambiarReto}
                tipoReto={this.props.tipoReto}
                ref={instance => { this["child" + index] = instance; }} />)
        }, this)
        var style = { opacity: this.state.isChanging ? "0" : "1" }
        return (
            <div className="contenedor-reto" style={style}>
                <div className="actividad">
                    <MathJax.Context input='ascii'>
                        <MathJax.Node inline>{this.props.actividad.actividad}</MathJax.Node>
                    </MathJax.Context>
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
        this.resetOpcion = this.resetOpcion.bind(this);
    }
    handleClick() {
        if (this.props.correcta) {
            this.props.acertarRespuesta(60);
            this.setState({ color: "#32cdff" })

        } else {
            this.props.errarRespuesta();
            this.setState({ color: "#555" })
        }
    }
    resetOpcion() {
        this.setState({ color: "#fff" });
    }
    render() {
        if (this.props.tipoReto == 1) {
            return (<div style={{ background: this.state.color }} onClick={this.handleClick}>{this.props.solucion}</div>)
        } else {
            return (<div style={{ background: this.state.color }} onClick={this.handleClick}>
                <MathJax.Context input='ascii'>
                    <MathJax.Node inline>{this.props.solucion}</MathJax.Node>
                </MathJax.Context>
            </div>)
        }

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
                    <div className="barra-racha">
                        <div className="barra-racha-progreso" style={style}></div>
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
        this.state = this.initialState = {
            puntaje: 0,
            altura: 0,
            seguidas: 0,
            racha: 1,
            vidas: [true, true, true, true],
            running: false,
            actividad: { actividad: "", soluciones: ["", "", "", ""], enunciado: "" },
            isChanging: false,
            acertadas: 0,
            erradas: 0,
            tiporeto: 1
        };
        this.acertarRespuesta = this.acertarRespuesta.bind(this);
        this.errarRespuesta = this.errarRespuesta.bind(this);
        this.toggleTime = this.toggleTime.bind(this);
        this.siguienteReto = this.siguienteReto.bind(this);
    }

    getActividad() {
        axios.get("http://localhost:9021/saai/reto?topicoAlgebra=1&tipoReto=" + this.state.tiporeto)
            .then(res => {
                this.setState({
                    actividad: res.data
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
        this.setState({ acertadas: this.state.acertadas + 1 }, () => {
            setTimeout(() => {
                if (this.state.acertadas == 3 && this.state.tiporeto == 1) {
                    this.setState({ tiporeto: 2 });
                } else if (this.state.acertadas == 6 && this.state.tiporeto == 2) {
                    this.setState({ tiporeto: 3 });
                }
            },600)
        })
        setTimeout(this.siguienteReto, 400)
    }

    errarRespuesta() {
        var vidasCopy = this.state.vidas.slice();
        var i;
        for (i = 0; i < vidasCopy.length; i++) {
            if (vidasCopy[i]) {
                vidasCopy[i] = false;
                break;
            }
        }
        if (i == 4) {
            this.popup.reset();
            this.cronometro.reset();
            this.child.reset();
            this.setState(this.initialState)
            setTimeout(this.siguienteReto, 400);
        } else {
            this.setState({
                racha: 1,
                altura: 0,
                seguidas: 0,
                vidas: vidasCopy,
                erradas: this.state.erradas + 1
            });
            setTimeout(this.siguienteReto, 400);
        }

    }

    siguienteReto() {

        this.setState({ isChanging: true }, () => {
            setTimeout(() => {
                this.getActividad();
                this.child.reset();
                this.setState({ isChanging: false });
            }, 400)
        })
    }

    toggleTime() {
        this.setState({ running: !this.state.running })
        this.cronometro.toggle();
        this.getActividad();
    }

    render() {
        return (
            <div style={{ position: "relative" }}>
                <Popup running={this.state.running} toggleTime={this.toggleTime} ref={instance => { this.popup = instance; }} />
                <main>
                    <Cronometro running={this.state.running} ref={instance => { this.cronometro = instance; }} />
                    <Enunciado enunciado={this.state.actividad.enunciado} />
                    <Actividad actividad={this.state.actividad}
                        acertarRespuesta={this.acertarRespuesta}
                        errarRespuesta={this.errarRespuesta}
                        isChanging={this.state.isChanging}
                        tipoReto={this.state.tiporeto}
                        ref={instance => { this.child = instance; }} />
                    <Estatus puntaje={this.state.puntaje}
                        altura={this.state.altura}
                        racha={this.state.racha}
                        vidas={this.state.vidas} />
                </main>

            </div>
        )
    }
}

export default Reto;