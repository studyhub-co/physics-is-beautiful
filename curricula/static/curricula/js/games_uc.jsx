/**
 * Created by LennyLip on 01.11.17.
 */

import React from 'react'
import MathJax from 'react-mathjax'
import MediaQuery from 'react-responsive'
import {Prompt} from 'react-router-dom'
import {ScoreBoard} from './games'

const GameState = {// seem it can changed from games/GameState
  NEW: 'NEW',
  QUESTION: 'QUESTION',
  PAUSED: 'PAUSED',
  GAME_OVER: 'GAME OVER',
  WON: 'WON'
}

// var DEFAULT_MATHJAX_OPTIONS = {
//     extensions: ["tex2jax.js"],
//     jax: ["input/TeX", "output/HTML-CSS"],
//     tex2jax: {
//         inlineMath: [ ['$','$'], ["\\(","\\)"] ],
//         displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
//         processEscapes: true
//     },
//     "HTML-CSS": { availableFonts: ["TeX"] }
// };

class MathquillBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {data: ''}
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount () {
    var MQ = MathQuill.getInterface(2)

    // this.answer = MQ.MathField($('#' + this.props.mathFieldID)[0], { // we must to avoid using jQuery
    this.answer = MQ.MathField(document.getElementById('' + this.props.mathFieldID), {
      handlers: {
        spaceBehavesLikeTab: true,
        edit: () => {
          this.state.data = this.answer.latex()
          this.handleChange(this.state.data, this.props.mathFieldID, this.answer)
        }
      }
    })
  }
  handleChange (data, mathFieldID, mathquillObj) {
    this.props.onMathQuillChange(data, mathFieldID, mathquillObj)
  }
  render () {
    var mathFieldStyle = {
      width: 100,
      fontSize: 30
    }
    return (
      <div>
        <p style={{marginBottom: 5}}>
          <span id={this.props.mathFieldID} style={mathFieldStyle} />
        </p>
      </div>
    )
  }
}

MathquillBox.propTypes = {
  mathFieldID: React.PropTypes.number,
  onMathQuillChange: React.PropTypes.func
}

