import React from 'react';

import {EditableThumbnail} from './thumbnail';
import {EditableLabel} from './label'
import {AnswerTypes, AnswerTypeLabels} from '../constants';

import {MultipleChoiceAnswers} from './multiple_choice_answers';
import {MathematicalExpressionAnswerContainer} from '../containers/mathematical_expression_answer';
import {VectorAnswerContainer} from '../containers/vector_answer';
import {UnitConversionAnswerContainer} from '../containers/unit_conversion_answer'
import {VectorComponentsAnswerContainer} from '../containers/vector_components_answer'
import {QuestionVectorsContainer} from '../containers/question_vectors'

export const DEFAULT_MATHJAX_OPTIONS = {
  extensions: ['tex2jax.js'],
  jax: ['input/TeX', 'output/HTML-CSS'],
  tex2jax: {
    inlineMath: [ ['$', '$'], ['\\(', '\\)'] ],
    displayMath: [ ['$$', '$$'], ['\\[', '\\]'] ],
    processEscapes: true
  },
  'HTML-CSS': { availableFonts: ['TeX'] }
}



export class Question extends React.Component {

  componentDidMount () {
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS);
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }
  componentDidUpdate () {
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS);
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }
  
  render() {
    if (this.props.loading) {
      return <div>Loading...</div>
    }
    var typeOptions = Object.entries(AnswerTypeLabels).map(([typeId, typeDisplay]) => <option key={typeId} value={typeId}>{typeDisplay}</option>);

    var answersEditor;

    if (this.props.answer_type === AnswerTypes.MULTIPLE_CHOICE || this.props.answer_type === AnswerTypes.MULTISELECT_CHOICE){
      answersEditor = <MultipleChoiceAnswers answers={this.props.answers} onAddAnswerClick={this.props.onAddAnswerClick}
                                             exclusive={this.props.answer_type === AnswerTypes.MULTIPLE_CHOICE} hasPictures={this.props.hasPictures}/>
    } else if (this.props.answer_type === AnswerTypes.MATHEMATICAL_EXPRESSION) {
      answersEditor = <MathematicalExpressionAnswerContainer uuid={this.props.answers[0]}/>
    } else if (this.props.answer_type === AnswerTypes.VECTOR || this.props.answer_type === AnswerTypes.NULLABLE_VECTOR) {
      answersEditor = <VectorAnswerContainer uuid={this.props.answers[0]} allowNull={this.props.answer_type === AnswerTypes.NULLABLE_VECTOR}/>
    } else if (this.props.answer_type === AnswerTypes.UNIT_CONVERSION)
      answersEditor = <UnitConversionAnswerContainer uuid={this.props.answers[0]}/>
      else if (this.props.answer_type === AnswerTypes.VECTOR_COMPONENTS)
        answersEditor = <VectorComponentsAnswerContainer uuid={this.props.answers[0]}/>
        
    
    return (
      <div className="question">
        <div className="row">
          <div className="col-md-6 text-center">
            <div className="bounding-box">
              <h1>
                <EditableLabel value={this.props.text} onChange={this.props.onTextChange} defaultValue="New question"/>
              </h1>
              <div className="thumbnail question-image">
                {this.props.answer_type != AnswerTypes.VECTOR_COMPONENTS &&
                  <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>
                  }
                  {this.props.answer_type === AnswerTypes.VECTOR_COMPONENTS &&
                    <QuestionVectorsContainer uuid={this.props.uuid}/> 
                  }
              </div>
              Hint: <EditableLabel value={this.props.hint} onChange={this.props.onHintChange}/>
            </div>
          </div>
          <div className="col-md-6 text-center answer-block">
            <div className="bounding-box">
              <select className="question-type" onChange={this.props.onTypeChange} value={this.props.answer_type}>{typeOptions}</select>
              {answersEditor}
              <div className="clearfix"/>
            </div>
          </div>
        </div>
      </div>)
  }
}
