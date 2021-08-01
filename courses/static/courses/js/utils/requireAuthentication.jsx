import React, { useEffect } from 'react'
import { connect } from 'react-redux'

export function requireAuthentication(Component) {
  const AuthenticatedComponent = props => {
    const { profile } = props

    /**
     * Function that redirects to the login page
     */
    // TODO replace with SPA modal sign in
    const redirectToLoginPage = () => {
      // redirect to login page
      const url = '/accounts/login/?next=' + window.location.pathname
      window.location.replace(url)
    }

    /**
     * Check if the user is authenticated
     */
    useEffect(() => {
      if (profile) {
        // redirect only if profile loaded
        if (!profile.hasOwnProperty('id')) {
          redirectToLoginPage()
        }
      }
    }, [profile])

    // const loginErrorMessage = (
    //   <div>Please login in order to view this part of the application.</div>
    // )

    return (
      <div>
        <Component {...props} />
        {/*{this.isAuthenticated() === true ? (*/}
        {/*  <Component {...this.props} />*/}
        {/*) : (*/}
        {/*  loginErrorMessage*/}
        {/*)}*/}
      </div>
    )
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      profile: state.profile.me,
    }
  }

  return connect(mapStateToProps)(AuthenticatedComponent)
}

export default requireAuthentication
