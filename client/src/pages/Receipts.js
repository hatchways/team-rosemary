import React, { useEffect, useContext, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import AppDialog from '../shared/components/UIElements/AppDialog';

import Receipt from '../assets/receipt.png';

import { DurationSelector } from '../shared/components/MainElements/DurationSelector';

import { makeStyles } from '@material-ui/core/styles';

import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';

import ModifyReceipt from '../receipts/components/ModifyReceipt';
import ErrorBoundary from '../shared/components/UIElements/ErrorBoundary';
import RollbarErrorTracking from '../helpers/RollbarErrorTracking';

const imgSize = '15rem';
const imgSizeXs = '18rem';

const useStyles = makeStyles((theme) => ({
    pRel: {
        position: 'relative',
    },
    imgRoot: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    imgContainer: {
        width: imgSize,
        height: imgSize,
        [theme.breakpoints.down('xs')]: {
            width: imgSizeXs,
            height: imgSizeXs,
        },
        '&:hover': {
            '& $imgMask': {
                opacity: 0.6,
            },
            '& $imgIcon': {
                opacity: 1,
            },
        },
    },
    imgBackdrop: {
        position: 'absolute',
        opacity: 0,
        transition: theme.transitions.create('opacity'),
    },
    imgMask: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '0.8rem',
        backgroundColor: '#314f85',
    },
    imgIcon: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#fafafa',
        fontSize: '2rem',
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: '0.8rem',
    },
}));

export default function Receipts(props) {
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();
    // const userId = auth.userId;

    const { receiptCount, onReceiptUpload } = props;

    const [receipts, setReceipts] = useState([]);
    const [duration, setDuration] = useState('all');
    const [isOpen, setIsOpen] = useState(false);
    const [reloadTransactions, setReloadTransactions] = useState(false);

    const [ind, setInd] = useState(null);

    const getDuration = (duration) => {
        setDuration(duration);
    };

    const handleDialogOpen = (index) => {
        //set receipt
        setInd(index);
        setIsOpen(true);
    };
    const handleDialogClose = () => {
        setIsOpen(false);
    };
    const handleReceiptUpload = () => {
        props.onReceiptUpload();
        setIsOpen(false);
    };

    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const endpoint =
                    process.env.REACT_APP_API_BASE_URL +
                    `user/receipts/${duration}`;
                const responseData = await sendRequest(endpoint, 'GET', null, {
                    Authorization: 'Bearer ' + auth.token,
                });

                setReceipts(responseData);
            } catch (error) {
                RollbarErrorTracking.logErrorInRollbar(error);

            }
        };

        fetchReceipts();
    }, [auth.token, sendRequest, duration, receiptCount]);

    const data = [
        {
            id: '0',
            name: 'Select Category',
        },
        {
            id: 'Food & Drinks',
            name: 'Food & Drinks',
        },
        {
            id: 'Housing',
            name: 'Housing',
        },
        {
            id: 'Transportation',
            name: 'Transportation',
        },
        {
            id: 'Health Care',
            name: 'Health Care',
        },
        {
            id: 'Recreation & Entertainment',
            name: 'Recreation & Entertainment',
        },
        {
            id: 'Grocery',
            name: 'Grocery',
        },
    ];

    return (
        <ErrorBoundary>
        <Grid container spacing={2} xs={12} lg={10} className={classes.pRel}>
            <DurationSelector top="-4rem" right="0" getDuration={getDuration} />
            {receipts.map((receipt, index) => {
                const { date } = receipt;
                const newDate = date.slice(0, 10);
                // if no pic, use dummy pic
                const picture =
                    receipt.picture.length > 0 ? receipt.picture[0] : Receipt;

                return (
                    <Grid
                        item
                        xs
                        key={index + '-' + newDate}
                        className={classes.imgRoot}
                    >
                        <ButtonBase
                            className={classes.imgContainer}
                            onClick={() => handleDialogOpen(index)}
                        >
                            <img
                                src={picture}
                                alt={`Receipt on ${newDate}`}
                                className={classes.img}
                            />
                            <span
                                className={`${classes.imgBackdrop} ${classes.imgMask}`}
                            />
                            <ZoomInIcon
                                className={`${classes.imgBackdrop} ${classes.imgIcon}`}
                            />
                        </ButtonBase>
                        <p>{newDate}</p>
                    </Grid>
                );
            })}

            <AppDialog
                size="md"
                isOpen={isOpen}
                handleOpen={handleDialogOpen}
                handleClose={handleDialogClose}
                title="Modify Receipt"
            >
                <ModifyReceipt
                    receipt={receipts[ind]}
                    data={data}
                    reloadTrans={reloadTransactions}
                    onReceiptUpload={handleReceiptUpload}
                />
            </AppDialog>
        </Grid>
        </ErrorBoundary>
    );
}
