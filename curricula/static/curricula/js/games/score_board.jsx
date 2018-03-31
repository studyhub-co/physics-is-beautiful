import React from 'react'
import MediaQuery from 'react-responsive'
import ReactCountdownClock from 'react-countdown-clock'
import {GameState} from '../constants'
import {Link} from 'react-router-dom'

export class ScoreBoard extends React.Component {
  constructor () {
    super()
    this.state = {
      clockKey: 1,
      didReset: false
    }
  }

  componentDidUpdate () {
    // This is some hackery that I'm not too happy about. I don't seem to
    // have access to the underlying clock to tell it to reset when I
    // want...so I have to force it by giving it a new `key`. But to know
    // when to reset, there is additional juggling that has to be done
    // here.

    if (this.props.state == GameState.NEW && !this.state.didReset) {
      this.setState({clockKey: this.state.clockKey + 1, didReset: true})
    }
    if (this.props.state != GameState.NEW && this.state.didReset) {
      this.setState({didReset: false})
    }
  }

  render () {
    var score
    var paused
    switch (this.props.state) {
      case GameState.GAME_OVER:
        paused = true
        score = (
          <div className='col-md-4'>
            <h1 className='TwCenMT'>Game Over!</h1>
            <button id='tryAgain' className='hover-button' onClick={this.props.restart}>Try Again</button>
            <button className='hover-button'><Link to={'/'}>Exit</Link></button>
          </div>
        )
        break
      case GameState.WON:
        paused = true
        score = (
          <div className='col-md-4'>
            <h2 className='TwCenMT'>Score: {this.props.score}</h2>
            <h1 className='TwCenMT'>You Won!</h1>
            <button className='hover-button'><Link to={'/'}>Continue</Link></button>
          </div>
        )
        break
      case GameState.PAUSED:
        paused = true
        score = (
          <div>
            <MediaQuery minDeviceWidth={736}>
              <div className='col-md-3 align-left'>
                <h2 className='TwCenMT'>Score: {this.props.score}</h2>
              </div>
              <div className='col-md-3 align-left'>
                <h2 className='TwCenMT'>Level: {this.props.level}</h2>
              </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={736}>
              <div className='col-md-3'>
                <h4 className='TwCenMT text-center'>Score: {this.props.score}</h4>
                <h4 className='TwCenMT text-center'>Level: {this.props.level}</h4>
              </div>
            </MediaQuery>
          </div>
        )
        break
      default:
        paused = false
        score = (
          <div>
            <MediaQuery minDeviceWidth={736}>
              <div className='col-md-3 align-left'>
                <h2 className='TwCenMT'>Score: {this.props.score}</h2>
              </div>
              <div className='col-md-3 align-left'>
                <h2 className='TwCenMT'>Level: {this.props.level}</h2>
              </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={736}>
              <div className='col-md-3 text-center'>
                <h4 className='TwCenMT'>Score: {this.props.score} Level: {this.props.level}</h4>
              </div>
            </MediaQuery>
          </div>
        )
    }
    var clockStyle = {
      height: 100,
      width: 100,
      top: '50%',
      left: '50%',
      display: 'block',
      marginLeft: -100,
      position: 'relative',
      cursor: 'pointer'
    }
    var smallClockStyle = {
      height: 50,
      width: 50,
      top: '50%',
      left: '50%',
      display: 'block',
      marginLeft: -50,
      position: 'relative'
    }
    return (
      <div className='row text-center'>
        <div className='col-md-2'>
        </div>
        <div className='col-md-2 text-center'>
          <MediaQuery minDeviceWidth={736}>
            <div style={clockStyle}>
              <ReactCountdownClock
                key={this.state.clockKey}
                seconds={this.props.clockSeconds}
                color='#1baff6'
                alpha={0.9}
                size={100}
                weight={10}
                paused={paused}
                onComplete={this.props.timesUp}
                onClick={this.props.pause}
              />
            </div>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={736}>
            <div style={smallClockStyle}>
              <ReactCountdownClock
                key={this.state.clockKey}
                seconds={this.props.clockSeconds}
                color='#1baff6'
                alpha={0.9}
                size={50}
                weight={10}
                paused={paused}
                onComplete={this.props.timesUp}
                onClick={this.props.pause}
              />
            </div>
          </MediaQuery>
        </div>
        {score}
      </div>
    )
  }
}
ScoreBoard.defaultProps = {
  clockSeconds: 120
}
