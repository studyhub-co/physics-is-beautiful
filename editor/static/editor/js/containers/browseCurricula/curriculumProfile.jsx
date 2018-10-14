import React from 'react'

import { Image as ImageBs, Grid, Row, Col, Glyphicon, Tooltip, InputGroup, FormControl, Modal } from 'react-bootstrap'

import PropTypes from 'prop-types'
import {
  loadCurriculumIfNeeded
} from '../../actions'

class CurriculumProfileView extends React.Component {
  componentDidMount () {
    this.props.loadCurriculum(this.props.match.params.uuid)
  }

  startCurriculum () {
    window.open('/curriculum/' + this.props.match.params.uuid + '/', '_blank')
  }

  render () {
    return <div className={'selectable-image'} style={{height: '100%'}}>
      <Grid fluid>
        <Row style={{padding: 0}}>
          <Col sm={12} md={12}
            style={{
              padding: 0,
              paddingTop: '37%',
              width: '100%',
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: '#12adf4'}} >
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                bottom: '0',
                right: '0'}}
            >
              <div style={{position: this.props.curriculum.cover_photo ? 'relative' : ''}}>
                <div>{ this.props.curriculum.cover_photo
                  ? <ImageBs src={this.props.curriculum.cover_photo} responsive />
                  : <div style={{ height: '100%', width: '100%' }} /> }
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <br />
        <Row style={{padding: 0}}>
          <Col sm={2} md={2} style={{padding: 0}}>
            <div style={{minHeight: '10rem'}}>
              { this.props.curriculum.image ? <ImageBs
                src={this.props.curriculum.image}
                responsive
              /> : null }
            </div>
          </Col>
          <Col sm={7} md={7}>
            <Row style={{padding: 0}}>
              <Col sm={12} md={12}>
                <div className={'blue-title'}>
                  {this.props.curriculum.name}
                  <span style={{position: 'relative', paddingLeft: '1rem'}}>
                    <span className={'base-circle-edit'}>
                      <Glyphicon
                        glyph={'pencil'}
                        onClick={this.editNameClick}
                        style={{fontSize: '2rem'}} />
                    </span>
                  </span>
                </div>
              </Col>
            </Row>
            <Row style={{padding: 0}}>
              <Col sm={12} md={12}>
                <div style={{fontSize: '2rem'}}>
                  { this.props.curriculum.author.display_name }
                  ∙ { this.props.curriculum.count_lessons } lessons
                  ∙ { this.props.curriculum.number_of_learners } learners
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                <div style={{color: 'gray'}}>
                  Created <Moment fromNow>{this.props.curriculum.created_on}</Moment>
                  ∙ Last updated <Moment fromNow>{this.props.curriculum.updated_on}</Moment>
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm={3} md={3}>
            <button className={'editor-common-button'} onClick={this.startCurriculum}>Start Curriculum</button>
          </Col>
        </Row>
        <Row style={{padding: '2rem'}}>
          <Col sm={12} md={12}>
           {this.props.curriculum.description}
          </Col>
        </Row>
      </Grid>
    </div>
  }
}

CurriculumProfileView.propTypes = {
  curriculum: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    curricula: state.curricula
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadCurriculum: (uuid) => dispatch(loadCurriculumIfNeeded(uuid)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CurriculumProfileView)
export { CurriculumProfileView  as CurriculumProfileViewNotConnected }