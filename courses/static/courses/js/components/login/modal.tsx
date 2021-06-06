import React, { useState } from 'react'

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

import LogIn from './logIn'
import SignUp from './signUp'

interface IModalLogInProps {
  open: boolean
  handleClose(): void
  login(email: string, password: string): void
  signUp(
    firstName: string,
    lastName: string,
    email: string,
    password1: string,
    password2: string,
  ): void
  // history: object
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const ModalLogIn: React.FC<IModalLogInProps> = props => {
  // LogIn by default, if LogIn == false, then use SignUp
  const [isLogIn, setLogIn] = useState(true)
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

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
    props.handleClose()
  }

  const onSignUpClick = () => {
    props.signUp(
      sFirstNameRef.current,
      sLastNameRef.current,
      sEmailRef.current,
      sPassword1Ref.current,
      sPassword2Ref.current,
    )
    // props.login(email, password)
    // TODO close if success - else show error
    props.handleClose()
  }

  return (
    <div>
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
              <Box flexGrow={1}>{isLogIn ? 'Login' : 'Sign Up'}</Box>
              <Box>
                <IconButton onClick={props.handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent>
            <form>
              {isLogIn ? (
                <LogIn onDataChange={onLoginDataChange} />
              ) : (
                <SignUp onDataChange={onSignUpDataChange} />
              )}
            </form>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={props.handleClose} color='primary'> */}
            {/*  Cancel */}
            {/* </Button> */}
            {isLogIn ? (
              <Button
                fullWidth
                onClick={onLoginClick}
                color="primary"
                variant="contained"
              >
                Login
              </Button>
            ) : (
              <Button
                fullWidth
                onClick={onSignUpClick}
                color="primary"
                variant="contained"
              >
                Sign Up
              </Button>
            )}
          </DialogActions>
          <DialogActions>
            <Divider />
            {isLogIn ? (
              <span>
                Don't have an account?{' '}
                <a
                  className="navlink"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setLogIn(false)
                  }}
                >
                  Sign Up »
                </a>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <a
                  className="navlink"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setLogIn(true)
                  }}
                >
                  Login »
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
