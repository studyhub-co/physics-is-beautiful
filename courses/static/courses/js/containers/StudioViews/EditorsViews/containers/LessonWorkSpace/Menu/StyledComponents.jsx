import React from 'react'

import { withStyles } from '@material-ui/core'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconButton from '@material-ui/core/IconButton'

export const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left'
    }}
    {...props}
  />
))

export const StyledMenuItem = withStyles(theme => ({
  root: {
    // '&:focus': {
    //   backgroundColor: theme.palette.primary.main,
    //   '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
    //     color: theme.palette.common.white
    //   }
    // }
  }
}))(MenuItem)

export const StyledListItemIcon = withStyles(theme => ({
  root: {
    minWidth: 'auto',
    paddingRight: '1rem'
  }
}))(ListItemIcon)

export const StyledIconButton = withStyles(theme => ({
  root: {
    borderRadius: '1%'
  }
}))(IconButton)
