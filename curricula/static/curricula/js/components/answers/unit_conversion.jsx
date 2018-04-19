import React from 'react'
import {UnitConversionBase, ConversionTable, MathquillBox} from '../../games/unit_conversion'
import Draggable from 'react-draggable'
/* global MathQuill */

class UnitConversionCanvas extends UnitConversionBase {
  initialBoxes (props) {
    var spanBoxesIds = ['11', '21', '15']

    for (var i = 0; i < spanBoxesIds.length; i++) {
      document.getElementById(spanBoxesIds[i]).classList.remove('green-border')
      document.getElementById(spanBoxesIds[i]).classList.remove('red-border')
      document.getElementById(spanBoxesIds[i]).style.pointerEvents = 'auto'
    }

    var MQ = MathQuill.getInterface(2)

    var numBox = MQ(document.getElementById('11'))
    var denumBox = MQ(document.getElementById('21'))
    var answerBox = MQ(document.getElementById('15'))

    if (props.unit_conversion_type === '10') { // fill right hand side
      // fist column reset
      this.setLatexWoFireEvent(numBox, '')
      this.setLatexWoFireEvent(denumBox, '')

      document.getElementById('15').style.pointerEvents = 'none'
      document.getElementById('15').firstElementChild.firstElementChild.setAttribute('tabindex', '-1')

      this.setState({
        answer: { 'data': props.answer_number + '\ ' + props.answer_unit, 'box': answerBox },
        numColumns: 1,
        answersSteps: [[
          {'data': '', 'box': MQ(document.getElementById('11'))},
          {'data': '', 'box': MQ(document.getElementById('21'))}
        ]] // column set by default
      }, function () {
        this.setLatexWoFireEvent(answerBox, props.answer_number + '\\ ' + props.answer_unit)
        // set focus on 1st box
        MQ(document.getElementById('11')).focus()
      })
    }

    if (props.unit_conversion_type === '20') { // fill left hand side
      var answersSteps = []

      this.setLatexWoFireEvent(answerBox, '')

      this.setState({
        numColumns: props.conversion_steps.length
      }, function () {
        for (var x = 0; x < props.conversion_steps.length; x++) {
          if (props.conversion_steps[x]['numerator'] &&
              props.conversion_steps[x]['denominator']) {
            answersSteps.push([
              {'data': props.conversion_steps[x]['numerator'],
                'splitData': this.constructor.parseToValueUnit(this.clearDataText(props.conversion_steps[x]['numerator'])),
                'box': MQ(document.getElementById('1' + (x + 1)))},
              {'data': props.conversion_steps[x]['denominator'],
                'splitData': this.constructor.parseToValueUnit(this.clearDataText(props.conversion_steps[x]['denominator'])),
                'box': MQ(document.getElementById('2' + (x + 1)))}
            ])

            this.setLatexWoFireEvent(answersSteps[x][0]['box'], answersSteps[x][0]['data'])
            this.setLatexWoFireEvent(answersSteps[x][1]['box'], answersSteps[x][1]['data'])
            answersSteps[x][0]['box'].__controller.container[0].style.pointerEvents = 'none'
            answersSteps[x][1]['box'].__controller.container[0].style.pointerEvents = 'none'
          }
        }
        this.setState({
          answersSteps: answersSteps,
          numColumns: answersSteps.length
        }, function () {
          this.reDrawStrikes()
        })
      })
    }

    if (props.unit_conversion_type === '30') { // no fill any side
      // set focus on 1st box
      MQ(document.getElementById('11')).focus()
      this.setState({
        answersSteps: [[
          {'data': '', 'box': MQ(document.getElementById('11'))},
          {'data': '', 'box': MQ(document.getElementById('21'))}
        ]]
      }, function () {
        // set focus on 1st box
        MQ(document.getElementById('11')).focus()
      })
    }
  }

  componentDidMount () {
    this.reset()
    this.props.updateAnswer(null)
    this.initialBoxes(this.props)
  }

  componentWillReceiveProps (newProps) {
    // UnitConversionCanvas is child for SingleUnitConversionAnswer where props.question located
    if (newProps.uuid !== this.props.uuid) {
      this.reset()
      this.props.updateAnswer(null)
      this.initialBoxes(newProps)
    }
  }

