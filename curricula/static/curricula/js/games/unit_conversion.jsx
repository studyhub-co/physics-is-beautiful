/**
 * Created by LennyLip on 01.11.17.
 */

/* global MathQuill, playAudio, pauseBackgroundAudio, unpauseBackgroundAudio, stopBackgroundAudio, playBackgroundAudio */

import React from 'react'
import axios from 'axios'
import MathJax from 'react-mathjax'
import MediaQuery from 'react-responsive'
import {Prompt} from 'react-router-dom'
import {ScoreBoard} from './score_board'
import {GameState} from '../constants'
import Draggable from 'react-draggable'

var math = require('mathjs')
var Qty = require('js-quantities')

axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'

class UNITS {
  static get DISTANCE () {
    return {
      'mm': 'millimeters',
      'cm': 'centimeters',
      'km': 'kilometers',
      'ft': 'feet',
      'mi': 'miles'
    }
  }

  static get TIME () {
    return {
      'ms': 'milliseconds',
      'min': 'minutes',
      'hr': 'hours',
      'd': 'days',
      'wk': 'weeks'
    }
  }

  static get MASS () {
    return {
    'mg': 'milligrams',
    'g': 'grams',
    'oz': 'ounces'
    }
  }

  static get SPEED () {
    var distanceO = UNITS.DISTANCE
    distanceO['m'] = 'meters'
    var timeO = UNITS.TIME
    timeO['s'] = 'seconds'

    var speedO = {}
    Object.keys(distanceO).forEach(function (keyDist) {
      Object.keys(timeO).forEach(function (keyTime) {
        if (!(keyDist === 'm' && keyTime === 's')) { // exclude SI unit
          speedO[keyDist + '/' + keyTime] = distanceO[keyDist] + '/' + timeO[keyTime]
        }
      })
    })

    return speedO
  }
}

var INPUT_UNITS = ['s', 'm', 'kg', 'm/s']
Object.getOwnPropertyNames(UNITS)
  .map(key => [key, Object.getOwnPropertyDescriptor(UNITS, key)])
  .filter(([key, descriptor]) => typeof descriptor.get === 'function')
  .map(([key]) => key).forEach(function (key) {
    INPUT_UNITS = INPUT_UNITS.concat(Object.keys(UNITS[key]))
  })

// Limit browsers support:
// Object.entries(Object.getOwnPropertyDescriptors(UNITS))
//   .filter(([key, descriptor]) => typeof descriptor.get === 'function')
//   .map(([key]) => key).forEach(function (key) {
//     INPUT_UNITS = INPUT_UNITS.concat(Object.keys(UNITS[key]))
//   })

export class MathquillBox extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount () {
    var MQ = MathQuill.getInterface(2)

    this.answer = MQ.MathField(document.getElementById('' + this.props.row + this.props.column), {
      autoCommands: 'class',
      autoOperatorNames: 'pi', // we want to disable all commands, but MQ throw error if list is empty, so leave pi operator
      handlers: {
        edit: (mathField) => {
          // if change by API (not user), then not fire
          if (mathField.data.fromJsCall) { return }
          this.handleChange(mathField.latex(), this.props.row, this.props.column, mathField)
        }
      }
    })
    // if (this.props.focus){
    //   this.answer.focus()
    // }
  }
  componentDidUpdate() {
    // mathquill focus is lost after render
    if (this.props.answer == null && this.props.focus) {
      this.answer.focus()
    }
  }
  handleChange (data, row, col, mathquillObj) {
    this.props.onMathQuillChange(data, row, col, mathquillObj)
  }
  render () {
    var mathFieldStyle = {
      minWidth: 100,
      fontSize: 30
    }
    return (
      <div>
        <p style={{marginBottom: 5}}>
          <span id={'' + this.props.row + this.props.column} style={mathFieldStyle} />
        </p>
      </div>
    )
  }
}
MathquillBox.propTypes = {
  onMathQuillChange: React.PropTypes.func,
  row: React.PropTypes.number.isRequired,
  column: React.PropTypes.number.isRequired,
  focus: React.PropTypes.bool
}

