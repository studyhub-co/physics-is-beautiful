import React from 'react'
import history from '../history'
import { BASE_URL } from '../utils/config'

export class AdblockDetect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      usingAdblock: false,
      path: window.location.pathname
    }
  }

  componentDidMount () {
    this.setState({ usingAdblock: this.fakeAdBanner.offsetHeight === 0 })
  }

  render () {
    if (this.state.usingAdblock === true) {
      history.push(BASE_URL + 'adblock/', { prevPath: this.state.path })
    }

    return (
      <div
        ref={r => (this.fakeAdBanner = r)}
        style={{ height: '1px', width: '1px', visibility: 'none', pointerEvents: 'none' }}
        className='adBanner'
      />
    )
  }
}
