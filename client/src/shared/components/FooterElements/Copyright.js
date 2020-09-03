
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        marginBottom: '10%'
    }
});

export default function Copyright() {
    const classes = useStyles();

    return (
        <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            classes={{
                body2: classes.container
            }}
        >
            {'Copyright © '}
            <Link color="inherit" href="https://www.hatchways.io/">HatchWays</Link>
            {` ${new Date().getFullYear()}.`}
        </Typography>
    )
};

