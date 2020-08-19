import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    whiteSpace: 'nowrap'
  },
  thead: {
    display: 'flex',
    alignItems: 'center'
  },
  avator: {
    marginRight: '1rem',
    width: '2rem',
    height: '2rem'
  },
  txtCat: {
    color: 'grey',
    opacity: '0.8'
  }
})

// May merge all Tables into one Template
export function TransactionTable(props) {
  const data = [
    { avatar: '?', name: 'App Store', expense: 12, date: 'Nov 11, 2019', cat: 'Services' },
    { avatar: '?', name: 'Starbucks', expense: 20, date: 'Nov 10, 2019', cat: 'Food and Drinks' },
  ];

  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.container}>
        <TableBody>
          {data.map((cat, index) => (
            <TableRow key={index + ' ' + cat.name}>
              <TableCell component="th" scope="row">
                <div className={classes.thead}>
                  <Avatar component="span" className={classes.avator}>{cat.avatar}</Avatar>
                  {cat.name}
                </div>
              </TableCell>
              <TableCell>{`-$${cat.expense.toLocaleString()}`}</TableCell>
              <TableCell>{cat.date}</TableCell>
              <TableCell className={classes.txtCat}>{cat.cat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}