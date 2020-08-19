import React, { useContext, useRef, Fragment, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import loginBg from '../../assets/login-bg.png';
import Copyright from '../../shared/components/FooterElements/Copyright';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

//for s3
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${loginBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light'
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
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
    email: Yup.string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export default function SignIn() {
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const {
        handleSubmit,
        handleChange,
        handleBlur,
        errors,
        touched,
        isValid,
    } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        async onSubmit(values) {
            try {
                const endpoint =
                    process.env.REACT_APP_API_BASE_URL + 'user/login';
                const responseData = await sendRequest(
                    endpoint,
                    'POST',
                    JSON.stringify({
                        email: values.email,
                        password: values.password,
                    }),
                    {
                        'Content-Type': 'application/json',
                    }
                );
                auth.login(responseData.userId, responseData.token);
            } catch (err) {
                console.log(err);
            }
        },
    });

    // s3 start
    const [uploadState, setUploadState] = useState({ success: false, url: '' });
    const uploadInput = useRef(null);

    const handleUpload = (e) => {
        let file = uploadInput.current.files[0];
        let fileParts = file.name.split('.');
        let fileName = fileParts[0];
        let fileType = fileParts[1];
        console.log('Preparing the upload');
        axios //http hook instead
            .post('http://localhost:5000/api/sign_s3/', {
                fileName: fileName,
                fileType: fileType,
            })
            .then((response) => {
                var returnData = response.data.data.returnData;
                var signedRequest = returnData.signedRequest;
                var url = returnData.url;
                console.log(url);
                setUploadState({ ...uploadState, url: url });
                console.log('Recieved a signed request ' + signedRequest);
                // Put the fileType in the headers for the upload
                var options = {
                    headers: {
                        'Content-Type': fileType,
                    },
                };
                axios
                    .put(signedRequest, file, options)
                    .then((result) => {
                        console.log('Response from s3');
                        setUploadState({ ...uploadState, success: true });
                    })
                    .then(console.log(`state uploaded  + ${uploadState}`))
                    .catch((error) => {
                        alert('ERROR ' + JSON.stringify(error));
                    });
            })
            .catch((error) => {
                alert(JSON.stringify(error));
            });
        console.log('hi' + JSON.stringify(uploadState));
    };

    const handleChanges3 = (e) => {
        setUploadState({ success: false, url: '' });
    };

    const Success_message = () => (
        <div style={{ padding: 50 }}>
            <h3 style={{ color: 'green' }}>SUCCESSFUL UPLOAD</h3>
            <a href={uploadState.url}>Access the file here</a>
            <br />
        </div>
    );

    //s3 end

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <ErrorModal error={error} onClear={clearError} />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <div className={classes.paper}>
                    {isLoading && <LoadingSpinner asOverlay />}
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form
                        className={classes.form}
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.email ? errors.email : ''}
                            error={touched.email && Boolean(errors.email)}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.password ? errors.password : ''}
                            error={touched.password && Boolean(errors.password)}
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!isValid}
                        >
                            Sign In
                        </Button>

                        {/* S3 upload button */}
                        <Fragment>
                            upload a file
                            {uploadState.success ? <Success_message /> : null}
                            <input
                                onChange={handleChanges3}
                                ref={uploadInput}
                                type="file"
                            />
                            <br />
                            <button onClick={handleUpload}> UPLOAD</button>
                        </Fragment>
                        {/* S3 upload button end */}

                        <Grid container>
                            <Grid item xs>
                                {/* <Link href='#' variant='body2'>
                    Forgot password?
                  </Link> */}
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
