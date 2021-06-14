import React, { useState, useEffect } from 'react'

import Button from '@material-ui/core/Button'
// import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Slide from '@material-ui/core/Slide'
// import Snackbar from '@material-ui/core/Snackbar'
// import MuiAlert from '@material-ui/lab/Alert'

import LogIn from './logIn'
import SignUp from './signUp'
import ResetPassword from './resetPassword'

// FIXME move to Context?
interface IModalLogInProps {
  open: boolean
  handleClose(): void
  login(email: string, password: string): void
  passwordReset(email: string): void
  signUp(
    firstName: string,
    lastName: string,
    email: string,
    password1: string,
    password2: string,
  ): void
  loginIncorrect?: object
  loginSuccess?: void
  loginProcessRequesting?: void
  signUpFormErrors?: object
  signUpSuccess?: void
  signUpProcessRequesting?: void
  history: object
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

// function Alert(props: object) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />
// }

// const ModalTypes = ['login', 'signUp', 'passwordReset']

const ModalLogIn: React.FC<IModalLogInProps> = props => {
  // LogIn by default, if LogIn == false, then use SignUp
  const [modalType, setModalType] = useState('login')
  // const [isLogIn, setLogIn] = useState(true)
  const [openSnack, setOpenSnack] = useState(false)

  // login
  const emailRef = React.useRef('')
  const passwordRef = React.useRef('')

  // signup
  const sFirstNameRef = React.useRef('')
  const sLastNameRef = React.useRef('')
  const sEmailRef = React.useRef('')
  const sPassword1Ref = React.useRef('')
  const sPassword2Ref = React.useRef('')

  const onLoginDataChange = (email: string, password: string) => {
    // setEmail(email)
    // setPassword(password)
    emailRef.current = email
    passwordRef.current = password
  }

  const onPasswordResetDataChange = (email: string) => {
    emailRef.current = email
  }

  const onSignUpDataChange = (
    firstName: string,
    lastName: string,
    email: string,
    password1: string,
    password2: string,
  ) => {
    sFirstNameRef.current = firstName
    sLastNameRef.current = lastName
    sEmailRef.current = email
    sPassword1Ref.current = password1
    sPassword2Ref.current = password2
  }

  const onLoginClick = () => {
    props.login(emailRef.current, passwordRef.current)
    // TODO close if we have profile loaded - else show error
    // props.handleClose()
  }

  // close signup windows after success login
  useEffect(() => {
    if (props.loginSuccess) {
        props.handleClose()
    }
  }, [props.loginSuccess])


  const onSignUpClick = () => {
    props.signUp(
      sFirstNameRef.current,
      sLastNameRef.current,
      sEmailRef.current,
      sPassword1Ref.current,
      sPassword2Ref.current,
    )
  }

  const onPasswordResetClick = () => {
    props.passwordReset(emailRef.current)
    props.handleClose()
    props.history.push('/s/auth/reset/done/')
  }

  const clearRefs = () => {
    onSignUpDataChange(' ', ' ', ' ', ' ', ' ')
  }

  // const handleCloseSnack = () => {
  //   setOpenSnack(!openSnack)
  // }

  // close signup windows after success signup
  useEffect(() => {
    if (props.signUpSuccess) {
      // props.handleClose()
      clearRefs()
      // redirect to Check email page
      // Show Check email alert
      props.history.push('/s/auth/confirm-email/')
      // setOpenSnack(true)
    }
  }, [props.signUpSuccess])

  return (
    <div>
      {/*<Snackbar*/}
      {/*  anchorOrigin={{*/}
      {/*    vertical: 'top',*/}
      {/*    horizontal: 'center',*/}
      {/*  }}*/}
      {/*  open={openSnack}*/}
      {/*  // key={vertical + horizontal}*/}
      {/*>*/}
      {/*  <Alert onClose={handleCloseSnack} severity="success">*/}
      {/*    We have sent an email to you for verification. Follow the link*/}
      {/*    provided to finalize the signup process. Please contact us if you do*/}
      {/*    not receive it within a few minutes.*/}
      {/*  </Alert>*/}
      {/*</Snackbar>*/}
      <Dialog
        fullWidth
        TransitionComponent={Transition}
        maxWidth="sm"
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <FormControl>
          <DialogTitle id="form-dialog-title">
            <Box display="flex" alignItems="center">
              <Box flexGrow={1}>
                {modalType == 'login' && 'Login'}
                {modalType == 'signUp' && 'Sign Up'}
                {modalType == 'passwordReset' && 'Password Reset'}
              </Box>
              <Box>
                <IconButton onClick={props.handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent>
            {modalType == 'login' && (
              <form>
                <LogIn
                  onDataChange={onLoginDataChange}
                  loginIncorrectLogin={props.loginIncorrectLogin}
                  setModalType={setModalType}
                />
              </form>
            )}
            {modalType == 'signUp' && (
              <form autoComplete="off">
                <SignUp
                  onDataChange={onSignUpDataChange}
                  errors={props.signUpFormErrors}
                />
              </form>
            )}
            {modalType == 'passwordReset' && (
              <form>
                <ResetPassword onDataChange={onPasswordResetDataChange} />
              </form>
            )}
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={props.handleClose} color='primary'> */}
            {/*  Cancel */}
            {/* </Button> */}
            {modalType == 'login' && (
              <Button
                disabled={props.loginProcessRequesting}
                fullWidth
                onClick={onLoginClick}
                color="primary"
                variant="contained"
              >
                Login
              </Button>
            )}
            {modalType == 'signUp' && (
              <Button
                disabled={props.signUpProcessRequesting}
                fullWidth
                onClick={onSignUpClick}
                color="primary"
                variant="contained"
              >
                Sign Up
              </Button>
            )}
            {modalType == 'passwordReset' && (
              <Button
                fullWidth
                onClick={onPasswordResetClick}
                color="primary"
                variant="contained"
              >
                Reset My Password
              </Button>
            )}
          </DialogActions>
          <DialogActions>
            <Divider />
            {modalType == 'login' && (
              <span>
                Don't have an account?{' '}
                <a
                  className="navlink"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    // setLogIn(false)
                    setModalType('signUp')
                  }}
                >
                  Sign Up »
                </a>
              </span>
            )}
            {modalType == 'signUp' && (
              <span>
                Already have an account?{' '}
                <a
                  className="navlink"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    // setLogIn(true)
                    setModalType('login')
                  }}
                >
                  Login »
                </a>
              </span>
            )}
            {modalType == 'passwordReset' && (
              <span>
                Don't have an account?{' '}
                <a
                  className="navlink"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setModalType('signUp')
                  }}
                >
                  Sign Up »
                </a>
              </span>
            )}
          </DialogActions>
        </FormControl>
      </Dialog>
    </div>
  )
}

export default ModalLogIn
