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

const UNITS = {
  DISTANCE: {
    'mm': 'millimeters',
    'cm': 'centimeters',
    'km': 'kilometers',
    'ft': 'foots',
    'mi': 'miles'
  },
  TIME: {
    'ms': 'milliseconds',
    'min': 'minutes',
    'hr': 'hours',
    'd': 'days',
    'wk': 'weeks'
  },
  MASS: {
    'mg': 'milligrams',
    'g': 'grams',
    'oz': 'ounces'
  },
  SPEED: {
    'km/s': 'kilometers/second',
    'mi/s': 'miles/second',
    'ft/s': 'ounces/second',
    'km/hr': 'kilometers/hour',
    'mi/hr': 'miles/hour',
    'm/hr': 'meters/second',
    'ft/hr': 'foots/hour',
    'm/min': 'meters/minute',
    'ft/min': 'foots/hour'
  }
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

    this.answer = MQ.MathField(document.getElementById('' + this.props.row + this.props.column), {
      handlers: {
        spaceBehavesLikeTab: true,
        edit: () => {
          // if change by API (not user), then not fire
          if (this.answer.fromJsCall) {return;}

          this.state.data = this.answer.latex()
          this.handleChange(this.state.data, this.props.row, this.props.column, this.answer)
        }
      }
    })
  }
  handleChange (data, row, col, mathquillObj) {
    this.props.onMathQuillChange(data, row, col, mathquillObj)
  }
  render () {
    var mathFieldStyle = {
      width: 100,
      fontSize: 30
    }
    return (
      <div>
        <p style={{marginBottom: 5}}>
          {/* <span id={this.props.mathFieldID} style={mathFieldStyle} /> */}
          <span id={'' + this.props.row + this.props.column} style={mathFieldStyle} />
        </p>
      </div>
    )
  }
}
MathquillBox.propTypes = {
  onMathQuillChange: React.PropTypes.func,
  row: React.PropTypes.number.isRequired,
  column: React.PropTypes.number.isRequired
}

class ConversionTable extends React.Component {

  constructor (props) {
    super(props)
    this.onMathQuillChange = this.onMathQuillChange.bind(this)
  }

  onMathQuillChange (data, row, col, mathquillObj) {
    this.props.onMathQuillChange(data, row, col, mathquillObj)
  }

