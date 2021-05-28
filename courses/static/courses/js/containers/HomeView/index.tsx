import React, { useEffect } from 'react'

import './home.css'

import Logo from './images/favicon/favicon-32x32.png'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import * as profileCreators from '../../actions/profile'

interface IHomeIndexViewProps {
  userProfile: object | undefined
  // TODO add interfaces to actions
  profileActions: object
}

const HomeIndexView = (props: IHomeIndexViewProps) => {
  const history = useHistory()

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
    // if user logged in, redirect to courses
    if (props.userProfile?.hasOwnProperty('id')) {
      console.log(props.userProfile)
      history.push('/courses/')
    }
  }, [props.userProfile])

  // redirect to courses if user's profile loaded
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
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ml-auto">
                <li className="navbutton">
                  <a href="" className="navlink">
                    About Us
                  </a>
                </li>
                <li className="navbutton">
                  <a href="" className="navlink">
                    Blog
                  </a>
                </li>
                <li
                  className="navbutton"
                  id="loginButton"
                  data-toggle="modal"
                  data-target="#signup-modal"
                >
                  <a href="#" className="navlink">
                    Login / Signup
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="jumbotron">
            <div className="container">
              <h1>
                Physics is{' '}
                <span style={{ whiteSpace: 'nowrap' }}>
                  beauti\(\!\int\!\)ul.
                </span>
              </h1>
              <p>Start learning physics, free.</p>
              <button
                id="getStartedButton"
                className="d-block mx-auto"
                // onClick="location.href='/curriculum/'"
              >
                Get Started
              </button>
              <section>
                <a href="#" className="scroll-down"></a>
              </section>
            </div>
          </div>
        </div>
        <section className="ok">
          <div className="container-fluid" style="background: linear-gradient(white, #fbfbfb, white);">
            <div className="container-fluid mt-3 d-flex">
              <div className="card-deck">
                <div className="card">
                  <a href="curriculum/lessons/4nXkRtEGMqGnNvcpLDfXmV" style="text-decoration: none !important">
                    <img className="card-img-top" src="{% static 'homepage/images/vectors.png' %}" alt="Card image cap">
                      <div className="card-body">
                        <h5 className="card-title">Vectors</h5>
                        <p className="card-text">Learn vectors by drawing them interactively</p>
                      </div>
                  </a>
                </div>
                <div className="card ">
                  <a href="curriculum/lessons/6imjwU5aXyfMvPZzCtz4FR" style="text-decoration: none !important">
                    <img className="card-img-top" src="{% static 'homepage/images/unit-conversion.png' %}"
                         alt="Card image cap">
                      <div className="card-body">
                        <h5 className="card-title">Unit Conversion</h5>
                        <p className="card-text">Learn how to convert units, with automatic unit canceling. Get practice
                          with prefixes (e.g. kilo, milli, centi) and convert between meters and feet, ounces and grams,
                          and more.</p>
                      </div>
                  </a>
                </div>
                <div className="card">
                  <a href="curriculum/lessons/dNcLZmMkymPQ5TcqdmDAqT" style="text-decoration: none !important">
                    <img className="card-img-top" src="{% static 'homepage/images/graphs.png' %}" alt="Card image cap">
                      <div className="card-body">
                        <h5 className="card-title">Graphs</h5>
                        <p className="card-text">Improve your understanding of displacement, velocity, and acceleration
                          graphs</p>
                      </div>
                  </a>
                </div>
                <div className="card">
                  <a href="curriculum/lessons/Zxk3SjzLAYtR4NxTUwxzJB" style="text-decoration: none !important">
                    <img className="card-img-top" src="{% static 'homepage/images/motion-diagrams.png' %}"
                         alt="Card image cap">
                      <div className="card-body">
                        <h5 className="card-title">Motion diagrams</h5>
                        <p className="card-text">Learn the difference between position and displacement, speed vs
                          velocity through freeze-frame motion diagrams</p>
                      </div>
                  </a>
                </div>
                <div className="card">
                  <a href="curriculum/lessons/hwJbeFd67Lk4H6LYW5aDg3" style="text-decoration: none !important">
                    <img className="card-img-top" src="{% static 'homepage/images/friction.png' %}"
                         alt="Card image cap">
                      <div className="card-body">
                        <h5 className="card-title">Forces</h5>
                        <p className="card-text">Understand forces such as tension, friction, normal force, and practice
                          drawing free-body diagrams interactively</p>
                      </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
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
                  <h5>Resources</h5>
                  <ul className="list-unstyled text-small">
                    {/*<li>*/}
                    {/*  <a*/}
                    {/*    className="text-muted"*/}
                    {/*    href="{% url 'blog:bloghomepage' %}"*/}
                    {/*  >*/}
                    {/*    Blog*/}
                    {/*  </a>*/}
                    {/*</li>*/}
                    {/* todo add resource url*/}
                    <li>
                      <a className="text-muted" href="{% url 'blog:shankar' %}">
                        Shankar
                      </a>
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
                  <h5>About</h5>
                  <ul className="list-unstyled text-small">
                    <li>
                      <a
                        className="text-muted"
                        href="{% url 'homepage:about' %}"
                      >
                        Team
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-muted"
                        href="{% url 'homepage:privacy' %}"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-muted"
                        href="{% url 'homepage:terms' %}"
                      >
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </footer>
          </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.1.0.js"></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
          integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
          integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
          crossOrigin="anonymous"
        ></script>
      </div>
    )
  )
}

const mapStateToProps = (state: any) => {
  return {
    userProfile: state.profile.me,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    profileActions: bindActionCreators(profileCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeIndexView)
export { HomeIndexView as BrowseCoursesViewNotConnected }
