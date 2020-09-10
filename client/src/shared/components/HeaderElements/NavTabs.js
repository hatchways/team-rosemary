import React from "react";

import { Link } from "react-router-dom";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  hidden: {
    display: 'none'
  },
  invisible: {
    visibility: 'hidden'
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  tabRoot: {
    width: '70%',
    margin: '0.4rem auto',
    borderRadius: '0.5rem',
    minHeight: '2rem',
    textTransform: 'none'
  },
  tabWrapper: {
    flexDirection: 'row',
    justifyContent: 'normal',
    alignItems: 'baseline'
  },
  tabIcon: {
    marginRight: '1rem',
    marginBottom: 0,
    fontSize: '0.7rem'
  },
  divider: {
    backgroundColor: '#fafafa',
    width: '90%'
  },
  btnOnfocus: {
    backgroundColor: '#4366a7',
    color: '#38cc89'
  },
}));

export function NavTabs(props) {
  const classes = useStyles();

  return (
    <Tabs
      orientation="vertical"
      className={classes.tabs}
      classes={{
        indicator: classes.hidden
      }}
      {...props}
    >
      {['Dashboard', 'Reports', 'Receipts'].map(tab => {
        return (
          <Tab
            key={tab}
            component={Link}
            to={`/${tab.toLowerCase()}`}
            icon={
              <FiberManualRecordIcon className={
                `${classes.tabIcon} ${tab === props.value || classes.invisible}`
              } />
            }
            label={tab}
            value={tab}
            classes={{
              root: classes.tabRoot,
              wrapper: classes.tabWrapper,
              selected: classes.btnOnfocus
            }}
          />
        )
      })}
      <Tab label="" icon={<hr className={classes.divider} />} disabled />
      {['Profile', 'Log Out'].map(tab => {
        return (
          <Tab
            key={tab}
            // component={Link}
            // to={`/${tab.toLowerCase()}`}
            icon={
              <FiberManualRecordIcon className={
                `${classes.tabIcon} ${tab === props.value || classes.invisible}`
              } />
            }
            label={tab}
            value={tab}
            classes={{
              root: classes.tabRoot,
              wrapper: classes.tabWrapper,
              selected: classes.btnOnfocus
            }}
          />
        )
      })}
    </Tabs>
  )
}