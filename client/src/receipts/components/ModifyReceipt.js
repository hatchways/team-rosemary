import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DropzoneArea } from 'material-ui-dropzone';

import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import SuccessModal from '../../shared/components/UIElements/SuccessModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import CustomSelect from '../../shared/components/FormElements/Select';
import { AuthContext } from '../../shared/context/auth-context';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    amount: Yup.number().required('Amount is required'),
});

// const currentDate = () => {

//     const date = new Date(); // M-D-YYYY

//     const d = date.getDate();
//     const m = date.getMonth() + 1;
//     const y = date.getFullYear();

//     return (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
// }

const ModifyReceiptForm = (props) => {
    const { receipt } = props;
    console.log(receipt);
    const classes = useStyles();
    const [data] = useState(props.data);
    const [category, setCategory] = useState(receipt.category);
    const [message, setMessage] = useState('');

    const {
        isLoading,
        error,
        success,
        sendRequest,
        clearError,
        clearSuccess,
    } = useHttpClient();
    const auth = useContext(AuthContext);

    function onSelectChange(event) {
        setCategory(event.target.value);
    }
    const { handleSubmit, handleChange, handleBlur, isValid } = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: receipt.name,
            amount: receipt.amount,
            category: receipt.category,
            date: receipt.date,
        },
        validationSchema,
        async onSubmit(values, { resetForm }) {
            if (category !== '0') {
                values.category = category;
            }

            try {
                const endpoint =
                    process.env.REACT_APP_API_BASE_URL +
                    `receipt/${receipt._id}`;
                sendRequest(
                    endpoint,
                    'PUT',
                    JSON.stringify({
                        title: values.name,
                        amount: values.amount,
                        category: values.category,
                        date: values.date,
                    }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token,
                    }
                );

                props.onReceiptUpload();
            } catch (error) {
                alert('ERROR ' + JSON.stringify(error));
            }
        },
    });

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <SuccessModal
                success={success}
                successMessage={message}
                onClear={clearSuccess}
            />
            {isLoading && <LoadingSpinner asOverlay />}
            <Grid
                container
                spacing={5}
                margin={3}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <form onSubmit={handleSubmit} noValidate>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            defaultValue={receipt.title}
                            id="name"
                            label="Name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            defaultValue={receipt.amount}
                            id="amount"
                            label="Amount"
                            name="amount"
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <p>
                            <b>Current category: {receipt.category} </b>
                        </p>
                        <CustomSelect
                            name="category"
                            id="category"
                            title="Category"
                            data={data}
                            dvalue={receipt.category}
                            handleChange={onSelectChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            defaultValue={receipt.date.slice(0, 10)}
                            id="date"
                            label="Date"
                            name="date"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!isValid}
                    >
                        Save
                    </Button>
                </form>
            </Grid>
        </React.Fragment>
    );
};

export default ModifyReceiptForm;
