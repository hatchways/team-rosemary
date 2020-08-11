import React, { useState } from 'react';


import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


import { Logo } from './Logo';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  'menu-bar': {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '20rem',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 255, 0.7)',
    color: 'white'
  },
  'list-decoration-container': {
    minWidth: '1rem'
  },
  'list-decoration': {
    fontSize: '0.5rem'
  },
  'logo-container': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '5rem',
    margin: 0
  },
  'logo': {
    width: '15%',
    marginRight: '2rem'
  }
});

// const getHeight = element => window.getComputedStyle(element).height;

export function Menu(props) {
  const [display, setDisplay] = useState(true);
  const toggleMenu = toggle => setDisplay(toggle);
  const classes = useStyles();

  return (
    <>
      <Paper className={classes["menu-bar"]}>
        <Logo logoStyle={classes} />
        <MenuList handleClick={toggleMenu} />
      </Paper>
      {/* <IconButton edge="start" onClick={() => toggleMenu(true)}>
        <MenuIcon />
      </IconButton> */}
    </>
  )
}

// FiberIcon depends on the page
function MenuList(props) {
  const listItems = ['Dashboard', 'Reports', 'Receipts'];
  const { handleClick } = props;
  const classes = useStyles();
  return (
    <List onClick={() => handleClick(false)}>
      {listItems.map(listItem => {
        return (
          <ListItem component="li" button key={listItem}>
            <ListItemIcon className={classes["list-decoration-container"]}>
              <FiberManualRecordIcon className={classes["list-decoration"]} />
            </ListItemIcon>
            <ListItemText primary={listItem} />
          </ListItem>
        )
      })}
    </List>
  )
}