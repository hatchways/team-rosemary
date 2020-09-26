import React, { useState, useRef } from "react";

import { TopBar } from './TopBar';
import { SideBar } from './SideBar';
import { NavTabs } from './NavTabs';
import { UploadReceiptBtn } from './UploadReceiptBtn';
import ProfileAvatar from './ProfileAvatar';
import { MenuBtn } from './MenuBtn';
import { Logo } from '../UIElements/Logo';

import AppDialog from '../UIElements/AppDialog.js';
import ReceiptUploadForm from '../../../receipts/components/ReceiptUpload';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from "@material-ui/core/styles";
import ErrorBoundary from '../../../shared/components/UIElements/ErrorBoundary';

const drawerWidth = "15rem";

const useStyles = makeStyles(theme => ({
  logoContainer: {
    ...theme.mixins.toolbar,
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 0
  },
  logo: {
    width: '15%',
    marginRight: '2rem'
  }
}));

export function Header(props) {
  const classes = useStyles();
  const profileRef = useRef(null);
 
  const isMobile = useMediaQuery(useTheme().breakpoints.down('xs'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [reloadTransactions, setReloadTransactions] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }
  const handleDialogOpen = () => {
    setIsOpen(true);
  };
  const handleDialogClose = () => {
    setIsOpen(false);
  };
  const handleReceiptUpload = () => {
    props.onReceiptUpload();
    setIsOpen(false);
  };
  const handleClickProfile = () => {
    profileRef.current.click();
  };

  return (
    <ErrorBoundary>
    <header>
      <TopBar drawerWidth={drawerWidth}>
        <MenuBtn onClick={handleDrawerToggle} />
        <UploadReceiptBtn onClick={handleDialogOpen}>Upload Receipt</UploadReceiptBtn>
        <ProfileAvatar onClickProfile={handleClickProfile} />
      </TopBar>
      <SideBar
        drawerWidth={drawerWidth}
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <Logo title logoStyle={classes} />
        <NavTabs
          value={props.page}
          onChange={props.onChange}
          onClick={isMobile ? handleDrawerToggle : null}
          ref={profileRef}
        />
      </SideBar>
      <AppDialog
        size="md"
        isOpen={isOpen}
        handleOpen={handleDialogOpen}
        handleClose={handleDialogClose}
        title='Upload receipt'
      >
        <ReceiptUploadForm
          reloadTrans={reloadTransactions}
          onReceiptUpload={handleReceiptUpload}
        />
      </AppDialog>
    </header >
    </ErrorBoundary>
  )
}