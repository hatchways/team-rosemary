import React, { useEffect, useContext, useState } from 'react';
import { Avatar } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import LocalGroceryStoreRoundedIcon from '@material-ui/icons/LocalGroceryStoreRounded';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import DriveEtaRoundedIcon from '@material-ui/icons/DriveEtaRounded';
import SportsHandballRoundedIcon from '@material-ui/icons/SportsHandballRounded';
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { green } from '@material-ui/core/colors';

import { AuthContext } from '../../context/auth-context';
import { useHttpClient } from '../../hooks/http-hook';

const useStyles = makeStyles({
  container: {
    whiteSpace: 'nowrap'
  },
  thead: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: '1rem',
    width: '1.5rem',
    height: '1.5rem',
    color: '#fff',
    backgroundColor: green[500],
  },
})

// May merge all Tables into one Template
export default function TopCategories(props) {

  const classes = useStyles();
  const auth = useContext(AuthContext);
  const {
    sendRequest,
  } = useHttpClient();
  const userId = auth.userId;
  const [loadedCategories, setloadedCategories] = useState([]);
  //Get category icon based upon the category
  const categoryIcon = (category) => {
    switch (category) {
      case 'Food & Drinks':
        return <FastfoodRoundedIcon />;
      case 'Housing':
        return <HomeRoundedIcon />;
      case 'Transportation':
        return <DriveEtaRoundedIcon />;
      case 'Health Care':
        return <LocalHospitalRoundedIcon />;
      case 'Recreation & Entertainment':
        return <SportsHandballRoundedIcon />;
      case 'Grocery':
        return <LocalGroceryStoreRoundedIcon />;

      default:
        return <HelpOutlineRoundedIcon />;
    }
  };

  // Fetch recent transations
  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        // API call
        const endpoint =
          process.env.REACT_APP_API_BASE_URL +
          `user/topcategories/${userId}`;
        const responseData = await sendRequest(endpoint, 'GET', null, {
          Authorization: 'Bearer ' + auth.token,
        });
        setloadedCategories(responseData.results.receipts); // set the transactions data
      } catch (err) { }
    };
    fetchTopCategories();
  }, [sendRequest, userId, auth.token, props.receiptCount]);
  return (
    <TableContainer>
      <Table className={classes.container}>
        <TableBody>
          {loadedCategories.map((receipt, index) => (
            <TableRow key={index + ' ' + receipt._id}>
              <TableCell component="th" scope="row">
                <div className={classes.thead}>
                  <Avatar className={classes.avatar}>
                    {categoryIcon(receipt._id)}
                  </Avatar>
                  {receipt._id}
                </div>
              </TableCell>
              <TableCell>{`-$${receipt.total.toLocaleString()}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
