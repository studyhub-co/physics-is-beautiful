import React from 'react';
import MathJax from 'react-mathjax';
import MediaQuery from 'react-responsive';
import {Link, Prompt} from 'react-router-dom';
import ReactCountdownClock from 'react-countdown-clock';
import {VectorCanvas, CanvasVector, CanvasText} from './vector_canvas';


class ScoreBoard extends React.Component {

    constructor() {
        super();
        this.state = {
            clockKey: 1,
            didReset: false,
        };
    }

    componentDidUpdate() {
        // This is some hackery that I'm not too happy about. I don't seem to
        // have access to the underlying clock to tell it to reset when I
        // want...so I have to force it by giving it a new `key`. But to know
        // when to reset, there is additional juggling that has to be done
        // here.
        if (this.props.state == GameState.NEW && !this.state.didReset) {
            this.setState({clockKey: this.state.clockKey + 1, didReset: true});
        }
        if (this.props.state != GameState.NEW && this.state.didReset) {
            this.setState({didReset: false});
        }
    }

    render() {
        var score;
        var paused;
        switch(this.props.state) {
            case GameState.GAME_OVER:
                paused = true;
                score = (
                    <div className="col-md-4 text-center">
                        <h1>Game Over!</h1>
                        <button onClick={this.props.restart}>Try Again</button>
                        <button><Link to={'/'}>Exit</Link></button>
                    </div>
                );
                break;
            case GameState.WON:
                paused = true;
                score = (
                    <div className="col-md-4 text-center">
                        <h2>Score: {this.props.score}</h2>
                        <h1>You Won!</h1>
                        <button><Link to={'/'}>Continue</Link></button>
                    </div>
                )
                break;
            case GameState.PAUSED:
                paused = true;
                score = (
                    <div>
                        <MediaQuery minDeviceWidth={736}>
                            <div className="col-md-2 text-center">
                                <h2>Score: {this.props.score}</h2>
                            </div>
                            <div className="col-md-2 text-center">
                                <h2>Level: {this.props.level}</h2>
                            </div>
                        </MediaQuery>
                        <MediaQuery maxDeviceWidth={736}>
                          <div className="col-md-2 text-center">
                              <h4>Score: {this.props.score}</h4>
                              <h4>Level: {this.props.level}</h4>
                          </div>
                        </MediaQuery>
                    </div>
                );
                break;
            default:
                paused = false;
                score = (
                    <div>
                        <MediaQuery minDeviceWidth={736}>
                            <div className="col-md-2 text-center">
                                <h2>Score: {this.props.score}</h2>
                            </div>
                            <div className="col-md-2 text-center">
                                <h2>Level: {this.props.level}</h2>
                            </div>
                        </MediaQuery>
                        <MediaQuery maxDeviceWidth={736}>
                          <div className="col-md-2 text-center">
                              <h4>Score: {this.props.score} Level: {this.props.level}</h4>
                          </div>
                        </MediaQuery>
                    </div>
                );
        }
        var clockStyle = {
            height: 100,
            width: 100,
            top: "50%",
            left: "50%",
            display: "block",
            marginLeft: -100,
            position: "relative",
        }
        var smallClockStyle = {
            height: 50,
            width: 50,
            top: "50%",
            left: "50%",
            display: "block",
            marginLeft: -50,
            position: "relative",
        }
        return (
            <div className="row text-center">
                <div className="col-md-2">
                </div>
                <div className="col-md-2 text-center">
                    <MediaQuery minDeviceWidth={736}>
                        <div style={clockStyle}>
                            <ReactCountdownClock
                                key={this.state.clockKey}
                                seconds={120}
                                color="#777777"
                                alpha={0.9}
                                size={100}
                                weight={10}
                                paused={paused}
                                onComplete={this.props.timesUp}
                                onClick={this.props.pause}
                            />
                        </div>
                    </MediaQuery>
                    <MediaQuery maxDeviceWidth={736}>
                        <div style={smallClockStyle}>
                            <ReactCountdownClock
                                key={this.state.clockKey}
                                seconds={120}
                                color="#777777"
                                alpha={0.9}
                                size={50}
                                weight={10}
                                paused={paused}
                                onComplete={this.props.timesUp}
                                onClick={this.props.pause}
                            />
                        </div>
                    </MediaQuery>
                </div>
                {score}
             </div>
        );
    }

}


class QuestionBoard extends React.Component {

    render() {
        var objects = [];
        var fade = false;
        if (this.props.answerVector) {
            fade = true;
            objects.push(this.props.answerVector);
        }
        if (this.props.answerText) {
            objects.push(this.props.answerText);
        }
        var disabled = !([GameState.GAME_OVER, GameState.WON].indexOf(this.props.state) > -1);
        return (
            <div className="text-center">
                <MediaQuery minDeviceWidth={736}>
                    <MathJax.Context><h2>{this.props.question}</h2></MathJax.Context>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={736}>
                    <MathJax.Context><h4>{this.props.question}</h4></MathJax.Context>
                </MediaQuery>
                <VectorCanvas
                    allowNull={true}
                    onComplete={this.props.arrowComplete}
                    clear={this.props.clear}
                    objects={objects}
                    allowInput={disabled}
                    fade={fade}
                />
            </div>
        );
    }

}


