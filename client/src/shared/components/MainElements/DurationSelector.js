import React, { useState } from 'react';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        position: 'absolute',
        top: (props) => `${props.top}`,
        right: (props) => `${props.right}`,
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const durations = ['all', 'daily', 'weekly', 'monthly', 'annually'];

export function DurationSelector(props) {
    const { top, right, getDuration } = props;
    const classes = useStyles({ top, right });
    const [duration, setDuration] = useState('all');

    const handleChange = (e) => {
        setDuration(e.target.value);
        getDuration(e.target.value);
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="durlabel">Duration</InputLabel>
            <Select
                labelId="durlabel"
                value={duration}
                name="Duration"
                onChange={handleChange}
            >
                {durations.map((duration, index) => {
                    return (
                        <MenuItem key={index} value={duration}>
                            {duration}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
