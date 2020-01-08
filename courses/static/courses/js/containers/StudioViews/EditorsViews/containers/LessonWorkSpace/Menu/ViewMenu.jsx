import React from 'react'
import Button from '@material-ui/core/Button'
import ListItemText from '@material-ui/core/ListItemText'

import Edit from '@material-ui/icons/Edit'
import Slideshow from '@material-ui/icons/Slideshow'

import { StyledListItemIcon, StyledMenu, StyledMenuItem } from './StyledComponents'

export default function ViewMenu () {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <Button
        aria-controls='view-menu'
        aria-haspopup='true'
        onClick={handleClick}
        color='default'
      >
        View
      </Button>
      <StyledMenu
        id='view-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <StyledListItemIcon>
            <Slideshow />
          </StyledListItemIcon>
          <ListItemText primary='Present' />
        </StyledMenuItem>
        <StyledMenuItem>
          <StyledListItemIcon>
            <Edit />
          </StyledListItemIcon>
          <ListItemText primary='Edit mode' />
        </StyledMenuItem>
      </StyledMenu>
    </React.Fragment>
  )
}

ViewMenu.propTypes = {

}
