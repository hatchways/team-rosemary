import React, { useEffect, useContext, useState } from 'react';

import moment from 'moment';

import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import LocalGroceryStoreRoundedIcon from '@material-ui/icons/LocalGroceryStoreRounded';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import DriveEtaRoundedIcon from '@material-ui/icons/DriveEtaRounded';
import SportsHandballRoundedIcon from '@material-ui/icons/SportsHandballRounded';
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import DescriptionIcon from '@material-ui/icons/Description';
import { green } from '@material-ui/core/colors';

import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import SuccessModal from '../shared/components/UIElements/SuccessModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';


import { Panel } from '../shared/components/MainElements/Panel';
import { DateSelector } from '../shared/components/MainElements/DateSelector';
import TotalExpense from '../shared/components/MainElements/TotalExpense';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    pRel: {
        position: 'relative',
    },
    container: {
        whiteSpace: 'nowrap',
    },
    button: {
        position: 'absolute',
        top: '1.5rem',
        right: '1rem',
        color: '#1b3460',
        textTransform: 'none',
    },
    thead: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        marginRight: '1rem',
        width: '1.5rem',
        height: '1.5rem',
        color: '#fff',
        backgroundColor: green[500],
    },
    txtCat: {
        color: 'grey',
        opacity: '0.8',
    },
});

// Get timezone offset of the user's current location, format: +HHmm or -HHmm
// Aware that in mongoDB the +/- is reversed from JavaScript
const getTimezoneOffset = () => {
    const offset = new Date().getTimezoneOffset();
    const hourOffset = Math.abs(Math.floor(offset / 60));
    const minuteOffset = Math.abs(offset % 60);
    const timezoneOffset = `${offset > 0 ? '-' : '+'}${
        hourOffset > 9 ? hourOffset : '0' + hourOffset
    }${minuteOffset > 9 ? minuteOffset : '0' + minuteOffset}`;
    return timezoneOffset;
};

export default function Reports(props) {
    const classes = useStyles();
    const isMobile = useMediaQuery(useTheme().breakpoints.down('xs'));

    const [month, setMonth] = useState(new Date().getMonth()); // month starts from 0
    const [year, setYear] = useState(new Date().getFullYear());
    const [monthlyReport, setMonthlyReport] = useState([]);
    const [total, setTotal] = useState(0);
    const [message, setMessage] = useState('');

    const auth = useContext(AuthContext);
     const userId = auth.userId;
    const { receiptCount } = props;


    const handleMonthYearChange = (e) => {
        const [year, month] = e.target.value.split('-');
        setYear(+year);
        setMonth(+month);
    };

    const {
      isLoading,
      error,
      success,
      sendRequest,
      clearError,
      clearSuccess,
  } = useHttpClient();

    const handleExportClick = async () => {

      const endpoint = `${process.env.REACT_APP_API_BASE_URL}user/receipts/export/${month}`;
                const responseData = await sendRequest(endpoint, 'GET', null, {
                    Authorization: 'Bearer ' + auth.token,
                    userid: userId
                });
               if(responseData.code === 201) {
                setMessage('A link to download report is sent to your registered email. Please check the junk & spam e-mails also.');
               }
    };

    //Get category icon based upon the category
    const categoryIcon = (category) => {
        switch (category) {
            case 'Food & Drinks':
                return <FastfoodRoundedIcon />;
            case 'Housing':
                return <HomeRoundedIcon />;
            case 'Transportation':
                return <DriveEtaRoundedIcon />;
            case 'Health Care':
                return <LocalHospitalRoundedIcon />;
            case 'Recreation & Entertainment':
                return <SportsHandballRoundedIcon />;
            case 'Grocery':
                return <LocalGroceryStoreRoundedIcon />;

            default:
                return <HelpOutlineRoundedIcon />;
        }
    };

    useEffect(() => {
        const fetchMonthlyReport = async () => {
            try {
                const timezone = getTimezoneOffset();
                const endpoint =
                    process.env.REACT_APP_API_BASE_URL +
                    `user/monthlyreport/${userId}&${year}&${month}&${timezone}`;
                const responseData = await sendRequest(endpoint, 'GET', null, {
                    Authorization: 'Bearer ' + auth.token,
                });

                const total = responseData.receipts.reduce(
                    (a, b) => a + b.amount,
                    0
                );

                setMonthlyReport(responseData.receipts);
                setTotal(total);
            } catch (err) {}
        };
        fetchMonthlyReport();
    }, [sendRequest, userId, auth.token, receiptCount, month, year]);

    return (
        <Grid container spacing={3} xs={12} lg={10} className={classes.pRel}>
            {isLoading && <LoadingSpinner asOverlay />}

          <ErrorModal error={error} onClear={clearError} />
          {message !== '' &&
            <SuccessModal
                success={success}
                successMessage={message}
                onClear={clearSuccess}
            />
          }
            <DateSelector
                top="-2.75rem"
                right="0.5rem"
                value={`${year}-${month}`}
                onChange={handleMonthYearChange}
            />
            <Grid item xs>
                <Panel
                    title={`TOTAL${isMobile ? '' : ' EXPENSES'}`}
                    height="auto"
                >
                    <TotalExpense total={total} float />
                    {/* <Button className={classes.button}>
                        {isMobile ? <DescriptionIcon /> : 'Export CSV'}
                        onClick={handleExportClick}
                    </Button> */}

                    <Button
                       className={classes.button}
                       onClick = {handleExportClick}
                      >
                      Export CSV
                    </Button>

                    <TableContainer>
                        <Table className={classes.container}>
                            <TableBody>
                                {monthlyReport.map((receipt, index) => (
                                    <TableRow key={index + ' ' + receipt._id}>
                                        <TableCell component="th" scope="row">
                                            <div className={classes.thead}>
                                                <Avatar
                                                    className={classes.avatar}
                                                >
                                                    {categoryIcon(
                                                        receipt.category
                                                    )}
                                                </Avatar>
                                                {receipt.title}
                                            </div>
                                        </TableCell>
                                        <TableCell>{`-$${receipt.amount.toLocaleString()}`}</TableCell>
                                        <TableCell>
                                            {moment(receipt.date).format(
                                                'MMMM Do, YYYY'
                                            )}
                                        </TableCell>
                                        <TableCell className={classes.txtCat}>
                                            {receipt.category}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Panel>
            </Grid>
        </Grid>
    );
}
