import React from 'react'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

export default function ThemeWraper (props) {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'light'
        }
      })
  )

  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}
