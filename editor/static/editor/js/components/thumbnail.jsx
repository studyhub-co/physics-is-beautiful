import React from 'react'

import { FaImage } from 'react-icons/fa'
import { Image } from 'react-bootstrap'

export function Thumbnail (props) {
  if (props.image) {
    // return <img src={props.image} />
    return <Image fluid src={props.image} />
  } else {
    // return <span className='glyphicon glyphicon-picture' />
    return <FaImage size={'5rem'} />
  }
}

export class EditableThumbnail extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (e) {
    this.props.onChange(e.target.files[0])
  }
  render () {
    return (
      <div className='selectable-image'>
        <Thumbnail image={this.props.image} />
        <input type='file' name='image' accept='image/*' onChange={this.handleChange} style={{fontSize: '1px'}} />
      </div>
    )
  }
}
