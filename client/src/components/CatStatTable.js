import React, { useState } from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

export function CatStatTable(props) {
  const data = [
    { cat: 'Food and Drinks', expense: 348 },
    { cat: 'Travel', expense: 1529 },
    { cat: 'Food and Drinks', expense: 291 },
  ];

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {data.map((cat, index) => (
            <TableRow key={index + ' ' + cat.cat}>
              <TableCell component="th" scope="row">{cat.cat}</TableCell>
              <TableCell>{`-$${cat.expense.toLocaleString()}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
