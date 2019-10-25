import React from 'react'

export default class LessonsApp extends React.Component {
  constructor (obj) {
    super()
    this.state = {
      currentId: obj.match.params.currentId || 'default',
      material: null,
      progress: 0
    }
    // this.fetchState()
  }

  render () {
    return (
      <div>Redirect to a first material url</div>
    )
  }
}
