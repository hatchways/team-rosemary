import React, { useState } from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

export function TransactionTable(props) {
  const data = [
    { name: 'App Store', expense: 12, date: 'Nov 11, 2019', cat: 'Services' },
    { name: 'Starbucks', expense: 20, date: 'Nov 10, 2019', cat: 'Food and Drinks' },
  ];

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {data.map((cat, index)=> (
            <TableRow key={index + ' ' + cat.name}>
              <TableCell component="th" scope="row">{cat.name}</TableCell>
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