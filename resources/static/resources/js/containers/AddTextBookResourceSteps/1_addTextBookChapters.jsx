import React from 'react'

// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Row, Col, Glyphicon, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap'

import { GoogleBookThumbnail } from '../../components/googleBookThumbnail'

export default class AddTextBookChaptersView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      numberOfChapters: this.props.numberOfChapters || ''
    }

    this.handleNumberOfChapters = this.handleNumberOfChapters.bind(this)
    this.handleNumberOfChaptersInputKeyUp = this.handleNumberOfChaptersInputKeyUp.bind(this)
    this.addNumberOfChaptersClick = this.addNumberOfChaptersClick.bind(this)
  }

  handleNumberOfChapters (e) {
    // remove all chars
    var s = e.target.value.replace(/\D/g, '')

    this.setState({numberOfChapters: s})
  }

  handleNumberOfChaptersInputKeyUp (e) {
    if (e.keyCode === 13) { // 'enter' key
      this.addNumberOfChaptersClick(e)
    }
  }

  addNumberOfChaptersClick () {
    this.props.onAddNumberOfChapters(this.state.numberOfChapters)
  }

  render () {
    return (
      <div>
        <div className={'blue-title'}>First step</div>
        <Row>
          <Col sm={8} md={8}>
            <FormGroup>
              <InputGroup>
                <FormControl
                  type='text'
                  value={this.state.numberOfChapters}
                  placeholder='Enter number of chapters...'
                  autoFocus={Boolean(true)}
                  onChange={this.handleNumberOfChapters}
                  onKeyUp={this.handleNumberOfChaptersInputKeyUp}
                />
                <InputGroup.Button>
                  <Button
                    disabled={!parseInt(this.state.numberOfChapters)}
                    onClick={this.addNumberOfChaptersClick}
                  >Next <Glyphicon glyph='chevron-right' /></Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col sm={4} md={4}>
            <GoogleBookThumbnail googleBook={this.props.googleBook} />
          </Col>
        </Row>
      </div>
    )
  }
}

AddTextBookChaptersView.propTypes = {
  googleBook: PropTypes.object,
  onAddNumberOfChapters: PropTypes.func.isRequired,
  numberOfChapters: PropTypes.number
}

// const mapStateToProps = (state) => {
//   return {
//     // gapiInitState: state.google.gapiInitState,
//     // googleBooksList: state.google.googleBooksList,
//     // resourceOptions: state.resources.resourceOptions,
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch,
//     // googleActions: bindActionCreators(googleCreators, dispatch)
//     //resourcesActions: bindActionCreators(resourcesCreators, dispatch)
//     // tabActions: bindActionCreators(tabsCreators, dispatch),
//     // classroomActions: bindActionCreators(classroomCreators, dispatch),
//     // googleActions: bindActionCreators(googleCreators, dispatch),
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(AddTextBookChaptersView)
// export { AddTextBookChaptersView as AddTextBookChaptersViewNotConnected }
