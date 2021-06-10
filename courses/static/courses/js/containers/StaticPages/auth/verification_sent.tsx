import React from 'react'

import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

import { Sheet } from '../../../components/Sheet'
import DialogTitle from '@material-ui/core/DialogTitle'

const VerificationSentView = () => {
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
            Verify Your E-mail Address
          </DialogTitle>
          <DialogContent>
            We have sent an email to you for verification. Follow the link
            provided to finalize the signup process. Please contact us if you do
            not receive it within a few minutes.
          </DialogContent>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default VerificationSentView
