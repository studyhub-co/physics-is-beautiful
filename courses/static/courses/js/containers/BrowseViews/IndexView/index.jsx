import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import Slider from 'react-slick'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import CourseThumbnailPublic from '../components/course_thumbnail_public'
import CoursesSearchView from './search/courses'
import UnitsSearchView from './search/units'
import ModulesSearchView from './search/modules'
import LessonsSearchView from './search/lessons'
import MaterialsSearchView from './search/materials'
// import { getParams, alreadyInSlides, updateSliderNavigation, getPrefixFromSlidesName, updateSlidersNavigation } from './sliderHelpers'
import { getPrefixFromSlidesName, alreadyInSlides } from './sliderHelpers'
import SearchRowView from './searchRow'

import { loadAllCourses } from '../../../actions/studio'

const slidesNames = ['newSlides', 'popularSlides', 'recentSlides']

class BrowseCoursesView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchString: '',
      searchEnabeled: false,
      selectedTab: '',
      selectedOption: [],
      popularSlides: [],
      popularNextPageUrl: null,
      recentSlides: [],
      recentNextPageUrl: null,
      newSlides: [],
      newNextPageUrl: null,
    }
    this.handleSelectTab = this.handleSelectTab.bind(this)
    this.handleSearchString = this.handleSearchString.bind(this)
    this.searchButtonClick = this.searchButtonClick.bind(this)
    this.populateSlides = this.populateSlides.bind(this)
    this.onAddRemoveFromDashboardSildes = this.onAddRemoveFromDashboardSildes.bind(
      this,
    )
    this.handleSearchInputKeyUp = this.handleSearchInputKeyUp.bind(this)
    this.clearSearchButtonClick = this.clearSearchButtonClick.bind(this)
    this.doTabsSearch = this.doTabsSearch.bind(this)
  }

  componentDidMount() {
    this.props.loadPopularCourses()
    this.props.loadRecentCourses()
    this.props.loadNewCourses()
  }

  alreadyInSlides(slides, uuid) {
    return alreadyInSlides(slides, uuid)
  }

  getPrefixFromSlidesName(slidesName) {
    return getPrefixFromSlidesName(slidesName)
  }

  onAddRemoveFromDashboardSildes(action, course) {
    var newRecent = this.state['recentSlides']

    // remove from recent
    if (action === 'remove') {
      for (var i = 0; i < newRecent.length; i++) {
        if (newRecent[i].props.course.uuid === course.uuid) {
          // remove from recent
          newRecent.splice(i, 1)
          this.setState({ recentSlides: newRecent })
          return
        }
      }
    }

    // add to recent
    if (action === 'add') {
      if (!this.alreadyInSlides(newRecent, course.uuid)) {
        newRecent.push(
          <CourseThumbnailPublic
            className="swiper-slide"
            key={course.uuid}
            onAddRemoveFromDashboardSildes={this.onAddRemoveFromDashboardSildes}
            slidesListName={'recentSlides'}
            course={course}
          />,
        )
        this.setState({ recentSlides: newRecent })
      }
    }
  }

  populateSlides(slidesListName, props) {
    var slides = []
    var courses = props.popularCourses

    if (slidesListName === 'recentSlides') {
      courses = props.recentCourses
    }
    if (slidesListName === 'newSlides') {
      courses = props.newCourses
    }
    if (!courses) return []
    if (this.state[slidesListName] && this.state[slidesListName].length > 0) {
      slides = this.state[slidesListName]
    }

    for (var index in courses.results) {
      if (!this.alreadyInSlides(slides, courses.results[index].uuid)) {
        slides.push(
          <CourseThumbnailPublic
            className="swiper-slide"
            key={courses.results[index].uuid}
            onAddRemoveFromDashboardSildes={this.onAddRemoveFromDashboardSildes}
            slidesListName={slidesListName}
            course={courses.results[index]}
          />,
        )
      }
    }
    return slides
  }

  // deprecated TODO replace with componentDidUpdate
  componentWillReceiveProps(props) {
    for (var i = 0, len = slidesNames.length; i < len; i++) {
      var prefix = this.getPrefixFromSlidesName(slidesNames[i])

      if (
        props[prefix + 'Courses'] &&
        props[prefix + 'Courses'] !== this.props[prefix + 'Courses']
      ) {
        var slides = this.populateSlides(slidesNames[i], props)
        var newState = {}
        newState[prefix + 'NextPageUrl'] = props[prefix + 'Courses'].next
        newState[slidesNames[i]] = slides
        this.setState(newState)
      }
    }
  }

  handleSearchString(e) {
    if (!e.target.value) {
      this.setState({ searchString: e.target.value }, this.doTabsSearch) // reset
      this.setState({ searchEnabeled: false })
      this.searchView = null
    } else {
      this.setState({ searchString: e.target.value })
    }
  }

  clearSearchButtonClick(e) {
    this.setState({ searchString: '' }, this.doTabsSearch)
    this.setState({ searchEnabeled: false })
    this.searchView = null
  }

  handleSelectTab(tabname) {
    if (tabname !== this.state.selectedTab) {
      this.setState({ selectedTab: tabname })
    }
  }

  doTabsSearch() {
    if (this.state.selectedTab === 'Units') {
      this.searchUnitsView.getWrappedInstance().doSearch()
    }
    if (this.state.selectedTab === 'Modules') {
      this.searchModulesView.getWrappedInstance().doSearch()
    }
    if (this.state.selectedTab === 'Lessons') {
      this.searchLessonsView.getWrappedInstance().doSearch()
    }
    if (this.state.selectedTab === 'Materials') {
      this.materialsSearchView.getWrappedInstance().doSearch()
    }
  }

  searchButtonClick(e) {
    var searchString = this.state.searchString
    if (searchString) {
      this.setState({ searchEnabeled: true })
      if (this.searchView) {
        this.searchView.getWrappedInstance().doSearch()
      }
      this.doTabsSearch()
    }
  }

  handleSearchInputKeyUp(e) {
    if (e.keyCode === 13) {
      // 'enter' key
      this.searchButtonClick()
    }
  }

  loadNextSlides(next, slidesListName) {
    var self = this

    if (
      self.state.recentSlides.length <= next + 5 &&
      self.state.recentNextPageUrl &&
      slidesListName === 'recentSlides'
    ) {
      self.props.loadRecentCourses(self.state.recentNextPageUrl)
    }
    if (
      self.state.popularSlides.length <= next + 5 &&
      self.state.popularNextPageUrl &&
      slidesListName === 'popularSlides'
    ) {
      self.props.loadPopularCourses(self.state.popularNextPageUrl)
    }
    if (
      self.state.newSlides.length <= next + 5 &&
      self.state.newNextPageUrl &&
      slidesListName === 'newSlides'
    ) {
      self.props.loadNewCourses(self.state.newNextPageUrl)
    }
  }

  // copy of resources/static/resources/js/containers/IndexView/index.jsx
  getSliderParams(slidesListName) {
    const sliderSettings = {
      dots: false,
      infinite: false,
      speed: 500,
      initialSlide: 0,
      slidesToShow: 5,
      slidesToScroll: 5,
      lazyLoad: true,
      arrows: true,
      beforeChange: (current, next) =>
        this.loadNextSlides(next, slidesListName),
      responsive: [
        {
          breakpoint: 1800,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
          },
        },
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            // variableWidth: true
          },
        },
      ],
    }
    return sliderSettings
  }

  render() {
    var displyDashboard = 'block'
    if (this.state.searchEnabeled) {
      displyDashboard = 'none'
    }

    return (
      <div>
        <Container fluid>
          <SearchRowView
            searchButtonClick={this.searchButtonClick}
            handleSearchString={this.handleSearchString}
            handleSearchInputKeyUp={this.handleSearchInputKeyUp}
            clearSearchButtonClick={this.clearSearchButtonClick}
            searchString={this.state.searchString}
          />
        </Container>
        <div className={'pop-up-window'}>
          <div className="tab-links">
            <Tabs
              name="browseAppTabs"
              className="tabs"
              handleSelect={this.handleSelectTab}
              selectedTab={this.state.selectedTab}
            >
              <TabLink to="Courses">Courses</TabLink>
              <TabLink to="Units">Units</TabLink>
              <TabLink to="Modules">Modules</TabLink>
              <TabLink to="Lessons">Lessons</TabLink>
              <TabLink to="Materials">Materials</TabLink>
              <div className="content">
                <TabContent for="Courses">
                  {this.state.searchEnabeled ? (
                    <CoursesSearchView
                      ref={node => {
                        if (node) this.searchView = node
                      }}
                      coursesSearchString={this.state.searchString}
                    />
                  ) : null}
                  <div style={{ display: displyDashboard }}>
                    <Container fluid>
                      <Row>
                        <Col sm={12} md={12}>
                          <div
                            className={'blue-title'}
                            style={{ lineHeight: '7rem' }}
                          >
                            Course dashboard
                          </div>
                          {this.state.recentSlides.length > 0 ? (
                            <div
                              className={'blue-text'}
                              style={{ lineHeight: '3rem', fontSize: '2rem' }}
                            >
                              My dashboard
                            </div>
                          ) : null}
                          <Slider {...this.getSliderParams('recentSlides')}>
                            {this.state.recentSlides}
                          </Slider>
                          <div
                            className={'blue-text'}
                            style={{ lineHeight: '3rem', fontSize: '2rem' }}
                          >
                            Popular
                          </div>
                          <Slider {...this.getSliderParams('popularSlides')}>
                            {this.state.popularSlides}
                          </Slider>
                          <div
                            className={'blue-text'}
                            style={{ lineHeight: '3rem', fontSize: '2rem' }}
                          >
                            New
                          </div>
                          <Slider {...this.getSliderParams('newSlides')}>
                            {this.state.newSlides}
                          </Slider>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </TabContent>
                <TabContent for="Units">
                  <UnitsSearchView
                    ref={node => {
                      if (node) this.searchUnitsView = node
                    }}
                    searchString={this.state.searchString}
                    selectedTab={this.state.selectedTab}
                  />
                </TabContent>
                <TabContent for="Modules">
                  <ModulesSearchView
                    ref={node => {
                      if (node) this.searchModulesView = node
                    }}
                    searchString={this.state.searchString}
                    selectedTab={this.state.selectedTab}
                  />
                </TabContent>
                <TabContent for="Lessons">
                  <LessonsSearchView
                    ref={node => {
                      if (node) this.searchLessonsView = node
                    }}
                    searchString={this.state.searchString}
                    selectedTab={this.state.selectedTab}
                  />
                </TabContent>
                <TabContent for="Materials">
                  <MaterialsSearchView
                    ref={node => {
                      if (node) this.searchMaterialsView = node
                    }}
                    searchString={this.state.searchString}
                    selectedTab={this.state.selectedTab}
                  />
                </TabContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    popularCourses: state.studio.filteredCourses.popularCourses,
    recentCourses: state.studio.filteredCourses.recentCourses,
    newCourses: state.studio.filteredCourses.newCourses,
    tab: state.studio.tabs.tab,
  }
}

BrowseCoursesView.propTypes = {
  // actions
  loadRecentCourses: PropTypes.func.isRequired,
  loadPopularCourses: PropTypes.func.isRequired,
  loadNewCourses: PropTypes.func.isRequired,
  // data
  popularCourses: PropTypes.object,
  recentCourses: PropTypes.object,
  newCourses: PropTypes.object,
  tab: PropTypes.string,
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    loadRecentCourses: url => dispatch(loadAllCourses(url, 'recent')),
    loadNewCourses: url => dispatch(loadAllCourses(url, null, '-created_on')),
    loadPopularCourses: url =>
      dispatch(loadAllCourses(url, null, '-number_of_learners_denormalized')), // popular
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseCoursesView)
export { BrowseCoursesView as BrowseCoursesViewNotConnected }
