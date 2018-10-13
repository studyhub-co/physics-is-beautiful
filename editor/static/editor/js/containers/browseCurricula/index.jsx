import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Image as ImageBs, FormGroup, Grid, Row, Col, Button, Glyphicon, InputGroup, FormControl, Modal } from 'react-bootstrap'

import Swiper from 'react-id-swiper'

import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import { SimpleSelect } from 'react-selectize'

import { CurriculumThumbnailPublic } from './../../components/curriculum_thumbnail_public'

import { loadMyCurricula, loadAllCurricula } from './../../actions'

class BrowseCurriculaView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchString: '',
      selectedOption: [],
      popularSlides: [],
      popularNextPageUrl: null,
      recentSlides: [],
      recentSlidesNextPageUrl: null,
      newSlides: [],
      newSlidesNextPageUrl: null
    }
  }

  componentDidMount () {
    if (!this.props.curricula) {
      this.props.loadCurricula()
    }
    if (!this.props.recentCurricula) {
      this.props.loadRecentCurricula()
    }
  }

  getParams (slidesListName) {
    var self = this

    var swiperParams = {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      // preventClicks: false,
      spaceBetween: 0,
      slidesPerView: 5, // should be more than API paginator page size!
      rebuildOnUpdate: true,
      virtual: {
        slides: self.state[slidesListName],
        renderExternal: function (data) {
          // empty function needs to disable internal rendering, more info http://idangero.us/swiper/api/#virtual
        }
      },
      on: {
        reachEnd: function () {
          // load next page
          if (self.state.popularNextPageUrl && slidesListName === 'popularSlides') {
            self.props.loadAllCurricula(self.state.popularNextPageUrl)
          }
        }
      }
    }
    return swiperParams
  }

  populateSlides (slidesListName, props) {
    var slides = []
    if (this.state[slidesListName] && this.state[slidesListName].length > 0) {
      slides = this.state[slidesListName]
    }
    for (var index in props.curricula.results) {
      slides.push(
        <CurriculumThumbnailPublic
          key={props.curricula.results[index].uuid}
          {...props.curricula.results[index]}
        />
      )
    }
    return slides
  }

  componentWillReceiveProps (props) {
    if (props.curricula) {
      this.setState({
        popularNextPageUrl: props.curricula.next,
        popularSlides: this.populateSlides('popularSlides', props),
        recentSlides: this.populateSlides('recentSlides', props)
      })
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
                  <SimpleSelect
                    placeholder='Search'
                    search={this.state.searchString}
                  />
                  {/*options={foundUsers}*/}
                  {/*values={this.state.selectedUsers}*/}
                  {/*onValuesChange={onValuesChange}*/}
                  {/*onSearchChange={onSearchChange}*/}
                  {/*uid={uid}*/}
                  {/*renderOption={renderOption}*/}
                  {/*renderNoResultsFound={renderNoResultsFound}*/}
                  {/*renderValue={renderValue}*/}
                  {/*filterOptions={filterOptions}*/}
                  <InputGroup.Button>
                    <Button><Glyphicon glyph='search' /></Button>
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
                      <Swiper {...this.getParams('recentSlides')} >
                        {this.state['recentSlides']}
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
                      <Swiper {...this.getParams('popularSlides')} >
                        {this.state['popularSlides']}
                      </Swiper>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={12}>
                      <div className={'blue-text'} style={{lineHeight: '3rem', fontSize: '2rem'}}>
                          {/*New*/}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={12}>
                      {/*<Swiper {...this.getParams()} >*/}
                        {/*{this.state.popularSlides}*/}
                      {/*</Swiper>*/}
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
    curricula: state.allCurricula
  }
}

BrowseCurriculaView.propTypes = {
  // actions
  loadRecentCurricula: PropTypes.func.isRequired,
  loadAllCurricula: PropTypes.func.isRequired,
  // data
  curricula: PropTypes.object
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadRecentCurricula: (url) => dispatch(loadAllCurricula(url, 'recent')),
    loadAllCurricula: (url) => dispatch(loadAllCurricula(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseCurriculaView)
export { BrowseCurriculaView as BrowseCurriculaViewNotConnected }
