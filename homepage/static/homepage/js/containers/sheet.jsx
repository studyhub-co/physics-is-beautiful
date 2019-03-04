import React from 'react'

import {Row, Col} from 'react-bootstrap'
import AuthSignUp from '../components/auth'

export default class Sheet extends React.Component {
  render () {
    return (
      <div className='container section-sheet homepage-sheet' style={window.IS_MOBILE_APP ? {top: '2rem'} : {top: '0px'}}>
        <h1>Welcome to Physics is Beautiful</h1>
        <h3>A platform for all things physics.</h3>
        <Row style={{width: '100%'}}>
          <Col md={6}>
            <div className='homepage-shadow-container'>
              <p>What do we offer?</p>
              <ul>
                <li>Free courses to learn physics</li>
                <li>Tools for teachers to provide practice for their students</li>
                <li>Create your own course, and fork existing courses</li>
                <li>Discuss physics on our forum</li>
                <li>Resources and solutions to physics problems</li>
              </ul>
            </div>
          </Col>
          <Col md={6}>
            <AuthSignUp />
          </Col>
        </Row>
      </div>
    )
  }
}
