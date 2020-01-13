import React from 'react'
import Button from '@material-ui/core/Button'
import ListItemText from '@material-ui/core/ListItemText'

import Edit from '@material-ui/icons/Edit'
import Slideshow from '@material-ui/icons/Slideshow'

import { StyledListItemIcon, StyledMenu, StyledMenuItem } from './StyledComponents'
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
        <StyledMenuItem onClick={(e) => handleMenuClick(e, 'view.present')}>
          <StyledListItemIcon>
            <Slideshow />
          </StyledListItemIcon>
          <ListItemText primary='Present' />
        </StyledMenuItem>
        <StyledMenuItem onClick={(e) => handleMenuClick(e, 'view.edit')}>
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
  onChange: PropTypes.func.isRequired
}
