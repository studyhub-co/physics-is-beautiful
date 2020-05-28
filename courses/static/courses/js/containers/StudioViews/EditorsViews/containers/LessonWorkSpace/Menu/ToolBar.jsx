import React, {memo} from 'react'
import { compose } from 'redux'

import Toolbar from '@material-ui/core/Toolbar'
import Badge from '@material-ui/core/Badge'
import MailIcon from '@material-ui/icons/MailOutline'
import AddBoxIcon from '@material-ui/icons/AddBox'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreIcon from '@material-ui/icons/MoreVert'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import Theme from '../Styles'
import withConnect from './MenuActions'
import { StyledIconButton } from './StyledComponents'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}))

export const StyledToolbar = withStyles(theme => ({
  root: {
    padding: '0!important',
    minHeight: 'auto'
  }
}))(Toolbar)

function WorkspaceToolBar ({
  // username,
  // loading,
  handleAddMaterial
}) {
  const classes = useStyles()
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleAddMaterial}>
        <StyledIconButton aria-label='Add material' color='inherit'>
          <Badge color='secondary'>
            <AddBoxIcon />
          </Badge>
        </StyledIconButton>
      </MenuItem>
      {/* <MenuItem> */}
      {/* <StyledIconButton aria-label='show 11 new notifications' color='inherit'> */}
      {/* <Badge badgeContent={11} color='secondary'> */}
      {/* <NotificationsIcon /> */}
      {/* </Badge> */}
      {/* </StyledIconButton> */}
      {/* <p>Notifications</p> */}
      {/* </MenuItem> */}
    </Menu>
  )

  return (<Theme>
    <StyledToolbar>
      <div className={classes.sectionDesktop}>
        <StyledIconButton
          onClick={handleAddMaterial}
          aria-label='Add material'
          color='inherit' >
          <AddBoxIcon />
        </StyledIconButton>
        {/* <StyledIconButton */}
        {/* aria-label='show 17 new notifications' */}
        {/* color='inherit'> */}
        {/* <NotificationsIcon /> */}
        {/* </StyledIconButton> */}
        {/* <StyledIconButton aria-label='show 4 new mails' color='inherit' > */}
        {/* <MailIcon /> */}
        {/* </StyledIconButton> */}
        {/* <StyledIconButton aria-label='show 17 new notifications' color='inherit' > */}
        {/* <Badge badgeContent={17} color='secondary'> */}
        {/* <NotificationsIcon /> */}
        {/* </Badge> */}
        {/* </StyledIconButton> */}
      </div>
      <div className={classes.sectionMobile}>
        <StyledIconButton
          aria-label='show more'
          aria-controls={mobileMenuId}
          aria-haspopup='true'
          onClick={handleMobileMenuOpen}
          color='inherit'
        >
          <MoreIcon />
        </StyledIconButton>
      </div>
    </StyledToolbar>
    {renderMobileMenu}
  </Theme>
  )
}

WorkspaceToolBar.propTypes = {
  handleAddMaterial: PropTypes.func.isRequired
}

export default compose(
  withConnect,
  memo
)(WorkspaceToolBar)
