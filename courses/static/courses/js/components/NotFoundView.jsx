import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { BASE_URL } from '../utils/config'
import history from '../history'

export default class NotFoundView extends Component {
  render () {
    return (
      <div className='container text-center'>
        <h1>Page not found!</h1>
        <hr />
        <Link to={ BASE_URL } >Back To Home View</Link> | <Link to='' onClick={history.goBack}>Back To Previous Page</Link>
      </div>
    )
  }
}
