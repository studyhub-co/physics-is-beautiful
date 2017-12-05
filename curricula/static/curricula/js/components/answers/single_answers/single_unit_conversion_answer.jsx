import React from 'react'
import {UnitConversionBase, ConversionTable, MathquillBox} from '../../../games/unit_conversion'

var Qty = require('js-quantities')

/* global MathQuill */

class UnitConversionCanvas extends UnitConversionBase {
  componentDidMount () {
    var MQ = MathQuill.getInterface(2)
    if (this.props.show_answer) { // fill right hand side
      var answerBox = MQ(document.getElementById('15'))

      this.setState({
        answer: { 'data': this.props.answer, 'box': answerBox },
        answersSteps: [[
          {'data': '', 'box': MQ(document.getElementById('11'))},
          {'data': '', 'box': MQ(document.getElementById('21'))}
        ]] // column set by default]
      }, function () {
        this.setLatexWoFireEvent(answerBox, this.props.answer)
      })
    } else { // fill left hand side
      var numBox, denumBox
      numBox = MQ(document.getElementById('11'))
      denumBox = MQ(document.getElementById('21'))

      this.setState({
        answersSteps: [[
          {'data': this.props.numerator, 'box': numBox},
          {'data': this.props.denominator, 'box': denumBox}
        ]]
      }, function () {
        // this.setLatexWoFireEvent(numBox, this.props.numerator)
        // this.setLatexWoFireEvent(denumBox, this.props.denominator)
        // this.reDrawStrikes()
        numBox.latex(this.props.numerator)
        denumBox.latex(this.props.denominator)
      })
    }
  }

  updateExternalAnswer () {
    var answerSteps = this.state.answersSteps

    var numSplit = answerSteps[0][0]['splitData']
    var denSplit = answerSteps[0][0]['splitData']

    var numQty = null
    var denomQty = null

    if (numSplit) { numQty = this.getQtyFromSplitData(numSplit) }
    if (denSplit) { denomQty = this.getQtyFromSplitData(denSplit) }

    var answerSplit = null

    if (typeof this.state.answer !== 'undefined' && this.state.answer['data']){
      answerSplit = this.constructor.parseToValueUnit(this.state.answer['data'])
    }

    if (numQty && denomQty && answerSplit) {
      var baseCompareLst = this.getBaseFor2Qty(numQty, denomQty)

      this.props.updateAnswer([
        this.props.uuid,
        {
          unit_conversion: {
            answer: answerSplit[0] + answerSplit[1],
            numerator: baseCompareLst[0],
            denominator: baseCompareLst[1]
          }
        }
      ])
    }
  }

  // result answer change
  onResultChange (data, row, col, mathquillObj) {
    var MQ = MathQuill.getInterface(2)

    if (this.props.show_answer) {
      var emptyLeftSide = false
      if ((typeof MQ(document.getElementById('11')).latex === 'undefined' || MQ(document.getElementById('11')).latex() === '') &&
        (typeof MQ(document.getElementById('21')).latex === 'undefined' || MQ(document.getElementById('21')).latex() === '')) {
        emptyLeftSide = true
      }

      if (typeof this.state.answer !== 'undefined' && emptyLeftSide) {
        this.setLatexWoFireEvent(mathquillObj, this.state.answer['data']) // disable editing answer
      } else {
        this.setLatexWoFireEvent(mathquillObj, this.calculateAnswer()) // recalculate answer from lefside
      }
    } else { // show num & denum
      this.setState({
        answer: {'data': data, 'box': mathquillObj}
      })
    }

    this.updateExternalAnswer()
  }

