import {
    Box, Button,
    Card, CardActions,
    CardContent,
    CardHeader,
    TextField,
    Unstable_Grid2 as Grid
} from '@mui/material';
import Divider from "@mui/material/Divider";
import {useCallback, useEffect, useMemo, useState} from "react";
import {selectUser, USER_REQUEST} from "../features/user/userSlice";
import {userApi} from "../api/userApi";
import {getErrorMessageFromServer} from "../utils/serverUtils";
import {useDispatch, useSelector} from "react-redux";
import {FormProvider, useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {setInitForm} from "../utils/setInitForm";
import {AppForm} from "../components/Form";
import * as React from "react";

export function Profile() {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [signUpErrorMessage, setSignUpErrorMessage] = useState("");

    const [message, setMessage] = useState("");

    const methods = useForm({
        defaultValues: {
            Email : "",
            UserName : "",
        },
    });

    const {
        handleSubmit,
        setValue,
        formState: { errors },
    } = methods;

    const onSubmit = (input) => {
        const data = {
            email: input.Email,
            userName: input.UserName,
        };
        userApi.update(user.userAccountInfor.UserId, data)
            .then((response) => { setMessage(response.message); })
            .catch((err) => console.log(err));
    };

    const fields = useMemo(() => {
        return [
            {
                type: "text",
                fieldProps: {
                    label: "Email",
                },
                formProps: {
                    name: "Email",
                    rules: {
                        required: "required",
                    },
                },
                cols: {
                    xs: 12,
                },
            },
            {
                type: "text",
                fieldProps: {
                    label: "User Name",
                },
                formProps: {
                    name: "UserName",
                    rules: {
                        required: "required",
                    },
                },
                cols: {
                    xs: 12,
                },
            },

        ];
    }, []);

    useEffect(() => {
        if (user.userAccountInfor) {
            console.log(user.userAccountInfor);
            setInitForm(
                user.userAccountInfor,
                ["Email", "UserName",],
                setValue
            );
        }
    }, [user.userAccountInfor]);
    return (
        <>
            <Grid
                item
                sx={{ width: "100%" }}
                variant="outlined"
                style={{ display: "flex" }}
            >
                <FormProvider {...methods}>
                    <form
                        autoComplete="off"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        style={{width: "100%"}}
                    >
                        <Card sx={{p:6}}>
                            <CardHeader
                                subheader="The information can be edited"
                                title="Profile"
                            />
                            <CardContent sx={{ pt: 0 }}>
                                <Box sx={{ mt: 6, mb: 6 }}>
                                    <Grid
                                        container
                                        spacing={3}
                                    >
                                        <AppForm fields={fields} />
                                        {/*<Grid*/}
                                        {/*    xs={12}*/}
                                        {/*    md={12}*/}
                                        {/*>*/}
                                        {/*    <TextField*/}
                                        {/*        type={"password"}*/}
                                        {/*        fullWidth*/}
                                        {/*        label="Password"*/}
                                        {/*        name="password"*/}
                                        {/*        placeholder={"**********"}*/}
                                        {/*        required*/}
                                        {/*        value={"123"}*/}
                                        {/*    />*/}
                                        {/*</Grid>*/}
                                    </Grid>
                                </Box>
                            </CardContent>
                            <Divider />
                            {message!=="" && (
                                <div
                                    className="bg-info rounded-lg mb-3 py-3 px-6 text-sm text-info-700 inline-flex items-center w-full"
                                    role="alert"
                                >
                                    {message}!!!
                                </div>
                            )}
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <Button type="submit" variant="contained">
                                    Save details
                                </Button>
                            </CardActions>
                        </Card>
                    </form>
                </FormProvider>
            </Grid>
        </>
    );
}
