import React from 'react'
import ReactDOM from 'react-dom'

// import history from './history'
import Root from './containers/Root/Root'
import configureStore from './store/configureStore'

const initialState = {}
const target = document.getElementById('trophy-inbox-app')

// const store = configureStore(initialState, history)
const store = configureStore(initialState)
// <Root store={store} history={history} />
const node = (
  <Root store={store} />
)

ReactDOM.render(node, target)
