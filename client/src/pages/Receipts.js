import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ButtonBase from '@material-ui/core/ButtonBase';

import Receipt from '../assets/receipt.png'
import ZoomInIcon from '@material-ui/icons/ZoomIn';

import { MonthSelector } from '../components/MonthSelector';

import { makeStyles } from "@material-ui/core/styles";


const imgSize = '15rem';
const imgSizeXs = '18rem';

const useStyles = makeStyles(theme => ({
  pRel: {
    position: 'relative'
  },
  // utilbar: {
  //   [theme.breakpoints.up("sm")]: {
  //     ...theme.mixins.toolbar,
  //     backgroundColor: '#fafafa',
  //     opacity: 0.4,
  //     color: theme.palette.primary.contrastText
  //   }
  // },
  // utilbarMain: {
  //   backgroundColor: "#fafbff"
  // },
  // main: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   flexGrow: 1,
  //   minHeight: '100vh',
  //   padding: theme.spacing(3),
  //   overflowX: 'hidden',
  //   backgroundColor: '#fafbff',
  //   [theme.breakpoints.down("xs")]: {
  //     marginTop: '3rem',
  //     padding: theme.spacing(1)
  //   }
  // },
  imgRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imgContainer: {
    width: imgSize,
    height: imgSize,
    [theme.breakpoints.down("xs")]: {
      width: imgSizeXs,
      height: imgSizeXs,
    },
    '&:hover': {
      '& $imgMask': {
        opacity: 0.6
      },
      '& $imgIcon': {
        opacity: 1
      }
    }
  },
  imgBackdrop: {
    position: 'absolute',
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  },
  imgMask: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '0.8rem',
    backgroundColor: '#314f85'
  },
  imgIcon: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fafafa',
    fontSize: '2rem'
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: '0.8rem',
  }
}));

// Should be sorted by the date, users may not add receipts day after day
const data = [
  { date: 'Nov 11, 2019', img: Receipt },
  { date: 'Nov 10, 2019', img: Receipt },
  { date: 'Nov 10, 2019', img: Receipt },
  { date: 'Nov 10, 2019', img: Receipt },
  { date: 'Nov 9, 2019', img: Receipt },
  { date: 'Nov 9, 2019', img: Receipt },
  { date: 'Nov 8, 2019', img: Receipt },
  { date: 'Nov 8, 2019', img: Receipt },
];

export function Receipts(props) {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={2} xs={12} lg={10} className={classes.pRel}>
        <MonthSelector top="-3rem" right="0" />
        {data.map((receipt, index) => {
          const { date, img } = receipt;
          return (
            <Grid item xs key={index + '-' + date} className={classes.imgRoot}>
              <ButtonBase className={classes.imgContainer}>
                <img src={img} alt={`Receipt on ${date}`} className={classes.img} />
                <span className={`${classes.imgBackdrop} ${classes.imgMask}`} />
                <ZoomInIcon className={`${classes.imgBackdrop} ${classes.imgIcon}`} />
              </ButtonBase>
              <p>{date}</p>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}