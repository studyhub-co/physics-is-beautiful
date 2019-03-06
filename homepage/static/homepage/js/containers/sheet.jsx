import React from 'react'

import {Row, Col} from 'react-bootstrap'
import AuthSignUp from '../components/auth'

export default class Sheet extends React.Component {
  render () {
    return (
      <div className='homepage-sheet' style={window.IS_MOBILE_APP ? {top: '2rem'} : {top: '0px'}}>
        <div className='homepage-featured-image-section'>
          <div className='homepage-wrapper'>
            <h1>Welcome to Physics is Beautiful</h1>
            <h3>A platform for all things physics.</h3>
            <Row style={{width: '100%'}}>
              <Col md={6}>
                <div className='homepage-shadow-container modal-content'>
                  <div className='blur-wrap'>
                    <p>What do we offer?</p>
                    <ul>
                      <li>Free courses to learn physics</li>
                      <li>Tools for teachers to provide practice for their students</li>
                      <li>Create your own course, and fork existing courses</li>
                      <li>Discuss physics on our forum</li>
                      <li>Resources and solutions to physics problems</li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <AuthSignUp />
              </Col>
            </Row>
            <button id='getStartedButton' className='common-button btn btn-primary' onClick={() => { window.location.href = '/curriculum/' }}>Get Started</button>
          </div>
        </div>
        <div className='homepage-section-2'>
          <div className='homepage-wrapper homepage-wrapper-white'>
            <h2>Try a demo</h2>
            <iframe className='homepage-demo' src='/curriculum/lessons/4nXkRtEGMqGnNvcpLDfXmV/?pib_mobile=true' />
          </div>
        </div>
      </div>
    )
  }
}
