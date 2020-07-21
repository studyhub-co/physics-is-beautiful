import React from 'react'
import { SectionSheet } from '../SectionSheet'

export default class ModuleApp extends React.Component {
  constructor (obj) {
    super()
    this.state = {
      currentId: obj.match.params.currentId || 'default',
      sections: []
    }
    this.fetchState()

    this.course = null
    this.module = null
  }

  componentDidMount () {
    window.parent.postMessage({
      'message': 'canGoBack',
      'data': true
    }, '*')
  }

  load () {
    if (!this.module) {
      return
    }
    var items = []
    for (var lessonIndex = 0; lessonIndex < this.module.lessons.length; lessonIndex++) {
      var lesson = this.module.lessons[lessonIndex]
      let href
      // if (lesson.lesson_type === 'GAME') {
      //   // href = '/games/' + lesson.game_slug;
      //   href = '/games/' + lesson.uuid + '/' + lesson.game_slug
      // } else {
      //   href = '/courses//lessons/' + lesson.uuid
      // }
      href = '/courses/lessons/' + lesson.uuid
      items.push({
        name: lesson.name + ' ',
        image: lesson.image,
        href: href,
        uuid: lesson.uuid,
        status: lesson.status
      })
    }
    var sections = [{
      name: this.module.name,
      items: items,
      uuid: this.module.uuid
    }]

    var backLink = '/'

    // If we are using the mobile app, make the query persist.
    if (window.IS_MOBILE_APP) backLink += '?pib_mobile=true'

    if (window.IS_MOBILE_APP) {
      this.setState({
        sections: sections,
        question: null,
        progress: 0,
        answer: null
      })
    } else {
      this.setState({
        sections: sections,
        backLink: backLink,
        question: null,
        progress: 0,
        answer: null
      })
    }
  }

  fetchState () {
    $.ajax({
      async: true,
      url: '/api/v1/courses/modules/' + this.state.currentId,
      data: {'expand': 'lessons'},
      context: this,
      success: function (data, status, jqXHR) {
        this.module = data
        this.load()
      }
    })
  }

  render () {
    return (
      <SectionSheet
        backLink={this.state.backLink}
        sections={this.state.sections}
      />
    )
  }
}
