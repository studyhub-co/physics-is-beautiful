import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import * as resourcesCreators from '../../actions/resources'

import { Grid, Row, Col, Image, Button, Glyphicon, FormGroup, InputGroup, FormControl } from 'react-bootstrap'

import { BASE_URL } from '../../utils/config'
import history from '../../history'

class TextBookResourceView extends React.Component {
  render () {
    var isbn = null
    if (this.props.resource.metadata.data.volumeInfo.hasOwnProperty('industryIdentifiers')) {
      var isbnFound = this.props.resource.metadata.data.volumeInfo.industryIdentifiers.find(x => x.type === 'ISBN_13')
      if (isbnFound) {
        isbn = isbnFound.identifier
      }
    }

    return (
      <Grid fluid>
        <Row>
          <Col sm={12} md={12}>
            <h1 className={'blue-title text-align-center'}>
              {this.props.resource.metadata ? this.props.resource.metadata.data.volumeInfo.title : 'Unknown resource'}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col sm={9} md={9}>
            sections
          </Col>
          <Col sm={3} md={3}>
            <div
              style={{paddingBottom: '1rem',
                fontSize: '20rem',
                overflow: 'hidden',
                textAlign: 'center'}}>
              { this.props.resource.metadata &&
              this.props.resource.metadata.data.volumeInfo.hasOwnProperty('imageLinks') &&
              this.props.resource.metadata.data.volumeInfo.imageLinks.thumbnail
                ? <Image src={this.props.resource.metadata.data.volumeInfo.imageLinks.thumbnail} />
                : <Glyphicon glyph='picture' /> }
            </div>
            { this.props.resource.metadata
              ? <div style={{backgroundColor: '#EDEDED', padding: '1rem'}}>
                <Row>
                  <Col sm={4} md={4}>
                    <b>Author:</b>
                  </Col>
                  <Col sm={8} md={8}>
                    { this.props.resource.metadata.data.volumeInfo.hasOwnProperty('authors')
                      ? <div>{this.props.resource.metadata.data.volumeInfo.authors.map(function (author, i) {
                        return <span key={author} style={{paddingRight: '1rem'}}>
                          {author}
                          {this.props.resource.metadata.data.volumeInfo.authors.length - 1 !== i ? ',' : null}
                        </span>
                      }, this)}</div> : null
                    }
                  </Col>
                </Row>
                <Row>
                  <Col sm={4} md={4}>
                    <b>Language:</b>
                  </Col>
                  <Col sm={8} md={8}>
                    { this.props.resource.metadata.data.volumeInfo.hasOwnProperty('language')
                      ? <div>
                        { this.props.resource.metadata.data.volumeInfo.language }
                      </div> : null }
                  </Col>
                </Row>
                <Row>
                  <Col sm={4} md={4}>
                    <b>Published:</b>
                  </Col>
                  <Col sm={8} md={8}>
                    { this.props.resource.metadata.data.volumeInfo.hasOwnProperty('publishedDate')
                      ? <div>
                        { this.props.resource.metadata.data.volumeInfo.publishedDate }
                      </div> : null }
                  </Col>
                </Row>
                <Row>
                  <Col sm={4} md={4}>
                    <b>Publisher:</b>
                  </Col>
                  <Col sm={8} md={8}>
                    { this.props.resource.metadata.data.volumeInfo.hasOwnProperty('publisher')
                      ? <div>
                        { this.props.resource.metadata.data.volumeInfo.publisher }
                      </div> : null }
                  </Col>
                </Row>
                <Row>
                  <Col sm={4} md={4}>
                    <b>ISBN:</b>
                  </Col>
                  <Col sm={8} md={8}>
                    { isbn }
                  </Col>
                </Row>
              </div> : 'Book data not found'}
          </Col>
        </Row>
      </Grid>
    )
  }
}

TextBookResourceView.propTypes = {
  // actions
  // resourcesActions: PropTypes.shape({
  //   fetchResource: PropTypes.func.isRequired
  // }),
  // data
  resource: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    //resource: state.resources.resource
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    resourcesActions: bindActionCreators(resourcesCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBookResourceView)
export { TextBookResourceView as IndexViewNotConnected }
