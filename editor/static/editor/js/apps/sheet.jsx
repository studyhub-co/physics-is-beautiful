import React from 'react'
import {BackButton} from './../components/back_button'


export function Sheet(props) {
  var className = 'container ' + (props.type || 'section') + '-sheet';
  return (<div className={className}>
          {/*<h1 style={{'color': '#08d1ff'}}>Curricula</h1>*/}
          {props.children}
          </div>
         );
}