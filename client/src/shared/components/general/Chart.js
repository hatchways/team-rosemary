import React, { useState, useEffect } from "react";

import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';

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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatter = (value, ...params) => [`$${value.toLocaleString()}`, ...params];

const initChart = (month, year) => {
  const date = new Date();
  const numOfDays = new Date(year, month + 1, 0).getDate();
  const today = date.getDate();
  const dateToday = new Date().toDateString().slice(4, 10);
  const thisMonth = date.getMonth();
  const thisYear = date.getFullYear();

  // Future: data end at 1st day, reference at 1st day
  // Current: data end at today, reference at today
  // Past: data end at the last day, reference at the last day
  const chartConfig = [
    {
      date: 'current',
      condition: month === thisMonth && year === thisYear,
      total: d => d <= today ? 0 : null,
      reference: dateToday
    },
    {
      date: 'past',
      condition: year < thisYear || (year === thisYear && month < thisMonth),
      total: 0,
      reference: `${months[month]} ${numOfDays}`
    },
    {
      date: 'future',
      condition: year > thisYear || (year === thisYear && month > thisMonth),
      total: null,
      reference: `${months[month]} 01`
    }
  ];

  const currentConfig = chartConfig.find(config => config.condition);
  const { total, reference } = currentConfig;
  const receipts = [{ _id: `${months[month]} 01`, total: 0 }];

  for (let d = 2; d <= numOfDays; d++) {
    receipts.push({
      _id: `${months[month]} ${d > 9 ? '' : '0'}${d}`,
      total: total instanceof Function ? total(d) : total
    });
  }
  
  return { receipts, reference };
}

export function Chart(props) {
  const classes = useStyles();
  const { data, year, month } = props;
  const { receipts, reference } = initChart(month, year);

  const getReceipt = (source, ref) => source.find(receipt => receipt._id === ref);

  const [monthlyReceipts, setMonthlyReceipts] = useState(receipts);
  const [total, setTotal] = useState(0);
  const [latestValue, setlatestValue] = useState(getReceipt(receipts, reference).total);

  useEffect(() => {
    const total = data.reduce((a, b) => a + b.total, 0);

    setTotal(total);
    setMonthlyReceipts(receipts => {
      const mergedReceipts = receipts.map(receipt => {
        return getReceipt(data, receipt._id) || receipt;
      });
      return mergedReceipts;
    });
  }, [data])

  useEffect(() => {
    setMonthlyReceipts(receipts);
  }, [month, year])

  useEffect(() => {
    const latestValue = getReceipt(monthlyReceipts, reference).total;
    setlatestValue(latestValue);
  }, [monthlyReceipts])

  const renderLineChart = (
    <ResponsiveContainer height={120} debounce={100}>
      <LineChart data={monthlyReceipts}>
        <XAxis
          dataKey="_id"
          interval="preserveStartEnd"
          axisLine={{ stroke: "#f0f2fa", strokeWidth: 2 }}
          tickLine={false}
          padding={{ left: 20, right: 20 }}
        />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#4366a7"
          strokeWidth={2}
          dot={false}
          activeDot={{ stroke: '#fff', strokeWidth: 3, r: 6 }}
        />
        <ReferenceLine x={reference} stroke="#f0f2fa" />
        <ReferenceDot
          x={reference}
          y={latestValue}
          r={5}
          isFront
          fill="#38cc89"
          stroke="none"
        />
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