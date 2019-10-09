import React from 'react'

import PropTypes from 'prop-types'
import ReactMde from 'react-mde'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// import Showdown from 'showdown'
import { FaChevronLeft, FaPen, FaCodeBranch } from 'react-icons/fa'
import { WithOutContext as ReactTags } from 'react-tag-input'

import { EditableLabel } from '../components/label'
// import { MySQLAnswerContainer } from '../containers/mysql_answer'
import { tagDelimiters } from '../../../../utils/index'
import markdownConverter from '../../../../utils/markdownConverter'
import StructureItemMenu from './structure_item_menu'

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

export class Material extends React.Component {
  constructor (props) {
    super(props)
    this.handleShowSolutionEditor = this.handleShowSolutionEditor.bind(this)
    this.handleChangeSolutionContent = this.handleChangeSolutionContent.bind(this)
    this.onSolutionContentSave = this.onSolutionContentSave.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
    this.handleTagDelete = this.handleTagDelete.bind(this)
    this.handleTagAddition = this.handleTagAddition.bind(this)

    let tags = []
    if (props.hasOwnProperty('tags') && props.tags) {
      tags = props.tags.map((tag) => {
        return { id: tag, text: tag }
      })
    }

    this.state = {
      showSolutionEditor: false,
      solutionText: props.solution_text || '',
      mdeTab: 'write',
      tags: tags
    }
  }

  handleTagDelete (i) {
    const { tags } = this.state
    this.props.onDeleteTag(tags[i])
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    })
  }

  handleTagAddition (tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }))
    this.props.onAddTag(tag)
  }

  handleShowSolutionEditor () {
    this.setState({showSolutionEditor: !this.state.showSolutionEditor})
  }

  handleChangeSolutionContent (val) {
    this.setState({solutionText: val})
  }

  onSolutionContentSave () {
    // if (this.state.solutionText) {
    //   this.props.onChangeSolutionText(this.state.solutionText)
    //   this.handleShowSolutionEditor()
    // }
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
    // if (nextProps.solution_text !== this.state.solution_text) {
    //   if (nextProps.solution_text === null) {
    //     this.setState({ solutionText: '' })
    //   } else {
    //     this.setState({ solutionText: nextProps.solution_text })
    //   }
    // }
  }

  componentWillUpdate (nextProps, nextState, nextContext) {
    // if (nextProps.tags && nextProps.tags !== this.props.tags) {
    //   const tags = nextProps.tags.map((tag) => {
    //     return {id: tag, text: tag}
    //   })
    //   this.setState({tags: tags})
    // }
  }

  render () {
    if (this.props.loading) {
      return <div>Loading...</div>
    }
    const solutionEditor = <div>
      <a className={'back-button'} onClick={this.handleShowSolutionEditor} >
        <FaChevronLeft /> back to material
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
        <div className='row' style={{paddingLeft: '1rem'}}>
          <ReactTags
            tags={this.state.tags}
            placeholder={'Add new material tag'}
            // suggestions={suggestions}
            inputFieldPosition='inline'
            handleDelete={this.handleTagDelete}
            handleAddition={this.handleTagAddition}
            allowDragDrop={Boolean(false)}
            delimiters={tagDelimiters} />
        </div>
        {this.state.showSolutionEditor
          ? solutionEditor
          : <div>
            <div className={'curriculum-title'} style={{textAlign: 'right'}}>
              <div><FaPen /> <a
                style={{cursor: 'pointer'}}
                onClick={this.handleShowSolutionEditor}
              >Edit solution</a></div>
              <div><FaCodeBranch />
                <StructureItemMenu preSelectMenuItem={'fork'} material={{uuid: this.props.uuid}}>
                  Fork this problem
                </StructureItemMenu>
              </div>
            </div>
            <Row>
              <Col md={12} className='text-center'>
                <div className='bounding-box'>
                  <EditableLabel
                    value={this.props.name}
                    onChange={this.props.onNameChange}
                    type={'textarea'}
                    defaultValue='New material'
                  />
                  <br />
                  <h1>this is place for user material (data) editor</h1>
                  <br />
              Hint:{' '}
                  <EditableLabel
                    value={this.props.hint}
                    onChange={this.props.onHintChange}
                  />
                </div>
              </Col>
            </Row>
          </div>}
      </div>
    )
  }
}

Material.propTypes = {
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string,
  onNameChange: PropTypes.func.isRequired,
  onAddTag: PropTypes.func.isRequired,
  onDeleteTag: PropTypes.func.isRequired
}
