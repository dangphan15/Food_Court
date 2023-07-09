import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDispatch, useSelector} from "react-redux";
import {selectUser, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS} from "../features/user/userSlice";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {userApi} from "../api/userApi";
import {getErrorMessageFromServer} from "../utils/serverUtils";
import {Paper} from "@mui/material";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function Login() {

    const userAccount = useSelector(selectUser);
    console.log(userAccount)
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    // const [alertNotLogin, setAlertNotLogin] = useState(
    //     location.state?.alertNotLogin
    // );
    const [isLoginSuccess, setIsLoginSuccess] = useState(userAccount.isloggedInSuccess);
    const [loginErrorMessage, setLoginErrorMessage] = useState(userAccount.loginErrorMessage);
    // Submit form function
    const onSubmit = (input) => {
        console.log(input);
        const fetchUser = async () => {
            try {
                dispatch(USER_LOGIN_REQUEST());
                const response = await userApi.login(input)
                localStorage.setItem("token", JSON.stringify(response.result.token));
                dispatch(USER_LOGIN_SUCCESS(response.result.token));
                console.log(userAccount);
            } catch (error) {
                const errorMessage = getErrorMessageFromServer(error);
                setIsLoginSuccess(false);
                dispatch(USER_LOGIN_FAIL(errorMessage));
            }
        };
        fetchUser();
    };

    // console.log(user.isloggedInSuccess);

    // Navigate to home page and prevent going to login page after login
    useEffect(() => {
        if (userAccount.token && userAccount.shopAccountInfor !== null) navigate("/");
    }, [userAccount.token,userAccount]);

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            {...register("email")}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            {...register("password")}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {!loginErrorMessage && (
                            <div
                                className="bg-red-100 rounded-lg mb-3 py-3 px-6 text-sm text-red-700 inline-flex items-center w-full"
                                role="alert"
                            >
                                {userAccount.loginErrorMessage}
                            </div>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 8, mb: 4 }} />
                    </Box>
                </Box>

                </Grid>
            </Grid>
        </ThemeProvider>
    );
}