// TODO move reactDjeddit to lib app

import React from 'react'

import PropTypes from 'prop-types'

import { Grid, Row, Col, FormControl, Checkbox, Form, Button } from 'react-bootstrap'

import { Post } from './post'
import { ReplyForm } from './replyForm'

export class Thread extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      replyForm: false,
      replyTo: null,
      replyText: ''
    }

    this.sendReply = this.sendReply.bind(this)
    this.changeReplyAuthor = this.changeReplyAuthor.bind(this)
    this.changeReplyText = this.changeReplyText.bind(this)
    this.toggleReplyForm = this.toggleReplyForm.bind(this)
  }

  changeReplyAuthor (event) {
    this.setState({ replyAuthor: event.currentTarget.value })
  }

  changeReplyText (event) {
    this.setState({ replyText: event.currentTarget.value })
  }

  sendReply () {
    // TODO axios send comment
    this.toggleReplyForm()
  }

  toggleReplyForm () {
    this.setState({ replyForm: !this.state.replyForm })
  }

  renderReplyForm (parent_post = null) {
    if (this.state.replyForm === true) {
      return (
        <Form reply onSubmit={e => e.preventDefault()}>
          Comment as
          {/* TODO add markdown */}
          <Form.TextArea placeholder='Text' onChange={this.changeReplyText} />
          <Button
            content='Comment'
            labelPosition='left'
            icon='edit'
            primary
            onClick={event => this.sendReply(event)}
          />
        </Form>
      )
    }
  }

  // onClick={this.toggleReplyForm}

  renderPost (post) {
    let widthRem = post.level + 'rem'

    if (post.level === 0) { return null }

    return <div key={post.uid} style={{paddingLeft: widthRem}}>
      <div style={{width: widthRem, display: 'inline-block', height: '100%', boxSizing: 'border-box'}}>
        {/* TODO: add threadline if needed*/}
      </div>
      <div style={{position: 'relative'}}>
        <Post post={post} />
      </div>
    </div>
  }

  render () {
    return (
      <div>
        <div>
          <ReplyForm />
        </div>
        { this.props.thread.posts_in_tree_order.map(function (post, i) {
          return this.renderPost(post)
        }, this)}
      </div>
    )
  }
}

Thread.propTypes = {
  thread: PropTypes.object.isRequired,
  current_profile: PropTypes.object
}
