import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  // loginImage: {
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  // },
  socialImage: {
    maxWidth: '100%',
    '&:hover': {
      filter: 'drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 116, 225, 0.5))',
    },
  },
  hrSect: {
    // fixme move it to lib
    display: 'flex',
    flexBasis: '100%',
    alignItems: 'center',
    color: 'rgba(0, 0, 0, 0.35)',
    margin: '8px 0px',
    '&:before, &:after': {
      content: '""',
      flexGrow: 1,
      background: 'rgba(0, 0, 0, 0.35)',
      height: '1px',
      fontSize: '0px',
      lineHeight: '0px',
      margin: '0px 8px',
    },
  },
}))

export default useStyles
