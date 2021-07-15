import React from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import PropTypes from 'prop-types'

import './imageUploadPencil.css'

interface PencilImageUploadProps {
  onFileSelect: (file: string) => void
  labelText?: string
}

const PencilImageUpload: React.FC<PencilImageUploadProps> = props => {
  const { onFileSelect, labelText } = props

  const handleChange = e => {
    onFileSelect(e.target.files[0])
  }

  return (
    <span style={{ padding: '0 0.5rem' }}>
      {labelText && (
        <span style={{ marginRight: '1rem' }}>{`${labelText}:`}</span>
      )}
      <div title={labelText ? labelText : ''} className={'base-circle-edit'}>
        <div className={'selectable-image'} style={{ height: '100%' }}>
          <FaPencilAlt style={{ fontSize: '1.5rem', marginTop: '0.75rem' }} />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            style={{ fontSize: '0px' }}
          />
        </div>
      </div>
    </span>
  )
}

PencilImageUpload.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  labelText: PropTypes.string,
}

export default PencilImageUpload
