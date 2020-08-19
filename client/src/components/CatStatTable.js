import React from "react";

import { Avatar } from "@material-ui/core";

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
    width: '1.2rem',
    height: '1.2rem'
  }
})

// May merge all Tables into one Template
export function CatStatTable(props) {
  const data = [
    { avatar: '?', cat: 'Food and Drinks', expense: 348 },
    { avatar: '?', cat: 'Travel', expense: 1529 },
    { avatar: '?', cat: 'Food and Drinks', expense: 291 },
  ];

  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.container}>
        <TableBody>
          {data.map((cat, index) => (
            <TableRow key={index + ' ' + cat.cat}>
              <TableCell component="th" scope="row">
                <div className={classes.thead}>
                  <Avatar className={classes.avator}>{cat.avatar}</Avatar>
                  {cat.cat}
                </div>
              </TableCell>
              <TableCell>{`-$${cat.expense.toLocaleString()}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
