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
    width: '1.2rem',
    height: '1.2rem'
  }
})

export function CatStatTable(props) {
  const data = [
    { cat: 'Food and Drinks', expense: 348 },
    { cat: 'Travel', expense: 1529 },
    { cat: 'Food and Drinks', expense: 291 },
  ];

  const classes = useStyles();

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {data.map((cat, index) => (
            <TableRow key={index + ' ' + cat.cat}>
              <TableCell component="th" scope="row" className={classes["th-container"]}>
                <Avatar className={classes.avator}>?</Avatar>
                {cat.cat}
              </TableCell>
              <TableCell>{`-$${cat.expense.toLocaleString()}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
