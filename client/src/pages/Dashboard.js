import React, { useState, useEffect, useContext } from "react";

import Grid from "@material-ui/core/Grid";

import { Panel } from '../shared/components/general/Panel';
import { Chart } from '../shared/components/general/Chart';
import { CatStatTable } from '../shared/components/general/CatStatTable';
import TopCategories from '../shared/components/general/TopCategories';
import { TransactionTable } from '../shared/components/general/TransactionTable';
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

  const handleMonthChange = e => {
    setMonth(e.target.value);
  };

  useEffect(() => {
    const fetchMonthlyTransactions = async () => {
      try {
        // So far only year 2020 in the controller
        const endpoint = `${process.env.REACT_APP_API_BASE_URL}user/monthlytransactions/${userId}&${month}`;
        const responseData = await sendRequest(
          endpoint,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + auth.token
          }
        );
        const dataToDateString = responseData.receipts.map(data => {
          const date = new Date(data._id);
          const validDate = date.toDateString();
          return {...data, _id: validDate.slice(4,10)};
        });
        setMonthlyReceipts(dataToDateString);
      } catch {

      }
    };
    fetchMonthlyTransactions();
  }, [sendRequest, userId, month])

  const { receiptCount } = props;
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
            <Chart dataa={monthlyReceipts} />
          </Panel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Panel title="TOP CATEGORIES">
            {/* <CatStatTable /> */}
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
            {/* <TransactionTable /> */}
            {/* <RecentTransactions reloadTrans={setReloadTransactions}/> */}
            <RecentTransactions receiptCount={receiptCount} />
          </Panel>
        </Grid>
      </Grid>
    </>
  );
}
