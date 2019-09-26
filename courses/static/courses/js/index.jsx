import React from 'react'
import ReactDOM from 'react-dom'

import history from './history'

import Root from './containers/Root/Root'
import configureStore from './store/configureStore'

const initialState = {}
const target = document.getElementById('main-app')

const store = configureStore(initialState, history)

const node = (
  <Root store={store} history={history} />
)

ReactDOM.render(node, target)
