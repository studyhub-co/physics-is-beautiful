import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
/*import ReactDOMServer from 'react-dom/server'*/

import { Image as ImageBs, FormGroup, Grid, Row, Col, Button, Glyphicon, InputGroup, FormControl, Modal } from 'react-bootstrap'

import Swiper from 'react-id-swiper' // TODO fix disabled navigation buttons
// import Swiper from 'swiper/dist/js/swiper.esm.bundle'

import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import { SimpleSelect } from 'react-selectize'

import { CurriculumThumbnailPublic } from './../../components/curriculum_thumbnail_public'

import { loadCurricula } from './../../actions'

class BrowseCurriculaView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchString: '',
      selectedOption: []
    }
  }

  componentDidMount () {
    if (!this.props.curricula) {
      this.props.loadCurricula()
    }
  }

  render () {
    var self = this.props

    // const swiper = new Swiper('.swiper-container', {
    const swiperParams = {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      // preventClicks: false,
      spaceBetween: 0,
      slidesPerView: 5,
      rebuildOnUpdate: true
      // virtual: {
      //   slides: (function () {
      //     var slides = []
      //     // if (Array.isArray(self.curricula)) {
      //     if (self.curricula) {
      //       // for (var i = 0; i < self.curricula.length; i++) {
      //       for (var uuid in self.curricula) {
      //         // slides.push('') // fake slide to enable navigation
      //         // slides.push(ReactDOMServer.renderToString(
      //         slides.push(
      //           <CurriculumThumbnailPublic
      //             key={uuid}
      //             {...self.curricula[uuid]}
      //           />
      //         )
      //       }
      //     }
      //     return slides
      //   }())
      // }
    }
    // )

    var slides = []

    if (self.curricula) {
      // for (var i = 0; i < self.curricula.length; i++) {
      for (var uuid in self.curricula) {
        slides.push(
          <CurriculumThumbnailPublic
            key={uuid}
            {...self.curricula[uuid]}
          />
        )
      }
    }

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
                            Popular
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={12}>
                      {/*<div className='swiper-container'>*/}
                        {/*<div className='swiper-wrapper'>*/}
                          {/*/!* It is important to set 'left' style prop on every slide *!/*/}
                          {/*{slides.map((slide, index) => (*/}
                            {/*<div className='swiper-slide'*/}
                              {/*key={index}*/}
                              {/*style={{left: '10px'}}*/}
                            {/*>{slide}</div>*/}
                          {/*))}*/}
                        {/*</div>*/}
                      {/*</div>*/}
                      <Swiper {...swiperParams} >
                        {slides}
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
                      <Swiper {...swiperParams} >
                        {slides}
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
    curricula: state.allCurricula
  }
}

BrowseCurriculaView.propTypes = {
  // actions
  loadCurricula: PropTypes.func.isRequired,
  // changeCurriculumImage: PropTypes.func.isRequired,
  // changeCurriculumCoverPhoto: PropTypes.func.isRequired,
  // data
  // curricula: PropTypes.object
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadCurricula: () => dispatch(loadCurricula()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseCurriculaView)
export { BrowseCurriculaView as BrowseCurriculaViewNotConnected }
