import React, { useEffect, useContext, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

import Receipt from '../assets/receipt.png';

import { DurationSelector } from '../shared/components/general/DurationSelector';

import { makeStyles } from '@material-ui/core/styles';

import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';

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

    const [receipts, setReceipts] = useState([]);
    const [duration, setDuration] = useState('all');

    const getDuration = (duration) => {
        setDuration(duration);
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
            } catch (error) {}
        };

        fetchReceipts();
    }, [auth.token, sendRequest, duration]);

    return (
        <Grid container spacing={2} xs={12} lg={10} className={classes.pRel}>
            <DurationSelector top="-3rem" right="0" getDuration={getDuration} />
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
                        <ButtonBase className={classes.imgContainer}>
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
        </Grid>
    );
}
