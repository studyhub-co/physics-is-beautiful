import React from 'react';
import MathJax from 'react-mathjax';
import {Link, Prompt} from 'react-router-dom';
import ReactCountdownClock from 'react-countdown-clock';
import {VectorCanvas} from './vector_canvas';


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
            console.log('RESET');
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
                        <h1>Score: {this.props.score}</h1>
                        <h1>You Won!</h1>
                        <button><Link to={'/'}>Continue</Link></button>
                    </div>
                )
                break;
            default:
                paused = false;
                score = (
                    <div className="col-md-4 text-center">
                        <h1>Score: {this.props.score}</h1>
                        <h1>Level: {this.props.level}</h1>
                    </div>
                );
        }
        return (
            <div className="row text-center">
                <div className="col-md-4 text-center" style={{height: 100}} >
                    <ReactCountdownClock
                        key={this.state.clockKey}
                        seconds={60}
                        color="#777777"
                        alpha={0.9}
                        size={100}
                        weight={10}
                        paused={paused}
                        onComplete={this.props.timesUp}
                    />
                </div>
                {score}
             </div>
        );
    }

}


class QuestionBoard extends React.Component {

    render() {
        return (
            <div className="text-center">
                <MathJax.Context><h1>{this.props.question}</h1></MathJax.Context>
                <VectorCanvas
                    allowNull={true}
                    onComplete={this.props.arrowComplete}
                    clear={this.props.clear}
                    allowInput={this.props.state != GameState.GAME_OVER}
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
        return (
            <div className="container game-sheet" style={style}>
                <Prompt when={this.props.state == GameState.QUESTiON} message="Changes you made may not be saved." />
                <ScoreBoard
                    state={this.props.state}
                    score={this.props.score}
                    level={this.props.level}
                    timesUp={this.props.timesUp}
                    restart={this.props.restart}
                />
                <QuestionBoard
                    question={this.props.question}
                    arrowComplete={this.props.arrowComplete}
                    clear={[GameState.NEW, GameState.QUESTION].indexOf(this.props.state) >= 0}
                    state={this.props.state}
                />
            </div>
        );
    }

}


const GameState = {
    NEW: 'NEW',
    QUESTION: 'QUESTION',
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
            score: 0,
            level: 1,
            question: null,
            x: null,
            y: null,
        };
    }

    componentDidMount() {
        this.generateQuestion();
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    timesUp(obj) {
        this.gameOver();
    }

    checkAnswer(arrow) {
        if (this.state.x == (arrow.getXComponent() || 0) &&
            this.state.y == (arrow.getYComponent() || 0)) {
            var newScore = this.state.score + 100;
            var newLevel = Math.floor(newScore / 400) + 1;
            if (newLevel > 4) {
                var newState = GameState.WON;
                newLevel = 4;
                this.setState({score: newScore, level: newLevel, state: newState});
            } else {
                this.generateQuestion(newScore, newLevel);
            }
        } else {
            this.gameOver();
        }
    }

    generateQuestion(newScore, newLevel) {
        var question, x = 0, y = 0;
        newScore = newScore || this.state.score;
        newLevel = newLevel || this.state.level;
        switch(newLevel) {
            case 4:
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
            case 1:
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
        this.setState({
            score: newScore,
            level: newLevel,
            question: question,
            x: x,
            y: y,
            state: GameState.QUESTION,
        });
    }

    gameOver() {
        this.setState({state: GameState.GAME_OVER});
    }

    restart() {
        this.setState({
            state: GameState.NEW,
            score: 0,
            level: 1,
        });
    }

    render() {
        return (
            <VectorGameBoard
                state={this.state.state}
                score={this.state.score}
                level={this.state.level}
                question={this.state.question}
                timesUp={this.timesUp.bind(this)}
                arrowComplete={this.checkAnswer.bind(this)}
                restart={this.restart.bind(this)}
            />
        );
    }
}
