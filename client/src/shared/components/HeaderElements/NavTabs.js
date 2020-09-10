import React, { useContext } from "react";

import { Link } from "react-router-dom";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import { AuthContext } from '../../context/auth-context';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  hidden: {
    display: 'none'
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
    fontSize: '0.7rem',
    visibility: 'hidden'
  },
  divider: {
    backgroundColor: '#fafafa',
    width: '90%'
  },
  btnOnfocus: {
    backgroundColor: '#4366a7',
    color: '#38cc89',
    '& .MuiSvgIcon-root': {
      visibility: 'visible'
    }
  },
}));

export function NavTabs(props) {
  const classes = useStyles();
  const auth = useContext(AuthContext);

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
            icon={<FiberManualRecordIcon className={classes.tabIcon} />}
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
      <Tab
        label=""
        icon={<hr className={classes.divider} />}
        disabled
      />
      <Tab
        icon={<FiberManualRecordIcon className={classes.tabIcon} />}
        label="Profile"
        value="Profile"
        classes={{
          root: classes.tabRoot,
          wrapper: classes.tabWrapper,
          selected: classes.btnOnfocus
        }}
      />
      <Tab
        icon={<FiberManualRecordIcon className={classes.tabIcon} />}
        label="Log Out"
        value="Log Out"
        classes={{
          root: classes.tabRoot,
          wrapper: classes.tabWrapper
        }}
        onClick={auth.logout}
      />
    </Tabs>
  )
}