import React from 'react'
import { connect } from 'react-redux'

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    /**
     * Function that redirects to the login page
     */
    redirectToLoginPage() {
      //  referrer
      // redirect to login page
      let url = '/accounts/login/?next=' + window.location.pathname
      window.location.replace(url)
    }

    /**
     * Check if the user is authenticated
     */
    isAuthenticated() {
      return this.props.profile?.hasOwnProperty('id')
    }

    render() {
      if (!this.isAuthenticated()) {
        this.redirectToLoginPage()
      }

      // const loginErrorMessage = (
      //   <div>Please login in order to view this part of the application.</div>
      // )

      return (
        <div>
          <Component {...this.props} />
          {/*{this.isAuthenticated() === true ? (*/}
          {/*  <Component {...this.props} />*/}
          {/*) : (*/}
          {/*  loginErrorMessage*/}
          {/*)}*/}
        </div>
      )
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      profile: state.profile.me,
    }
  }

  return connect(mapStateToProps)(AuthenticatedComponent)
}

export default requireAuthentication
