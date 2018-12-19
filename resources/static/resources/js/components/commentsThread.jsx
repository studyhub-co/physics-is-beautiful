import React from 'react'

import { Grid, Row, Col, FormControl, Checkbox, Form } from 'react-bootstrap'

export class CommentsThread extends React.Component {
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

  renderReplyForm (comment) {
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
  renderComment () {

  }

  renderNode () {

  }

  render () {
    return (
      <div>
         {/*<Comment.Group>*/}
        {/*{this.renderReplyForm()}*/}
        {/*<Comment>*/}
          {/*<Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />*/}
          {/*<Comment.Content>*/}
            {/*<Comment.Author as='a'>Elliot Fu</Comment.Author>*/}
            {/*<Comment.Metadata>*/}
              {/*<div>Yesterday at 12:30AM</div>*/}
            {/*</Comment.Metadata>*/}
            {/*<Comment.Text>*/}
              {/*<p>This has been very useful for my research. Thanks as well!</p>*/}
            {/*</Comment.Text>*/}
            {/*<Comment.Actions>*/}
              {/*<Comment.Action>Reply</Comment.Action>*/}
            {/*</Comment.Actions>*/}
          {/*</Comment.Content>*/}
          {/*<Comment.Group>*/}
            {/*<Comment>*/}
              {/*<Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />*/}
              {/*<Comment.Content>*/}
                {/*<Comment.Author as='a'>Jenny Hess</Comment.Author>*/}
                {/*<Comment.Metadata>*/}
                  {/*<div>Just now</div>*/}
                {/*</Comment.Metadata>*/}
                {/*<Comment.Text>Elliot you are always so right :)</Comment.Text>*/}
                {/*<Comment.Actions>*/}
                  {/*<Comment.Action>Reply</Comment.Action>*/}
                {/*</Comment.Actions>*/}
              {/*</Comment.Content>*/}
            {/*</Comment>*/}
          {/*</Comment.Group>*/}
        {/*</Comment>*/}

        {/*<Comment>*/}
          {/*<Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />*/}
          {/*<Comment.Content>*/}
            {/*<Comment.Author as='a'>Joe Henderson</Comment.Author>*/}
            {/*<Comment.Metadata>*/}
              {/*<div>5 days ago</div>*/}
            {/*</Comment.Metadata>*/}
            {/*<Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>*/}
            {/*<Comment.Actions>*/}
              {/*<Comment.Action>Reply</Comment.Action>*/}
            {/*</Comment.Actions>*/}
          {/*</Comment.Content>*/}
        {/*</Comment>*/}

      {/*</Comment.Group>*/}
      </div>
    )
  }
}

