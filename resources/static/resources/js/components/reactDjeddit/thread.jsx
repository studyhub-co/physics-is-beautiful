// TODO move reactDjeddit to lib app

import React from 'react'

import PropTypes from 'prop-types'

import { Post } from './post'
import { ReplyForm } from './replyForm'

export class Thread extends React.Component {
  renderPost (post, onSubmitReplay, onSubmitEdit) {
    let widthRem = post.level + 'rem'

    if (post.level === 0) { return null }

    return <div key={post.uid} style={{paddingLeft: widthRem}}>
      <div style={{width: widthRem, display: 'inline-block', height: '100%', boxSizing: 'border-box'}}>
        {/* TODO: add threadline if needed */}
      </div>
      <div style={{position: 'relative'}}>
        <Post
          post={post}
          onSubmitReplay={onSubmitReplay}
          onSubmitEdit={onSubmitEdit}
          currentProfile={this.props.currentProfile}
          changePostVote={this.props.changePostVote}
          onDelete={this.props.onDeletePost}
        />
      </div>
    </div>
  }

  render () {
    return (
      <div>
        <div>
          {this.props.thread && this.props.currentProfile
            ? <ReplyForm
              parentPost={this.props.thread.posts_in_tree_order[0]}
              currentProfile={this.props.currentProfile}
              onSubmitPost={this.props.onSubmitPost}
            />
            : null
          }
        </div>
        { this.props.thread.posts_in_tree_order.map(function (post, i) {
          return this.renderPost(post, this.props.onSubmitPost, this.props.onSubmitEditPost)
        }, this)}
      </div>
    )
  }
}

Thread.propTypes = {
  thread: PropTypes.object.isRequired,
  currentProfile: PropTypes.object,
  onSubmitPost: PropTypes.func.isRequired,
  onSubmitEditPost: PropTypes.func.isRequired,
  changePostVote: PropTypes.func.isRequired,
  onDeletePost: PropTypes.func.isRequired
}
