import React from 'react'

import ReactMde from 'react-mde'
// import * as Showdown from 'showdown'
import Showdown from 'showdown'

import { EditableThumbnail } from './thumbnail'
import { EditableLabel } from './label'
import { AnswerTypes, AnswerTypeLabels } from '../constants'

import { MultipleChoiceAnswers } from './multiple_choice_answers'
import { MathematicalExpressionAnswerContainer } from '../containers/mathematical_expression_answer'
import { TextAnswerContainer } from '../containers/text_answer'
import { MySQLAnswerContainer } from '../containers/mysql_answer'
import { VectorAnswerContainer } from '../containers/vector_answer'
import { UnitConversionAnswerContainer } from '../containers/unit_conversion_answer'
import { VectorComponentsAnswerContainer } from '../containers/vector_components_answer'
import { QuestionVectorsContainer } from '../containers/question_vectors'
import { FaChevronLeft } from 'react-icons/fa'

export const DEFAULT_MATHJAX_OPTIONS = {
  extensions: ['tex2jax.js'],
  jax: ['input/TeX', 'output/HTML-CSS'],
  tex2jax: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true
  },
  'HTML-CSS': { availableFonts: ['TeX'] }
}

export class Question extends React.Component {
  constructor (props) {
    super(props)
    this.handleShowSolutionEditor = this.handleShowSolutionEditor.bind(this)
    this.handleChangeSolutionContent = this.handleChangeSolutionContent.bind(this)
    this.onSolutionContentSave = this.onSolutionContentSave.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)

    this.state = {
      showSolutionEditor: false,
      solutionText: props.solution_text || '',
      mdeTab: 'write'
    }
  }

  handleShowSolutionEditor () {
    this.setState({showSolutionEditor: !this.state.showSolutionEditor})
  }

  handleChangeSolutionContent (val) {
    this.setState({solutionText: val})
  }

  onSolutionContentSave () {
    if (this.state.solutionText) {
      this.props.onChangeSolutionText(this.state.solutionText)
      this.handleShowSolutionEditor()
    }
  }

  handleTabChange (tab) {
    this.setState({ mdeTab: tab })
  }

  componentDidMount () {
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS)
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  }
  componentDidUpdate () {
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS)
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.solution_text !== this.state.solution_text) {
      if (nextProps.solution_text === null) {
        this.setState({ solutionText: '' })
      } else {
        this.setState({ solutionText: nextProps.solution_text })
      }
    }
  }

  render () {
    if (this.props.loading) {
      return <div>Loading...</div>
    }
    var typeOptions = Object.entries(AnswerTypeLabels).map(
      ([typeId, typeDisplay]) => (
        <option key={typeId} value={typeId}>
          {typeDisplay}
        </option>
      )
    )

    var answersEditor

    if (
      this.props.answer_type === AnswerTypes.MULTIPLE_CHOICE ||
      this.props.answer_type === AnswerTypes.MULTISELECT_CHOICE
    ) {
      answersEditor = (
        <MultipleChoiceAnswers
          answers={this.props.answers}
          onAddAnswerClick={this.props.onAddAnswerClick}
          exclusive={this.props.answer_type === AnswerTypes.MULTIPLE_CHOICE}
          hasPictures={this.props.hasPictures}
        />
      )
    } else if (this.props.answer_type === AnswerTypes.MATHEMATICAL_EXPRESSION) {
      answersEditor = (
        <MathematicalExpressionAnswerContainer uuid={this.props.answers[0]} />
      )
    } else if (this.props.answer_type === AnswerTypes.TEXT) {
      answersEditor = <TextAnswerContainer uuid={this.props.answers[0]} />
    } else if (this.props.answer_type === AnswerTypes.MYSQL) {
      answersEditor = <MySQLAnswerContainer uuid={this.props.answers[0]} />
    } else if (
      this.props.answer_type === AnswerTypes.VECTOR ||
      this.props.answer_type === AnswerTypes.NULLABLE_VECTOR
    ) {
      answersEditor = (
        <VectorAnswerContainer
          uuid={this.props.answers[0]}
          allowNull={this.props.answer_type === AnswerTypes.NULLABLE_VECTOR}
        />
      )
    } else if (this.props.answer_type === AnswerTypes.UNIT_CONVERSION) {
      answersEditor = (
        <UnitConversionAnswerContainer uuid={this.props.answers[0]} />
      )
    } else if (this.props.answer_type === AnswerTypes.VECTOR_COMPONENTS) {
      answersEditor = (
        <VectorComponentsAnswerContainer uuid={this.props.answers[0]} />
      )
    }

    const markdownConverter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    })

    const solutionEditor = <div>
      <a className={'back-button'} onClick={this.handleShowSolutionEditor} >
        <FaChevronLeft /> back to question
      </a>
      <ReactMde
        onChange={this.handleChangeSolutionContent}
        value={this.state.solutionText}
        selectedTab={this.state.mdeTab}
        onTabChange={this.handleTabChange}
        generateMarkdownPreview={markdown =>
          Promise.resolve(markdownConverter.makeHtml(markdown))
        }
      />
      <br />
      <button className='btn btn-primary' onClick={this.onSolutionContentSave}>Save</button>
    </div>

    return (
      <div className='question'>
        {this.state.showSolutionEditor
          ? solutionEditor
          : <div>
            <div className={'curriculum-title'} style={{textAlign: 'right'}}>
              <a
                style={{cursor: 'pointer'}}
                onClick={this.handleShowSolutionEditor}
              >Edit solution</a>
            </div>
            <div className='row'>
              <div className='col-md-6 text-center'>
                <div className='bounding-box'>
                  <h1>
                    <EditableLabel
                      value={this.props.text}
                      onChange={this.props.onTextChange}
                      defaultValue='New question'
                    />
                  </h1>
                  <div className='thumbnail question-image'>
                    {this.props.answer_type != AnswerTypes.VECTOR_COMPONENTS && (
                      <EditableThumbnail
                        image={this.props.image}
                        onChange={this.props.onImageChange}
                      />
                    )}
                    {this.props.answer_type === AnswerTypes.VECTOR_COMPONENTS && (
                      <QuestionVectorsContainer uuid={this.props.uuid} />
                    )}
                  </div>
              Hint:{' '}
                  <EditableLabel
                    value={this.props.hint}
                    onChange={this.props.onHintChange}
                  />
                </div>
              </div>
              <div className='col-md-6 text-center answer-block'>
                <div className='bounding-box'>
                  <select
                    className='question-type'
                    onChange={this.props.onTypeChange}
                    value={this.props.answer_type}
                  >
                    {typeOptions}
                  </select>
                  {answersEditor}
                  <div className='clearfix' />
                </div>
              </div>
            </div>
          </div> }
      </div>
    )
  }
}
