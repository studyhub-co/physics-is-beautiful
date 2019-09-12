import React from 'react'

import PropTypes from 'prop-types'
import { FaImage } from 'react-icons/fa'
import { Image } from 'react-bootstrap'

export function Thumbnail (props) {
  if (props.image) {
    return <Image fluid src={props.image} />
  } else {
    return <FaImage size={props.iconWidth || '5rem'} />
  }
}

Thumbnail.propTypes = {
  iconWidth: PropTypes.string
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
    const RootElement = (props) => {
      if (this.props.asFragment) {
        return (<React.Fragment>
          {props.children}
        </React.Fragment>)
      } else {
        return (
          <div className='selectable-image'>
            {props.children}
          </div>
        )
      }
    }
    return (<RootElement asFragment={this.props.asFragment}>
      <Thumbnail image={this.props.image} iconWidth={this.props.iconWidth}/>
      <input type='file' name='image' accept='image/*' onChange={this.handleChange} style={{ fontSize: '1px' }}/>
    </RootElement>
    )
  }
}

EditableThumbnail.propTypes = {
  image: PropTypes.string,
  onChange: PropTypes.func,
  asFragment: PropTypes.bool,
  iconWidth: PropTypes.string
}