export class ConversionTable extends React.Component {
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
      fontFamily: 'Times New Roman'
    }

    var strikethroughStyleN = {
      textDecoration: (this.props.strikethroughN ? 'line-through' : 'none')
    }

    var strikethroughStyleD = {
      textDecoration: (this.props.strikethroughD ? 'line-through' : 'none')
    }

    var topLeft = {
      border: '1px solid black',
      borderTop: 'none',
      borderLeft: 'none',
      padding: 2,
      fontFamily: 'symbola',
      fontSize: 30
    }
    var bottomRight = {
      border: '1px solid black',
      borderBottom: 'none',
      textAlign: 'right',
      borderLeft: 'none',
      padding: 2,
      fontFamily: 'symbola',
      fontSize: 30}

    return (
      <div>
        <table style={style}>
          <tbody>
            <tr>
              <td style={Object.assign({}, topLeft, {whiteSpace: 'nowrap'})}>{this.props.number} <span style={Object.assign({}, unitStyle, strikethroughStyleN)}>{this.props.unit.split('/')[0]}</span></td>
              {this.getColumns(1)}
            </tr>
            <tr>
              <td style={bottomRight}><span style={Object.assign({}, unitStyle, strikethroughStyleD)}>{this.props.unit.split('/')[1]}</span></td>
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
  strikethroughN: React.PropTypes.bool,
  strikethroughD: React.PropTypes.bool,
  numColumns: React.PropTypes.number,
  number: React.PropTypes.any,
  unit: React.PropTypes.string
}

