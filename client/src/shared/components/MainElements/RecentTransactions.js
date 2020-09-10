import React, { useEffect, useContext, useState } from 'react';
import { Avatar } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { green } from '@material-ui/core/colors';

import CategoryContext from '../../context/category-context';
import { AuthContext } from '../../context/auth-context';
import { useHttpClient } from '../../hooks/http-hook';
import RollbarErrorTracking from '../../../helpers/RollbarErrorTracking';

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

    const categoryHash = useContext(CategoryContext);
    const auth = useContext(AuthContext);
    const {
        sendRequest,
    } = useHttpClient();
    const userId = auth.userId;
    const [loadedReceipts, setloadedReceipts] = useState([]);

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

                setloadedReceipts(responseData.results.transactions); // set the transactions data
                // props.onReceiptUpload();
            } catch (err) { RollbarErrorTracking.logErrorInRollbar(err); }
        };
        fetchTransactions();
    }, [sendRequest, userId, auth.token, props.receiptCount]);

    return (
        <TableContainer>
            <Table className={classes.container}>
                <TableBody>
                    {loadedReceipts.map((receipt, index) => {
                        const { _id, title, amount, date } = receipt;
                        const category = receipt.category || 'Other';
                        return (
                            <TableRow key={index + ' ' + _id}>
                                <TableCell component="th" scope="row">
                                    <div className={classes.thead}>
                                        <Avatar className={classes.avatar}>
                                            {categoryHash[category]}
                                        </Avatar>
                                        {title}
                                    </div>
                                </TableCell>
                                <TableCell>{`-$${amount.toLocaleString()}`}</TableCell>
                                <TableCell>
                                    {moment(date).format('MMMM Do, YYYY')}
                                </TableCell>
                                <TableCell className={classes.txtCat}>
                                    {category}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RecentTransactions;
