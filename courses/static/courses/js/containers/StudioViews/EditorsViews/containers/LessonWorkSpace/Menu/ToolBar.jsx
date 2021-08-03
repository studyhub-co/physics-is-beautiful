import React, { memo } from 'react'
import { compose } from 'redux'

import Toolbar from '@material-ui/core/Toolbar'
import Badge from '@material-ui/core/Badge'
import AddBoxIcon from '@material-ui/icons/AddBox'
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
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

export const StyledToolbar = withStyles(theme => ({
  root: {
    padding: '0!important',
    minHeight: 'auto',
  },
}))(Toolbar)

function WorkspaceToolBar({
  handleAddMaterial,
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
        <StyledIconButton aria-label="Add material" color="inherit">
          <Badge color="secondary">
            <AddBoxIcon />
          </Badge>
        </StyledIconButton>
      </MenuItem>
    </Menu>
  )

  return (
    <Theme>
      <StyledToolbar>
        <div className={classes.sectionDesktop}>
          <StyledIconButton
            onClick={handleAddMaterial}
            aria-label="Add material"
            color="inherit"
          >
            <AddBoxIcon />
          </StyledIconButton>
        </div>
        <div className={classes.sectionMobile}>
          <StyledIconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
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
  handleAddMaterial: PropTypes.func.isRequired,
}

export default compose(withConnect, memo)(WorkspaceToolBar)
