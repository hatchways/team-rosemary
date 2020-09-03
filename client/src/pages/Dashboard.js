import React, { useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { Panel } from '../shared/components/MainElements/Panel';
import { Chart } from '../shared/components/MainElements/Chart';
import TopCategories from '../shared/components/MainElements/TopCategories';
import RecentTransactions from '../shared/components/MainElements/RecentTransactions';
import { DateSelector } from '../shared/components/MainElements/DateSelector';
import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';

import TotalExpense from '../shared/components/MainElements/TotalExpense';

export default function Dashboard(props) {
  const [month, setMonth] = useState(new Date().getMonth()); // month starts from 0
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthlyReceipts, setMonthlyReceipts] = useState([]);
  const [total, setTotal] = useState(0);

  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const userId = auth.userId;
  const { receiptCount } = props;

  const handleMonthYearChange = e => {
    const [year, month] = e.target.value.split('-');
    setYear(+year);
    setMonth(+month);
  };

  // Get timezone offset of the user's current location, format: +HHmm or -HHmm
  // Aware that in mongoDB the +/- is reversed from JavaScript
  const getTimezoneOffset = () => {
    const offset = new Date().getTimezoneOffset();
    const hourOffset = Math.abs(Math.floor(offset / 60));
    const minuteOffset = Math.abs(offset % 60);
    const timezoneOffset = `${offset > 0 ? '-' : '+'}${hourOffset > 9 ? hourOffset : '0' + hourOffset}${minuteOffset > 9 ? minuteOffset : '0' + minuteOffset}`;
    return timezoneOffset;
  };

  useEffect(() => {
    const fetchMonthlyTransactions = async () => {
      try {
        const timezone = getTimezoneOffset();
        const endpoint = `${process.env.REACT_APP_API_BASE_URL}user/monthlytransactions/${userId}&${year}&${month}&${timezone}`;
        const responseData = await sendRequest(
          endpoint,
          'GET',
          null,
          { Authorization: 'Bearer ' + auth.token }
        );

        const { receipts } = responseData;

        // 'Mon Jan 01 2020' => 'Jan 01'
        const dataToDateString = receipts.map(receipt => {
          const date = new Date(receipt._id);
          const validDate = date.toDateString();
          return { ...receipt, _id: validDate.slice(4, 10) };
        });
        const total = receipts.reduce((a, b) => a + b.total, 0);

        setTotal(total);
        setMonthlyReceipts(dataToDateString);
      } catch {

      }
    };
    fetchMonthlyTransactions();
  }, [sendRequest, userId, auth.token, year, month, receiptCount])

  return (
    <>
      <Grid container spacing={3} xs={12} lg={10}>
        <Grid item xs={12} md={6}>
          <Panel title="TOTAL EXPENSES">
            <DateSelector
              top="1rem"
              right="0.5rem"
              value={`${year}-${month}`}
              onChange={handleMonthYearChange}
            />
            <TotalExpense total={total} />
            <Chart year={year} month={month} data={monthlyReceipts} />
          </Panel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Panel title="TOP CATEGORIES">
            <TopCategories receiptCount={receiptCount} />
          </Panel>
        </Grid>
      </Grid>
      <Grid container spacing={3} xs={12} lg={10}>
        <Grid item xs={12}>
          <h3>Recent Transactions</h3>
        </Grid>
      </Grid>
      <Grid container spacing={3} xs={12} lg={10}>
        <Grid item xs={12}>
          <Panel>
            {/* <RecentTransactions reloadTrans={setReloadTransactions}/> */}
            <RecentTransactions receiptCount={receiptCount} />
          </Panel>
        </Grid>
      </Grid>
    </>
  );
}
