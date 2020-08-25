import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
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

const ReceiptUploadForm = (props) => {
    const classes = useStyles();
    const [data] = useState(props.data);
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]);

    const {
        isLoading,
        error,
        success,
        sendRequest,
        clearError,
        clearSuccess,
    } = useHttpClient();
    const auth = useContext(AuthContext);
    const history = useHistory();

    function onSelectChange(event) {
        setCategory(event.target.value);
        // console.log(event.target.value);
    }
    const {
        handleSubmit,
        handleChange,
        handleBlur,
        errors,
        touched,
        isValid,
    } = useFormik({
        initialValues: {
            name: '',
            amount: '',
            category: '',
        },
        validationSchema,
        async onSubmit(values, { resetForm }) {
            const imagesUrl = [];
            if (category !== '0') {
                values.category = category;
            }
            try {
                //upload the images to S3
                if (images.length > 0) {
                    images.forEach(async (image) => {
                
                        let fileName = image.name.split('.')[0];
                        let fileType = image.name.split('.')[1];
                        try {
                   
                            const endpoint = process.env.REACT_APP_API_BASE_URL + 'sign_s3/';
                            const responseData = await sendRequest(
                                endpoint,
                                'POST',
                                JSON.stringify({
                                    fileName: fileName,
                                    fileType: fileType,
                                    userId: auth.userId,
                                }),
                                {
                                    'Content-Type': 'application/json',
                                }
                            ).then(resp => {
                               
                                const returnData = resp.data.returnData;
                                const signedRequest =returnData.signedRequest;
                                const url = returnData.url;

                                sendRequest(
                                    signedRequest,
                                    'PUT',
                                    image,
                                    {
                                        'Content-Type': fileType,
                                    },
                                    false
                                );
                                imagesUrl.push(url);
                               
                                if(imagesUrl.length === images.length) {
                                       
                                    const endpoint =
                                    process.env.REACT_APP_API_BASE_URL + 'receipt';
                                 sendRequest(
                                    endpoint,
                                    'POST',
                                    JSON.stringify({
                                        title: values.name,
                                        user: auth.userId,
                                        amount: values.amount,
                                        category: values.category,
                                        date: new Date(),
                                        picture: imagesUrl,
                                    }),
                                    {
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + auth.token,
                                    }
                                );
                                  props.onReceiptUpload();
                                  setMessage('Receipt uploaded successfully!');
                                }

                           });

                        } catch (error) {
                            alert('ERROR ' + JSON.stringify(error));
                        }
                    });
                   
                }
                //resetForm({values: ''});
               
            } catch (err) {
                console.log(err);
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
                            id="name"
                            label="Name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.name ? errors.name : ''}
                            error={touched.name && Boolean(errors.name)}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="amount"
                            label="Amount"
                            name="amount"
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.amount ? errors.amount : ''}
                            error={touched.amount && Boolean(errors.amount)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomSelect
                            name="category"
                            id="category"
                            title="Category"
                            data={data}
                            handleChange={onSelectChange}
                            helperText={touched.category ? errors.category : ''}
                            error={touched.category && errors.category}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={
                                'Drag and drop an image here or click'
                            }
                            onChange={(files) => setImages(files)}
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

export default ReceiptUploadForm;