  updateExternalAnswer () {
    var answerSteps = this.state.answersSteps
    var conversionSteps = []

    if (this.props.unit_conversion_type === '20') {
      conversionSteps = this.props.conversion_steps
    } else {
      for (var x = 0; x < answerSteps.length; x++) {
        try {
          conversionSteps.push({
            'numerator': answerSteps[x][0]['splitData'].join(' '),
            'denominator': answerSteps[x][1]['splitData'].join(' ')
          })
        } catch (err) {}
      }
    }

    var answerSplit = null

    if (typeof this.state.answer !== 'undefined' && this.state.answer['box']) {
      answerSplit = this.constructor.parseToValueUnit(this.clearDataText(this.state.answer['box'].latex()))
    }

    if (conversionSteps.length != 0) {
      if (answerSplit) {
        this.props.updateAnswer([
          this.props.uuid,
          {
            unit_conversion: {
              answer_number: answerSplit[0],
              answer_unit: answerSplit[1],
              conversion_steps: conversionSteps
            }
          }
        ])
      }
    } else { // if no steps - do not update
      this.props.updateAnswer(null)
    }
  }

  // result answer change
  onResultChange (data, row, col, mathquillObj) {
    if (this.props.unit_conversion_type === '10') {
      this.setLatexWoFireEvent(mathquillObj, this.calculateAnswer()) // recalculate answer from lefside
    } else { // show num & denum
      this.setState({
        answer: {'data': data, 'box': mathquillObj}
      })
    }

    this.updateExternalAnswer()
  }

  calculateAnswer () {
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

    var uncrossedUnits = Object.assign({}, this.state.uncrossedUnits)

    for (var x = 0; x < this.state.answersSteps.length; x++) {
      var numSplitData = this.state.answersSteps[x][0].splitData
      var numAnswerData = this.clearDataText(this.state.answersSteps[x][0].data).split(' ')[0]

      // test if it simple Number
      if (!numSplitData && (Number(numAnswerData) === Number(numAnswerData))) {
        numSplitData = [Number(numAnswerData)]
      }

      if (typeof numSplitData !== 'undefined' && numSplitData) {
        var numValue = numSplitData[0]
        if (numValue === '') { numValue = 1 }

        if (numValue || numAnswerData.trim() === '0') {
          answerValue *= numValue
        }
        if (numSplitData[1] && uncrossedUnits['nums'].length > 0) {
          var indexNUnit = uncrossedUnits['nums'].indexOf(numSplitData[1])
          if (indexNUnit !== -1) {
            // remove unti from nums
            uncrossedUnits['nums'].splice(indexNUnit, 1)
            numUnits.push(numSplitData[1])
          }
        }
      }

      var denomSplitData = this.state.answersSteps[x][1].splitData
      var denomAnswerData = this.clearDataText(this.state.answersSteps[x][1].data).split(' ')[0]

      // test if it simple Number
      if (!denomSplitData && (Number(denomAnswerData) === Number(denomAnswerData))) {
        denomSplitData = [Number(denomAnswerData)]
      }

      if (typeof denomSplitData !== 'undefined' && denomSplitData) {
        var denomValue = denomSplitData[0]
        if (denomValue === '') { denomValue = 1 }

        if (denomValue || denomAnswerData.trim() === '0') {
          answerValue = answerValue / denomValue
        }

        if (denomSplitData[1] && uncrossedUnits['denoms'].length > 0) {
          var indexDUnit = uncrossedUnits['denoms'].indexOf(denomSplitData[1])
          if (indexDUnit !== -1) {
            uncrossedUnits['denoms'].splice(indexDUnit, 1)
            denomUnits.push(denomSplitData[1])
          }
        }
      }
    }

    var unit

    if (denomUnits.length > 0) {
      unit = '\\frac{' + numUnits.join('*') + '}{' + denomUnits.join('*') + '}'
    } else {
      unit = numUnits.join('*')
    }

    return answerValue + '\\ ' + unit
  }

