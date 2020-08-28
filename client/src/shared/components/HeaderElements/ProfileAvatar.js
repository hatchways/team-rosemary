import React, {useContext} from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

import User from '../../../assets/user.png';
import { AuthContext } from '../../context/auth-context';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 2rem',
    [theme.breakpoints.down("xs")]: {
      margin: 0
    }
  },
  avatar: {
    marginRight: '1rem'
  },
  text: {
    [theme.breakpoints.down("xs")]: {
      display: 'none'
    }
  }
}))

export function ProfileAvatar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const auth = useContext(AuthContext);
<<<<<<< HEAD
=======

>>>>>>> dev
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open])
  return (
    <div className={classes.container}>
      <Avatar alt="User Avatar" src={User} className={classes.avatar} />
      {/* <div className={classes.text}>Profile</div>    */}
      {auth.isLoggedIn && (
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
<<<<<<< HEAD
        {auth.userName}
=======
          Toggle Menu Grow
>>>>>>> dev
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={auth.logout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>)}
    </div>
  )
}