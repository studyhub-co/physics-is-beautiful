import React from 'react'

import Moment from 'react-moment';

import { Row, Col, Image, Dropdown, Glyphicon, MenuItem } from 'react-bootstrap'

import {Thumbnail} from './thumbnail'

class CurriculumMenuToggle extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    this.props.onClick(e)
  }

  render () {
    return (
      <div className='dotted-menu' onClick={this.handleClick}>
        {this.props.children}
      </div>
    )
  }
}

class CurriculumMenu extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      value: ''
    }
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  render () {
    const { children } = this.props
    const { value } = this.state

    return (
      <div className='dropdown-menu' style={{ padding: '' }}>
        <ul className='list-unstyled'>
          {React.Children.toArray(children).filter(
            child => !value.trim() || child.props.children.indexOf(value) !== -1
          )}
        </ul>
      </div>
    )
  }
}

export class CurriculumThumbnail extends React.Component {
  handleDropDownMenu () {

  }

  render () {
    return (
      <Col
        sm={2}
        md={2}
        className={'curriculum-card'}
        style={{'cursor': 'pointer'}}>
        {/*<div className='col-md-1 module-accessible-block' onClick={this.props.onClick} >*/}
        <div onClick={this.props.onClick} style={{paddingBottom: '1rem', overflow: 'hidden', borderRadius: '15px'}}>
          <Thumbnail image={this.props.image} />
        </div>
        <div>
          <Dropdown
            style={{float: 'right'}} id='dropdown-custom-menu'
            rootCloseEvent={'click'}>
            <CurriculumMenuToggle bsRole='toggle'></CurriculumMenuToggle>
            {/*<Dropdown.Toggle></Dropdown.Toggle>*/}
            <CurriculumMenu bsRole='menu'>
              <MenuItem eventKey='1'>Edit content</MenuItem>
              <MenuItem eventKey='2'>Edit profile and settings</MenuItem>
              <MenuItem eventKey='3'>Fork</MenuItem>
              <MenuItem eventKey='4'>Copy shareable link</MenuItem>
              <MenuItem eventKey='5'>Delete</MenuItem>
            </CurriculumMenu>
          </Dropdown>
          <div onClick={this.props.onClick} className={'blue-title'}>
            {this.props.name}
          </div>
          <div style={{fontSize: '1.1rem'}}>
            <a href={this.props.author.get_absolute_url} target={'_blank'}>
              {this.props.author.display_name}
            </a> ∙ {this.props.count_lessons } lessons ∙ 2k learners
          </div>
          <div style={{fontSize: '1.1rem', color: 'gray'}}>
            Created <Moment fromNow>
              {this.props.created_on}
            </Moment> ∙ Last updated <Moment fromNow>
              {this.props.updated_on}
            </Moment>
          </div>
        </div>
        {/*</div>*/}
      </Col>
    )
  }
}