  getColumns (row) {
    var border = {'border': '1px solid black', 'padding': 2}
    var noTop = {borderTop: 'none'}
    var noBottom = {borderBottom: 'none'}
    var noRight = {borderRight: 'none'}

    var tdColumns = []
    for (var i = 0; i < this.props.numColumns; i++) {
      var styles = border
      if (row === 1) { styles = Object.assign(styles, noTop) }
      if (row === 2) { styles = Object.assign(styles, noBottom) }
      if (i === (this.props.numColumns - 1)) { styles = Object.assign(styles, noRight) }
      tdColumns.push(
        <td style={styles} key={i}>
          <MathquillBox
            row={row}
            column={i + 1}
            onMathQuillChange={this.onMathQuillChange}
          />
        </td>)
    }
    return tdColumns
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
    var bottomLeft = {'border': '1px solid black', borderBottom: 'none', borderLeft: 'none', 'padding': 2}

    return (
      <div>
        <table style={style}>
          <tbody>
            <tr>
              <td style={topLeft}>{this.props.number} <span style={unitStyle}>{this.props.unit}</span></td>
              {this.getColumns(1)}
            </tr>
            <tr>
              <td style={bottomLeft} />
              {this.getColumns(2)}
            </tr>
          </tbody>
        </table>
      </div>
    )
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
      answersSteps: [[{'data': '', 'box': null}, {'data': '', 'box': null}]], // first column set by default
      counter: 0
      // mathquillBox11: '',
      // mathquillBox12: '',
      // mathquillBox13: '',
      // mathquillBox21: '',
      // mathquillBox22: '',
      // mathquillBox23: '',
      // mathquillBox4: '',
    }
    this.addColumn = this.addColumn.bind(this)
    this.removeColumn = this.removeColumn.bind(this)
    this.submit = this.submit.bind(this)
    this.onMathQuillChange = this.onMathQuillChange.bind(this)
  }
  addColumn (type) {
    this.setState({
      numColumns: this.state.numColumns + 1,
      answersSteps: [...this.state.answersSteps, [{'data': '', 'box': null}, {'data': '', 'box': null}]]
    })
  }
  removeColumn () {
    this.setState({
      numColumns: this.state.numColumns - 1,
      answersSteps: this.state.answersSteps.slice(0, -1)
      // ['mathquillBox1' + this.state.numColumns]: '',
      // ['mathquillBox2' + this.state.numColumns]: ''
    })
  }
  // onMathQuillChange (data, mathFieldID, mathquillObj) {
  onMathQuillChange (data, row, col, mathquillObj) {

    // store value in matrix
    var answers = this.state.answersSteps
    answers[col - 1][row - 1] = {'data': data, 'box': mathquillObj}

    var resetStrike = function (answer) {
      var tmpData = answer['data']

      var startI = tmpData.lastIndexOf('\\class{strikethrough}{')
      var endI = tmpData.lastIndexOf('}')

      if (startI < 0 || endI < 0) { return }
      startI += '\\class{strikethrough}{'.length
      var tmpUnit = tmpData.substring(startI, endI)
      var resetTxt = tmpData.replace('\\class{strikethrough}{' + tmpUnit + '}', tmpUnit)

      answer['box'].fromJsCall = true
      answer['data'] = resetTxt
      answer['box'].latex(resetTxt)
      answer['box'].fromJsCall = false
    }

    // reset all strikethrough after update
    for (var column = 0; column < answers.length; column++) { // walk through numerators
      resetStrike(answers[column][0]) // must be before split
      for (var column2 = 0; column2 < answers.length; column2++) { // walk through denominators
        resetStrike(answers[column2][1])
      }
    }
    this.state.strikethrough = false

    // TODO it is really need to check for unit exist in UNITS const
    // strikethrough units Numerator and Denominator
    numeratorsC:
    for (column = -1; column < answers.length; column++) { // walk through numerators
      var splitNumerator

      if (column === -1) {
        splitNumerator = ['', this.state.unit] // main unit
      } else {
        splitNumerator = answers[column][0]['data'].match(/\S+/g)
      } // "2 cm"

      if (splitNumerator && typeof splitNumerator[1] !== 'undefined') {
        for (column2 = 0; column2 < answers.length; column2++) { // walk through denominators
          var splitDenominator = answers[column2][1]['data'].match(/\S+/g)
          if (splitDenominator && typeof splitDenominator[1] !== 'undefined') {
            // cross start unit
            if (splitDenominator[1] === this.state.unit) {
              this.state.strikethrough = true
            }

            // numeratorBoxes boxes
            if (splitNumerator[1] === splitDenominator[1]) { // second one in "1.23 cm"
              // strikethrough Numerator
              if (column === -1) {
                this.state.strikethrough = true
              } else {
                var numeratorBox = answers[column][0]['box']
                var newLatexN = answers[column][0]['data'].replace(splitNumerator[1], '\\class{strikethrough}{' + splitNumerator[1] + '}')
                numeratorBox.fromJsCall = true
                answers[column][0]['data'] = newLatexN
                numeratorBox.latex(newLatexN)
                numeratorBox.fromJsCall = false
              }

              // strikethrough denominator
              var denominatorBox = answers[column2][1]['box']
              var newLatexDN = answers[column2][1]['data'].replace(splitNumerator[1], '\\class{strikethrough}{' + splitNumerator[1] + '}')
              answers[column2][1]['data'] = newLatexDN // to reset available
              denominatorBox.fromJsCall = true
              denominatorBox.latex(newLatexDN)
              denominatorBox.fromJsCall = false

              continue numeratorsC // need for stop search 2nd and more denominator with current unit
            }
          }
        }
      }
    }

    this.setState({
      answersSteps: answers
    })
  }
  submit (answerJSON) {

    // check for

    // $.ajax({ // TODO avoid using jQuery
    //   type: 'POST',
    //   url: '/curriculum/convertmath/',
    //   // dataType: 'json',
    //   // contentType: "application/json; charset=utf-8",
    //   data: answerJSON,
    //   // async: false,
    //   context: this,
    //   success: function (data, status, jqXHR) {
    //     console.log(data)
    //   }
    // })
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
                style={this.state.numColumns === 4 ? disabledButtonStyle : buttonStyle}
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
                row={0}
                column={0}
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
    this.state = {clockSeconds: 600}
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
              <p><span>Beat a score of 2500 to unlock the next lesson. Wrong answers end the game.</span></p>
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
              clockSeconds={this.state.clockSeconds}
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
          clockSeconds={this.state.clockSeconds}
        />
        <UnitConversionQuestionBoard
          number={this.props.number}
          unit={this.props.unit}
          question={this.props.question}
          submitQuestion={this.props.submitQuestion}
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
  submitQuestion: React.PropTypes.func,
  question: React.PropTypes.any
}

