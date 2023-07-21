import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AppButton } from "../../../components/Button";
import { AppForm, FIELD_TYPES } from "../../../components/Form";
import { shopApi } from "../../../api/shopApi";
import { useNavigate } from "react-router-dom";
import {getOptions} from "../../../utils/getOptions";
import {userApi} from "../../../api/userApi";


export function CreateUser() {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const methods = useForm({
        defaultValues: {},
    });

    const { handleSubmit, setValue } = methods;

    const fields = useMemo(() => {
        return [
            {
                type: "text",
                fieldProps: {
                    label: "User Name",
                },
                formProps: {
                    name: "userName",
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
                    label: "Email",
                },
                formProps: {
                    name: "email",
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
                    label: "Password",
                },
                formProps: {
                    name: "password",
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

    const onSubmit = (values) => {
        const data = {
            email : values.email,
            userName : values.userName,
            password : values.password,
        };
        userApi
            .register(data)
            .then((res) => navigate("/users"))
            .catch((err) => console.log(err));
    };
    return (
        <Paper sx={{ padding: "24px", marginBottom: "50px" }}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box display={"flex"} justifyContent={"center"}>
                        <Box width="100%" paddingLeft="24px" marginTop={"24px"}>
                            <Box display={"flex"} justifyContent="flex-start">
                                <Typography
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: "32px",
                                        paddingBottom: "24px",
                                        color: "var(--bs-secondary)",
                                    }}
                                >
                                    Create User
                                </Typography>
                            </Box>
                            <AppForm fields={fields} />
                            <Box display={"flex"} justifyContent="flex-end">
                                <AppButton
                                    type="submit"
                                    variant="outlined"
                                    style={{ marginBlock: "24px" }}
                                >
                                    Create
                                </AppButton>
                            </Box>
                        </Box>
                    </Box>
                </form>
            </FormProvider>
        </Paper>
    );
}
