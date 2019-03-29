import React from 'react'
import {Link} from 'react-router-dom'
import { FaExclamationCircle, FaLock, FaCheck } from 'react-icons/fa'

class LockedItem extends React.Component {
  render () {
    return (
      <div className='thumbnail-block'>
        <div className='thumbnail section-thumbnail text-center'>
          <img className='grayed-out-img img-fluid' src={this.props.item.image} />
        </div>
        <h4 className='module-locked thumbnail-title'>
          {this.props.item.name}
          {/*<span className='glyphicon glyphicon-lock' />*/}
          <FaLock />
        </h4>
      </div>
    )
  }
}

class UnlockedItem extends React.Component {
  render () {
    var span
    if (this.props.item.status === 'new') {
      // span = <span className='glyphicon glyphicon-exclamation-sign' />
      span = <FaExclamationCircle />
    } else {
      span = <span />
    }
    return (
      <Link to={this.props.item.href}>
        <div className='thumbnail-block module-accessible-block'>
          <div className='thumbnail section-thumbnail text-center'>
            <img className={'img-fluid'} src={this.props.item.image} />
          </div>
          <h4 className='module-accessible thumbnail-title'>
            {this.props.item.name}
            {span}
          </h4>
        </div>
      </Link>
    )
  }
}

class CompleteItem extends React.Component {
  render () {
    return (
      <Link to={this.props.item.href}>
        <div className='thumbnail-block module-completed'>
          <div className='thumbnail section-thumbnail text-center'>
            <img className={'img-fluid'} src={this.props.item.image} />
          </div>
          <h4 className={'thumbnail-title'}>
            {this.props.item.name}
            <FaCheck />
            {/*<span className='glyphicon glyphicon-ok' />*/}
          </h4>
        </div>
      </Link>
    )
  }
}

class Item extends React.Component {
  render () {
    if (this.props.item.status === 'locked') {
      return <LockedItem item={this.props.item} />
    } else if (this.props.item.status === 'complete') {
      return <CompleteItem item={this.props.item} />
    } else {
      return <UnlockedItem item={this.props.item} />
    }
  }
}

export class Section extends React.Component {
  render () {
    var items = []
    this.props.items.forEach(function (el) {
      items.push(<Item key={el.uuid} item={el} />)
    })
    return (
      <div>
        <div className='section-title'><h4>{this.props.name}</h4></div>
        <div className='row'>
          {items}
        </div>
      </div>
    )
  }
}
