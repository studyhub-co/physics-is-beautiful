import React from 'react'

import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { FormGroup, DropdownButton, InputGroup, MenuItem } from 'react-bootstrap'

import { MultiSelect } from 'react-selectize'

import { findUsers } from '../../actions'

class UserRightsRow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchString: '',
      selectedUsers: []
    }
    this.onAddCollaboratorsClick = this.onAddCollaboratorsClick.bind(this)
  }

  onAddCollaboratorsClick () {
    if (this.state.selectedUsers) {
      // this.props.addCollaborators(this.state.selectedUsers)
    }
  }

  render () {
    var self = this

    var onSearchChange = function (searchString_) {
      const searchString = searchString_.replace(/\W/g, '')
      self.setState({searchString: searchString})

      if (searchString.length > 0) {
        if (!self.props.findUserRequest) {
          self.props.findUsers(searchString)
        }
      }
    }

    var renderNoResultsFound = function (value, search) {
      return <div className='no-results-found' style={{fontSize: 13}}>
        {self.state.searchString.length === 0
          ? 'Start type username or display name' : 'No results found'}
      </div>
    }

    var renderOption = function (item) {
      return <div className='simple-option' style={{fontSize: 12}}>
        <div>
          <span style={{fontWeight: 'bold'}}>{item.display_name}</span>
        </div>
      </div>
    }

    var renderValue = function (item) {
      return <div className='simple-value'>
        <span style={{fontWeight: 'bold'}}>{item.display_name}</span>
        {/*<span onClick={function () {*/}
          {/*self.setState({*/}
            {/*selectedUsers: self.state.selectedUsers.splice(*/}
              {/*self.state.selectedUsers.map(function (user) { return user.id }).indexOf(item.id),*/}
              {/*1*/}
            {/*)*/}
          {/*})*/}
        {/*}}>x</span>*/}
      </div>
    }

    var onValuesChange = function (selectedUsers) {
      self.setState({
        selectedUsers: selectedUsers
      })
    }

    var filterOptions = function (options, values, search) {
      function comparer (otherArray) {
        return function (current) {
          return otherArray.filter(
            function (other) {
              return other.id === current.id
            }).length === 0
        }
      }

      var filterdOptions = options.filter(comparer(values))

      return filterdOptions
    }

    var uid = function (item) {
      return item.id
    }

    var foundUsers = []
    if (this.props.foundUsers) {
      foundUsers = this.props.foundUsers.results
    }

    return (
      <FormGroup>
        <InputGroup>
          {/*<FormControl type='text' />*/}
          <MultiSelect
            placeholder='Select users'
            options={foundUsers}
            values={this.state.selectedUsers}
            search={this.state.searchString}
            onValuesChange={onValuesChange}
            onSearchChange={onSearchChange}
            uid={uid}
            renderOption={renderOption}
            renderNoResultsFound={renderNoResultsFound}
            renderValue={renderValue}
            filterOptions={filterOptions}
          />
          <DropdownButton
            componentClass={InputGroup.Button}
            id='input-dropdown-addon'
            title='Action'
          >
            <MenuItem key='e' onSelect={this.onAddCollaboratorsClick}>Add collaborators</MenuItem>
          </DropdownButton>
        </InputGroup>
      </FormGroup>
    )
  }
}

UserRightsRow.propTypes = {
  // actions
  findUsers: PropTypes.func.isRequired,
  // data
  foundUsers: PropTypes.object,
  findUserRequest: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    foundUsers: state.users.foundUsers,
    findUserRequest: state.users.findUserRequest
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    findUsers: (searchString) => dispatch(findUsers(searchString)),
    // addCollaborators: (collaborators) => dispatch(findUsers(collaborators))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRightsRow)
export { UserRightsRow as UserRightsRowNotConnected }
