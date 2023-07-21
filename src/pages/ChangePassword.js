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

export function ChangePassword() {

    const user = useSelector(selectUser);
    const [message, setMessage] = useState("");

    const methods = useForm({
        defaultValues: {
            oldPassword : "",
            newPassword : "",
            confirmPassword : ""
        },
    });

    const {
        handleSubmit,
        setValue,
        formState: { errors },
    } = methods;

    const onSubmit = (input) => {
        const data = {
            oldPassword: input.oldPassword,
            newPassword: input.newPassword,
            confirmPassword: input.confirmPassword
        };
        userApi.changPassword(user.userAccountInfor.UserId, data)
            .then((response) => { setMessage(response.message);})
            .catch((err) => console.log(err));
    };

    const fields = useMemo(() => {
        return [
            {
                type: "password",
                fieldProps: {
                    label: "Old Password",
                },
                formProps: {
                    name: "oldPassword",
                    rules: {
                        required: "required",
                    },
                },
                cols: {
                    xs: 12,
                },
            },
            {
                type: "password",
                fieldProps: {
                    label: "New Password",
                },
                formProps: {
                    name: "newPassword",
                    rules: {
                        required: "required",
                    },
                },
                cols: {
                    xs: 12,
                },
            },
            {
                type: "password",
                fieldProps: {
                    label: "Confirm Password",
                },
                formProps: {
                    name: "confirmPassword",
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
                                title="Change Password"
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
                                    Change Password
                                </Button>
                            </CardActions>
                        </Card>
                    </form>
                </FormProvider>
            </Grid>
        </>
    );
}
