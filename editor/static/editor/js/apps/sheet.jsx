import React from 'react'

export function Sheet (props) {
  var className = 'container ' + (props.type || 'section') + '-sheet'
  return (
    <div className={className}>
      {props.children}
    </div>
  )
}
