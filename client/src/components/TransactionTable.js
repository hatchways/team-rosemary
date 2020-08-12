import React, { useState } from "react";

import { Avatar } from "@material-ui/core";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  'th-container': {
    display: 'flex',
    alignItems: 'center',
  },
  'avator': {
    marginRight: '1rem',
    width: '2rem',
    height: '2rem'
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
      <Table>
        <TableBody>
          {data.map((cat, index) => (
            <TableRow key={index + ' ' + cat.name}>
              <TableCell component="th" scope="row" className={classes["th-container"]}>
                <Avatar className={classes.avator}>{cat.avatar}</Avatar>
                {cat.name}
              </TableCell>
              <TableCell>{`-$${cat.expense.toLocaleString()}`}</TableCell>
              <TableCell>{cat.date}</TableCell>
              <TableCell>{cat.cat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}