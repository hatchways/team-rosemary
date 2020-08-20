import React, { useEffect, useContext, useState } from 'react';
import { Avatar } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import LocalGroceryStoreRoundedIcon from '@material-ui/icons/LocalGroceryStoreRounded';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import DriveEtaRoundedIcon from '@material-ui/icons/DriveEtaRounded';
import SportsHandballRoundedIcon from '@material-ui/icons/SportsHandballRounded';
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

import { green } from '@material-ui/core/colors';

import { AuthContext } from '../../context/auth-context';
import { useHttpClient } from '../../hooks/http-hook';

const useStyles = makeStyles({
    container: {
        whiteSpace: 'nowrap',
    },
    thead: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        marginRight: '1rem',
        width: '2rem',
        height: '2rem',
        color: '#fff',
        backgroundColor: green[500],
    },
    txtCat: {
        color: 'grey',
        opacity: '0.8',
    },
});

const RecentTransactions = (props) => {
    const classes = useStyles();
    const [loadedReceipts, setloadedReceipts] = useState([]);
    const auth = useContext(AuthContext);
    const {
        sendRequest,
    } = useHttpClient();
    const userId = auth.userId;
    console.log(props.reloadTrans);

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

    // Fetch recent transations
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // API call
                const endpoint =
                    process.env.REACT_APP_API_BASE_URL +
                    `user/recenttransactions/${userId}`;
                const responseData = await sendRequest(endpoint, 'GET', null, {
                    Authorization: 'Bearer ' + auth.token,
                });
                setloadedReceipts(responseData.receipts); // set the transactions data
            } catch (err) { }
        };
        fetchTransactions();
    }, [sendRequest, userId]);

    return (
        <TableContainer>
            <Table className={classes.container}>
                <TableBody>
                    {loadedReceipts.map((receipt, index) => (
                        <TableRow key={index + ' ' + receipt._id}>
                            <TableCell component="th" scope="row">
                                <div className={classes.thead}>
                                    <Avatar className={classes.avatar}>
                                        {categoryIcon(receipt.category)}
                                    </Avatar>
                                    {receipt.title}
                                </div>
                            </TableCell>
                            <TableCell>{`-$${receipt.amount.toLocaleString()}`}</TableCell>
                            <TableCell>
                                {moment(receipt.date).format('MMMM Do, YYYY')}
                            </TableCell>
                            <TableCell className={classes.txtCat}>
                                {receipt.category}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RecentTransactions;
