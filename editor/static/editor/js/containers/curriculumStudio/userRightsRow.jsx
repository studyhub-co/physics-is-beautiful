import React from 'react'

import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { FormGroup, DropdownButton, InputGroup, DropdownItem } from 'react-bootstrap'

import { MultiSelect } from 'react-selectize'

import { findUsers, updateCurriculum } from '../../actions'

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
    if (this.state.selectedUsers.length > 0) {
      // this.props.addCollaborators(this.state.selectedUsers)
      var curriculum = {uuid: this.props.curriculum.uuid}
      var collaboratorsIds = []

      for (var i = 0; i < this.state.selectedUsers.length; i++) {
        collaboratorsIds.push(this.state.selectedUsers[i]['id'])
      }
      // append existing collaborators
      for (i = 0; i < this.props.curriculum.collaborators.length; i++) {
        var id = this.props.curriculum.collaborators[i]['id']
        if (collaboratorsIds.indexOf(id) === -1) {
          collaboratorsIds.push(id)
        }
      }

      curriculum['collaborators_ids'] = collaboratorsIds

      this.props.updateCurriculum(curriculum)
      this.setState({selectedUsers: []})
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
            // componentClass={InputGroup.Button}
            id='input-dropdown-addon'
            title='Action'
          >
            <DropdownItem key='e' onSelect={this.onAddCollaboratorsClick}>Add collaborators</DropdownItem>
          </DropdownButton>
        </InputGroup>
      </FormGroup>
    )
  }
}

UserRightsRow.propTypes = {
  // actions
  findUsers: PropTypes.func.isRequired,
  updateCurriculum: PropTypes.func.isRequired,
  // data
  foundUsers: PropTypes.object,
  findUserRequest: PropTypes.bool,
  curriculum: PropTypes.object.isRequired // not reducer data
}

const mapStateToProps = (state) => {
  return {
    foundUsers: state.users.foundUsers,
    findUserRequest: state.users.findUserRequest,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    findUsers: (searchString) => dispatch(findUsers(searchString)),
    updateCurriculum: (searchString) => dispatch(updateCurriculum(searchString))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRightsRow)
export { UserRightsRow as UserRightsRowNotConnected }
