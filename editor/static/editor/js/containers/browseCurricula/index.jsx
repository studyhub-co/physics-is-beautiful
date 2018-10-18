import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Image as ImageBs, FormGroup, Grid, Row, Col, Button, Glyphicon, InputGroup, FormControl } from 'react-bootstrap'

import Swiper from 'react-id-swiper'
// import Swiper from 'swiper/dist/js/swiper.esm.bundle'

import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

// import { SimpleSelect } from 'react-selectize'

import { CurriculumThumbnailPublic } from './../../components/curriculum_thumbnail_public'

import { loadAllCurricula } from './../../actions'

const slidesNames = ['newSlides', 'popularSlides', 'recentSlides']

class BrowseCurriculaView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchString: '',
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
    this.handleSearchString = this.handleSearchString.bind(this)
    this.updateSliderNavigation = this.updateSliderNavigation.bind(this)
    this.searchButtonClick = this.searchButtonClick.bind(this)
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
    // var activeSlideKey = 0

    var swiper = self[slidesListName + 'Swiper']

    if (swiper) {
      // populate virtual.data with fake slidersList
      var fakeSlides = []
      // activeSlideKey = swiper.virtual.slides.length
      for (var i = 0; i < this.state[slidesListName].length; i += 1) {
        fakeSlides.push('')
      }
      swiper.virtual.slides = fakeSlides
    }

    var swiperParams = {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      // preventClicks: false,
      spaceBetween: 0,
      slidesPerView: 5, // must be more than API paginator page size!
      // activeSlideKey: activeSlideKey,
      // rebuildOnUpdate: true, // if we will update or rebuild we will lose navigation position
      // shouldSwiperUpdate: true,
      virtual: {
        slides: self.state[slidesListName],
        renderExternal: function (data) {
          // empty function needs to disable internal rendering, more info http://idangero.us/swiper/api/#virtual
          // if (swiper) { swiper.navigation.update() } // hack for update navigation buttons
        }
      },
      on: {
        reachEnd: function () {
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
      }
    }
    return swiperParams
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
      slides.push(
        <CurriculumThumbnailPublic
          className='swiper-slide'
          key={curricula.results[index].uuid}
          {...curricula.results[index]}
        />
      )
    }
    return slides
  }

  updateSliderNavigation (slidesListName) {
    var swiper = this[slidesListName + 'Swiper']
    if (swiper) {
      swiper.navigation.update()
    } // hack for update navigation buttons
  }

  updateSlidersNavigation () {
    for (var i = 0, len = slidesNames.length; i < len; i++) {
      this.updateSliderNavigation(slidesNames[i])
    }
  }

  getPrefixFromSlidesName (slidesName) {
    return slidesName.replace('Slides', '')
  }

  componentWillReceiveProps (props) {
    if (this.props.tab !== props.tab) {
      this.updateSlidersNavigation()
    }

    for (var i = 0, len = slidesNames.length; i < len; i++) {
      var prefix = this.getPrefixFromSlidesName(slidesNames[i])

      if (props[prefix + 'Curricula'] && props[prefix + 'Curricula'] !== this.props[prefix + 'Curricula']) {
        var slides = this.populateSlides(slidesNames[i], props)
        var newState = {}
        newState[prefix + 'NextPageUrl'] = props.popularCurricula.next
        newState[slidesNames[i]] = slides
        this.setState(newState)
      }
    }
  }

  handleSearchString (e) {
    this.setState({searchString: e.target.value})
  }

  searchButtonClick (e) {
    var searchString = this.state.searchString
    if (searchString) {
      // TODO add API call
    }
  }

  render () {
    return (
      <div>
        <Grid fluid>
          <Row style={{padding: 0}}>
            <Col sm={10} md={10}>
              <FormGroup>
                <InputGroup>
                  <FormControl
                    type='text'
                    value={this.state.searchString}
                    placeholder='Search'
                    onChange={this.handleSearchString}
                  />
                  <InputGroup.Button>
                    <Button
                      onClick={this.searchButtonClick}
                    ><Glyphicon glyph='search' /></Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col sm={2} md={2}>
              <Button disabled>Filter</Button>
            </Col>
          </Row>
        </Grid>
        <div className={'pop-up-window'}>
          <div className='tab-links'>
            <Tabs name='editCurriculumProfileTabs'
              className='tabs'
              handleSelect={this.handleSelectTab}
              selectedTab={this.state.selectedTab}
            >
              <TabLink to='Сurricula'>Curricula</TabLink>
              <TabLink to='Units'>Units</TabLink>
              <TabLink to='Modules'>Modules</TabLink>
              <TabLink to='Lessons'>Lessons</TabLink>
              <TabLink to='Questions'>Questions</TabLink>
              <div className='content'>
                <TabContent for='Сurricula'>
                  <Row>
                    <Col sm={12} md={12}>
                      <div className={'blue-title'} style={{lineHeight: '7rem'}}>
                            Curriculum dashboard
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={12}>
                      <div className={'blue-text'} style={{lineHeight: '3rem', fontSize: '2rem'}}>
                            My recently viewed
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={12}>
                      {/*<div className='swiper-container' id={'recent-swiper'}>*/}
                        {/*<div className='swiper-wrapper'>*/}
                          {/*{this.state.virtualData.recentSlides}*/}
                        {/*</div>*/}
                      {/*</div>*/}
                      <Swiper {...this.getParams('recentSlides')} ref={(node) => { if (node) this.recentSlidesSwiper = node.swiper }}>
                        {this.state.recentSlides}
                      </Swiper>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={12}>
                      <div className={'blue-text'} style={{lineHeight: '3rem', fontSize: '2rem'}}>
                            Popular
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={12}>
                      <Swiper {...this.getParams('popularSlides')} ref={(node) => { if (node) this.popularSlidesSwiper = node.swiper }}>
                        {this.state.popularSlides}
                      </Swiper>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={12}>
                      <div className={'blue-text'} style={{lineHeight: '3rem', fontSize: '2rem'}}>
                          New
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={12}>
                      <Swiper {...this.getParams('newSlides')} ref={(node) => { if (node) this.newSlidesSwiper = node.swiper }}>
                        {this.state.newSlides}
                      </Swiper>
                    </Col>
                  </Row>
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