  calculateAnswer () {
    // if (typeof this.state.uncrossedUnits !== 'undefined') {
    //   var unit = ''
    //   var numValue = null
    //   if (this.state.uncrossedUnits['nums'].length === 1) {
    //     // GET unit from numerator
    //     unit = '\\ ' + this.state.uncrossedUnits['nums'][0]
    //     if (typeof this.state.answersSteps[0][0].splitData !== 'undefined' &&
    //         this.state.answersSteps[0][0].splitData) {
    //       numValue = this.state.answersSteps[0][0].splitData[0]
    //     }
    //   }
    //   if (this.state.uncrossedUnits['denoms'].length === 0) { // all has been striked
    //     if (typeof this.state.answersSteps[0][1].splitData !== 'undefined' &&
    //         this.state.answersSteps[0][1].splitData) {
    //       var denomValue = this.state.answersSteps[0][1].splitData[0]
    //       if (denomValue === '') { denomValue = 1 }
    //
    //       var answerValue = this.props.number / denomValue
    //       if (numValue) {
    //         answerValue *= numValue
    //       }
    //       return answerValue + unit
    //     }
    //   }
    // }

    var numUnits = []
    var denomUnits = []

    var answerValue = this.props.number

    // exclude strikethrouth
    if (!this.state.strikethroughN) {
      numUnits.push(this.props.unit.split('/')[0])
    }
    if (!this.state.strikethroughD && this.props.unit.split('/').length > 1) {
      denomUnits.push(this.props.unit.split('/')[1])
    }

    var numSplitData = this.state.answersSteps[0][0].splitData
    // test if it simple Number
    if (!numSplitData && (Number(this.state.answersSteps[0][0].data) === Number(this.state.answersSteps[0][0].data))) {
      numSplitData = [Number(this.state.answersSteps[0][0].data)]
    }
    if (typeof numSplitData !== 'undefined' && numSplitData) {
      var numValue = numSplitData[0]
      if (numValue === '') { numValue = 1 }

      if (numValue) {
        answerValue *= numValue
      }
      if (numSplitData[1] && this.state.uncrossedUnits['nums'].length > 0) {
        numUnits.push(numSplitData[1])
      }
    }

    var denomSplitData = this.state.answersSteps[0][1].splitData
    // test if it simple Number
    if (!denomSplitData && (Number(this.state.answersSteps[0][1].data) === Number(this.state.answersSteps[0][1].data))) {
      denomSplitData = [Number(this.state.answersSteps[0][1].data)]
    }
    if (typeof denomSplitData !== 'undefined' && denomSplitData) {
      var denomValue = denomSplitData[0]
      if (denomValue === '') { denomValue = 1 }

      if (denomValue) {
        answerValue = answerValue / denomValue
      }

      if (denomSplitData[1] && this.state.uncrossedUnits['denoms'].length > 0) {
        denomUnits.push(denomSplitData[1])
      }
    }

    var unit

    if (denomUnits.length > 0) {
      unit = '\\frac{' + numUnits.join('*') + '}{' + denomUnits.join('*') + '}'
    } else {
      unit = numUnits.join('*')
    }

    return answerValue + unit
  }

  getQtyFromSplitData (splitData) { // TODO move to game
    if (splitData) {
      return Qty.parse(splitData[0], splitData[1])
    }
    return null
  }

  onMathQuillChange (data, row, col, mathquillObj) {
    super.onMathQuillChange(data, row, col, mathquillObj)
    var MQ = MathQuill.getInterface(2)

    var answerSteps = this.state.answersSteps

    if (this.props.show_answer) { // automatically fill right hand box
      var answerBox = MQ(document.getElementById('15'))
      this.setLatexWoFireEvent(answerBox, this.calculateAnswer())
    } else { // disable left side editing
      var numeratorBox = MQ(document.getElementById('11'))
      var denominatorBox = MQ(document.getElementById('21'))
      this.setLatexWoFireEvent(numeratorBox, this.props.numerator)
      this.setLatexWoFireEvent(denominatorBox, this.props.denominator)

      answerSteps[0][0]['data'] = this.props.numerator
      answerSteps[0][1]['data'] = this.props.denominator
      answerSteps[0][0]['splitData'] = this.constructor.parseToValueUnit(this.props.numerator)
      answerSteps[0][1]['splitData'] = this.constructor.parseToValueUnit(this.props.denominator)

      this.setState({
        answerSteps: answerSteps
      }, function () {
        this.reDrawStrikes()
      })
    }

    this.updateExternalAnswer()
  }

  render () {
    return (<div style={{display: 'block'}}>
      <div style={{display: 'table', marginLeft: 'auto', marginRight: 'auto'}}>
        <ConversionTable
          numColumns={1}
          onMathQuillChange={this.onMathQuillChange}
          number={this.props.number}
          unit={this.props.unit}
          strikethroughN={this.state.strikethroughN}
          strikethroughD={this.state.strikethroughD}
        />
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
    )
  }
}
UnitConversionCanvas.propTypes = {
  updateAnswer: React.PropTypes.func.isRequired,
  answer: React.PropTypes.string,
  numerator: React.PropTypes.string,
  denominator: React.PropTypes.string,
  show_answer: React.PropTypes.bool
}

export class SingleUnitConversionAnswer extends React.Component {
  constructor () {
    super()
    this.questionId = null
  }

  reset () {
    this.answer.latex('')
  }

  render () {
    var [number, unit] = UnitConversionBase.parseToValueUnit(this.props.question.additional_text)

    return (<div className='bounding-box'>
      <UnitConversionCanvas
        answer={this.props.question.unit_conversion.answer}
        number={number}
        unit={unit}
        numerator={this.props.question.unit_conversion.numerator}
        denominator={this.props.question.unit_conversion.denominator}
        show_answer={this.props.question.unit_conversion.show_answer}
        updateAnswer={this.props.updateAnswer}
        uuid={this.props.question.uuid}
      />
    </div>)
  }
}
SingleUnitConversionAnswer.propTypes = {
  updateAnswer: React.PropTypes.func.isRequired,
  question: React.PropTypes.object
}
