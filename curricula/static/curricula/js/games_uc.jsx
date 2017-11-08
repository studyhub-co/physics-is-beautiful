/**
 * Created by LennyLip on 01.11.17.
 */

import React from 'react'
import axios from 'axios'
import MathJax from 'react-mathjax'
import MediaQuery from 'react-responsive'
import {Prompt} from 'react-router-dom'
import {ScoreBoard} from './games'

var Qty = require('js-quantities')

axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'

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
    'm/hr': 'meters/hour',
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
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount () {
    var MQ = MathQuill.getInterface(2)

    this.answer = MQ.MathField(document.getElementById('' + this.props.row + this.props.column), {
      handlers: {
        spaceBehavesLikeTab: true,
        edit: () => {
          // if change by API (not user), then not fire
          if (this.answer.fromJsCall) { return }
          // TODO need wait for a user typing, because m, mi and mm start from m, and fire wrong strikethrough

          this.handleChange(this.answer.latex(), this.props.row, this.props.column, this.answer)
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

    var numColumns = 1
    if (this.props.level === 5) {
      numColumns = 0
    }

    this.state = {
      numColumns: numColumns,
      strikethrough: false,
      answer: '',
      counter: 0
    }
    this.addColumn = this.addColumn.bind(this)
    this.removeColumn = this.removeColumn.bind(this)
    this.submitQuestion = this.submitQuestion.bind(this)
    this.onMathQuillChange = this.onMathQuillChange.bind(this)
    this.onResultChange = this.onResultChange.bind(this)
    this.resetStrikeAnswers = this.resetStrikeAnswers.bind(this)
    this.reDrawStrikes = this.reDrawStrikes.bind(this)
  }

  componentDidMount () {
    var MQ = MathQuill.getInterface(2)
    if (this.props.level === 5) {
      this.setState({
        answersSteps: []
      })
    } else {
      this.setState({
        answersSteps: [[
          {'data': '', 'box': MQ(document.getElementById('11'))},
          {'data': '', 'box': MQ(document.getElementById('21'))}
        ]] // first column set by default
      })
    }
  }

  reset () {
    var MQ = MathQuill.getInterface(2)

    var resetBox = function (id) {
      var span = document.getElementById(id)
      if (!span) return
      var mq = MQ(span)
      mq.fromJsCall = true
      mq.latex('')
      mq.fromJsCall = false
      span.classList.remove('red-border', 'green-border')
    }

    var ids = ['11', '21', '15']
    ids.forEach(function (item, i, arr) {
      resetBox(item)
    })

    this.setState({
      numColumns: 1,
      answersSteps: [[
        {'data': '', 'box': MQ(document.getElementById('11'))},
        {'data': '', 'box': MQ(document.getElementById('12'))}
      ]] // first column set by default
    })
  }

  addColumn () {
    var MQ = MathQuill.getInterface(2)
    var newColumns = this.state.numColumns + 1

    this.setState({
      numColumns: newColumns
    }, function () { // need wait mount mathquill span!
      this.setState({
        answersSteps: [...this.state.answersSteps, [
          { 'data': '', 'box': MQ(document.getElementById('1' + newColumns)) },
          { 'data': '', 'box': MQ(document.getElementById('2' + newColumns)) }]
        ]
      })
    })
  }
  removeColumn () {
    this.setState({
      numColumns: this.state.numColumns - 1,
      answersSteps: this.state.answersSteps.slice(0, -1)
    }, function () {
      this.reDrawStrikes()
    })
  }

  resetStrikeAnswers () {
    var answers = this.state.answersSteps

    this.state.strikethrough = false
    var resetStrike = function (answer) {
      var tmpData = answer['data']
      if (!tmpData) return

      var resetTxt = tmpData.replace(/\\class{strikethrough}{(\S+)}/, '$1')

      resetTxt = resetTxt.replace(/class{(\S+)}/, function (match, find) { // class set by mathquill after backspace

        if (find && find.length > 1) { // remove last char ot unit
          return find.slice(0, -1)
        } else { return '' } // remove unit if it is one char
      })

      answer['box'].fromJsCall = true
      answer['data'] = resetTxt
      answer['box'].latex(resetTxt)
      answer['box'].fromJsCall = false
    }

    // reset all strikethrough after update any value
    for (var column = 0; column < answers.length; column++) { // walk through columns
      resetStrike(answers[column][0])
      resetStrike(answers[column][1])
    }
    return answers
  }

  reDrawStrikes () {
    var answers = this.resetStrikeAnswers()

    // TODO it is really need to check for unit exist in UNITS const?
    // strikethrough units Numerator and Denominator
    numeratorsC:
    for (var column = -1; column < answers.length; column++) { // walk through numerators
      var splitNumerator

      if (column === -1) {
        splitNumerator = ['', this.props.unit] // main unit
      } else {
        splitNumerator = answers[column][0]['data'].match(/\S+/g)
      } // "2 cm"

      if (splitNumerator && typeof splitNumerator[1] !== 'undefined') {
        for (var column2 = 0; column2 < answers.length; column2++) { // walk through denominators
          var splitDenominator = answers[column2][1]['data'].match(/\S+/g)
          if (splitDenominator && typeof splitDenominator[1] !== 'undefined') {
            // strikethrough start unit
            if (splitDenominator[1] === this.props.unit) {
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
                answers[column][0]['data'] = newLatexN // data will not fill, because edit event not fire onMathQuillChange
                numeratorBox.latex(newLatexN)
                numeratorBox.fromJsCall = false
              }

              // strikethrough denominator
              var denominatorBox = answers[column2][1]['box']
              var newLatexDN = answers[column2][1]['data'].replace(splitNumerator[1], '\\class{strikethrough}{' + splitNumerator[1] + '}')
              answers[column2][1]['data'] = newLatexDN // data will not fill, because edit event not fire onMathQuillChange
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

  onMathQuillChange (data, row, col, mathquillObj) {
    // store value in matrix
    var answers = this.state.answersSteps
    answers[col - 1][row - 1] = {'data': data, 'box': mathquillObj}

    this.setState({
      answersSteps: answers
    }, function () {
      this.reDrawStrikes()
    })
  }

  // result change
  onResultChange (data, row, col, mathquillObj) {
    this.setState({
      answer: {'data': data, 'box': mathquillObj}
    })
  }

  // fixes strikethrough,  whitespace and latex
  clearDataText (tmpData) {
    tmpData = tmpData.replace(/\\class{strikethrough}{(\S+)}/, '$1')
    tmpData = tmpData.replace(/\\ /g, '') // fast fix to remove backslash and whitespace
    tmpData = tmpData.replace(/\\frac{(\S+)}{(\S+)}/, '$1/$2')
    tmpData = tmpData.replace(/\\/g, '') // fix for \min
    return tmpData
  }

  sigFigs (n, sig) { // TODO move to  utils
    var mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1)
    return Math.round(n * mult) / mult
  }

  compareWithSigFigs (firstQty, secondQty) {
    var minLength = 0
    minLength = firstQty.baseScalar.toString().length
    if (secondQty.toString().length < minLength) {
      minLength = firstQty.toString().length
    }

    var asf = this.sigFigs(firstQty.baseScalar, minLength)
    var isf = this.sigFigs(secondQty.baseScalar, minLength)

    // substring to length number equal
    minLength = 0
    minLength = asf.toString().length
    if (asf.toString().length < minLength) {
      minLength = asf.toString().length
    }
    isf = isf.toString().substring(0, minLength)
    asf = asf.toString().substring(0, minLength)

    // console.log(isf)
    // console.log(asf)

    return isf === asf
  }

  submitQuestion () {
    var answers = this.state.answersSteps
    var qNumber = this.props.number
    var qUnit = this.props.unit

    var spanNElement = null
    var spanDElement = null

    var isRightAnswer = true

    // check units converions

    for (var column = 0; column < answers.length; column++) { // walk through columns
      var numerator = answers[column][0]
      if (numerator['box']) {
        spanNElement = numerator['box'].__controller.container[0]
      }
      var denominator = answers[column][1]
      if (denominator['box']) {
        spanDElement = denominator['box'].__controller.container[0]
      }
      var qnQty, qdQty

      if (this.clearDataText(numerator['data']) === '' || this.clearDataText(denominator['data']) === '') { // catch emtpy text
        qnQty = null
        qdQty = null
      } else {
        qnQty = Qty.parse(this.clearDataText(numerator['data']))
        qdQty = Qty.parse(this.clearDataText(denominator['data']))
      }

      // check steps
      if (qnQty && qdQty && qnQty.isCompatible(qdQty) && this.compareWithSigFigs(qnQty, qdQty)) {
        if (spanNElement) { spanNElement.classList.add('green-border') }
        if (spanDElement) { spanDElement.classList.add('green-border') }
      } else {
        this.setState({
          incorrectConversion: true
        })
        isRightAnswer = false
        if (spanNElement) { spanNElement.classList.add('red-border') }
        if (spanDElement) { spanDElement.classList.add('red-border') }
      }
    } // end for
    // check answer
    var answerQty
    if (this.state.answer['data'] && this.clearDataText(this.state.answer['data']) !== '') {
      answerQty = Qty.parse(this.clearDataText(this.state.answer['data']))
    } else {
      answerQty = null
    }

    var initialQty = new Qty(Number(qNumber), qUnit)
    var answerSpan = document.getElementById('15')

    if (answerQty && answerQty.isCompatible(initialQty) && this.compareWithSigFigs(initialQty, answerQty)) {
      answerSpan.classList.add('green-border')
    } else {
      this.setState({
        incorrectAnswer: true,
        correctAnswer: initialQty.toBase().toString()
      })
      isRightAnswer = false
      answerSpan.classList.add('red-border')
    }

    if (isRightAnswer === true) {
      this.reset()
      this.props.nextQuestion(500)
    } else {
      this.props.gameOver()
    }
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
            {this.state.incorrectConversion ?
              <div style={{border: '.1rem solid black'}}>
                <div style={{color: 'red'}}>Incorrect Unit Conversion</div>
              </div>
              : null}
            {this.props.level > 4 ? null :
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
            }
            <div style={{fontSize: 30, display: 'table-cell', verticalAlign: 'middle', paddingLeft: 15, paddingRight: 15}}>
                =
            </div>
            <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
              <MathquillBox
                onMathQuillChange={this.onResultChange}
                row={1}
                column={5}
              />
              {this.state.incorrectAnswer ?
                <div style={{border: '.1rem solid black'}}>
                  <div style={{color: 'red'}}>Incorrect answer</div>
                  <div style={{color: 'green'}}>Correct answer: {this.state.correctAnswer}</div>
                </div>
                : null}
            </div>
          </div>
        </div>
        <div style={this.props.gameState === GameState.GAME_OVER ? {display: 'none'} : {display: 'block'}}>
          <button className='hover-button' style={{marginTop: 15}} onClick={() => this.submitQuestion()}>Submit</button>
        </div>
      </div>
    )
  }
}
UnitConversionCanvas.propTypes = {
  number: React.PropTypes.any,
  unit: React.PropTypes.string,
  gameState: React.PropTypes.string,
  level: React.PropTypes.number,
  nextQuestion: React.PropTypes.func,
  gameOver: React.PropTypes.func
}

class UnitConversionQuestionBoard extends React.Component {
  render () {
    // var objects = []
    // // var fade = false
    // if (this.props.answerVector) {
    //   // fade = true
    //   objects.push(this.props.answerVector)
    // }
    // if (this.props.answerText) {
    //   objects.push(this.props.answerText)
    // }
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
          nextQuestion={this.props.nextQuestion}
          gameOver={this.props.gameOver}
          gameState={this.props.gameState}
          level={this.props.level}
        />
      </div>
    )
  }
}
UnitConversionQuestionBoard.propTypes = {
  question: React.PropTypes.any,
  number: React.PropTypes.any,
  gameOver: React.PropTypes.func,
  unit: React.PropTypes.string,
  gameState: React.PropTypes.string,
  nextQuestion: React.PropTypes.func,
  level: React.PropTypes.number
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

    switch (this.props.state) { // TODO this is ugly
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
        { this.props.state !== GameState.WON
          ? <UnitConversionQuestionBoard
            number={this.props.number}
            unit={this.props.unit}
            question={this.props.question}
            clear={[GameState.NEW, GameState.QUESTION].indexOf(this.props.state) >= 0}
            gameState={this.props.state}
            gameOver={this.props.gameOver}
            level={this.props.level}
            nextQuestion={this.props.nextQuestion}
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
                    <td style={{'padding': 5}}>{score.profile}</td>
                    <td style={{'padding': 5}}>{score.duration}</td>
                  </tr>
                }) : null}
              </tbody>
            </table>
          </div>
        }
      </div>
    )
  }
}
UnitConversionGameBoard.propTypes = {
  number: React.PropTypes.any,
  unit: React.PropTypes.string,
  level: React.PropTypes.number,
  state: React.PropTypes.string, // TODO don't use 'state' name for anything, but react component state. rename to gameState
  start: React.PropTypes.func,
  score: React.PropTypes.number,
  timesUp: React.PropTypes.func,
  pause: React.PropTypes.func,
  restart: React.PropTypes.func,
  question: React.PropTypes.any,
  nextQuestion: React.PropTypes.func,
  gameOver: React.PropTypes.func,
  scoreList: React.PropTypes.array
}

export class UnitConversionGame extends React.Component {
  constructor () {
    super()
    this.timesUp = this.timesUp.bind(this)
    this.start = this.start.bind(this)
    this.pauseToggle = this.pauseToggle.bind(this)
    this.generateQuestion = this.generateQuestion.bind(this)
    this.nextQuestion = this.nextQuestion.bind(this)
    this.restart = this.restart.bind(this)
    this.gameOver = this.gameOver.bind(this)
    this.state = {
      state: GameState.NEW,
      pausedOnState: null,
      score: 0,
      // level: 5,
      level: 1,
      elapsed: 0,
      question: null,
      unit: null,
      number: null,
      answer: null,
      paused: true,
      timer: null
    }
  }

  componentWillUnmount () {
    window.onbeforeunload = null
    clearInterval(this.state.timer)
  }

  // due https://github.com/pughpugh/react-countdown-clock/issues/28 create own timer
  tick () {
    if (this.state.state !== GameState.PAUSED) {
      this.setState({ elapsed: this.state.elapsed + 10 })
    }
  }

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

  nextQuestion (adScore) {
    this.setState(this.generateQuestion(this.state.score + adScore, this.state.level + 1))
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
    } else if (newLevel === 5) {
      var unitType = this.getRandomFromArray(Object.keys(UNITS))
      unit = this.getRandomFromArray(Object.keys(UNITS[unitType]))
      unitLong = UNITS[unitType][unit]
    }

    if (newLevel > 5) {
      stopBackgroundAudio()
      // TODO add more secure, i.e. server token when game starts, etc
      // this.props.gameWon()
      // TODO move it to games.jsx (replace jQuery), remove ajaxSetup remove ajaxSetup from main page
      clearInterval(this.state.timer)
      axios.post('/api/v1/curricula/games/unit-conversion/success', {
        duration: this.state.elapsed,
        score: newScore
      }).then(function (response) {
        this.setState({
          scoreList: response.data
        })
      }.bind(this))
      window.onbeforeunload = null
      return {score: newScore, state: GameState.WON}
    }

    var question = <span>{'Convert ' + number.toString() + ' ' + unitLong + ' to SI units.'}</span>
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

  gameOver () {
    this.setState({state: GameState.GAME_OVER})
    stopBackgroundAudio()
    clearInterval(this.state.timer)
    window.onbeforeunload = null
  }

  restart () {
    clearInterval(this.state.timer)
    this.setState(
      { timer: setInterval(this.tick.bind(this), 10) }
    )

    var state = Object.assign(
      this.generateQuestion(),
      {
        score: 0,
        level: 1,
        // answerVector: null,
        // answerText: null,
        state: GameState.NEW
      }
    )
    this.setState(state)
    this.setState(state)
  }

  start () {
    window.onbeforeunload = function () {
      return 'Changes you made may not be saved.'
    }
    playBackgroundAudio('rainbow', 0.2)
    this.setState(this.generateQuestion())
    this.setState({
      timer : setInterval(this.tick.bind(this), 10)
    })
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
        timesUp={this.timesUp}
        pause={this.pauseToggle}
        gameOver={this.gameOver}
        nextQuestion={this.nextQuestion}
        restart={this.restart}
        scoreList={this.state.scoreList}
      />
    )
  }
}