import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { useTheme, withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
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
// import SearchIcon from '@material-ui/icons/Search'
// import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToApp from '@material-ui/icons/ExitToApp'

// import MailIcon from '@material-ui/icons/Mail'
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'

// FIXME we need to use global history
import history from '../../history'

import { useStyles } from './style'
import NotificationsList from './notificationsList'
import AchievementsList from './achievementsList'

import * as profileCreators from '../../actions/profile'
import ModalLogIn from '../login/modal'

const Index = props => {
  return <PrimarySearchAppBar />
}

export default Index

const MenuButton = withStyles(theme => ({
  root: {
    // color: theme.palette.getContrastText('#ffffff'),
    color: '#ffffff',
    fontSize: '1.4rem',
    fontFamily: 'Museosansrounded, sans-serif',
    textTransform: 'none',
    // backgroundColor: '#1493d1',
    '&:hover': {
      backgroundColor: '#1493d1',
    },
  },
}))(Button)

// const menus = {
//   'Courses': {onClick: () => { console.log('Courses') }},
//   'Classroom': {onClick: () => { console.log('Classroom') }},
//   'Resources': {onClick: () => { console.log('Resources') }},
//   'Discussion': {onClick: () => { console.log('Discussion') }}
// }

const mapStateToProps = state => {
  return {
    userProfile: state.profile.me,
    signUpFormErrors: state.profile.signUpFormErrors,
    unReadNotificationsCount: state.profile.unReadNotificationsCount,
    signUpSuccess: state.profile.signUpSuccess,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    profileActions: bindActionCreators(profileCreators, dispatch),
  }
}

// TODO 1) too much code 2) move to containers
const PrimarySearchAppBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withWidth()(props => {
    const classes = useStyles()
    const [anchorUserMenuEl, setAnchorUserMenuEl] = React.useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
    const [
      anchorNotificationsPopoverEl,
      setAnchorNotificationsPopoverEl,
    ] = React.useState(null)
    const [
      anchorAchievementsPopoverEl,
      setAnchorAchievementsPopoverEl,
    ] = React.useState(null)
    const [showDrawer, setShowDrawer] = React.useState(false)
    const [userAvatar, setUserAvatar] = React.useState('')
    const [isAnonymousUser, setIsAnonymousUser] = React.useState(true)
    const [loginModalOpen, setLoginModalOpen] = React.useState(false)

    const theme = useTheme()

    useEffect(() => {
      if (!props.userProfile) {
        props.profileActions.fetchProfileMe()
      }
      // FIXME wait for profile loaded? If ProfileMe is anon we don't need to load notification count
      if (!props.unReadNotificationsCount) {
        props.profileActions.fetchUnReadNotificationCount()
      }
    }, [])

    useEffect(() => {
      const { userProfile: profile } = props

      if (profile && profile.hasOwnProperty('id')) {
        setIsAnonymousUser(false)
      } else {
        setIsAnonymousUser(true)
      }

      if (profile) {
        switch (profile.selected_avatar) {
          case 'u':
            // userAvatarRef.current = profile.user_avatar
            setUserAvatar(profile.user_avatar)
            break
          case 'g':
            // userAvatarRef.current = profile.google_avatar_url
            setUserAvatar(profile.google_avatar_url)
            break
          case 'a':
            // userAvatarRef.current = profile.gravatar_url
            setUserAvatar(profile.gravatar_url)
            break
        }
      }
    }, [props.userProfile])

    const toggleDrawer = open => event => {
      if (
        event &&
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return
      }
      setShowDrawer(open)
    }

    // notification list menu
    const openedNotificationsPopover = Boolean(anchorNotificationsPopoverEl)
    const notificationsPopoverId = openedNotificationsPopover
      ? 'notification-popover'
      : undefined

    const handleNotificationsShowClick = event => {
      setAnchorNotificationsPopoverEl(event.currentTarget)
    }

    const handleNotificationsClose = () => {
      setAnchorNotificationsPopoverEl(null)
    }

    const notificationPopover = (
      <Popover
        id={notificationsPopoverId}
        open={openedNotificationsPopover}
        anchorEl={anchorNotificationsPopoverEl}
        onClose={handleNotificationsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <NotificationsList
          history={history}
          onClosePopover={() => {
            handleNotificationsClose()
            handleMobileMenuClose()
          }}
        />
      </Popover>
    )

    // achievements list menu
    const openedAchievementsPopover = Boolean(anchorAchievementsPopoverEl)
    const achievementsPopoverId = openedAchievementsPopover
      ? 'achievements-popover'
      : undefined

    const handleAchievementsShowClick = event => {
      setAnchorAchievementsPopoverEl(event.currentTarget)
    }

    const handleAchievementsClose = () => {
      setAnchorAchievementsPopoverEl(null)
    }

    // user profile menu
    const isAccountMenuOpen = Boolean(anchorUserMenuEl)

    const handleAccountMenuOpen = event => {
      setAnchorUserMenuEl(event.currentTarget)
    }

    const achievementsPopover = (
      <Popover
        id={achievementsPopoverId}
        open={openedAchievementsPopover}
        anchorEl={anchorAchievementsPopoverEl}
        onClose={handleAchievementsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <AchievementsList
          history={history}
          onClosePopover={() => {
            handleAchievementsClose()
            handleMobileMenuClose()
          }}
        />
        {/* <NotificationsList history={history} onClosePopover={handleAchievementsClose} /> */}
      </Popover>
    )

    // right-hand mobile menu
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null)
    }

    const handleAccountMenuClose = () => {
      setAnchorUserMenuEl(null)
      handleMobileMenuClose()
    }

    const handleMobileMenuOpen = event => {
      setMobileMoreAnchorEl(event.currentTarget)
    }

    const onProfileClick = () => {
      handleAccountMenuClose()
      history.push(`/profile/${props.userProfile.id}/`)
    }

    const menuId = 'primary-search-account-menu'
    const renderMenu = (
      <Menu
        anchorEl={anchorUserMenuEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isAccountMenuOpen}
        onClose={handleAccountMenuClose}
      >
        <MenuItem style={{ fontSize: '1.2rem' }} onClick={onProfileClick}>
          Profile
        </MenuItem>
        <MenuItem
          style={{ fontSize: '1.2rem' }}
          onClick={() => {
            handleAccountMenuClose()
            props.profileActions.logout()
          }}
        >
          Logout
        </MenuItem>
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
        <MenuItem
          aria-describedby={notificationsPopoverId}
          onClick={handleNotificationsShowClick}
        >
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge
              badgeContent={props.unReadNotificationsCount?.count}
              color="secondary"
              style={{ wordBreak: 'normal' }}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        {notificationPopover}
        <MenuItem
          aria-describedby={achievementsPopoverId}
          onClick={handleAchievementsShowClick}
        >
          <IconButton
            aria-label="show 4 new mails"
            color="inherit"
            style={{ wordBreak: 'normal' }}
          >
            {/* <Badge badgeContent={4} color='secondary' style={{wordBreak: 'normal'}}> */}
            <EmojiEventsIcon />
            {/* </Badge> */}
          </IconButton>
          <p>Achievements</p>
        </MenuItem>
        {achievementsPopover}
        <MenuItem onClick={onProfileClick}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar
              style={{ width: '1.8rem', height: '1.8rem' }}
              src={userAvatar}
            />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={handleAccountMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <ExitToApp />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      </Menu>
    )

    const handleLogInModalOpen = () => {
      setLoginModalOpen(!loginModalOpen)
    }

    return (
      <div className={classes.grow}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <div className={classes.sectionMobile}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon style={{ fontSize: '2rem' }} />
              </IconButton>
              <SwipeableDrawer
                anchor={'left'}
                open={showDrawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
              >
                <div className={classes.drawer}>
                  <IconButton onClick={toggleDrawer(!showDrawer)}>
                    {theme.direction === 'ltr' ? (
                      <ChevronLeftIcon />
                    ) : (
                      <ChevronRightIcon />
                    )}
                  </IconButton>
                  <Divider />
                  <List>
                    {['Courses', 'Classroom', 'Resources', 'Discussion'].map(
                      (text, index) => {
                        let url = '/browse/' // courses url
                        if (text !== 'Courses') {
                          url = `/${text.toLowerCase()}/`
                        }

                        return (
                          <ListItem
                            button
                            key={text}
                            component={'a'}
                            href={history.createHref({ pathname: url })}
                            onClick={e => {
                              e.preventDefault()
                              toggleDrawer(false)()
                              history.push(url)
                            }}
                          >
                            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                            <ListItemText
                              style={{ color: 'white' }}
                              primary={text}
                            />
                          </ListItem>
                        )
                      },
                    )}
                  </List>
                </div>
              </SwipeableDrawer>
            </div>
            <Typography className={classes.title} variant="h5" noWrap>
              <a
                style={{
                  color: 'inherit',
                  textDecoration: 'inherit',
                }}
                href={history.createHref({ pathname: '/' })}
                onClick={e => {
                  e.preventDefault()
                  history.push('/')
                }}
              >
                StudyHub
                {/* Title should be configurable */}
              </a>
            </Typography>
            {/* <div className={classes.search}> */}
            {/*  <div className={classes.searchIcon}> */}
            {/*    <SearchIcon /> */}
            {/*  </div> */}
            {/*  <InputBase */}
            {/*    placeholder='Search…' */}
            {/*    classes={{ */}
            {/*      root: classes.inputRoot, */}
            {/*      input: classes.inputInput */}
            {/*    }} */}
            {/*    inputProps={{ 'aria-label': 'search' }} */}
            {/*  /> */}
            {/* </div> */}
            <div className={classes.sectionDesktop}>
              <MenuButton
                href={history.createHref({ pathname: '/browse/' })}
                onClick={e => {
                  e.preventDefault()
                  history.push('/browse/')
                }}
                className={classes.menuButton}
              >
                Courses
              </MenuButton>
              <MenuButton
                href={history.createHref({ pathname: '/classroom/' })}
                onClick={e => {
                  e.preventDefault()
                  history.push('/classroom/')
                }}
                className={classes.menuButton}
              >
                Classroom
              </MenuButton>
              <MenuButton
                className={classes.menuButton}
                href={history.createHref({ pathname: '/resources/' })}
                onClick={e => {
                  e.preventDefault()
                  history.push('/resources/')
                }}
              >
                Resources
              </MenuButton>
              <MenuButton
                href={history.createHref({ pathname: '/discussion/' })}
                onClick={e => {
                  e.preventDefault()
                  history.push('/discussion/')
                }}
                className={classes.menuButton}
              >
                Discussion
              </MenuButton>
            </div>
            <div className={classes.grow} />
            {!isAnonymousUser && (
              <div className={classes.sectionDesktop}>
                <IconButton
                  aria-describedby={notificationsPopoverId}
                  onClick={handleNotificationsShowClick}
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge
                    badgeContent={props.unReadNotificationsCount?.count}
                    color="secondary"
                    style={{ wordBreak: 'normal' }}
                  >
                    <NotificationsIcon style={{ fontSize: '2rem' }} />
                  </Badge>
                </IconButton>
                {notificationPopover}
                <IconButton
                  aria-describedby={achievementsPopoverId}
                  onClick={handleAchievementsShowClick}
                  // aria-label='show 4 new mails'
                  color="inherit"
                >
                  {/* <Badge color='secondary' badgeContent={4} style={{wordBreak: 'normal'}}> */}
                  <EmojiEventsIcon style={{ fontSize: '2rem' }} />
                  {/* </Badge> */}
                </IconButton>
                {achievementsPopover}
                <IconButton
                  edge="end"
                  aria-label="Account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleAccountMenuOpen}
                  color="inherit"
                >
                  <Avatar src={userAvatar} />
                  {/* <AccountCircle style={{'fontSize': '2rem'}} /> */}
                </IconButton>
              </div>
            )}
            {isAnonymousUser && (
              <React.Fragment>
                <IconButton
                  edge="end"
                  aria-label="Log in"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleLogInModalOpen}
                  color="inherit"
                >
                  <Avatar />
                  {/* <AccountCircle style={{'fontSize': '2rem'}} /> */}
                </IconButton>
                <ModalLogIn
                  // history={history}
                  open={loginModalOpen}
                  handleClose={handleLogInModalOpen}
                  signUpFormErrors={props.signUpFormErrors}
                  signUpSuccess={props.signUpSuccess}
                  login={props.profileActions.login}
                  signUp={props.profileActions.signUp}
                />
              </React.Fragment>
            )}
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon style={{ fontSize: '2rem' }} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {isWidthUp('md', props.width) ? renderMenu : renderMobileMenu}
      </div>
    )
  }),
)
