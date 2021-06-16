import React from 'react'
import Button from '@material-ui/core/Button'
import ListItemText from '@material-ui/core/ListItemText'

import AllInbox from '@material-ui/icons/AllInbox'
import Inbox from '@material-ui/icons/Inbox'

import {
  StyledListItemIcon,
  StyledMenu,
  StyledMenuItem,
} from '../StyledComponents'
import PropTypes from 'prop-types'

export default function ActionsMenu({ onChange }) {
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
        aria-controls="action-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="default"
      >
        Actions
      </Button>
      <StyledMenu
        id="action-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem
          onClick={e => handleMenuClick(e, 'actions.learn_lesson')}
        >
          <StyledListItemIcon>
            <AllInbox />
          </StyledListItemIcon>
          <ListItemText primary="Learn lesson" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={e => handleMenuClick(e, 'actions.learn_material')}
        >
          <StyledListItemIcon>
            <Inbox />
          </StyledListItemIcon>
          <ListItemText primary="Learn selected material" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={e => handleMenuClick(e, 'actions.standalone_material')}
        >
          <StyledListItemIcon>
            <Inbox />
          </StyledListItemIcon>
          <ListItemText primary="Standalone selected material" />
        </StyledMenuItem>
      </StyledMenu>
    </React.Fragment>
  )
}

ActionsMenu.propTypes = {
  onChange: PropTypes.func.isRequired,
}
