import React from 'react'
// import {BackButton} from './../components/back_button'

export function Sheet (props) {
  var className = 'container ' + (props.type || 'section') + '-sheet'
  return (
    <div className={className} style={{fontSize: '1.2rem'}}>
      {props.children}
    </div>
  )
}
