import React from "react";
import Grid from "@material-ui/core/Grid";
import { Panel } from '../shared/components/general/Panel';
import { Chart } from '../shared/components/general/Chart';

import TopCategories from '../shared/components/general/TopCategories';
import RecentTransactions from '../shared/components/general/RecentTransactions';
import { MonthSelector } from '../shared/components/general/MonthSelector';

export default function Dashboard(props) {
  const { receiptCount } = props;
  return (
    <>
      <Grid container spacing={3} xs={12} lg={10}>
        <Grid item xs={12} md={6}>
          <Panel title="TOTAL EXPENSES">
            <MonthSelector top="1rem" right="1rem" />
            <Chart />
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
