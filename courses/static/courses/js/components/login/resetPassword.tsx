import React, { useState } from 'react'

// import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
// import Button from '@material-ui/core/Button'

interface ILogInProps {
  onDataChange(email: string): void
}

export default function LogIn(props: ILogInProps) {
  const [email, setEmail] = useState('')

  const onChangeEmail = e => {
    setEmail(e.target.value)
    props.onDataChange(e.target.value)
  }

  return (
    <React.Fragment>
      Forgotten your password? Enter your e-mail address below, and we'll send
      you an e-mail allowing you to reset it.
      <TextField
        autoFocus
        variant="outlined"
        margin="dense"
        name="login"
        autoComplete="login"
        value={email}
        id="id_login"
        label="Email Address"
        placeholder={'Email'}
        type="email"
        onChange={onChangeEmail}
        fullWidth
      />
      Please contact us if you have any trouble resetting your password.
    </React.Fragment>
  )
}
