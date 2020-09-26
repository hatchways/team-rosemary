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
                const timezone = getTimezoneOffset();
                const endpoint =
                    process.env.REACT_APP_API_BASE_URL +
                    `user/receipts/${duration}&${timezone}`;
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

    return (
        <ErrorBoundary>
            <Grid container spacing={2} xs={12} lg={10} className={classes.pRel}>
                <DurationSelector top="-4rem" right="0" getDuration={getDuration} />
                {receipts.map((receipt, index) => {
                    const { date } = receipt;
                    const newDate = date.slice(0, 10);
                    // if no pic, use dummy pic
                    const picture = receipt.picture[0] || Receipt;

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
                                <span className={`${classes.imgBackdrop} ${classes.imgMask}`} />
                                <ZoomInIcon className={`${classes.imgBackdrop} ${classes.imgIcon}`} />
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
                        reloadTrans={reloadTransactions}
                        onReceiptUpload={handleReceiptUpload}
                    />
                </AppDialog>
            </Grid>
        </ErrorBoundary>
    );
}
