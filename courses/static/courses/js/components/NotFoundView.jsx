import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import history from '../history'
import { Sheet } from './Sheet'

export default class NotFoundView extends Component {
  render() {
    return (
      <Sheet>
        <div className="container text-center">
          <h1>Page not found!</h1>
          <hr />
          <Link to={'/'}>Back To Home View</Link> |{' '}
          <Link to="" onClick={history.goBack}>
            Back To Previous Page
          </Link>
        </div>
      </Sheet>
    )
  }
}
