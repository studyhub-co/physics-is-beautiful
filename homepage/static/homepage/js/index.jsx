import React from 'react'
import ReactDOM from 'react-dom'
import Sheet from './containers/sheet'
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const target = document.getElementById('react-app')
const node = (
  <Sheet />
)

ReactDOM.render(node, target)
