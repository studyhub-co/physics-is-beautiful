import React, { useState } from 'react'

import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
// import Button from '@material-ui/core/Button'

interface ISignUpInProps {
  onDataChange(
    firstName: string,
    lastName: string,
    email: string,
    password1: string,
    password2: string,
  ): void
}

export default function SignUp(props: ISignUpInProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const onChangeFirstName = e => {
    setFirstName(e.target.value)
    props.onDataChange(e.target.value, lastName, email, password1, password2)
  }

  const onChangeLastName = e => {
    setLastName(e.target.value)
    props.onDataChange(firstName, e.target.value, email, password1, password2)
  }

  const onChangeEmail = e => {
    setEmail(e.target.value)
    props.onDataChange(
      firstName,
      lastName,
      e.target.value,
      password1,
      password2,
    )
  }

  const onChangePassword1 = e => {
    setPassword1(e.target.value)
    props.onDataChange(firstName, lastName, email, e.target.value, password2)
  }

  const onChangePassword2 = e => {
    setPassword2(e.target.value)
    props.onDataChange(firstName, lastName, email, password1, e.target.value)
  }

  return (
    <React.Fragment>
      <TextField
        autoFocus
        margin="dense"
        name="first_name"
        value={firstName}
        id="id_firstname"
        placeholder={'First Name'}
        type="text"
        onChange={onChangeFirstName}
        fullWidth
      />
      <TextField
        autoFocus
        margin="dense"
        name="last_name"
        value={lastName}
        id="last_name"
        placeholder={'Last Name'}
        type="text"
        onChange={onChangeLastName}
        fullWidth
      />
      <TextField
        autoFocus
        margin="dense"
        name="email"
        // autoComplete="login"
        value={email}
        id="id_email"
        // label="Email Address"
        placeholder={'Email Address'}
        type="email"
        onChange={onChangeEmail}
        fullWidth
      />
      <TextField
        value={password1}
        onChange={onChangePassword1}
        autoFocus
        margin="dense"
        // autoComplete="password"
        name="password1"
        id="id_password1"
        // label="Password"
        placeholder={'Password'}
        type="password"
        fullWidth
      />
      <TextField
        value={password2}
        onChange={onChangePassword2}
        autoFocus
        margin="dense"
        // autoComplete="password"
        name="password2"
        id="id_password2"
        // label="Password"
        placeholder={'Password (again)'}
        type="password"
        fullWidth
      />
    </React.Fragment>
  )
}
