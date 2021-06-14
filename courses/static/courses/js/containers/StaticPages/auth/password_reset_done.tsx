import React from 'react'

import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const PasswordResetDoneView = () => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs={6}>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={true}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {/* TODO translate this */}
            Password Reset
          </DialogTitle>
          <DialogContent>
            We have sent you an e-mail. Please contact us if you do not receive
            it within a few minutes.
          </DialogContent>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default PasswordResetDoneView
