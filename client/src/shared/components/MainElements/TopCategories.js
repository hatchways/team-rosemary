import React, { useEffect, useContext, useState } from 'react';
import { Avatar } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

import { green } from '@material-ui/core/colors';

import CategoryContext from '../../context/category-context';
import { AuthContext } from '../../context/auth-context';
import { useHttpClient } from '../../hooks/http-hook';
import RollbarErrorTracking from '../../../helpers/RollbarErrorTracking';

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

  const categoryHash = useContext(CategoryContext);
  const auth = useContext(AuthContext);
  const {
    sendRequest,
  } = useHttpClient();
  const userId = auth.userId;
  const [loadedCategories, setloadedCategories] = useState([]);

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
      } catch (err) {

        RollbarErrorTracking.logErrorInRollbar(err);
      }
    };
    fetchTopCategories();
  }, [sendRequest, userId, auth.token, props.receiptCount]);
  return (
    <TableContainer>
      <Table className={classes.container}>
        <TableBody>
          {loadedCategories.map((receipt, index) => {
            const { total } = receipt;
            const _id = receipt._id || 'Other';
            return (
              <TableRow key={index + ' ' + _id}>
                <TableCell component="th" scope="row">
                  <div className={classes.thead}>
                    <Avatar className={classes.avatar}>
                      {categoryHash[_id]}
                    </Avatar>
                    {_id}
                  </div>
                </TableCell>
                <TableCell>{`-$${total.toLocaleString()}`}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