class ConversionTable extends React.Component {
  constructor (props) {
    super(props)
    this.onMathQuillChange = this.onMathQuillChange.bind(this)
  }
  onMathQuillChange (data, mathFieldID, mathquillObj) {
    this.props.onMathQuillChange(data, mathFieldID, mathquillObj)
  }
  render () {
    var style = {
      marginLeft: 'auto',
      marginRight: 'auto',
      borderCollapse: 'collapse',
      borderStyle: 'hidden',
      display: 'table-cell',
      verticalAlign: 'middle'
    }
    var unitStyle = {
      fontStyle: 'italic',
      fontFamily: 'Times New Roman',
      textDecoration: (this.props.strikethrough ? 'line-through' : 'none')
    }
    var topLeft = {'border': '1px solid black', borderTop: 'none', borderLeft: 'none', 'padding': 2, fontFamily: 'symbola', fontSize: 30}
    var topMiddle = {'border': '1px solid black', borderTop: 'none', 'padding': 2}
    var topRight = {'border': '1px solid black', borderTop: 'none', borderRight: 'none', 'padding': 2}
    var bottomLeft = {'border': '1px solid black', borderBottom: 'none', borderLeft: 'none', 'padding': 2}
    var bottomMiddle = {'border': '1px solid black', borderBottom: 'none', 'padding': 2}
    var bottomRight = {'border': '1px solid black', borderBottom: 'none', borderRight: 'none', 'padding': 2}

    switch (this.props.numColumns) {
      case 1:
        return (
          <div>
            <table style={style}>
              <tbody>
                <tr>
                  <td style={topLeft}>{this.props.number} <span style={unitStyle}>{this.props.unit}</span></td>
                  <td style={topRight}>
                    <MathquillBox
                      mathFieldID={11}
                      onMathQuillChange={this.onMathQuillChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={bottomLeft} />
                  <td style={bottomRight}>
                    <MathquillBox
                      mathFieldID={21}
                      onMathQuillChange={this.onMathQuillChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      case 2:
        return (
          <div>
            <table style={style}>
              <tbody>
                <tr>
                  <td style={topLeft}>{this.props.number} <span style={unitStyle}>{this.props.unit}</span></td>
                  <td style={topMiddle}>
                    <MathquillBox
                      mathFieldID={11}
                      onMathQuillChange={this.onMathQuillChange}
                    />
                  </td>
                  <td style={topRight}>
                    <MathquillBox
                      mathFieldID={12}
                      onMathQuillChange={this.onMathQuillChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={bottomLeft} />
                  <td style={bottomMiddle}>
                    <MathquillBox
                      mathFieldID={21}
                      onMathQuillChange={this.onMathQuillChange}
                    />
                  </td>
                  <td style={bottomRight}>
                    <MathquillBox
                      mathFieldID={22}
                      onMathQuillChange={this.onMathQuillChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      case 3:
        return (
          <div>
            <table style={style}>
              <tbody>
                <tr>
                  <td style={topLeft}>{this.props.number} <span style={unitStyle}>{this.props.unit}</span></td>
                  <td style={topMiddle}>
                    <MathquillBox
                      mathFieldID={11}
                      onMathQuillChange={this.onMathQuillChange}
                    />
                  </td>
                  <td style={topMiddle}>
                    <MathquillBox
                      mathFieldID={12}
                      onMathQuillChange={this.onMathQuillChange}
                    />
                  </td>
                  <td style={topRight}>
                    <MathquillBox
                      mathFieldID={13}
                      onMathQuillChange={this.onMathQuillChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={bottomLeft} />
                  <td style={bottomMiddle}>
                    <MathquillBox
                      mathFieldID={21}
                      onMathQuillChange={this.onMathQuillChange}
                    />
                  </td>
                  <td style={bottomMiddle}>
                    <MathquillBox
                      mathFieldID={22}
                      onMathQuillChange={this.onMathQuillChange}
                    />
                  </td>
                  <td style={bottomRight}>
                    <MathquillBox
                      mathFieldID={23}
                      onMathQuillChange={this.onMathQuillChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )
    }
  }
}

ConversionTable.propTypes = {
  onMathQuillChange: React.PropTypes.func,
  strikethrough: React.PropTypes.bool,
  numColumns: React.PropTypes.number,
  number: React.PropTypes.any,
  unit: React.PropTypes.string
}

class UnitConversionCanvas extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      numColumns: 1,
      number: this.props.number,
      unit: this.props.unit,
      strikethrough: false,
      mathquillBox11: '',
      mathquillBox12: '',
      mathquillBox13: '',
      mathquillBox21: '',
      mathquillBox22: '',
      mathquillBox23: '',
      mathquillBox4: '',
      counter: 0
    }
    this.addColumn = this.addColumn.bind(this)
    this.removeColumn = this.removeColumn.bind(this)
    this.submit = this.submit.bind(this)
    this.onMathQuillChange = this.onMathQuillChange.bind(this)
  }
  addColumn (type) {
    this.setState({
      numColumns: this.state.numColumns + 1
    })
  }
  removeColumn () {
    this.setState({
      numColumns: this.state.numColumns - 1,
      ['mathquillBox1' + this.state.numColumns]: '',
      ['mathquillBox2' + this.state.numColumns]: ''
    })
  }
  onMathQuillChange (data, mathFieldID, mathquillObj) {
    var currentBox = 'mathquillBox' + mathFieldID
    var unitLength = this.state.unit.length
    this.setState({[currentBox]: data})
    if (data.includes(this.state.unit)) {
      if (this.state.counter === 0) {
        this.setState({counter: 1})
        mathquillObj.keystroke('Backspace '.repeat(unitLength))
        mathquillObj.write('\\class{strikethrough}{' + this.state.unit + '}')
      }
      this.setState({strikethrough: true})
    } else {
      this.setState({strikethrough: false})
    }
  }
  submit (answerJSON) {
    $.ajax({ // TODO avoid using jQuery
      type: 'POST',
      url: '/curriculum/convertmath/',
      // dataType: 'json',
      // contentType: "application/json; charset=utf-8",
      data: answerJSON,
      // async: false,
      context: this,
      success: function (data, status, jqXHR) {
        console.log(data)
      }
    })
  }
  render () {
    // var disabled = '';
    var buttonStyle = {
      padding: 2,
      display: 'block',
      margin: 'auto',
      marginTop: 1,
      marginBottom: 1
    }
    var disabledButtonStyle = {
      padding: 2,
      display: 'block',
      margin: 'auto',
      marginTop: 1,
      marginBottom: 1,
      cursor: 'not-allowed',
      pointerEvents: 'none',
      color: '#c0c0c0',
      border: '.2rem solid #c0c0c0',
      backgroundColor: '#ffffff'
    }
    return (
      <div>
        <div style={{display: 'block'}}>
          <div style={{display: 'table', marginLeft: 'auto', marginRight: 'auto'}}>
            <ConversionTable
              numColumns={this.state.numColumns}
              onMathQuillChange={this.onMathQuillChange}
              number={this.props.number}
              unit={this.props.unit}
              strikethrough={this.state.strikethrough}
            />
            <div style={{fontSize: 10, display: 'table-cell', verticalAlign: 'middle', paddingLeft: 0, paddingRight: 0}}>
              <button
                className='hover-button'
                style={this.state.numColumns === 3 ? disabledButtonStyle : buttonStyle}
                onClick={this.addColumn}>+Add Step</button>
              <button
                className='hover-button'
                style={this.state.numColumns === 1 ? disabledButtonStyle : buttonStyle} onClick={this.removeColumn}
                disabled={this.state.numColumns === 1}>
                -Remove Step
              </button>
            </div>
            <div style={{fontSize: 30, display: 'table-cell', verticalAlign: 'middle', paddingLeft: 15, paddingRight: 15}}>
                =
            </div>
            <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
              <MathquillBox
                mathFieldID={4}
                onMathQuillChange={this.onMathQuillChange}
              />
            </div>
          </div>
        </div>
        <div style={{display: 'block'}}>
          <button className='hover-button' style={{marginTop: 15}} onClick={() => this.submit(this.state)}>Submit</button>
        </div>
      </div>
    )
  }
}

UnitConversionCanvas.propTypes = {
  number: React.PropTypes.any,
  unit: React.PropTypes.string
}

class UnitConversionQuestionBoard extends React.Component {
  render () {
    var objects = []
    // var fade = false
    if (this.props.answerVector) {
      // fade = true
      objects.push(this.props.answerVector)
    }
    if (this.props.answerText) {
      objects.push(this.props.answerText)
    }
    // var disabled = !([GameState.GAME_OVER, GameState.WON].indexOf(this.props.state) > -1);
    return (
      <div className='text-center'>
        <MediaQuery minDeviceWidth={736}>
          <MathJax.Context><h2>{this.props.question}</h2></MathJax.Context>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={736}>
          <MathJax.Context><h4>{this.props.question}</h4></MathJax.Context>
        </MediaQuery>
        <UnitConversionCanvas
          number={this.props.number}
          unit={this.props.unit}
        />
      </div>
    )
  }
}

UnitConversionQuestionBoard.propTypes = {
  question: React.PropTypes.any,
  number: React.PropTypes.any,
  unit: React.PropTypes.string,
  answerText: React.PropTypes.string,
  answerVector: React.PropTypes.string
}

class UnitConversionGameBoard extends React.Component {
  constructor () {
    super()
    this.levelColorMap = {
      1: '#ffffff',
      2: '#fee',
      3: '#eef',
      4: '#ffa'
    }
  }

  render () {
    var style = {backgroundColor: this.levelColorMap[this.props.level]}
    switch (this.props.state) {
      case GameState.NEW:
        return (
          <div className='container game-sheet' style={style}>
            <div className='col-md-4' />
            <div className='col-md-4 text-center'>
              <span><h1 className='game-title'>Unit Conversion Game</h1></span>
              <p><span>Beat a score of 1600 to unlock the next lesson. Wrong answers end the game.</span></p>
              <button className='hover-button' onClick={this.props.start}>Start</button>
            </div>
          </div>
        )
      case GameState.PAUSED:
        return (
          <div className='container game-sheet' style={style}>
            <Prompt when={this.props.state === GameState.QUESTION} message='Changes you made may not be saved.' />
            <ScoreBoard
              state={this.props.state}
              score={this.props.score}
              level={this.props.level}
              timesUp={this.props.timesUp}
              pause={this.props.pause}
              restart={this.props.restart}
            />
            <div className='col-md-4' />
            <div className='col-md-4 text-center'>
              <span><h1>Unit Conversion Game</h1></span>
              <span><h1>PAUSED</h1></span>
            </div>
          </div>
        )
    }

    return (
      <div className='container game-sheet' style={style}>
        <Prompt when={this.props.state === GameState.QUESTION} message='Changes you made may not be saved.' />
        <ScoreBoard
          state={this.props.state}
          score={this.props.score}
          level={this.props.level}
          timesUp={this.props.timesUp}
          pause={this.props.pause}
          restart={this.props.restart}
        />
        <UnitConversionQuestionBoard
          number={this.props.number}
          unit={this.props.unit}
          question={this.props.question}
          arrowComplete={this.props.arrowComplete}
          clear={[GameState.NEW, GameState.QUESTION].indexOf(this.props.state) >= 0}
          state={this.props.state}
          answerVector={this.props.answerVector}
          answerText={this.props.answerText}
        />
      </div>
    )
  }
}

UnitConversionGameBoard.propTypes = {
  number: React.PropTypes.any,
  unit: React.PropTypes.string,
  level: React.PropTypes.number,
  state: React.PropTypes.string,
  start: React.PropTypes.func,
  score: React.PropTypes.number,
  timesUp: React.PropTypes.func,
  pause: React.PropTypes.func,
  restart: React.PropTypes.func,
  answerText: React.PropTypes.string,
  answerVector: React.PropTypes.string,
  arrowComplete: React.PropTypes.func,
  question: React.PropTypes.any
}

export class UnitConversionGame extends React.Component {
  constructor () {
    super()
    this.state = {
      state: GameState.NEW,
      pausedOnState: null,
      score: 0,
      level: 1,
      question: null,
      unit: null,
      number: null,
      answer: null,
      paused: true
    }
  }

  componentWillUnmount () {
    window.onbeforeunload = null
  }

  getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  getRandomNumber () {
    var random = (Math.floor(Math.random() * 9) + 1) * Math.pow(10, (Math.random() <= 0.5 ? -Math.floor(Math.random() * 4) : Math.floor(Math.random() * 4)))
    return (random.toString().length > 3 ? random.toPrecision(3) : random)
  }

  timesUp (obj) {
    this.gameOver()
  }

  pauseToggle () {
    if ([GameState.PAUSED, GameState.QUESTION].indexOf(this.state.state) > -1) {
      if (this.state.state !== GameState.PAUSED) {
        pauseBackgroundAudio()
        this.setState({state: GameState.PAUSED, pausedOnState: this.state.state})
      } else {
        unpauseBackgroundAudio()
        this.setState({state: this.state.pausedOnState, pausedOnState: null})
      }
    }
  }

  checkAnswer (arrow) {
    // if (this.state.x == (arrow.getXComponent() || 0) &&
    //     this.state.y == (arrow.getYComponent() || 0)) {
    //     playAudio('correct');
    //     var newScore = this.state.score + 100;
    //     var newLevel = Math.floor(newScore / 400) + 1;
    //     if (newLevel > 4) {
    //         var newState = GameState.WON;
    //         stopBackgroundAudio();
    //         this.props.gameWon();
    //         newLevel = 4;
    //         window.onbeforeunload = null;
    //         this.setState({score: newScore, level: newLevel, state: newState});
    //     } else {
    //         this.setState(this.generateQuestion(newScore, newLevel));
    //     }
    // } else {
    //     playAudio('incorrect');
    //     var pointer = {
    //         x: VectorCanvas.calcVectorXStart(this.state.x),
    //         y: VectorCanvas.calcVectorYStart(this.state.y),
    //     }
    //     var endPointer = {
    //         x: pointer['x'] + VectorCanvas.calcCanvasMagnitude(this.state.x),
    //         y: pointer['y'] - VectorCanvas.calcCanvasMagnitude(this.state.y),
    //     }
    //     var vector = new CanvasVector(null, pointer, 'green');
    //     vector.complete(endPointer);
    //     var textPoint = {
    //         left: endPointer.x - VectorCanvas.calcCanvasMagnitude(.65) + this.state.x,
    //         top: endPointer.y - this.state.y - VectorCanvas.calcCanvasMagnitude(1),
    //     }
    //     var text = new CanvasText(null, textPoint, "correct\nsolution");
    //     this.gameOver(vector, text);
    // }
  }

  generateQuestion (newScore, newLevel) {
    var question
    var number = 0
    var unit = ''
    newScore = newScore || this.state.score
    newLevel = newLevel || this.state.level
    do {
      switch (newLevel) {
        case 1:
          number = this.getRandomNumber()
          unit = ['cm', 'weeks', 'oz', 'km/hr'][this.getRandomInt(0, 3)]
          question = <span>{'Convert ' + number.toString() + ' ' + unit + ' to SI units.'}</span>
          break
        case 2:
          // var char = [xHat, yHat, iHat, jHat][this.getRandomInt(0, 3)];
          // if ([xHat, iHat].indexOf(char) >= 0) {
          //     x = this.getRandomInt(-4, 4);
          //     question = <span>{"Draw " + x}{char}</span>;
          // } else {
          //     y = this.getRandomInt(-4, 4);
          //     question = <span>{"Draw " + y}{char}</span>;
          // }
          break
        case 3:
          // var chars = [[xHat, yHat], [iHat, jHat]][this.getRandomInt(0, 1)];
          // x = this.getRandomInt(-4, 4);
          // y = this.getRandomInt(-4, 4);
          // question = <span>{"Draw " + x}{chars[0]}{' + ' + y}{chars[1]}</span>;
          break
        case 4:
          // var chars = [[xHat, yHat], [iHat, jHat]][this.getRandomInt(0, 1)];
          // var sign = [' + ', ' - '][this.getRandomInt(0, 1)];
          // var x1 = this.getRandomInt(-2, 2);
          // var y1 = this.getRandomInt(-2, 2);
          // var x2 = this.getRandomInt(-2, 2);
          // var y2 = this.getRandomInt(-2, 2);
          // x = (sign == ' + ') ? x1 + x2 : x1 - x2;
          // y = (sign == ' + ') ? y1 + y2 : y1 - y2;
          // var draw = <span>{"Draw "}{vectorA}{sign}{vectorB}</span>;
          // var vA = <span>{vectorA}{" = " + x1}{chars[0]}{" + " + y1}{chars[1]}</span>;
          // var vB = <span>{vectorB}{" = " + x2}{chars[0]}{" + " + y2}{chars[1]}</span>;
          //
          // question = <div>{draw}<br/>{vA}<br/>{vB}</div>;
          break
        default:
          // var char = ['x', 'y', 'i', 'j'][this.getRandomInt(0, 3)]
          // if (['x', 'i'].indexOf(char) >= 0) {
          //     x = this.getRandomInt(-4, 4);
          //     question = "Draw " + x + char;
          // } else {
          //     y = this.getRandomInt(-4, 4);
          //     question = "Draw " + y + char;
          // }
          break
      }
      // Let's make sure we don't get the same question twice in a row.
    } while (this.state.unit === unit && this.state.number === number)
    this.lastQuestion = question
    return {
      score: newScore,
      level: newLevel,
      question: question,
      number: number,
      unit: unit,
      state: GameState.QUESTION
    }
  }

  gameOver (vector, text) {
    this.setState({state: GameState.GAME_OVER, answerVector: vector, answerText: text})
    stopBackgroundAudio()
    window.onbeforeunload = null
  }

  restart () {
    var state = Object.assign(
      this.generateQuestion(),
      {
        score: 0,
        level: 1,
        answerVector: null,
        answerText: null,
        state: GameState.NEW
      }
    )
    this.setState(state)
  }

  start () {
    window.onbeforeunload = function () {
      return 'Changes you made may not be saved.'
    }
    playBackgroundAudio('rainbow', 0.2)
    this.setState(this.generateQuestion())
  }

  render () {
    return (
      <UnitConversionGameBoard
        state={this.state.state}
        start={this.start.bind(this)}
        score={this.state.score}
        level={this.state.level}
        number={this.state.number}
        unit={this.state.unit}
        question={this.state.question}
        answerVector={this.state.answerVector}
        answerText={this.state.answerText}
        timesUp={this.timesUp.bind(this)}
        pause={this.pauseToggle.bind(this)}
        arrowComplete={this.checkAnswer.bind(this)}
        restart={this.restart.bind(this)}
      />
    )
  }
}