class VectorGameBoard extends React.Component {

    constructor() {
        super();
        this.levelColorMap = {
            1: '#E6E6E6',
            2: '#fee',
            3: '#eef',
            4: '#ffa',
        }
    }

    render() {
        var style = {backgroundColor: this.levelColorMap[this.props.level]};
        switch (this.props.state) {
            case GameState.NEW:
                return (
                    <div className="container game-sheet" style={style}>
                        <div className="col-md-4" />
                        <div className="col-md-4 text-center">
                            <span><h1>Vector Game</h1></span>
                            <p><span>Draw the vector! Beat a score of 1600 to graduate to the next lesson. Wrong answers end the game.</span></p>
                            <button onClick={this.props.start}>Start</button>
                        </div>
                    </div>
                );
            case GameState.PAUSED:
                return (
                    <div className="container game-sheet" style={style}>
                        <Prompt when={this.props.state == GameState.QUESTiON} message="Changes you made may not be saved." />
                        <ScoreBoard
                            state={this.props.state}
                            score={this.props.score}
                            level={this.props.level}
                            timesUp={this.props.timesUp}
                            pause={this.props.pause}
                            restart={this.props.restart}
                        />
                        <div className="col-md-4" />
                        <div className="col-md-4 text-center">
                            <span><h1>Vector Game</h1></span>
                            <span><h1>PAUSED</h1></span>
                        </div>
                    </div>
                );
        }
        return (
            <div className="container game-sheet" style={style}>
                <Prompt when={this.props.state == GameState.QUESTiON} message="Changes you made may not be saved." />
                <ScoreBoard
                    state={this.props.state}
                    score={this.props.score}
                    level={this.props.level}
                    timesUp={this.props.timesUp}
                    pause={this.props.pause}
                    restart={this.props.restart}
                />
                <QuestionBoard
                    question={this.props.question}
                    arrowComplete={this.props.arrowComplete}
                    clear={[GameState.NEW, GameState.QUESTION].indexOf(this.props.state) >= 0}
                    state={this.props.state}
                    answerVector={this.props.answerVector}
                    answerText={this.props.answerText}
                />
            </div>
        );
    }

}


const GameState = {
    NEW: 'NEW',
    QUESTION: 'QUESTION',
    PAUSED: 'PAUSED',
    GAME_OVER: 'GAME OVER',
    WON: 'WON',
}


const xHat = <MathJax.Node inline>{'\\hat{x}'}</MathJax.Node>;
const yHat = <MathJax.Node inline>{'\\hat{y}'}</MathJax.Node>;
const iHat = <MathJax.Node inline>{'\\hat{i}'}</MathJax.Node>;
const jHat = <MathJax.Node inline>{'\\hat{j}'}</MathJax.Node>;
const vectorA = <MathJax.Node inline>{'\\vec{A}'}</MathJax.Node>;
const vectorB = <MathJax.Node inline>{'\\vec{B}'}</MathJax.Node>;


export class VectorGame extends React.Component {

    constructor() {
        super();
        this.state = {
            state: GameState.NEW,
            pausedOnState: null,
            score: 0,
            level: 1,
            question: null,
            x: null,
            y: null,
            answerVector: null,
            paused: true,
        };
    }

