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
import ErrorBoundary from '../../shared/components/UIElements/ErrorBoundary';
import RollbarErrorTracking from '../../helpers/RollbarErrorTracking';

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            width: '90%'
        }
    },
    dropzone: {
        [theme.breakpoints.down('xs')]: {
            minHeight: '12rem'
        }
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const validationSchema = Yup.object().shape({
    //  name: Yup.string().required('Name is required'),
    amount: Yup.number().required('Amount is required'),
});


const ReceiptUploadForm = (props) => {
    const classes = useStyles();
    const [data] = useState(props.data);
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]);
    const [googleResponse, setGoogleResponse] = useState('');
    const [googleResponseText, setGoogleResponseText] = useState([]);
    const [title, setTitle] = useState('');

    const {
        isLoading,
        error,
        success,
        sendRequest,
        clearError,
        clearSuccess,
    } = useHttpClient();
    const auth = useContext(AuthContext);

    const onSelectChange = (event) => {
        setCategory(event.target.value);
    };

    const _handleTitleTextFieldChange = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeDropzone = (files) => {
        setImages(files);

        if (files.length === 1) {
            //send request to API to get base64 string of image
            const formData = new FormData();
            formData.append('photo', files[0]);

            const endpoint =
                process.env.REACT_APP_API_BASE_URL +
                'user/base64';

            // request sent to API
            sendRequest(
                endpoint,
                'POST',
                formData
            ).then((response) => {

                const base64String = response.results.base64; // base64 string of image received

                //Google API end point
                const googleEndPoint = process.env.REACT_APP_GOOGLE_VISION_API_ENDPOINT;

                let body = JSON.stringify({
                    requests: [
                        {
                            features: [
                                {
                                    type:
                                        'TEXT_DETECTION',
                                    maxResults: 5,
                                },
                            ],
                            image: {
                                content: base64String,
                            },
                        },
                    ],
                });

                //Send request to google API
                sendRequest(
                    googleEndPoint,
                    'POST',
                    body,
                    {
                        Accept: 'application/json',
                        'Content-Type':
                            'application/json',
                    }
                ).then((responseJson) => {

                    setGoogleResponse(responseJson);

                    if (JSON.stringify(responseJson.data) !== '{}') {
                        const words =
                            responseJson.responses[0]
                                .textAnnotations;

                        let arrayWords = [];

                        let document = '';
                        words.forEach((text) => {
                            document +=
                                text.description;
                            arrayWords.push(text.description);
                        });

                        //console.log(arrayWords);

                        setGoogleResponseText(arrayWords);
                        setTitle(arrayWords[1]);
                        // console.log(document);
                    } else {
                        console.log(
                            'No discernable text found.'
                        );
                    }
                });
            });
        }
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

            values.name = title;

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
                            await sendRequest(
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
                            ).then((resp) => {
                                console.log(resp);
                                const signedRequest = resp.signedRequest;
                                const url = resp.url;

                                sendRequest(
                                    signedRequest,
                                    'PUT',
                                    image,
                                    {
                                        'Content-Type': fileType,
                                    },
                                    false
                                ).then(() => {
                                    imagesUrl.push(url);

                                    if (imagesUrl.length === images.length) {
                                        console.log('making call to get save receipt');
                                        const endpoint =
                                            process.env.REACT_APP_API_BASE_URL +
                                            'receipt';
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
                                                Authorization:
                                                    'Bearer ' + auth.token,
                                            }
                                        );
                                        props.onReceiptUpload();
                                        setMessage(
                                            'Receipt uploaded successfully!'
                                        );
                                    }


                                });

                            });

                        } catch (error) {
                            //console.log('ERROR ' + JSON.stringify(error));
                            RollbarErrorTracking.logErrorInRollbar(error);
                        }
                    });
                }
                //resetForm({values: ''});
            } catch (err) {
                RollbarErrorTracking.logErrorInRollbar(err);

            }
        },
    });

    return (
        <ErrorBoundary>
            <React.Fragment>
                <ErrorModal error={error} onClear={clearError} />
                {message !== '' &&
                    <SuccessModal
                        success={success}
                        successMessage={message}
                        onClear={clearSuccess}
                    />
                }
                {isLoading && <LoadingSpinner asOverlay />}
                <Grid
                    container
                    spacing={5}
                    margin={3}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <form
                        noValidate
                        className={classes.form}
                        onSubmit={handleSubmit}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                type="text"
                                value={title}
                                autoComplete="name"
                                onChange={_handleTitleTextFieldChange}
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
                                classes={{
                                    root: classes.dropzone
                                }}
                                acceptedFiles={['image/*']}
                                dropzoneText="Drag and drop an image here or click"
                                onChange={handleChangeDropzone}
                            />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        // disabled={!isValid}
                        >
                            Save
                    </Button>
                    </form>
                </Grid>
            </React.Fragment>
        </ErrorBoundary>
    );
};

export default ReceiptUploadForm;