export class UnitConversionBase extends React.Component {
  constructor (props) {
    super(props)

    var numColumns = 1
    if (this.props.level === 5) {
      numColumns = 0
    }

    this.onMathQuillChange = this.onMathQuillChange.bind(this)
    this.onResultChange = this.onResultChange.bind(this)
    this.resetStrikeAnswers = this.resetStrikeAnswers.bind(this)
    this.reDrawStrikes = this.reDrawStrikes.bind(this)

    this.addColumn = this.addColumn.bind(this)
    this.removeColumn = this.removeColumn.bind(this)

    this.state = {
      numColumns: numColumns,
      strikethroughD: false,
      strikethroughN: false
    }
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

  setLatexWoFireEvent (box, text) {
    box.data.fromJsCall = true
    box.latex(text)
    box.data.fromJsCall = false
  }

  reset () {
    var MQ = MathQuill.getInterface(2)

    var resetBox = function (id, setLatexWoFireEvent) {
      var span = document.getElementById(id)
      if (!span) return
      var mq = MQ(span)
      setLatexWoFireEvent(mq, '')
      span.classList.remove('red-border', 'green-border')
    }

    var setLatexWoFireEvent = this.setLatexWoFireEvent
    var ids = ['11', '21', '15']
    ids.forEach(function (item, i, arr) {
      resetBox(item, setLatexWoFireEvent)
    })

    this.setState({
      numColumns: 1,
      strikethroughD: false,
      strikethroughN: false,
      answersSteps: [[
        {'data': '', 'box': MQ(document.getElementById('11'))},
        {'data': '', 'box': MQ(document.getElementById('12'))}
      ]] // first column set by default
    })
  }

  reDrawStrikes () {
    var answers = this.resetStrikeAnswers()
    var uncrossedUnits = {'nums': [], 'denoms': []}

    // fill uncrossedUnits
    var splitNumerator, splitDenominator
    for (var col = 0; col < answers.length; col++) {
      splitNumerator = answers[col][0]['splitData']
      if (splitNumerator && splitNumerator[1]) {
        uncrossedUnits['nums'].push(splitNumerator[1])
      }
      splitDenominator = answers[col][1]['splitData']
      if (splitDenominator && splitDenominator[1]) {
        uncrossedUnits['denoms'].push(splitDenominator[1])
      }
    }

    var alreadyStrikeDenumIndex = []
    
    // strikethrough units
    numeratorsC:
    for (var column = -1; column < answers.length; column++) { // walk through numerators
      if (column === -1) {
        splitNumerator = ['', this.props.unit.split('/')[0]] // main unit
      } else {
        splitNumerator = answers[column][0]['splitData']
      } // "2 cm"
      
      if (splitNumerator) {
        for (var column2 = -1; column2 < answers.length; column2++) { // walk through denominators
          if (column2 === -1) {
            if (this.props.unit.split('/')[1]) {
              splitDenominator = ['', this.props.unit.split('/')[1]] // km/hr
            } else { splitDenominator = null }
          } else {
            splitDenominator = answers[column2][1]['splitData']
          }
          if (splitDenominator) {
            // numeratorBoxes boxes
            if (splitNumerator[1] === splitDenominator[1]) { // second one in "1.23 cm"
              if (alreadyStrikeDenumIndex.indexOf(column2) === -1) { // if denum not striked already
                alreadyStrikeDenumIndex.push(column2)

                var toRemoveI
                // strikethrough Numerator
                if (column === -1) {
                  this.setState({strikethroughN: true})
                } else {
                  var numeratorBox = answers[column][0]['box']
                  var newLatexN = answers[column][0]['data'].replace(splitNumerator[1], '\\class{strikethrough}{' + splitNumerator[1] + '}')

                  answers[column][0]['data'] = newLatexN // data will not fill, because edit event not fire onMathQuillChange

                  this.setLatexWoFireEvent(numeratorBox, newLatexN)

                  // remove numerator unit from uncrossed out
                  toRemoveI = uncrossedUnits['nums'].indexOf(splitNumerator[1])
                  if (toRemoveI !== -1) {
                    uncrossedUnits['nums'].splice(toRemoveI, 1)
                  }
                }
                if (column2 === -1) {
                  this.setState({strikethroughD: true})
                } else {
                  // strikethrough denominator
                  var denominatorBox = answers[column2][1]['box']
                  var newLatexDN = answers[column2][1]['data'].replace(splitNumerator[1], '\\class{strikethrough}{' + splitNumerator[1] + '}')

                  answers[column2][1]['data'] = newLatexDN // data will not fill, because edit event not fire onMathQuillChange
                  
                  this.setLatexWoFireEvent(denominatorBox, newLatexDN)

                  // remove denominator unit from uncrossed out
                  toRemoveI = uncrossedUnits['denoms'].indexOf(splitNumerator[1])
                  if (toRemoveI !== -1) {
                    uncrossedUnits['denoms'].splice(toRemoveI, 1)
                  }

                  continue numeratorsC // need for stop search 2nd and more denominator with current unit
                }
              }
            }
          }
        } // end for denominators
      }
    } // end for numerators

    this.setState({
      answersSteps: answers,
      uncrossedUnits: uncrossedUnits
    })
  }

  onMathQuillChange (data, row, col, mathquillObj) {
    // check cursor position: if it not at the end - does not remove
    if (mathquillObj.__controller.cursor[1] === 0) {
      // if data contain strikethrough with end of line remove it
      // we must replace it only in currently edited mathquill box
      var tmpData
      tmpData = data.replace(/\\class{strikethrough}{(\S+)}$/, function (match, find) {
        if (find && find.length > 1) { // remove last char ot unit
          return find.slice(0, -1)
        } else { return '' } // remove unit if it is one char
      })
      if (tmpData !== data) {
        data = tmpData
        this.setLatexWoFireEvent(mathquillObj, data)
      }
    }

    // store value in matrix
    var answers = this.state.answersSteps

    answers[col - 1][row - 1] = {
      'data': data,
      'splitData': this.constructor.parseToValueUnit(this.clearDataText(data)),
      'box': mathquillObj}

    this.setState({
      answersSteps: answers
    }, function () {
      this.reDrawStrikes()
    })
  }

  // result answer change
  onResultChange (data, row, col, mathquillObj) {

    this.setState({
      answer: {'data': data, 'box': mathquillObj}
    })
  }

  // clear data before js-q parse
  // remove  strikethrough
  clearDataText (tmpData) {
    tmpData = tmpData.replace(/\\class{strikethrough}{(\S+)}/, '$1')
    // remove backslash with whitespace
    tmpData = tmpData.replace(/\\ /g, ' ')
    tmpData = tmpData.replace(/\\frac{(\S+)}{(\S+)}/, '$1/$2')
    // convert scientific notation
    tmpData = tmpData.replace(/\\cdot/g, '*')
    tmpData = tmpData.replace(/\^{\s*(\S+)\s*}/, '^($1)') // fix for math.parser()
    
    var parsedToValUnit = this.constructor.parseToValueUnit(tmpData)

    if (parsedToValUnit && parsedToValUnit[0]) {
      var parser = math.parser()
      try {
        var value = parser.eval(parsedToValUnit[0])
        if (value && parsedToValUnit[1]) {
          tmpData = value + ' ' + parsedToValUnit[1]
        }
      } catch (e) {} // catch SyntaxError
    }

    return tmpData
  }

  getQtyFromSplitData (splitData) {
    if (splitData) {
      return Qty.parse(splitData[0] + splitData[1])
    }
    return null
  }

  sigFigs (n, sig) {
    var mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1)
    return Math.round(n * mult) / mult
  }

