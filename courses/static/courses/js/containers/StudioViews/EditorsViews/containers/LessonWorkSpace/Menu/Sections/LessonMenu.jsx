import React from 'react'
import Button from '@material-ui/core/Button'
import ListItemText from '@material-ui/core/ListItemText'

import Filter8 from '@material-ui/icons/Filter8'

import {
  StyledListItemIcon,
  StyledMenu,
  StyledMenuItem,
} from '../StyledComponents'
import PropTypes from 'prop-types'

export default function LessonMenu({ onChange }) {
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
        aria-controls="lesson-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="default"
      >
        Lesson
      </Button>
      <StyledMenu
        id="lesson-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={e => handleMenuClick(e, 'lesson.settings')}>
          <StyledListItemIcon>
            <Filter8 />
          </StyledListItemIcon>
          <ListItemText primary="Settings" />
        </StyledMenuItem>
      </StyledMenu>
    </React.Fragment>
  )
}

LessonMenu.propTypes = {
  onChange: PropTypes.func.isRequired,
}
