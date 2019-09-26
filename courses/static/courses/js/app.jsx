import React from 'react'
import { connect } from 'react-redux'

import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import PropTypes from 'prop-types'

class App extends React.Component {
  render () {
    return (
      <div className='app'>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
App.propTypes = {
  children: PropTypes.shape().isRequired
  // dispatch: PropTypes.func.isRequired,
  // location: PropTypes.shape({
  //   pathname: PropTypes.string
  // })
}
App.defaultProps = {
  location: undefined
}

const mapStateToProps = (state, ownProps) => {
  return {
    location: state.router.location
  }
}

const getApp = (props) => {
  return <DndProvider backend={HTML5Backend}><App {...props}/></DndProvider>
}

// export default DndProvider(HTML5Backend)(connect(mapStateToProps)(App))
export default connect(mapStateToProps)(getApp)
export { App as AppNotConnected }

// chrome 41 fix
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function (predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined')
      }

      var o = Object(this)

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1]

      // 5. Let k be 0.
      var k = 0

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k]
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue
        }
        // e. Increase k by 1.
        k++
      }

      // 7. Return undefined.
      return undefined
    },
    configurable: true,
    writable: true
  })
}
