import React, {memo} from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Menu from '@material-ui/core/Menu'
// import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreIcon from '@material-ui/icons/MoreVert'
import { makeStyles } from '@material-ui/core/styles'

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

function ToolBar ({
  // username,
  // loading,
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
      <MenuItem>
        <IconButton aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={11} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={11} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  )

  return (<div>
    <AppBar position='static'>
      <Toolbar>
        <div className={classes.sectionDesktop}>
          <IconButton aria-label='show 4 new mails' color='inherit'>
            <Badge badgeContent={4} color='secondary'>
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label='show 17 new notifications' color='inherit'>
            <Badge badgeContent={17} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label='show 4 new mails' color='inherit'>
            <Badge badgeContent={4} color='secondary'>
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label='show 17 new notifications' color='inherit'>
            <Badge badgeContent={17} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label='show more'
            aria-controls={mobileMenuId}
            aria-haspopup='true'
            onClick={handleMobileMenuOpen}
            color='inherit'
          >
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
    {renderMobileMenu}
  </div>
  )
}

ToolBar.propTypes = {

}

const mapStateToProps = (state) => {
  return {
    // tab: state.tab.tab,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    // tabActions: bindActionCreators(tabsCreators, dispatch)
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  memo
)(ToolBar)
