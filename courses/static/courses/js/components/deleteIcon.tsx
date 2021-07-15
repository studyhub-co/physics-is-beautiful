import React from 'react'
import { FaTrash } from 'react-icons/fa'
import PropTypes from 'prop-types'

import './imageUploadPencil.css'

interface DeleteIconProps {
  onClick: (file: string) => void
  labelText?: string
}

const DeleteIcon: React.FC<DeleteIconProps> = props => {
  const { onClick, labelText } = props

  const handleClick = () => {
    onClick()
  }

  return (
    <span style={{ padding: '0 0.5rem' }}>
      {labelText && (
        <span style={{ marginRight: '1rem' }}>{`${labelText}:`}</span>
      )}
      <div
        onClick={handleClick}
        title={labelText ? labelText : ''}
        className={'base-circle-edit'}
      >
        <div className={'selectable-image'} style={{ height: '100%' }}>
          <FaTrash style={{ fontSize: '1.5rem', marginTop: '0.75rem' }} />
        </div>
      </div>
    </span>
  )
}

DeleteIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  labelText: PropTypes.string,
}

export default DeleteIcon