export class UnitConversionGame extends React.Component {
  constructor () {
    super()
    this.timesUp = this.timesUp.bind(this)
    this.start = this.start.bind(this)
    this.pauseToggle = this.pauseToggle.bind(this)
    this.checkAnswer = this.checkAnswer.bind(this)
    this.restart = this.restart.bind(this)
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

  // getRandomInt (min, max) {
  //   return Math.floor(Math.random() * (max - min + 1)) + min
  // }

  getRandomFromArray (myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)]
  }

  getRandomNumber () {
    // var random = (Math.floor(Math.random() * 9) + 1) * Math.pow(10, (Math.random() <= 0.5 ? -Math.floor(Math.random() * 4) : Math.floor(Math.random() * 4)))
    // return (random.toString().length > 3 ? random.toPrecision(3) : random)
    var arrayRandoms = [(Math.random() * 10000).toFixed(2), (Math.random()).toFixed(3)]
    var toReturn = this.getRandomFromArray(arrayRandoms) // return random 1-9999 or 0.0000-0.9999
    return Number(toReturn) === 0 ? 1 : toReturn // if number is 0, return 1
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
    var number = this.getRandomNumber()
    var unit, unitLong

    newScore = newScore || this.state.score
    newLevel = newLevel || this.state.level

    if (newLevel === 1) {
      unit = this.getRandomFromArray(Object.keys(UNITS.DISTANCE))
      unitLong = UNITS.DISTANCE[unit]
    } else if (newLevel === 2) {
      unit = this.getRandomFromArray(Object.keys(UNITS.TIME))
      unitLong = UNITS.TIME[unit]
    } else if (newLevel === 3) {
      unit = this.getRandomFromArray(Object.keys(UNITS.MASS))
      unitLong = UNITS.MASS[unit]
    } else if (newLevel === 4) {
      unit = this.getRandomFromArray(Object.keys(UNITS.SPEED))
      unitLong = UNITS.SPEED[unit]
    }

    var question = <span>{'Convert ' + number.toString() + ' ' + unitLong + ' to SI units.'}</span>

    // newScore = newScore || this.state.score
    // newLevel = newLevel || this.state.level
    // do {
    //   switch (newLevel) {
    //     case 1:
    //       number = this.getRandomNumber()
    //       unit = ['cm', 'weeks', 'oz', 'km/hr'][this.getRandomInt(0, 3)]
    //       question = <span>{'Convert ' + number.toString() + ' ' + unit + ' to SI units.'}</span>
    //       break
    //     case 2:
    //       // var char = [xHat, yHat, iHat, jHat][this.getRandomInt(0, 3)];
    //       // if ([xHat, iHat].indexOf(char) >= 0) {
    //       //     x = this.getRandomInt(-4, 4);
    //       //     question = <span>{"Draw " + x}{char}</span>;
    //       // } else {
    //       //     y = this.getRandomInt(-4, 4);
    //       //     question = <span>{"Draw " + y}{char}</span>;
    //       // }
    //       break
    //     case 3:
    //       // var chars = [[xHat, yHat], [iHat, jHat]][this.getRandomInt(0, 1)];
    //       // x = this.getRandomInt(-4, 4);
    //       // y = this.getRandomInt(-4, 4);
    //       // question = <span>{"Draw " + x}{chars[0]}{' + ' + y}{chars[1]}</span>;
    //       break
    //     case 4:
    //       // var chars = [[xHat, yHat], [iHat, jHat]][this.getRandomInt(0, 1)];
    //       // var sign = [' + ', ' - '][this.getRandomInt(0, 1)];
    //       // var x1 = this.getRandomInt(-2, 2);
    //       // var y1 = this.getRandomInt(-2, 2);
    //       // var x2 = this.getRandomInt(-2, 2);
    //       // var y2 = this.getRandomInt(-2, 2);
    //       // x = (sign == ' + ') ? x1 + x2 : x1 - x2;
    //       // y = (sign == ' + ') ? y1 + y2 : y1 - y2;
    //       // var draw = <span>{"Draw "}{vectorA}{sign}{vectorB}</span>;
    //       // var vA = <span>{vectorA}{" = " + x1}{chars[0]}{" + " + y1}{chars[1]}</span>;
    //       // var vB = <span>{vectorB}{" = " + x2}{chars[0]}{" + " + y2}{chars[1]}</span>;
    //       //
    //       // question = <div>{draw}<br/>{vA}<br/>{vB}</div>;
    //       break
    //     default:
    //       // var char = ['x', 'y', 'i', 'j'][this.getRandomInt(0, 3)]
    //       // if (['x', 'i'].indexOf(char) >= 0) {
    //       //     x = this.getRandomInt(-4, 4);
    //       //     question = "Draw " + x + char;
    //       // } else {
    //       //     y = this.getRandomInt(-4, 4);
    //       //     question = "Draw " + y + char;
    //       // }
    //       break
    //   }
    //   // Let's make sure we don't get the same question twice in a row.
    // } while (this.state.unit === unit && this.state.number === number)
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
        start={this.start}
        score={this.state.score}
        level={this.state.level}
        number={this.state.number}
        unit={this.state.unit}
        question={this.state.question}
        answerVector={this.state.answerVector}
        answerText={this.state.answerText}
        timesUp={this.timesUp}
        pause={this.pauseToggle}
        submitQuestion={this.checkAnswer}
        restart={this.restart}
      />
    )
  }
}