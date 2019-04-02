import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import Swiper from 'react-id-swiper'
// import Swiper from 'swiper/dist/js/swiper.esm.bundle'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import { CurriculumThumbnailPublic } from './../../components/not_editor/curriculum_thumbnail_public'
import CurriculaSearchView from './search/curricula'
import UnitsSearchView from './search/units'
import ModulesSearchView from './search/modules'
import LessonsSearchView from './search/lessons'
import QuestionsSearchView from './search/questions'
import { getParams, alreadyInSlides, updateSliderNavigation, getPrefixFromSlidesName, updateSlidersNavigation } from './sliderHelpers'
import SearchRowView from './searchRow'

import { loadAllCurricula } from './../../actions'
// import { history } from '../../history'

const slidesNames = ['newSlides', 'popularSlides', 'recentSlides']

class BrowseCurriculaView extends React.Component {
  constructor (props) {
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
      virtualData: {
        popularSlides: [],
        recentSlides: [],
        newSlides: []
      }
    }
    this.handleSelectTab = this.handleSelectTab.bind(this)
    this.handleSearchString = this.handleSearchString.bind(this)
    this.updateSliderNavigation = this.updateSliderNavigation.bind(this)
    this.searchButtonClick = this.searchButtonClick.bind(this)
    this.populateSlides = this.populateSlides.bind(this)
    this.onAddRemoveFromDashboardSildes = this.onAddRemoveFromDashboardSildes.bind(this)
    this.handleSearchInputKeyUp = this.handleSearchInputKeyUp.bind(this)
    this.clearSearchButtonClick = this.clearSearchButtonClick.bind(this)
    this.doTabsSearch = this.doTabsSearch.bind(this)
  }

  componentDidMount () {
    this.props.loadPopularCurricula()
    this.props.loadRecentCurricula()
    this.props.loadNewCurricula()
  }

  componentDidUpdate () {
    this.updateSlidersNavigation()
  }

  getParams (slidesListName) {
    var self = this
    var reachEndFunc = function () {
      if (self.state.popularNextPageUrl && slidesListName === 'popularSlides') {
        self.props.loadPopularCurricula(self.state.popularNextPageUrl)
      }
      if (self.state.recentNextPageUrl && slidesListName === 'recentSlides') {
        self.props.loadRecentCurricula(self.state.recentNextPageUrl)
      }
      if (self.state.newNextPageUrl && slidesListName === 'newSlides') {
        self.props.loadNewCurricula(self.state.newNextPageUrl)
      }
    }

    return getParams(slidesListName, this, reachEndFunc)
  }

  alreadyInSlides (slides, uuid) {
    return alreadyInSlides(slides, uuid)
  }

  updateSlidersNavigation () {
    return updateSlidersNavigation(slidesNames, this)
  }

  updateSliderNavigation (slidesListName) {
    return updateSliderNavigation(slidesListName, this)
  }

  getPrefixFromSlidesName (slidesName) {
    return getPrefixFromSlidesName(slidesName)
  }

  // getParams (slidesListName) {
  //   var self = this
  //   // var activeSlideKey = 0
  //
  //   var swiper = self[slidesListName + 'Swiper']
  //
  //   if (swiper) {
  //     // populate virtual.data with fake slidersList
  //     var fakeSlides = []
  //     // activeSlideKey = swiper.virtual.slides.length
  //     for (var i = 0; i < this.state[slidesListName].length; i += 1) {
  //       fakeSlides.push('')
  //     }
  //     swiper.virtual.slides = fakeSlides
  //   }
  //
  //   var swiperParams = {
  //     navigation: {
  //       nextEl: '.swiper-button-next.pib-swiper-button',
  //       prevEl: '.swiper-button-prev.pib-swiper-button'
  //     },
  //     // preventClicks: false,
  //     spaceBetween: 0,
  //     slidesPerView: 5, // must be more than API paginator page size!
  //     // activeSlideKey: activeSlideKey,
  //     // rebuildOnUpdate: true, // if we will update or rebuild we will lose navigation position
  //     // shouldSwiperUpdate: true,
  //     virtual: {
  //       slides: self.state[slidesListName],
  //       renderExternal: function (data) {
  //         // empty function needs to disable internal rendering, more info http://idangero.us/swiper/api/#virtual
  //         // if (swiper) { swiper.navigation.update() } // hack for update navigation buttons
  //       }
  //     },
  //     on: {
  //       reachEnd: function () {
  //         if (self.state.popularNextPageUrl && slidesListName === 'popularSlides') {
  //           self.props.loadPopularCurricula(self.state.popularNextPageUrl)
  //         }
  //         if (self.state.recentNextPageUrl && slidesListName === 'recentSlides') {
  //           self.props.loadRecentCurricula(self.state.recentNextPageUrl)
  //         }
  //         if (self.state.newNextPageUrl && slidesListName === 'newSlides') {
  //           self.props.loadNewCurricula(self.state.newNextPageUrl)
  //         }
  //       }
  //     }
  //   }
  //   return swiperParams
  // }

  // alreadyInSlides (slides, uuid) {
  //   for (var i = 0; i < slides.length; i++) {
  //     if (slides[i].props.curriculum.uuid === uuid) {
  //       return true
  //     }
  //   }
  //   return false
  // }

  onAddRemoveFromDashboardSildes (action, curriculum) {
    var newRecent = this.state['recentSlides']

    // remove from recent
    if (action === 'remove') {
      for (var i = 0; i < newRecent.length; i++) {
        if (newRecent[i].props.curriculum.uuid === curriculum.uuid) {
          // remove from recent
          newRecent.splice(i, 1)
          this.setState({'recentSlides': newRecent})
          return
        }
      }
    }

    // add to recent
    if (action === 'add') {
      if (!this.alreadyInSlides(newRecent, curriculum.uuid)) {
        newRecent.push(<CurriculumThumbnailPublic
          className='swiper-slide'
          key={curriculum.uuid}
          onAddRemoveFromDashboardSildes={this.onAddRemoveFromDashboardSildes}
          slidesListName={'recentSlides'}
          curriculum={curriculum}
        />)
        this.setState({'recentSlides': newRecent})
      }
    }
  }

  populateSlides (slidesListName, props) {
    var slides = []
    var curricula = props.popularCurricula

    if (slidesListName === 'recentSlides') {
      curricula = props.recentCurricula
    }
    if (slidesListName === 'newSlides') {
      curricula = props.newCurricula
    }
    if (!curricula) return []
    if (this.state[slidesListName] && this.state[slidesListName].length > 0) {
      slides = this.state[slidesListName]
    }

    for (var index in curricula.results) {
      if (!this.alreadyInSlides(slides, curricula.results[index].uuid)) {
        slides.push(
          <CurriculumThumbnailPublic
            className='swiper-slide'
            key={curricula.results[index].uuid}
            onAddRemoveFromDashboardSildes={this.onAddRemoveFromDashboardSildes}
            slidesListName={slidesListName}
            curriculum={curricula.results[index]}
          />/*{...curricula.results[index]}*/
        )
      }
    }
    return slides
  }

  componentWillReceiveProps (props) {
    // if (this.props.tab !== props.tab) {
    this.updateSlidersNavigation()
    // }

    for (var i = 0, len = slidesNames.length; i < len; i++) {
      var prefix = this.getPrefixFromSlidesName(slidesNames[i])

      if (props[prefix + 'Curricula'] && props[prefix + 'Curricula'] !== this.props[prefix + 'Curricula']) {
        var slides = this.populateSlides(slidesNames[i], props)
        var newState = {}
        newState[prefix + 'NextPageUrl'] = props[prefix + 'Curricula'].next
        newState[slidesNames[i]] = slides
        this.setState(newState)
      }
    }
  }

  handleSearchString (e) {
    if (!e.target.value) {
      this.setState({searchString: e.target.value}, this.doTabsSearch) // reset
      this.setState({searchEnabeled: false})
      this.searchView = null
    } else {
      this.setState({searchString: e.target.value})
    }
  }

  clearSearchButtonClick (e) {
    this.setState({searchString: ''}, this.doTabsSearch)
    this.setState({searchEnabeled: false})
    this.searchView = null
  }

  handleSelectTab (tabname) {
    if (tabname !== this.state.selectedTab) {
      this.setState({selectedTab: tabname})
    }
  }

  doTabsSearch () {
    if (this.state.selectedTab === 'Units') {
      this.searchUnitsView.getWrappedInstance().doSearch()
    }
    if (this.state.selectedTab === 'Modules') {
      this.searchModulesView.getWrappedInstance().doSearch()
    }
    if (this.state.selectedTab === 'Lessons') {
      this.searchLessonsView.getWrappedInstance().doSearch()
    }
    if (this.state.selectedTab === 'Questions') {
      this.searchQuestionsView.getWrappedInstance().doSearch()
    }
  }

  searchButtonClick (e) {
    var searchString = this.state.searchString
    if (searchString) {
      this.setState({searchEnabeled: true})
      if (this.searchView) {
        this.searchView.getWrappedInstance().doSearch()
      }
      this.doTabsSearch()
    }
  }

  handleSearchInputKeyUp (e) {
    if (e.keyCode === 13) { // 'enter' key
      this.searchButtonClick()
    }
  }

  render () {
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
          <div className='tab-links'>
            <Tabs name='browseAppTabs'
              className='tabs'
              handleSelect={this.handleSelectTab}
              selectedTab={this.state.selectedTab}
            >
              <TabLink to='Сurricula'>Courses</TabLink>
              <TabLink to='Units'>Units</TabLink>
              <TabLink to='Modules'>Modules</TabLink>
              <TabLink to='Lessons'>Lessons</TabLink>
              <TabLink to='Questions'>Questions</TabLink>
              <div className='content'>
                <TabContent for='Сurricula'>
                  { this.state.searchEnabeled
                    ? <CurriculaSearchView
                      ref={(node) => { if (node) this.searchView = node }}
                      curriculaSearchString={this.state.searchString} /> : null
                  }
                  <div style={{ 'display': displyDashboard }}>
                    <Container fluid>
                      <Row>
                        <Col sm={12} md={12}>
                          <div className={'blue-title'} style={{lineHeight: '7rem'}}>
                                Course dashboard
                          </div>
                          <div className={'blue-text'} style={{lineHeight: '3rem', fontSize: '2rem'}}>
                                My recently viewed
                          </div>
                          <Swiper {...this.getParams('recentSlides')} ref={(node) => { if (node) this.recentSlidesSwiper = node.swiper }}>
                            {this.state.recentSlides}
                          </Swiper>
                          <div className={'blue-text'} style={{lineHeight: '3rem', fontSize: '2rem'}}>
                                Popular
                          </div>
                          <Swiper {...this.getParams('popularSlides')} ref={(node) => { if (node) this.popularSlidesSwiper = node.swiper }}>
                            {this.state.popularSlides}
                          </Swiper>
                          <div className={'blue-text'} style={{lineHeight: '3rem', fontSize: '2rem'}}>
                              New
                          </div>
                          <Swiper {...this.getParams('newSlides')} ref={(node) => { if (node) this.newSlidesSwiper = node.swiper }}>
                            {this.state.newSlides}
                          </Swiper>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </TabContent>
                <TabContent for='Units'>
                  <UnitsSearchView
                    ref={(node) => { if (node) this.searchUnitsView = node }}
                    searchString={this.state.searchString}
                    selectedTab={this.state.selectedTab}
                  />
                </TabContent>
                <TabContent for='Modules'>
                  <ModulesSearchView
                    ref={(node) => { if (node) this.searchModulesView = node }}
                    searchString={this.state.searchString}
                    selectedTab={this.state.selectedTab}
                  />
                </TabContent>
                <TabContent for='Lessons'>
                  <LessonsSearchView
                    ref={(node) => { if (node) this.searchLessonsView = node }}
                    searchString={this.state.searchString}
                    selectedTab={this.state.selectedTab}
                  />
                </TabContent>
                <TabContent for='Questions'>
                  <QuestionsSearchView
                    ref={(node) => { if (node) this.searchQuestionsView = node }}
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

const mapStateToProps = (state) => {
  return {
    popularCurricula: state.filteredCurricula.popularCurricula,
    recentCurricula: state.filteredCurricula.recentCurricula,
    newCurricula: state.filteredCurricula.newCurricula,
    tab: state.studioTabs.tab
  }
}

BrowseCurriculaView.propTypes = {
  // actions
  loadRecentCurricula: PropTypes.func.isRequired,
  loadPopularCurricula: PropTypes.func.isRequired,
  loadNewCurricula: PropTypes.func.isRequired,
  // data
  popularCurricula: PropTypes.object,
  recentCurricula: PropTypes.object,
  newCurricula: PropTypes.object,
  tab: PropTypes.string
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadRecentCurricula: (url) => dispatch(loadAllCurricula(url, 'recent')),
    loadNewCurricula: (url) => dispatch(loadAllCurricula(url, null, '-created_on')),
    loadPopularCurricula: (url) => dispatch(loadAllCurricula(url, null, '-number_of_learners_denormalized')) // popular
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseCurriculaView)
export { BrowseCurriculaView as BrowseCurriculaViewNotConnected }

{/*<Container fluid>*/}
                   {/*<Row>*/}
                     {/*<Col sm={12} md={12}>*/}
                       {/*<div className={'blue-title'} style={{lineHeight: '7rem'}}>*/}
                             {/*Curriculum dashboard*/}
                       {/*</div>*/}
                     {/*</Col>*/}
                   {/*</Row>*/}
                   {/*<Row>*/}
                     {/*<Col sm={12} md={12}>*/}
                       {/*<div className={'blue-text'} style={{lineHeight: '3rem', fontSize: '2rem'}}>*/}
                             {/*My recently viewed*/}
                       {/*</div>*/}
                     {/*</Col>*/}
                   {/*</Row>*/}
                   {/*<Row>*/}
                     {/*<Col sm={12} md={12}>*/}
                       {/*/!*<div className='swiper-container' id={'recent-swiper'}>*!/*/}
                         {/*/!*<div className='swiper-wrapper'>*!/*/}
                           {/*/!*{this.state.virtualData.recentSlides}*!/*/}
                         {/*/!*</div>*!/*/}
                       {/*/!*</div>*!/*/}
                       {/*<Swiper {...this.getParams('recentSlides')} ref={(node) => { if (node) this.recentSlidesSwiper = node.swiper }}>*/}
                         {/*{this.state.recentSlides}*/}
                       {/*</Swiper>*/}
                     {/*</Col>*/}
                   {/*</Row>*/}
                   {/*<Row>*/}
                     {/*<Col sm={12} md={12}>*/}
                       {/*<div className={'blue-text'} style={{lineHeight: '3rem', fontSize: '2rem'}}>*/}
                             {/*Popular*/}
                       {/*</div>*/}
                     {/*</Col>*/}
                   {/*</Row>*/}
                   {/*<Row>*/}
                     {/*<Col sm={12} md={12}>*/}
                       {/*<Swiper {...this.getParams('popularSlides')} ref={(node) => { if (node) this.popularSlidesSwiper = node.swiper }}>*/}
                         {/*{this.state.popularSlides}*/}
                       {/*</Swiper>*/}
                     {/*</Col>*/}
                   {/*</Row>*/}
                   {/*<Row>*/}
                     {/*<Col sm={12} md={12}>*/}
                       {/*<div className={'blue-text'} style={{lineHeight: '3rem', fontSize: '2rem'}}>*/}
                           {/*New*/}
                       {/*</div>*/}
                     {/*</Col>*/}
                   {/*</Row>*/}
                   {/*<Row>*/}
                     {/*<Col sm={12} md={12}>*/}
                       {/*<Swiper {...this.getParams('newSlides')} ref={(node) => { if (node) this.newSlidesSwiper = node.swiper }}>*/}
                         {/*{this.state.newSlides}*/}
                       {/*</Swiper>*/}
                     {/*</Col>*/}
                   {/*</Row>*/}
                 {/*</Container>*/}