    componentWillUnmount() {
        window.onbeforeunload = null;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    timesUp(obj) {
        this.gameOver();
    }

    pauseToggle() {
        if ([GameState.PAUSED, GameState.QUESTION].indexOf(this.state.state) > -1) {
            if (this.state.state !== GameState.PAUSED) {
                pauseBackgroundAudio();
                this.setState({state: GameState.PAUSED, pausedOnState: this.state.state});
            } else {
                unpauseBackgroundAudio();
                this.setState({state: this.state.pausedOnState, pausedOnState: null});
            }
        }
    }

    checkAnswer(arrow) {
        if (this.state.x == (arrow.getXComponent() || 0) &&
            this.state.y == (arrow.getYComponent() || 0)) {
            playAudio('correct');
            var newScore = this.state.score + 100;
            var newLevel = Math.floor(newScore / 400) + 1;
            if (newLevel > 4) {
                var newState = GameState.WON;
                stopBackgroundAudio();
                this.props.gameWon();
                newLevel = 4;
                window.onbeforeunload = null;
                this.setState({score: newScore, level: newLevel, state: newState});
            } else {
                this.setState(this.generateQuestion(newScore, newLevel));
            }
        } else {
            playAudio('incorrect');
            var pointer = {
                x: VectorCanvas.calcVectorXStart(this.state.x),
                y: VectorCanvas.calcVectorYStart(this.state.y),
            }
            var endPointer = {
                x: pointer['x'] + VectorCanvas.calcCanvasMagnitude(this.state.x),
                y: pointer['y'] - VectorCanvas.calcCanvasMagnitude(this.state.y),
            }
            var vector = new CanvasVector(null, pointer, 'green');
            vector.complete(endPointer);
            var textPoint = {
                left: endPointer.x - VectorCanvas.calcCanvasMagnitude(.65) + this.state.x,
                top: endPointer.y - this.state.y - VectorCanvas.calcCanvasMagnitude(1),
            }
            var text = new CanvasText(null, textPoint, "correct\nsolution")
            this.gameOver(vector, text);
        }
    }

    generateQuestion(newScore, newLevel) {
        var question;
        var x = 0, y = 0;
        newScore = newScore || this.state.score;
        newLevel = newLevel || this.state.level;
        do {
            x = y = 0;
            switch(newLevel) {
                case 1:
                    var char = [xHat, yHat, iHat, jHat][this.getRandomInt(0, 3)];
                    var sign = ['', '-'][this.getRandomInt(0, 1)];
                    if ([xHat, iHat].indexOf(char) >= 0) {
                        x = (sign == '') ? 1 : -1;
                    } else {
                        y = (sign == '') ? 1 : -1;
                    }
                    question = <span>{"Draw " + sign}{char}</span>;
                    break;
                case 2:
                    var char = [xHat, yHat, iHat, jHat][this.getRandomInt(0, 3)];
                    if ([xHat, iHat].indexOf(char) >= 0) {
                        x = this.getRandomInt(-4, 4);
                        question = <span>{"Draw " + x}{char}</span>;
                    } else {
                        y = this.getRandomInt(-4, 4);
                        question = <span>{"Draw " + y}{char}</span>;
                    }
                    break;
                case 3:
                    var chars = [[xHat, yHat], [iHat, jHat]][this.getRandomInt(0, 1)];
                    x = this.getRandomInt(-4, 4);
                    y = this.getRandomInt(-4, 4);
                    question = <span>{"Draw " + x}{chars[0]}{' + ' + y}{chars[1]}</span>;
                    break;
                case 4:
                    var chars = [[xHat, yHat], [iHat, jHat]][this.getRandomInt(0, 1)];
                    var sign = [' + ', ' - '][this.getRandomInt(0, 1)];
                    var x1 = this.getRandomInt(-2, 2);
                    var y1 = this.getRandomInt(-2, 2);
                    var x2 = this.getRandomInt(-2, 2);
                    var y2 = this.getRandomInt(-2, 2);
                    x = (sign == ' + ') ? x1 + x2 : x1 - x2;
                    y = (sign == ' + ') ? y1 + y2 : y1 - y2;
                    var draw = <span>{"Draw "}{vectorA}{sign}{vectorB}</span>;
                    var vA = <span>{vectorA}{" = " + x1}{chars[0]}{" + " + y1}{chars[1]}</span>;
                    var vB = <span>{vectorB}{" = " + x2}{chars[0]}{" + " + y2}{chars[1]}</span>;

                    question = <div>{draw}<br/>{vA}<br/>{vB}</div>;
                    break;
                default:
                    var char = ['x', 'y', 'i', 'j'][this.getRandomInt(0, 3)]
                    if (['x', 'i'].indexOf(char) >= 0) {
                        x = this.getRandomInt(-4, 4);
                        question = "Draw " + x + char;
                    } else {
                        y = this.getRandomInt(-4, 4);
                        question = "Draw " + y + char;
                    }
                    break;
            }
        // Let's make sure we don't get the same question twice in a row.
        } while (this.state.x === x && this.state.y === y);
        this.lastQuestion = question;
        return {
            score: newScore,
            level: newLevel,
            question: question,
            x: x,
            y: y,
            state: GameState.QUESTION,
        };
    }

    gameOver(vector, text) {
        this.setState({state: GameState.GAME_OVER, answerVector: vector, answerText: text});
        stopBackgroundAudio();
        window.onbeforeunload = null;
    }

    restart() {
        var state = Object.assign(
            this.generateQuestion(),
            {
                score: 0,
                level: 1,
                answerVector: null,
                answerText: null,
                state: GameState.NEW
            },
        );
        this.setState(state);
    }

    start() {
        window.onbeforeunload = function() {
            return 'Changes you made may not be saved.';
        };
        playBackgroundAudio('rainbow');
        this.setState(this.generateQuestion());
    }

    render() {
        return (
            <VectorGameBoard
                state={this.state.state}
                start={this.start.bind(this)}
                score={this.state.score}
                level={this.state.level}
                question={this.state.question}
                answerVector={this.state.answerVector}
                answerText={this.state.answerText}
                timesUp={this.timesUp.bind(this)}
                pause={this.pauseToggle.bind(this)}
                arrowComplete={this.checkAnswer.bind(this)}
                restart={this.restart.bind(this)}
            />
        );
    }
}
