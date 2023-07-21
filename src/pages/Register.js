import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, USER_REQUEST} from "../features/user/userSlice";
import {userApi} from "../api/userApi";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getErrorMessageFromServer} from "../utils/serverUtils";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const user = useSelector(selectUser);
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [signUpErrorMessage, setSignUpErrorMessage] = useState("");

    const onSubmit = (input) => {
        console.log(input);
        const FetchUser = async () => {
            try {
                 dispatch(USER_REQUEST());
                 await userApi.register(input)
                    .then(() => navigate(`/login`, { state: { alertRegister: true } }))
            } catch (error) {
                console.log(error.response.data.message)
                setSignUpErrorMessage(error.response.data.message);
                // dispatch(USER_LOGIN_FAIL(errorMessage));
            }
        };
        FetchUser();
    };

    useEffect(() => window.scroll(0, 0), []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid container component="main" item
                      xs={false}
                      sm={12}
                      md={12}
                      justifyContent="center" sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                }}>
                    <Grid item  maxWidth="xs" xs={4} sx={{
                        backgroundColor: `white`,
                        mt: 4,
                        mb: 4,
                        p:3,
                        borderRadius: `10px`
                    }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            {...register("username")}
                                            autoComplete="given-name"
                                            name="username"
                                            required
                                            fullWidth
                                            id="username"
                                            label="Full Name"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            {...register("email")}
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            {...register("password")}
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                                            label="I want to receive inspiration, marketing promotions and updates via email."
                                        />
                                    </Grid>
                                </Grid>
                                {signUpErrorMessage!=="" && (
                                    <div
                                        className="bg-red-100 rounded-lg mb-3 py-3 px-6 text-sm text-red-700 inline-flex items-center w-full"
                                        role="alert"
                                    >
                                        {signUpErrorMessage}
                                    </div>
                                )}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}