  getBaseFor2Qty (firstQty, secondQty) {
    // Determine the minimum of minLength
    var minLength = 0
    minLength = firstQty.baseScalar.toString().length
    if (secondQty.toString().length < minLength) {
      minLength = secondQty.baseScalar.toString().length
    }

    var asf = this.sigFigs(firstQty.baseScalar, minLength)
    var isf = this.sigFigs(secondQty.baseScalar, minLength)

    function decimalPlaces (num) {
      var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)
      if (!match) { return 0 }
      return Math.max(0,
        // Number of digits right of decimal point + scientific notation.
        (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0))
    }

    var decPlaces = 0
    decPlaces = decimalPlaces(asf)
    if (decimalPlaces(isf) < decPlaces) {
      decPlaces = decimalPlaces(isf)
    }

    function roundX (x, n) {
      var mult = Math.pow(10, n)
      return Math.round(x * mult) / mult
    }

    return [roundX(asf, decPlaces), roundX(isf, decPlaces)]
  }

  compareWithSigFigs (firstQty, secondQty) {
    var baseCompareLst = this.getBaseFor2Qty(firstQty, secondQty)

    var equal = '' + baseCompareLst[0] === '' + baseCompareLst[1]

    if (!equal){
      var a = baseCompareLst[0]
      var b = baseCompareLst[1]
      var percent = (Math.abs(a-b)/Math.max(Math.abs(a), Math.abs(b))) * 100
      if (percent <= 11){
         equal = true
      }
    }
    
    return equal
  }

  resetStrikeAnswers () {
    var answers = this.state.answersSteps

    this.state.strikethroughN = false
    this.state.strikethroughD = false
    var resetStrike = function (answer, setLatexWoFireEvent) {
      var tmpData = answer['data']
      if (!tmpData) return

      var resetTxt = tmpData.replace(/\\class{strikethrough}{(\S+)}/, '$1') // replace if with whitespaces

      if (resetTxt !== tmpData) { // replace only if changed
        answer['data'] = resetTxt
        setLatexWoFireEvent(answer['box'], resetTxt)
      }
    }

    var setLatexWoFireEvent = this.setLatexWoFireEvent

    // reset all strikethrough after update any value
    for (var column = 0; column < answers.length; column++) { // walk through columns
      resetStrike(answers[column][0], setLatexWoFireEvent)
      resetStrike(answers[column][1], setLatexWoFireEvent)
    }
    return answers
  }

  static parseToValueUnit (input) {
    // trim backslash and spaces
    input = input.replace(/^[\\\s]+|[\\\s]+$/gm, '')

    var unitsArr = INPUT_UNITS
    // check for longer unit name firstly
    unitsArr.sort(function (a, b) {
      return b.length - a.length
    })

    for (var i = 0; i < unitsArr.length; i++) {
      var unit = unitsArr[i]
      var foundIndex = input.indexOf(unit, input.length - unit.length)
      if (foundIndex !== -1) {
        // replace all char and spaces in value
        return [input.substring(0, foundIndex)
          .replace(/[^0-9*^.-]+/g, ''),
          // .replace(/^[\\\s]+|[\\\s]+$/gm, ''), unnessecery now
        unit]
      }
    }
    return null
  }
}
UnitConversionBase.propTypes = {
  level: React.PropTypes.number,
  unit: React.PropTypes.string
}

