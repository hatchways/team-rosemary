import React from "react";

import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    width: '100%',
    padding: '1rem'
  },
  txtExpensesTotal: {
    margin: '1rem 0',
    fontSize: '2rem'
  }
});

// Should be sorted by the date, users may not add receipts day after day
const data = [
  { date: 'Aug 11', expense: 10 },
  { date: 'Aug 12', expense: 20 },
  { date: 'Aug 13', expense: 15 },
  { date: 'Aug 14', expense: 20 },
  { date: 'Aug 15', expense: 40 },
  { date: 'Aug 16', expense: 10 },
  { date: 'Aug 17', expense: 20 },
  { date: 'Aug 18', expense: 15 },
  { date: 'Aug 19', expense: 20 },
  { date: 'Aug 20', expense: 40 },
];

export function Chart(props) {
  const classes = useStyles();
  const expense = 2000;
  const lastDay = data[data.length - 1].date;

  const formatter = (value, ...pars) => [`$${value.toLocaleString()}`, ...pars];

  const renderLineChart = (
    <ResponsiveContainer height={120} debounce={100}>
      <LineChart data={data}>
        <XAxis dataKey="date" axisLine={{ stroke: "#f0f2fa", strokeWidth: 2 }} tickLine={false} padding={{ left: 20, right: 20 }} />
        {/* <YAxis /> */}
        <Line type="monotone" dataKey="expense" stroke="#4366a7" strokeWidth={2} dot={false} activeDot={{ stroke: '#fff', strokeWidth: 3, r: 6 }} />
        <ReferenceLine x={lastDay} stroke="#f0f2fa" />
        <Tooltip separator=": " formatter={formatter} />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div>
      <p className={classes.txtExpensesTotal}><sup>$</sup>{expense.toLocaleString()}</p>
      {renderLineChart}
    </div>
  )
}