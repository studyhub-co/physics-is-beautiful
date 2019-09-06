import React from 'react'

import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import { Row, Col } from 'react-bootstrap'

import { renderMathJs } from './utils'

export class ReplyForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      content: ''
    }

    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeContent (event) {
    this.setState({content: event.target.value})
    var that = this

    setTimeout(function () {
      var el = document.getElementById(that.props.parentPost.uid + 'id_content')
      that.setState({content: el.value})
    }, 1000) // pageeditor preview hack, more info in Markdown.Editor.js
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.onSubmitPost({
      content: this.state.content,
      parent: this.props.parentPost.uid
    })
    this.setState({content: ''})
  }

  componentDidMount () {
    DjangoPagedown.init(this.props.parentPost.uid + 'id_content')
  }

  componentWillUnmount () {
    DjangoPagedown.destroyEditor(this.props.parentPost.uid + 'id_edit_content')
  }

  render () {
    return (
      <Row>
        <Col md={11}>
          <div className='post-container bs-callout'>
            {this.props.parentPost.level === 0
              ? <div className=''><h6 style={{display: 'inline'}} className=''>Comment as </h6>
                { this.props.currentProfile
                  ? <h4 className='' style={{display: 'inline'}}>
                    <a href={this.props.currentProfile.get_absolute_url} target={'blank'}>
                      {this.props.currentProfile.display_name}
                    </a>
                  </h4>
                  : null }
              </div>
              : <div className=''><h6 style={{display: 'inline'}} className=''>Reply to </h6>
                <h4 className='' style={{display: 'inline'}}>
                  {this.props.parentPost.created_by
                    ? <a href={this.props.parentPost.created_by.get_absolute_url} target={'blank'}>
                      {this.props.parentPost.created_by.display_name}
                    </a>
                    : 'Guest'
                  }
                </h4>
              </div>
            }
            <br />
            <form method='post' acceptCharset='utf-8' onSubmit={this.handleSubmit}>
              {/*<textarea value={this.state.content} onChange={this.handleChangeContent} />*/}
              <div id='div_id_content' className='control-group'>
                <div className='controls'>
                  <div className='wmd-wrapper' id='id_content-wmd-wrapper'>
                    <div className='wmd-panel'>
                      <div id={this.props.parentPost.uid + 'id_content_wmd_button_bar'} />
                      <textarea
                        style={{height: '10rem'}}
                        className='pagedownwidget wmd-input'
                        cols='40'
                        id={this.props.parentPost.uid + 'id_content'}
                        name='content'
                        rows='10'
                        required
                        value={this.state.content}
                        onBlur={this.handleChangeContent}
                        onChange={this.handleChangeContent}
                      /></div>
                    <p className='wmd-preview-title'>
                      <small>Preview:</small>
                    </p>
                    <div className='wmd-panel wmd-preview'>
                      {renderMathJs(<ReactMarkdown source={this.state.content} />)}
                    </div>
                    {/* native pagedown editor preview: */}
                    {/*<div id={this.props.parentPost.uid + 'id_content_wmd_preview'} className='wmd-panel wmd-preview' />*/}
                  </div>
                </div>
              </div>
              <div className='btn-group btn-group-xs' role='group'>
                {this.props.parentPost.level === 0
                  ? <button
                    className={'common-button' + (this.state.content === '' ? ' disabled-button' : '')}
                    type='submit'
                    disabled={this.state.content === ''}>Comment</button>
                  : <span>
                    <button className='common-button' type='submit' disabled={this.state.content === ''}>Reply</button>
                    &nbsp;<span className='pib-link' type='reset' onClick={this.props.onToggleForm}>Cancel</span>
                  </span>
                }
              </div>
            </form>
          </div>
        </Col>
      </Row>
    )
  }
}

ReplyForm.propTypes = {
  parentPost: PropTypes.object.isRequired,
  currentProfile: PropTypes.object.isRequired,
  onSubmitPost: PropTypes.func.isRequired,
  onToggleForm: PropTypes.func
}
