import React from 'react'
import Button from '@material-ui/core/Button'
import ListItemText from '@material-ui/core/ListItemText'

import Edit from '@material-ui/icons/Edit'
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode'
import Slideshow from '@material-ui/icons/Slideshow'

import { StyledListItemIcon, StyledMenu, StyledMenuItem } from '../StyledComponents'
import PropTypes from 'prop-types'

export default function ViewMenu ({onChange}) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuClick = (event, menuId) => {
    onChange(event.currentTarget, menuId)
    handleClose()
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
        <StyledMenuItem onClick={(e) => handleMenuClick(e, 'view.student')}>
          <StyledListItemIcon>
            <Slideshow />
          </StyledListItemIcon>
          <ListItemText primary='Student view' />
        </StyledMenuItem>
        <StyledMenuItem onClick={(e) => handleMenuClick(e, 'view.edit')}>
          <StyledListItemIcon>
            <Edit />
          </StyledListItemIcon>
          <ListItemText primary='Content edit mode' />
        </StyledMenuItem>
        <StyledMenuItem onClick={(e) => handleMenuClick(e, 'view.type')}>
          <StyledListItemIcon>
            <ChromeReaderModeIcon />
          </StyledListItemIcon>
          <ListItemText primary='Material type edit mode' />
        </StyledMenuItem>
      </StyledMenu>
    </React.Fragment>
  )
}

ViewMenu.propTypes = {
  onChange: PropTypes.func.isRequired
}
