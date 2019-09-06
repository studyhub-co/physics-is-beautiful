import React from 'react'
// import {BackButton} from './../components/back_button'

export function Sheet (props) {
  var className = 'container-fluid ' + (props.type || 'section') + '-sheet'
  return (
    <div className={className}>
      {props.children}
    </div>
  )
}
