import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = "15rem";

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  list: {
    marginTop: theme.spacing(3)
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth})`,
      marginLeft: drawerWidth
    }
  },
  // menuButton will be the logo
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  // necessary for content to be below app bar
  toolbar: {
    [theme.breakpoints.up("sm")]: {
      ...theme.mixins.toolbar,
      backgroundColor: theme.palette.primary.main,
      opacity: 0.4,
      color: theme.palette.primary.contrastText
    }
  },
  toolbarMain: {
    backgroundColor: "initial"
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "rgba(0, 0, 255, 0.4)"
  },
  drawerPaperXs: {
    width: drawerWidth,
    backgroundColor: "#fafafa"
  }
}));

// Can be HOC or render props
export function Menu(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Set current onfocus according to url?
  // Use radio instead of button for the listitems to solve the focus problem?
  const drawer = (
    <>
      <div className={classes.toolbar}>Logo here, will not use theme.mixins.toolbar</div>
      <List className={classes.list}>
        {["Dashboard", "Reports", "Receipts"].map((text, index) => (
          <ListItem component="li" button key={text}>
            <ListItemIcon>
              {/* Icon display only onfocus */}
              <FiberManualRecordIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <header>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" edge="start" className={classes.menuButton}
            onClick={handleDrawerToggle}>
            <MenuIcon /> {/*Should be the logo */}
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer (will remove)
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            classes={{
              paper: `${classes.drawerPaper} ${classes.drawerPaperXs}`
            }}
            ModalProps={{
              keepMounted: true,
              BackdropProps: {
                invisible: true
              }
            }}
            onClose={handleDrawerToggle}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </header>
  )
}