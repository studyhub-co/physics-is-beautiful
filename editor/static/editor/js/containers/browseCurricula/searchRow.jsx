import React from 'react'

import PropTypes from 'prop-types'
import { FormGroup, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap'
import { FaSearch, FaTimes } from 'react-icons/fa'

export default class SearchRowView extends React.Component {
  render () {
    return <Row style={{paddingTop: '2rem'}}>
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
            <InputGroup.Append>
              <Button
                variant='light'
                onClick={this.props.searchButtonClick}
              ><FaSearch /></Button>
              {/*><Glyphicon glyph='search' /></Button>*/}
              <Button
                variant='light'
                onClick={this.props.clearSearchButtonClick}
              ><FaTimes /></Button>
              {/*><Glyphicon glyph='remove' /></Button>*/}
            </InputGroup.Append>
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
