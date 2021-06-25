import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { FaChevronLeft } from 'react-icons/fa'
import { Section } from './navigation'

export class SectionSheet extends React.Component {
  render() {
    let backLink = ''
    if (this.props.backLink) {
      backLink = (
        <Container fluid>
          <Row>
            <Col sm={12} md={12}>
              {/* TODO replace href with history support https://github.com/ReactTraining/history#readme */}
              {/* to make it work as SPA app */}
              {/* It seems window.history is not enough for this link */}
              {/*<a className={'back-button'} href={this.props.backLink}>*/}
              {/*</a>*/}
              <Link to={this.props.backLink} className={'back-button'}>
                <FaChevronLeft />
                Course home
              </Link>
            </Col>
          </Row>
        </Container>
      )
    }
    var sections = []
    this.props.sections.forEach(function(el) {
      sections.push(<Section key={el.uuid} name={el.name} items={el.items} />)
    })
    return (
      <div className="section-sheet">
        {backLink}
        {sections}
      </div>
    )
  }
}
