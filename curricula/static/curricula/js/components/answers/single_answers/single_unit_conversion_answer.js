import React from 'react'
import {UnitConversionBase, ConversionTable, MathquillBox} from '../../../games/unit_conversion'

/* global MathQuill */

class UnitConversionCanvas extends UnitConversionBase {
  componentDidMount () {
    var MQ = MathQuill.getInterface(2)
    this.setState({
      answersSteps: [[
        {'data': '', 'box': MQ(document.getElementById('11'))},
        {'data': '', 'box': MQ(document.getElementById('12'))}
      ]] // column set by default]
    })
  }

  render () {
    var [number, unit] = this.parseToValueUnit(this.props.initialValue)
    return (<div style={{display: 'block'}}>
      <div style={{display: 'table', marginLeft: 'auto', marginRight: 'auto'}}>
        <ConversionTable
          numColumns={1}
          onMathQuillChange={this.onMathQuillChange}
          number={number}
          unit={unit}
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

export class SingleUnitConversionAnswer extends React.Component {
  constructor () {
    super()
    this.questionId = null
  }

  componentDidMount () {
    //console.log(this.props);
  }

  reset () {
    this.answer.latex('')
  }

  render () {
    return (<div className='bounding-box'>
      <UnitConversionCanvas
        initialValue={this.props.question.additional_text}
        answer={this.props.question.unit_conversion.answer}
        unit={"cm"}
        numerator={this.props.question.unit_conversion.numerator}
        denominator={this.props.question.unit_conversion.denominator}
        show_answer={this.props.question.unit_conversion.show_answer}
      />
    </div>)
  }
}
SingleUnitConversionAnswer.propTypes = {
  updateAnswer: React.PropTypes.func.isRequired
}
