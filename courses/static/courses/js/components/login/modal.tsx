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
import Slide from '@material-ui/core/Slide'

import LogIn from './logIn'

interface IModalLogInProps {
  open: boolean
  handleClose(): void
  login(email: string, password: string): void
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

  const emailRef = React.useRef('')
  const passwordRef = React.useRef('')

  const onLoginDataChange = (email, password) => {
    // setEmail(email)
    // setPassword(password)
    emailRef.current = email
    passwordRef.current = password
  }

  const onLoginClick = () => {
    props.login(emailRef.current, passwordRef.current)
    // props.login(email, password)
    // TODO close if we have profile loaded - else show error
    props.handleClose()
  }

  return (
    <div>
      {/* <Button variant='outlined' color='primary' onClick={handleClickOpen}> */}
      {/*  Open form dialog */}
      {/* </Button> */}
      {/* onClose={props.handleClose} */}
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
              <Box flexGrow={1}>Login</Box>
              <Box>
                <IconButton onClick={props.handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent>
            <form>
              <LogIn onDataChange={onLoginDataChange} />
            </form>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={props.handleClose} color='primary'> */}
            {/*  Cancel */}
            {/* </Button> */}
            <Button
              fullWidth
              onClick={onLoginClick}
              color="primary"
              variant="contained"
            >
              Login
            </Button>
          </DialogActions>
        </FormControl>
      </Dialog>
    </div>
  )
}

export default ModalLogIn
