import React, { useState } from 'react';

import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import { Logo } from './Logo';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  'list-decoration-container': {
    minWidth: '1rem'
  },
  'list-decoration': {
    fontSize: '0.5rem'
  },
  'logo-container': {
    width: '100%',
    // height: props => `'${props.height}'`,
    margin: 0
  },
  'logo': {
    width: '15%',
  }
});

// const getHeight = element => window.getComputedStyle(element).height;

export function Menu(props) {
  const [display, setDisplay] = useState(false);
  const toggleMenu = toggle => setDisplay(toggle);
  const classes = useStyles();

  return (
    <>
      <Drawer open={display}>
        <Logo logoStyle={classes} />
        <MenuList handleClick={toggleMenu} />
      </Drawer>
      <IconButton edge="start" onClick={() => toggleMenu(true)}>
        <MenuIcon />
      </IconButton>
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
          <ListItem button key={listItem}>
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