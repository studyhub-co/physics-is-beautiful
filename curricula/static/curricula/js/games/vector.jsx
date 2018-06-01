import React from 'react'
import MathJax from 'react-mathjax'
import MediaQuery from 'react-responsive'
import {Prompt} from 'react-router-dom'
import {VectorCanvas, CanvasVector, CanvasText} from 'vector_canvas'
import {ScoreBoard} from './score_board'
import {GameState} from '../constants'

import axios from 'axios'

axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'

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
            1: '#ffffff',
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
                            <span><h1 className="game-title">Vector Game</h1></span>
                            <p><span>Beat a score of 1600 to unlock the next lesson. Wrong answers end the game.</span></p>
                            <button className="hover-button" onClick={this.props.start}>Start</button>
                        </div>
                    </div>
                );
            case GameState.PAUSED:
                return (
                    <div className="container game-sheet" style={style}>
                        <Prompt when={this.props.state == GameState.QUESTION} message="Changes you made may not be saved." />
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
                <Prompt when={this.props.state == GameState.QUESTION} message="Changes you made may not be saved." />
                <ScoreBoard
                    state={this.props.state}
                    score={this.props.score}
                    level={this.props.level}
                    timesUp={this.props.timesUp}
                    pause={this.props.pause}
                    restart={this.props.restart}
                />
              { this.props.state !== GameState.WON ?
                <QuestionBoard
                    question={this.props.question}
                    arrowComplete={this.props.arrowComplete}
                    clear={[GameState.NEW, GameState.QUESTION].indexOf(this.props.state) >= 0}
                    state={this.props.state}
                    answerVector={this.props.answerVector}
                    answerText={this.props.answerText}
                />
                 : <div className='text-center'>
                    <h4>High Score List</h4>
                    <table style={{marginLeft: 'auto', marginRight: 'auto'}}>
                      <tbody>
                        <tr>
                          <th style={{'padding': 5}} />
                          <th style={{'padding': 5}}>Name</th>
                          <th style={{'padding': 5}}>Completion Time</th>
                        </tr>
                        {this.props.scoreList ? this.props.scoreList.map(function (score, i) {
                          return <tr key={i}>
                            <td style={{'padding': 5}}>{score.row_num}</td>
                            <td style={{'padding': 5}}>{score.profile ? score.profile: 'Anonymous'}</td>
                            <td style={{'padding': 5}}>{score.duration}</td>
                          </tr>
                        }) : null}
                      </tbody>
                    </table>
                  </div>
              }
            </div>
        );
    }

}


const xHat = <MathJax.Node inline>{'\\hat{x}'}</MathJax.Node>;
const yHat = <MathJax.Node inline>{'\\hat{y}'}</MathJax.Node>;
const iHat = <MathJax.Node inline>{'\\hat{i}'}</MathJax.Node>;
const jHat = <MathJax.Node inline>{'\\hat{j}'}</MathJax.Node>;
const vectorA = <MathJax.Node inline>{'\\vec{A}'}</MathJax.Node>;
const vectorB = <MathJax.Node inline>{'\\vec{B}'}</MathJax.Node>;


export class VectorGame extends React.Component {

    constructor() {
        super()
        this.elapsed = 0
        this.timer = null
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
        clearInterval(this.timer)
    }

    // due https://github.com/pughpugh/react-countdown-clock/issues/28 create own timer
    tick () {
      if (this.state.state !== GameState.PAUSED) {
        this.elapsed = this.elapsed + 10
      }
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
                clearInterval(this.timer)
                // this.props.gameWon();
                axios.post('/api/v1/curricula/games/vector-game/success', {
                  duration: this.elapsed,
                  score: newScore
                }).then(function (response) {
                  newLevel = 4;
                  window.onbeforeunload = null;
                  this.setState({
                    scoreList: response.data,
                    level: newLevel,
                    state: newState
                  })
                }.bind(this))
                // newLevel = 4;
                // window.onbeforeunload = null;
                // this.setState({score: newScore, level: newLevel, state: newState});
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
            var text = new CanvasText(null, textPoint, "correct\nsolution");
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
        clearInterval(this.timer)
        window.onbeforeunload = null;
    }

    restart() {
      clearInterval(this.timer)
      this.timer = setInterval(this.tick.bind(this), 10)

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
        playBackgroundAudio('rainbow',0.2);
        this.setState(this.generateQuestion());
        this.timer = setInterval(this.tick.bind(this), 10)
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
                scoreList={this.state.scoreList}
            />
        );
    }
}



