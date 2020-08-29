import React, { useState, useEffect, useContext } from "react";

import Grid from "@material-ui/core/Grid";

import { Panel } from '../shared/components/general/Panel';
import { Chart } from '../shared/components/general/Chart';
import TopCategories from '../shared/components/general/TopCategories';
import RecentTransactions from '../shared/components/general/RecentTransactions';
import { MonthSelector } from '../shared/components/general/MonthSelector';

import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';

export function Dashboard(props) {
  const [month, setMonth] = useState(new Date().getMonth()); // month starts from 0
  const [monthlyReceipts, setMonthlyReceipts] = useState([]);

  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const userId = auth.userId;
  const { receiptCount } = props;

  const handleMonthChange = e => {
    setMonth(e.target.value);
  };

  // Get timezone offset of the user's current location, format: +HHmm or -HHmm
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
        // So far only year 2020 in the controller
        const timezone = getTimezoneOffset();
        const endpoint = `${process.env.REACT_APP_API_BASE_URL}user/monthlytransactions/${userId}&${month}&${timezone}`;
        const responseData = await sendRequest(
          endpoint,
          'GET',
          null,
          { Authorization: 'Bearer ' + auth.token }
        );

        // 'Mon Jan 01 2020' => 'Jan 01'
        const dataToDateString = responseData.receipts.map(data => {
          const date = new Date(data._id);
          const validDate = date.toDateString();
          return { ...data, _id: validDate.slice(4, 10) };
        });

        setMonthlyReceipts(dataToDateString);
      } catch {

      }
    };
    fetchMonthlyTransactions();
  }, [sendRequest, userId, auth.token, month, receiptCount])

  return (
    <>
      <Grid container spacing={3} xs={12} lg={10}>
        <Grid item xs={12} md={6}>
          <Panel title="TOTAL EXPENSES">
            <MonthSelector
              top="1rem"
              right="1rem"
              value={month}
              onChange={handleMonthChange}
            />
            <Chart data={monthlyReceipts} />
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
