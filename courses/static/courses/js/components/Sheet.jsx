import React from 'react'

export function Sheet(props) {
  var className = (props.type || 'section') + '-sheet'
  return (
    <div className={className} {...props}>
      {props.children}
    </div>
  )
}
