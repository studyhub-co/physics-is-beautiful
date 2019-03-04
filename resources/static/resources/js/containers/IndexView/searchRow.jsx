// this code is clone of editor/static/editor/js/containers/browseCurricula/searchRow.jsx
// FIXME move both to commeon utils js lib

import React from 'react'

import PropTypes from 'prop-types'

import { FormGroup, Row, Col, Button, Glyphicon, InputGroup, FormControl } from 'react-bootstrap'

export default class SearchRowView extends React.Component {
  render () {
    return <Row style={{padding: 0}}>
      <Col sm={10} md={10}>
        <FormGroup>
          <InputGroup>
            <FormControl
              type='text'
              value={this.props.searchString}
              placeholder='Search'
              onChange={this.props.handleSearchString}
              onKeyUp={this.props.handleSearchInputKeyUp}
            />
            <InputGroup.Button>
              <Button
                onClick={this.props.searchButtonClick}
              ><Glyphicon glyph='search' /></Button>
              <Button
                onClick={this.props.clearSearchButtonClick}
              ><Glyphicon glyph='remove' /></Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </Col>
      <Col sm={2} md={2}>
        <Button disabled>Filter</Button>
      </Col>
    </Row>
  }
}

SearchRowView.propTypes = {
  searchButtonClick: PropTypes.func.isRequired,
  handleSearchString: PropTypes.func.isRequired,
  handleSearchInputKeyUp: PropTypes.func.isRequired,
  clearSearchButtonClick: PropTypes.func.isRequired,
  searchString: PropTypes.string.isRequired
}
