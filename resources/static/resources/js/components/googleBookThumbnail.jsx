import React from 'react'
import PropTypes from 'prop-types'

import { Image } from 'react-bootstrap'

export class GoogleBookThumbnail extends React.Component {
  render () {
    var book = this.props.googleBook
    return (<span>
      <div style={{minHeight: '176px'}}>
        {book.volumeInfo.imageLinks.thumbnail
          ? <Image src={book.volumeInfo.imageLinks.thumbnail} /> // TODO it seems need to replace http->https for production
          : <span>No image</span>
        }
      </div>
      <div className={'blue-text'}>
        {book.volumeInfo.title}
      </div>
      <div>
        {book.volumeInfo.authors && book.volumeInfo.authors.length > 0
          ? <div>{
            book.volumeInfo.authors.map(function (author, i) {
              return <span key={author} style={{paddingRight: '1rem'}}>{author}</span>
            })
          } </div>
          : null}
      </div>
    </span>)
  }
}

GoogleBookThumbnail.propTypes = {
  googleBook: PropTypes.object
}
