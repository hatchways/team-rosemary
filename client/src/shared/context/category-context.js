import React, { createContext } from 'react';

import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import LocalGroceryStoreRoundedIcon from '@material-ui/icons/LocalGroceryStoreRounded';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import DriveEtaRoundedIcon from '@material-ui/icons/DriveEtaRounded';
import SportsHandballRoundedIcon from '@material-ui/icons/SportsHandballRounded';
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

const categoryHash = {
  'Food & Drinks': <FastfoodRoundedIcon />,
  'Housing': <HomeRoundedIcon />,
  'Transportation': <DriveEtaRoundedIcon />,
  'Health Care': <LocalHospitalRoundedIcon />,
  'Recreation & Entertainment': <SportsHandballRoundedIcon />,
  'Grocery': <LocalGroceryStoreRoundedIcon />,
  'Other': <HelpOutlineRoundedIcon />
}

const CategoryContext = createContext(categoryHash);

export default CategoryContext;