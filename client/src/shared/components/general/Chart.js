import React, { useState, useEffect } from "react";

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

export function Chart(props) {
  const classes = useStyles();
  const [monthlyReceipts, setMonthlyReceipts] = useState([]);
  const [total, setTotal] = useState('--');
  const [lastDay, setLastDay] = useState('');

  const { data } = props;

  useEffect(() => {
    const total = data.reduce((a, b) => a + b.total, 0);
    const lastDay = data[0] && data[0]._id;

    setTotal(total || '--');
    setLastDay(lastDay);
    setMonthlyReceipts(data);
  }, [data])

  const formatter = (value, ...params) => [`$${value.toLocaleString()}`, ...params];

  const renderLineChart = (
    <ResponsiveContainer height={120} debounce={100}>
      <LineChart data={monthlyReceipts}>
        <XAxis dataKey="_id" reversed axisLine={{ stroke: "#f0f2fa", strokeWidth: 2 }} tickLine={false} padding={{ left: 20, right: 20 }} />
        {/* <YAxis /> */}
        <Line type="monotone" dataKey="total" stroke="#4366a7" strokeWidth={2} dot={false} activeDot={{ stroke: '#fff', strokeWidth: 3, r: 6 }} />
        <ReferenceLine x={lastDay} stroke="#f0f2fa" />
        <Tooltip separator=": " formatter={formatter} />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div>
      <p className={classes.txtExpensesTotal}><sup>$</sup>{total.toLocaleString()}</p>
      {renderLineChart}
    </div>
  )
}