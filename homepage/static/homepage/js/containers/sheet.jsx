import React from 'react'

import {Row, Col, ListGroup} from 'react-bootstrap'
import AuthSignUp from '../components/auth'

export default class Sheet extends React.Component {
  render () {
    return (
      <div className='homepage-sheet' style={window.IS_MOBILE_APP ? {top: '2rem'} : {top: '0px'}}>
        <div className='homepage-featured-image-section'>
          <div className='homepage-featured-image-section-center'>
            <h1>Welcome to Physics is Beautiful</h1>
            <h3>A platform for all things physics.</h3>
            <button id='getStartedButton' className='common-button btn btn-primary' onClick={() => { window.location.href = '/curriculum/' }}>Get Started</button>
          </div>
        </div>
        <div className='homepage-section-1'>
          <div className='homepage-wrapper homepage-wrapper-white'>
            <h2>Features</h2>
            <ListGroup>
              <li className='list-group-item'>Free courses to learn physics</li>
              <li className='list-group-item'>Tools for teachers to provide practice for their students</li>
              <li className='list-group-item'>Create your own course, and fork existing courses</li>
              <li className='list-group-item'>Discuss physics on our forum</li>
              <li className='list-group-item'>Resources and solutions to physics problems</li>
            </ListGroup>
          </div>
        </div>
        <div className='homepage-section-2'>
          <div className='homepage-wrapper homepage-wrapper-white'>
            <h2>Try it out</h2>
            <iframe className='homepage-demo' src='/curriculum/lessons/4nXkRtEGMqGnNvcpLDfXmV/?pib_mobile=true' />
          </div>
        </div>
        <div className='homepage-section-3'>
          <div className='homepage-wrapper homepage-wrapper-white'>
            <AuthSignUp />
          </div>
        </div>
        <div className='homepage-section-footer'>
          <Row>
            <Col md={12}>
              <small className='d-block mb-3 text-muted'>©2017-19 Physics is Beautiful</small>
              <ul>
                <li><a className='text-muted' href='/about'>Our Team</a></li>
                <li>&middot;</li>
                <li><a className='text-muted' href='/privacy'>Privacy Policy</a></li>
                <li>&middot;</li>
                <li><a className='text-muted' href='/terms'>Terms of Service</a></li>
                <li>&middot;</li>
                <li><a className='text-muted' href='/contact'>Contact Us</a></li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
/*
           <div className='homepage-section-2'>
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
        </div>
      </div>
       */
