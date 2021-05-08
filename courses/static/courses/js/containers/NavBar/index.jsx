import React, { useState, useEffect } from 'react'

import { useTheme, withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import Popover from '@material-ui/core/Popover'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'

// import MailIcon from '@material-ui/icons/Mail'
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'

import history from '../../history'

import { useStyles } from './style'
import NotificationsList from './notificationsList'

const Index = props => {
  return (
    <PrimarySearchAppBar/>
  )
}

export default Index

const MenuButton = withStyles((theme) => ({
  root: {
    // color: theme.palette.getContrastText('#ffffff'),
    color: '#ffffff',
    fontSize: '1.4rem',
    fontFamily: 'Museosansrounded, sans-serif',
    textTransform: 'none',
    // backgroundColor: '#1493d1',
    '&:hover': {
      backgroundColor: '#1493d1'
    }
  }
}))(Button)

// const menus = {
//   'Courses': {onClick: () => { console.log('Courses') }},
//   'Classroom': {onClick: () => { console.log('Classroom') }},
//   'Resources': {onClick: () => { console.log('Resources') }},
//   'Discussion': {onClick: () => { console.log('Discussion') }}
// }

function PrimarySearchAppBar (props) {
  const classes = useStyles()
  const [anchorUserMenuEl, setAnchorUserMenuEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const [anchorNotificationPopoverEl, setAnchorNotificationPopoverEl] = React.useState(null)
  const [showDrawer, setShowDrawer] = React.useState(false)

  const theme = useTheme()

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setShowDrawer(open)
  }

  const isMenuOpen = Boolean(anchorUserMenuEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleNotificationShowClick = (event) => {
    console.log('show')
    setAnchorNotificationPopoverEl(event.currentTarget)
  }

  const handleNotificationClose = () => {
    setAnchorNotificationPopoverEl(null)
  }

  const openedNotificationPopover = Boolean(anchorNotificationPopoverEl)
  const notificationPopoverId = openedNotificationPopover ? 'notification-popover' : undefined

  const handleProfileMenuOpen = (event) => {
    setAnchorUserMenuEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorUserMenuEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorUserMenuEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem style={{fontSize: '1.2rem'}} onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem style={{fontSize: '1.2rem'}} onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem style={{fontSize: '1.2rem'}} onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  )

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
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={11} color='secondary' style={{wordBreak: 'normal'}}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          aria-label='show 4 new mails'
          color='inherit'
          style={{wordBreak: 'normal'}}>
          <Badge badgeContent={4} color='secondary' style={{wordBreak: 'normal'}}>
            <EmojiEventsIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <div className={classes.sectionMobile}>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer(true)}
            >
              <MenuIcon style={{'fontSize': '2rem'}} />
            </IconButton>
            <SwipeableDrawer
              anchor={'left'}
              open={showDrawer}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              <div className={classes.drawer} >
                <IconButton onClick={toggleDrawer(!showDrawer)}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                <Divider />
                <List>
                  {['Courses', 'Classroom', 'Resources', 'Discussion'].map((text, index) => {
                    let url = '/'
                    if (text !== 'courses') {
                      url = `/${text.toLowerCase()}/`
                    }

                    return (
                      <ListItem
                        button key={text} component={'a'}
                        href={history.createHref({pathname: url})}
                        onClick={(e) => {
                          e.preventDefault(); toggleDrawer(false)(); history.push(url)
                        }}
                      >
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <ListItemText primary={text} />
                      </ListItem>
                    )
                  })}
                </List>
              </div>
            </SwipeableDrawer>
          </div>
          <Typography className={classes.title} variant='h5' noWrap>
            <a style={{
              color: 'inherit',
              textDecoration: 'inherit'
            }}
            href={history.createHref({pathname: '/'})}
            onClick={(e) => { e.preventDefault(); history.push('/') }}>
               StudyHub.io
              {/* Title should be configurable */}
            </a>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.sectionDesktop}>
            <MenuButton
              href={history.createHref({pathname: '/'})}
              onClick={(e) => { e.preventDefault(); history.push('/') }}
              className={classes.menuButton}>
              Courses
            </MenuButton>
            <MenuButton
              href={history.createHref({pathname: '/classroom/'})}
              onClick={(e) => { e.preventDefault(); history.push('/classroom/') }}
              className={classes.menuButton}
            >
              Classroom
            </MenuButton>
            <MenuButton
              className={classes.menuButton}
              href={history.createHref({pathname: '/resources/'})}
              onClick={(e) => { e.preventDefault(); history.push('/resources/') }}
            >
              Resources
            </MenuButton>
            <MenuButton
              href={history.createHref({pathname: '/discussion/'})}
              onClick={(e) => { e.preventDefault(); history.push('/discussion/') }}
              className={classes.menuButton}
            >Discussion</MenuButton>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-describedby={notificationPopoverId}
              onClick={handleNotificationShowClick}
              aria-label='show 17 new notifications'
              color='inherit'
            >
              <Badge badgeContent={17} color='secondary' style={{wordBreak: 'normal'}}>
                <NotificationsIcon style={{'fontSize': '2rem'}} />
              </Badge>
            </IconButton>
            <Popover
              id={notificationPopoverId}
              open={openedNotificationPopover}
              anchorEl={anchorNotificationPopoverEl}
              onClose={handleNotificationClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              <NotificationsList history={history} onClosePopover={handleNotificationClose} />
            </Popover>
            <IconButton aria-label='show 4 new mails' color='inherit'>
              <Badge badgeContent={4} color='secondary' style={{wordBreak: 'normal'}}>
                <EmojiEventsIcon style={{'fontSize': '2rem'}} />
              </Badge>
            </IconButton>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle style={{'fontSize': '2rem'}} />
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
              <MoreIcon style={{'fontSize': '2rem'}} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