export class UnitConversionCanvas extends UnitConversionBase {
  constructor (props) {
    super(props)
    this.submitQuestion = this.submitQuestion.bind(this)
  }

  keydown(e) {
    if (e.code === "Enter"){
      // detect that calculator field and button is not focused
      if(!document.getElementById('calculatorField').classList.contains("mq-focused") &&
          (document.activeElement !== document.getElementById('checkButton')) &&
          (document.activeElement !== document.getElementById('addStep')) &&
          (document.activeElement !== document.getElementById('removeStep'))
      )
      {
        this.submitQuestion()
      }
    }
  }

  updateAnswer(answer){
    var MQ = MathQuill.getInterface(2)
    MQ.MathField(document.getElementById('15')).latex(answer)
    MQ.MathField(document.getElementById('15')).focus()
  }

  componentDidMount () {
    var MQ = MathQuill.getInterface(2)
    if (this.props.level === 5) {
      this.setState({
        answersSteps: []
      })
    } else {
      this.setState({
        answersSteps: [[ // first column set by default
          {'data': '', 'box': MQ(document.getElementById('11'))},
          {'data': '', 'box': MQ(document.getElementById('21'))}
        ]]
      })
    }
    document.addEventListener("keydown", this.keydown.bind(this), false)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydown, false)
  }

  submitQuestion () {
    var answers = this.state.answersSteps
    var uncrossedUnits = this.state.uncrossedUnits
    var qNumber = this.props.number
    var qUnit = this.props.unit

    var spanNElement = null
    var spanDElement = null

    var isRightAnswer = true

    if (!this.state.answersSteps || this.state.answersSteps.length == 0 || !this.state.answer || !this.state.answer['data']){
      return
    }

    // checking for correct units conversions
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

      var incorrectKind = false
      var incorrectCount = 0

      if (qnQty && qdQty) {
        // check for unit kind
        var correctQsUnits = [qUnit.split('/')[0]]

        if (qUnit.split('/')[1]) { // km/s
          correctQsUnits.push(qUnit.split('/')[1])
        }

        for (var i = 0; i < correctQsUnits.length; i++) {
          var initialUnitQty = Qty.parse(correctQsUnits[i])
          if (initialUnitQty.kind() !== (qnQty.kind() && qdQty.kind())) {
            incorrectCount++
          }
        }
        if (incorrectCount > (correctQsUnits.length - 1)) { // for km/s can be only one incorrect
          incorrectKind = true
        }
      }

      // check conversions steps
      if (qnQty && qdQty && !incorrectKind && qnQty.isCompatible(qdQty) && this.compareWithSigFigs(qnQty, qdQty)) {
        if (spanNElement) { spanNElement.classList.add('green-border') }
        if (spanDElement) { spanDElement.classList.add('green-border') }
      } else {
        if (incorrectKind) {
          this.setState({
            incorrectUnitType: true
          })
        } else {
          this.setState({
            incorrectConversion: true
          })
        }
        isRightAnswer = false
        if (spanNElement) { spanNElement.classList.add('red-border') }
        if (spanDElement) { spanDElement.classList.add('red-border') }
      }
    } // end for

    // check answer
    var initialQty = new Qty(Number(qNumber), qUnit)
    var answerSpan = document.getElementById('15')

    var answerQty
    if (this.state.answer && this.state.answer['data'] && this.clearDataText(this.state.answer['data']) !== '') {
      answerQty = Qty.parse(this.clearDataText(this.state.answer['data']))
    } else {
      answerQty = null
    }

    if (answerQty && answerQty.isCompatible(initialQty) && this.compareWithSigFigs(initialQty, answerQty)) {
      answerSpan.classList.add('green-border')
    } else {
      var correctAnswer

      if (initialQty.toBase().scalar < 1) {
        // leave just significant figures for answer
        correctAnswer = this.sigFigs(initialQty.toBase().scalar, 4)
      } else {
        correctAnswer = initialQty.toBase().scalar.toFixed(2)
      }

      var incompleteConversion = true
      // checking for incomplete units conversions
      if (uncrossedUnits && uncrossedUnits['nums'].length === 1 && uncrossedUnits['denoms'].length <= 1) {
        var remainUnit = uncrossedUnits['nums'][0]
        if (uncrossedUnits['denoms'].length === 1) {
          remainUnit += '/' + uncrossedUnits['denoms']
        } else { // try to use initial denominator
          if (typeof qUnit.split('/')[1] !== 'undefined') {
            remainUnit += '/' + qUnit.split('/')[1]
          }
        }
        // compare answer and remain unit
        if (this.state.answer) {
          var answerText = this.constructor.parseToValueUnit(this.clearDataText(this.state.answer['data']))

          if (answerText && typeof answerText[1] !== 'undefined' && answerText[1] === remainUnit) {
            incompleteConversion = false
          }
        }
      }

      if (incompleteConversion) {
        isRightAnswer = false
        this.setState({
          incompleteConversion: true
        })
      }

      this.setState({
        incorrectAnswer: true,
        correctAnswer: correctAnswer + ' ' + initialQty.toBase().toString().split(' ')[1]
      })
      isRightAnswer = false
      answerSpan.classList.add('red-border')
    }

    if (isRightAnswer === true) {
      playAudio('correct')
      this.reset()
      this.props.nextQuestion(500)
    } else {
      playAudio('incorrect')
      this.props.gameOver()
    }

    // erase calculator
    if(document.getElementById('calculatorField')) {
      var MQ = MathQuill.getInterface(2)
      MQ(document.getElementById('calculatorField')).latex('')
    }

  }
  render () {
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


    var pointerEvents = 'auto'

    if (this.props.gameState === GameState.GAME_OVER){
      pointerEvents = 'none'
      document.getElementById('tryAgain').focus()
    }
    
    return (
      <div style={{pointerEvents: pointerEvents }}>
        <div style={{display: 'block'}}>
          <div style={{display: 'table', marginLeft: 'auto', marginRight: 'auto'}}>
            <ConversionTable
              numColumns={this.state.numColumns}
              onMathQuillChange={this.onMathQuillChange}
              number={this.props.number}
              unit={this.props.unit}
              strikethroughN={this.state.strikethroughN}
              strikethroughD={this.state.strikethroughD}
            />
            {this.state.incompleteConversion
              ? <div style={{border: '.1rem solid black'}}>
                <div style={{color: 'red'}}>Incorrect: incomplete conversion</div>
              </div>
              : null}
            {this.state.incorrectConversion
              ? <div style={{border: '.1rem solid black'}}>
                <div style={{color: 'red'}}>Incorrect unit conversion</div>
              </div>
              : null}
            {this.state.incorrectUnitType
              ? <div style={{border: '.1rem solid black'}}>
                <div style={{color: 'red'}}>Incorrect unit type</div>
              </div>
              : null}
            {this.props.level > 4 ? null
              : <div style={{fontSize: 10, display: 'table-cell', verticalAlign: 'middle', paddingLeft: 0, paddingRight: 0}}>
                <button id='addStep'
                  className='hover-button'
                  style={this.state.numColumns === 4 ? disabledButtonStyle : buttonStyle}
                  onClick={this.addColumn}>+Add Step</button>
                <button id='removeStep'
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
              {this.state.incorrectAnswer
                ? <div style={{border: '.1rem solid black'}}>
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

  constructor (props) {
    super(props)
    this.state = {calulatorAnswer: '', copy2Answer: null}
    this.copy2Answer = this.copy2Answer.bind(this)
  }

  copy2Answer (){
    if (this.state.calulatorAnswer != '') {
      this.conversionCanvas.updateAnswer(this.state.calulatorAnswer)
    }
  }

  clearCalculatorInput (tmpData) {
    // remove backslash with whitespace
    tmpData = tmpData.replace(/\\ /g, ' ')
    tmpData = tmpData.replace(/\\frac{(\S+)}{(\S+)}/, '$1/($2)')
    // convert scientific notation
    tmpData = tmpData.replace(/\\cdot/g, '*')
    tmpData = tmpData.replace(/\^{\s*(\S+)\s*}/, '^($1)') // fix for math.parser()
    tmpData = tmpData.replace(/\\left\(/g, '(')
    tmpData = tmpData.replace(/\\right\)/g, ')')

    var parser = math.parser()
      try {
        var value = parser.eval(tmpData)
        if (value) {
          if (value < 1) {
            // leave just significant figures for answer
            var mult = Math.pow(10, 4 - Math.floor(Math.log(value) / Math.LN10) - 1)
            value = Math.round(value * mult) / mult
          } else {
            value = value.toFixed(2)
          }
        }

        return value

      } catch (e) {if (!(e instanceof SyntaxError)) { // catch SyntaxError
          throw e
        }}

    return false
  }

  componentDidMount () {
    var MQ = MathQuill.getInterface(2)

    this.calculatorField = MQ.MathField(document.getElementById('calculatorField'), {
      autoCommands: 'pi',
      autoOperatorNames: 'sin',
      handlers: {
        edit: (mathField) => {
          var calcedValue = this.clearCalculatorInput(mathField.latex())
          if (calcedValue){
            this.setState({
              calulatorAnswer: calcedValue
            })
          }
          else{
            this.setState({
              calulatorAnswer: ''
            })
          }
        }
      }
    })

    MQ(document.getElementById('11')).focus()
  }

  render () {

    var mathFieldStyle = {
      minWidth: '25rem',
      fontSize: 30
    }

    var cellCheatStyle = {
      border: '1px solid #d8d8d8',
      display: 'table-cell',
      verticalAlign: 'middle',
      padding: '1rem',
    }

    return (
      <div>
        <Draggable disabled={screen.width > 736} axis="x" bounds={{left: -screen.width+100, top: 0, right: screen.width-100, bottom: 0}} cancel=".mq-root-block">
         <div style={{display: 'table', marginLeft: 'auto', marginRight: 'auto'}} className='bounding-box text-center'>
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
              ref={(conversionCanvas) => { this.conversionCanvas = conversionCanvas; }}
            />
         </div>
        </Draggable>
        <Draggable disabled={screen.width > 736} axis="x" bounds={{left: -screen.width+100, top: 0, right: screen.width-100, bottom: 0}} cancel=".mq-root-block">
        <div style={{display: 'table', marginLeft: 'auto', marginRight: 'auto'}} className='bounding-box'>
          <div className='text-center'>
            <h2>Calculator</h2>
            <div>
             <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
               <p style={{marginBottom: 5}}>
                 <span id={'calculatorField'} style={mathFieldStyle} />
               </p>
             </div>
             <div style={{fontSize: 30, display: 'table-cell', verticalAlign: 'middle', paddingLeft: 15, paddingRight: 15}}>
                 =
             </div>
             <div style={{fontSize: 30, display: 'table-cell', verticalAlign: 'middle', paddingLeft: 15, paddingRight: 15}}>
               {this.state.calulatorAnswer}
             </div>
             <div style={{textAlign: 'right'}}>
               <div className='button-group'>
                  <button id='checkButton'
                    className={'btn btn-primary' + (this.state.calulatorAnswer === '' ? ' disabled' : '')}
                    onClick={this.copy2Answer}
                    >
                    Copy to answer
                  </button>
                </div>
             </div>
            </div>
          </div>
        </div>
        </Draggable>
        <div style={{display: 'table', marginLeft: 'auto', marginRight: 'auto'}} className='bounding-box'>
          <div className='text-center'>
            <h2>Unit Conversion Cheat Sheet</h2>
            <div style={{display: 'table', marginLeft: 'auto', borderCollapse: 'collapse', marginRight: 'auto'}}>
              <div style={{display: 'table-row'}}>
                <div style={Object.assign({}, cellCheatStyle, {textDecoration: 'underline', fontWeight: 'bold'})}>
                  Measurement
                </div>
                <div style={Object.assign({}, cellCheatStyle, {textDecoration: 'underline', fontWeight: 'bold'})}>
                  SI to US Standard
                </div>
                <div style={Object.assign({}, cellCheatStyle, {textDecoration: 'underline', fontWeight: 'bold'})}>
                  US Standard to SI
                </div>
              </div>
              <div style={{display: 'table-row'}}>
                <div style={cellCheatStyle}>
                  Distance
                </div>
                <div style={cellCheatStyle}>
                  1 cm = 0.3937 in <br />
                  1 m = 100 cm = 3.28 ft <br />
                  1 km = 0.621 mi
                </div>
                <div style={cellCheatStyle}>
                  1 in = 2.54 cm  <br />
                  1 ft = 0.3048 m  <br />
                  1 mi = 5280 ft = 1.609 km
                </div>
              </div>
              <div style={{display: 'table-row'}}>
                <div style={cellCheatStyle}>
                  Mass
                </div>
                <div style={cellCheatStyle}>
                  1 kg = 1000 g = 2.2 lb <br />
                  1 g = 0.035 oz
                </div>
                <div style={cellCheatStyle}>
                  1 lb = 16 oz = 0.454 kg   <br />
                  1 oz = 28.35 g = 0.02835 kg
                </div>
              </div>
              <div style={{display: 'table-row'}}>
                <div style={cellCheatStyle}>
                  Time
                </div>
                <div style={cellCheatStyle}>
                  1 s = 1000 ms = 0.0166 min
                </div>
                <div style={cellCheatStyle}>
                 1 min = 60 s <br />   <br />
                 Other useful non-SI conversions:   <br />
                 1 hr = 60 min   <br />
                 1 day = 24 hr   <br />
                 1 week = 7 days
                </div>
              </div>
            </div>
          </div>
        </div>
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
      2: '#c9bfff',
      3: '#caffe5',
      4: '#ffffaa',
      5: '#ffd8b2'
    }
    this.state = {clockSeconds: 600}
  }
  componentDidMount() {
    if (this.props.state == GameState.NEW) {
      document.getElementById('start').focus()
    }
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
              <button id='start' className='hover-button' onClick={this.props.start}>Start</button>
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
                    <td style={{'padding': 5}}>{score.profile ? score.profile: 'Anonymous'}</td>
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
    this.elapsed = 0
    this.timer = null
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
      //level: 4,
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
    clearInterval(this.timer)
  }

  // due https://github.com/pughpugh/react-countdown-clock/issues/28 create own timer
  tick () {
    if (this.state.state !== GameState.PAUSED) {
      this.elapsed = this.elapsed + 10
    }
  }

  getRandomFromArray (myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)]
  }

  getRandomNumber () {
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

      var INPUT_UNITS = []

      Object.getOwnPropertyNames(UNITS)
      .map(key => [key, Object.getOwnPropertyDescriptor(UNITS, key)])
      .filter(([key, descriptor]) => typeof descriptor.get === 'function')
      .map(([key]) => key).forEach(function (key) {
        INPUT_UNITS = INPUT_UNITS.concat(key)
      })

      var unitType = this.getRandomFromArray(INPUT_UNITS)
      unit = this.getRandomFromArray(Object.keys(UNITS[unitType]))
      unitLong = UNITS[unitType][unit]
    }

    if (newLevel > 5) {
      stopBackgroundAudio()
      // TODO add more secure, i.e. server token when game starts, etc
      // TODO move it to games.jsx (replace jQuery), remove ajaxSetup from main page
      clearInterval(this.timer)
      axios.post('/api/v1/curricula/games/unit-conversion/success', {
        duration: this.elapsed,
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
    clearInterval(this.timer)
    window.onbeforeunload = null
  }

  restart () {
    clearInterval(this.timer)
    this.timer = setInterval(this.tick.bind(this), 10)

    var state = Object.assign(
      this.generateQuestion(),
      {
        score: 0,
        level: 1,
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
    this.timer = setInterval(this.tick.bind(this), 10)
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