  // one of the boxes value changed
  onMathQuillChange (data, row, col, mathquillObj) {
    super.onMathQuillChange(data, row, col, mathquillObj)
    var MQ = MathQuill.getInterface(2)

    var answerSteps = this.state.answersSteps

    // TODO remove, seems it is filled in parent onMathQuillChange
    // answerSteps[col - 1][row - 1]['data'] = this.clearDataText(data) // .replace(splitNumerator[1], '\\class{strikethrough}{' + splitNumerator[1] + '}')
    // answerSteps[col - 1][row - 1]['splitData'] = this.constructor.parseToValueUnit(this.clearDataText(data))

    if (this.props.unit_conversion_type === '10') { // automatically fill right hand box | left side blank
      var answerBox = MQ(document.getElementById('15'))
      this.setLatexWoFireEvent(answerBox, this.calculateAnswer())
    }
    // all side blank | right side blank - do nothing

    this.setState({
      answerSteps: answerSteps
    })

    this.updateExternalAnswer()
  }

  render () {
    if (typeof this.props.is_correct_answer !== 'undefined') { // user gave answer
      var spanBoxes = []
      if (this.props.unit_conversion_type === '20' || '30') { // RIGHT SIDE BLANK
        spanBoxes.push(15)
      }
      if (this.props.unit_conversion_type === '10' || '30') { // LEFT SIDE BLANK
        for (var x = 0; x < this.state.answersSteps.length; x++) {
          spanBoxes.push('1' + (x + 1))
          spanBoxes.push('2' + (x + 1))
        }
      }

      for (var i = 0; i < spanBoxes.length; i++) {
        var element = document.getElementById(spanBoxes[i])
        element.style.pointerEvents = 'none' // disable editable

        if (this.props.is_correct_answer === true) {
          element.classList.add('green-border') // green if correct
        }

        if (this.props.is_correct_answer === false) {
          element.classList.add('red-border') // red if incorrect
        }
      }
    }

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

    return (<div style={{display: 'block'}}>
      <div style={{display: 'table', marginLeft: 'auto', marginRight: 'auto'}}>
        <ConversionTable
          numColumns={this.state.numColumns}
          onMathQuillChange={this.onMathQuillChange}
          number={this.props.number}
          unit={this.props.unit}
          strikethroughN={this.state.strikethroughN}
          strikethroughD={this.state.strikethroughD}
        />
        {this.props.unit_conversion_type === '20' ? null
          : <div style={{fontSize: 10, display: 'table-cell', verticalAlign: 'middle', paddingLeft: 0, paddingRight: 0}}>
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
            focus={this.props.unit_conversion_type === '20'}
          />
        </div>
      </div>
    </div>
    )
  }
}
UnitConversionCanvas.propTypes = {
  updateAnswer: React.PropTypes.func.isRequired,
  unit_conversion_type: React.PropTypes.string,
  conversion_steps: React.PropTypes.array,
  is_correct_answer: React.PropTypes.bool
}

export class UnitConversionAnswer extends React.Component {
  render () {
    var number = this.props.question.unit_conversion.question_number
    var unit = this.props.question.unit_conversion.question_unit

    return (
      <div>
        <Draggable disabled={screen.width > 736} axis='x' bounds={{left: -screen.width + 100, top: 0, right: screen.width - 100, bottom: 0}} cancel='.mq-root-block'>
          <div className='bounding-box'>
            <UnitConversionCanvas
              answer_number={this.props.question.unit_conversion.answer_number}
              answer_unit={this.props.question.unit_conversion.answer_unit}
              number={number}
              unit={unit}
              unit_conversion_type={this.props.question.unit_conversion.unit_conversion_type}
              conversion_steps={this.props.question.unit_conversion.conversion_steps}
              updateAnswer={this.props.updateAnswer}
              uuid={this.props.question.uuid}
              is_correct_answer={this.props.correct}
            />
          </div>
        </Draggable>
      </div>)
  }
}
UnitConversionAnswer.propTypes = {
  updateAnswer: React.PropTypes.func.isRequired,
  question: React.PropTypes.object,
  correct: React.PropTypes.bool
}
