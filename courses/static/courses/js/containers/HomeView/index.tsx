import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import './home.css'

import Logo from './images/favicon/favicon-32x32.png'

import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import * as profileCreators from '../../actions/profile'
import ModalLogIn from '../../components/login/modal'

interface IHomeIndexViewProps {
  userProfile: object | undefined
  // TODO add interfaces to actions
  profileActions: object
}

const HomeIndexView = (props: IHomeIndexViewProps) => {
  const history = useHistory()

  const [showMobileMenu, setShowMobileMenu] = useState('')
  // show login modal if /login in path
  const [loginModalOpen, setLoginModalOpen] = useState(
    props.match.path === '/login' ? true : false,
  )

  // redirect before render
  if (props.userProfile?.hasOwnProperty('id')) {
    history.push('/courses/')
  }

  useEffect(() => {
    if (!props.userProfile) {
      props.profileActions.fetchProfileMe()
    }
  }, [])

  useEffect(() => {
    // redirect to courses if user's profile loaded
    if (props.userProfile?.hasOwnProperty('id')) {
      // current login modal is automatically closed after push
      history.push('/courses/')
    }
  }, [props.userProfile])

  console.log(loginModalOpen)

  const handleLogInModalOpen = () => {
    setLoginModalOpen(!loginModalOpen)
  }

  return (
    !props.userProfile?.hasOwnProperty('id') && (
      <div className={'front-page'}>
        <div id="front-page">
          <nav className="navbar navbar-expand-lg navbar-light">
            <button
              className="pull-right navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span
                className="navbar-toggler-icon"
                onClick={() => {
                  if (showMobileMenu === '') {
                    setShowMobileMenu(' show')
                  } else {
                    setShowMobileMenu('')
                  }
                }}
              ></span>
            </button>
            <div
              className={`collapse navbar-collapse${showMobileMenu}`}
              id="navbarNavDropdown"
            >
              <ul className="navbar-nav ml-auto">
                <li className="navbutton">
                  <NavLink className="navlink" to="/s/about">
                    About Us
                  </NavLink>
                  {/*<a href="" className="navlink">*/}
                  {/*  About Us*/}
                  {/*</a>*/}
                </li>
                {/*<li className="navbutton">*/}
                {/*  <a href="" className="navlink">*/}
                {/*    Blog*/}
                {/*  </a>*/}
                {/*</li>*/}
                <li
                  className="navbutton"
                  id="loginButton"
                  data-toggle="modal"
                  data-target="#signup-modal"
                >
                  <a
                    onClick={handleLogInModalOpen}
                    className="navlink"
                    style={{ cursor: 'pointer' }}
                  >
                    Login / Signup
                  </a>
                  <ModalLogIn
                    history={history}
                    open={loginModalOpen}
                    handleClose={handleLogInModalOpen}
                    loginIncorrectLogin={props.loginIncorrectLogin}
                    loginSuccess={props.loginSuccess}
                    loginProcessRequesting={props.loginProcessRequesting}
                    signUpFormErrors={props.signUpFormErrors}
                    signUpSuccess={props.signUpSuccess}
                    passwordReset={props.profileActions.passwordReset}
                    signUpProcessRequesting={props.signUpProcessRequesting}
                    login={props.profileActions.login}
                    signUp={props.profileActions.signUp}
                  />
                </li>
              </ul>
            </div>
          </nav>
          <div className="jumbotron">
            <div className="container" style={{ textAlign: 'center' }}>
              {/*<h1>*/}
              {/*  Physics is{' '}*/}
              {/*  <span style={{ whiteSpace: 'nowrap' }}>*/}
              {/*    beauti\(\!\int\!\)ul.*/}
              {/*  </span>*/}
              {/*</h1>*/}
              <img
                style={{ width: '65vw' }}
                src={require('./images/PIBTitle.png')}
              />
              <p>Start learning physics, free.</p>
              <button
                id="getStartedButton"
                className="d-block mx-auto"
                onClick={() => {
                  history.push('courses')
                }}
              >
                Get Started
              </button>
              <section>
                {/*<a href="" className="scroll-down"></a>*/}
                <ScrollLink
                  to="cards"
                  className="scroll-down"
                  spy={true}
                  smooth={true}
                  duration={500}
                />
              </section>
            </div>
          </div>
        </div>
        <ScrollElement name="cards">
          <section className="ok">
            <div
              className="container-fluid"
              style={{ background: 'linear-gradient(white, #fbfbfb, white)' }}
            >
              {/* TODO replace it with material ui or react-bootstrap grid */}
              <div className="container-fluid mt-3 d-flex">
                <div className="card-deck">
                  <div className="card">
                    {/*TODO change href*/}
                    <a href="" style={{ textDecoration: 'none' }}>
                      <img
                        className="card-img-top"
                        src={require('./images/vectors.png')}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <h3 className="card-title">Vectors</h3>
                        <p className="card-text">
                          Learn vectors by drawing them interactively
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="card">
                    <a href="" style={{ textDecoration: 'none' }}>
                      <img
                        className="card-img-top"
                        src={require('./images/unit-conversion.png')}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <h3 className="card-title">Unit Conversion</h3>
                        <p className="card-text">
                          Learn how to convert units, with automatic unit
                          canceling. Get practice with prefixes (e.g. kilo,
                          milli, centi) and convert between meters and feet,
                          ounces and grams, and more.
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="card">
                    <a href="" style={{ textDecoration: 'none' }}>
                      <img
                        className="card-img-top"
                        src={require('./images/graphs.png')}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <h3 className="card-title">Graphs</h3>
                        <p className="card-text">
                          Improve your understanding of displacement, velocity,
                          and acceleration graphs
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="card">
                    <a href="" style={{ textDecoration: 'none' }}>
                      <img
                        className="card-img-top"
                        src={require('./images/motion-diagrams.png')}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <h3 className="card-title">Motion diagrams</h3>
                        <p className="card-text">
                          Learn the difference between position and
                          displacement, speed vs velocity through freeze-frame
                          motion diagrams
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="card">
                    <a href="" style={{ textDecoration: 'none' }}>
                      <img
                        className="card-img-top"
                        src={require('./images/friction.png')}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <h3 className="card-title">Forces</h3>
                        <p className="card-text">
                          Understand forces such as tension, friction, normal
                          force, and practice drawing free-body diagrams
                          interactively
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollElement>
        <div className="container-fluid" style={{ background: '#f1f1f1' }}>
          <div className="container mt-3">
            <footer className="pt-4 pt-md-5 border-top">
              <div className="row">
                <div className="col-12 col-md">
                  <img
                    className="mb-2"
                    src={Logo}
                    alt=""
                    width="24"
                    height="24"
                  />
                  <small className="d-block mb-3 text-muted">
                    © 2017-{new Date().getFullYear()}
                  </small>
                </div>
                <div className="col-6 col-md">
                  <h3>Resources</h3>
                  <ul className="list-unstyled text-small">
                    {/*<li>*/}
                    {/*  <a*/}
                    {/*    className="text-muted"*/}
                    {/*    href="{% url 'blog:bloghomepage' %}"*/}
                    {/*  >*/}
                    {/*    Blog*/}
                    {/*  </a>*/}
                    {/*</li>*/}
                    {/* todo add Shankar resource url? */}
                    <li>
                      <Link className="text-muted" to="/resources/">
                        Resources
                      </Link>
                      {/*<a className="text-muted" href="">*/}
                      {/*  Shankar*/}
                      {/*</a>*/}
                    </li>
                    {/*<li>*/}
                    {/*  <a*/}
                    {/*    className="text-muted"*/}
                    {/*    href="{% url 'blog:collegescorecard-analysis' %}"*/}
                    {/*  >*/}
                    {/*    College analysis*/}
                    {/*  </a>*/}
                    {/*</li>*/}
                  </ul>
                </div>
                <div className="col-6 col-md">
                  <h3>About</h3>
                  <ul className="list-unstyled text-small">
                    <li>
                      <Link className="text-muted" to="/s/about">
                        Team
                      </Link>
                      {/*<a*/}
                      {/*  className="text-muted"*/}
                      {/*  href="{% url 'homepage:about' %}"*/}
                      {/*>*/}
                      {/*  Team*/}
                      {/*</a>*/}
                    </li>
                    <li>
                      <Link className="text-muted" to="/s/privacy">
                        Privacy Policy
                      </Link>
                      {/*<a*/}
                      {/*  className="text-muted"*/}
                      {/*  href="{% url 'homepage:privacy' %}"*/}
                      {/*>*/}
                      {/*  Privacy Policy*/}
                      {/*</a>*/}
                    </li>
                    <li>
                      <Link className="text-muted" to="/s/terms">
                        Terms of Service
                      </Link>
                      {/*<a*/}
                      {/*  className="text-muted"*/}
                      {/*  href="{% url 'homepage:terms' %}"*/}
                      {/*>*/}
                      {/*  Terms of Service*/}
                      {/*</a>*/}
                    </li>
                  </ul>
                </div>
              </div>
            </footer>
          </div>
        </div>
        {/*<script src="https://code.jquery.com/jquery-3.1.0.js"></script>*/}
        {/*<script*/}
        {/*  src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"*/}
        {/*  integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"*/}
        {/*  crossOrigin="anonymous"*/}
        {/*></script>*/}
        {/*<script*/}
        {/*  src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"*/}
        {/*  integrity="sha384-JZR6Spejh3U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"*/}
        {/*  crossOrigin="anonymous"*/}
        {/*></script>*/}
      </div>
    )
  )
}

const mapStateToProps = (state: any) => {
  return {
    userProfile: state.profile.me,
    loginIncorrectLogin: state.profile.loginIncorrectLogin,
    loginSuccess: state.profile.loginSuccess,
    loginProcessRequesting: state.profile.loginProcessRequesting,
    signUpFormErrors: state.profile.signUpFormErrors,
    signUpSuccess: state.profile.signUpSuccess,
    signUpProcessRequesting: state.profile.signUpProcessRequesting,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    profileActions: bindActionCreators(profileCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeIndexView)
export { HomeIndexView as BrowseCoursesViewNotConnected }
