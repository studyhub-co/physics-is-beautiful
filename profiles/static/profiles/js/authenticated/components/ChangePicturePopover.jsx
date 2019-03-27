import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col, Image } from 'react-bootstrap'

export default class ChangePicturePopover extends React.Component {
  render () {
    return (
      <div
        // className={className}
        style={{
          width: '30rem',
          textAlign: 'left',
          border: 'solid 1px #c8ccd0',
          boxShadow: '0 1px 5px rgba(12,13,14,0.3)',
          zIndex: '3000',
          // position: 'absolute',
          position: 'relative',
          padding: '1.5rem',
          backgroundColor: '#FFF',
          top: '0'
        }}
      >
        <h4>Change your picture</h4>
        <Container fluid style={{padding: 0}}>
          {/* TODO create component frow avatar row */}
          {this.props.userAvatar ? <div><Row className={'pointer'} onClick={() => { this.props.selectAvatar('u') }}>
            <Col sm={3} md={3}>
              <Image
                fluid
                rounded
                src={this.props.userAvatar} />
            </Col>
            <Col sm={7} md={7} className={'vcenter'}>
              <h4>Uploaded picture</h4>
            </Col>
            <Col sm={1} md={1}>
              {this.props.selectedAvatar === 'u' ? <span className='glyphicon glyphicon-ok' /> : null}
            </Col>
          </Row>
          <hr />
          </div> : null}
          {this.props.googleAvatarUrl ? <div><Row className={'pointer'} onClick={() => { this.props.selectAvatar('g')}}>
            <Col sm={3} md={3}>
              <Image
                fluid
                rounded
                src={this.props.googleAvatarUrl} />
            </Col>
            <Col sm={7} md={7} className={'vcenter'}>
              <h4>Google</h4>
            </Col>
            <Col sm={1} md={1}>
              {this.props.selectedAvatar === 'g' ? <span className='glyphicon glyphicon-ok'/> : null}
            </Col>
          </Row>
          <hr />
          </div> : null}
          {this.props.gravatarUrl ? <div><Row className={'pointer'} onClick={() => this.props.selectAvatar('a')}>
            <Col sm={3} md={3}>
              <Image
                fluid
                rounded
                src={this.props.gravatarUrl}
              />
            </Col>
            <Col sm={7} md={7} className={'vcenter'}>
              <h4>Gravatar</h4>
            </Col>
            <Col sm={1} md={1}>
              {this.props.selectedAvatar === 'a' ? <span className='glyphicon glyphicon-ok' /> : null}
            </Col>
          </Row>
          <hr />
          </div> : null}
        </Container>
      </div>
    )
  }
}

ChangePicturePopover.propTypes = {
  gravatarUrl: PropTypes.string,
  selectedAvatar: PropTypes.string,
  googleAvatarUrl: PropTypes.string,
  userAvatar: PropTypes.string,
  selectAvatar: PropTypes.func.isRequired
  // userAvatar: PropTypes.oneOfType([null, PropTypes.string]).isRequired, # too old react version
}
