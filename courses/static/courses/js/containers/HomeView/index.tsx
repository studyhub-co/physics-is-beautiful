import React, { useEffect } from 'react'

import './home.css'

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
      <div>
        <div id="front-page">
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
