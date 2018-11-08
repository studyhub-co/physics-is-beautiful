import React from 'react'

import PropTypes from 'prop-types'

import { Grid, Row, Col } from 'react-bootstrap'

import { connect } from 'react-redux'
import { loadSearchQuestions } from '../../../actions'

// TODO replace with qiestion QuestionThumbnailPublic
import { UnitThumbnailPublic } from './../../../components/not_editor/unit_thumbnail_public'

import { RingLoader } from 'react-spinners'

class QuestionsSearchView extends React.Component {
  constructor (props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
  }

  componentWillReceiveProps (props) {
    if (this.props.selectedTab !== props.selectedTab && props.selectedTab === 'Questions') {
      this.props.loadSearchQuestions(this.props.searchString)
    }
  }

  doSearch () {
    this.props.loadSearchQuestions(this.props.searchString)
  }

  render () {
    return (<Grid fluid>{this.props.questionsSearchList
      ? <div> { this.props.questionsSearchList.results.map(function (unit, i) {
        return <UnitThumbnailPublic
          key={unit.uuid}
          unit={unit} />
      })}
      { this.props.questionsSearchList.results.length === 0 ? <h4>
        Sorry, we couldn't find any results for this query.
      </h4> : null }
      </div>
      : <Row>
        <Col sm={12} md={12}>
          <div style={{height: '10rem', marginLeft: '50%'}}>
            <RingLoader
              color={'#1caff6'}
              loading={Boolean(true)}
            />
          </div>
        </Col>
      </Row> }
    </Grid>
    )
  }
}

QuestionsSearchView.propTypes = {
  // actions
  loadSearchQuestions: PropTypes.func.isRequired,
  searchString: PropTypes.string,
  questionsSearchList: PropTypes.object,
  selectedTab: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    // curriculaSearchList: state.search.curricula,
    questionsSearchList: state.search.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadSearchQuestions: (searchString) => dispatch(loadSearchQuestions(searchString)),
    loadPublicQuestions: () => dispatch(loadSearchQuestions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(QuestionsSearchView)
export { QuestionsSearchView as QuestionsSearchViewNotConnected }
