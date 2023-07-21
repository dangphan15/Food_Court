import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useMemo, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { AppButton } from "../../../components/Button";
import { AppForm } from "../../../components/Form";
import { setInitForm } from "../../../utils/setInitForm";
import {useGetUserById} from "./api/hook";
import {userApi} from "../../../api/userApi";

export function EditUser() {
    const methods = useForm({
        defaultValues: {
            email : "",
            userName : "",
            creditBalance : "",
            point: 0,
        },
    });
    const navigate = useNavigate();
    const { userId } = useParams();
    const { data, loading, error } = useGetUserById(userId);
    const {
        handleSubmit,
        setValue,
        formState: { errors },
    } = methods;

    const fields = useMemo(() => {
        return [
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
                type: "number",
                fieldProps: {
                    label: "Credit Balance",
                    disabled: true,
                },
                formProps: {
                    name: "creditBalance",
                    rules: {
                        required: "required",
                    },
                },
                cols: {
                    xs: 12,
                },
            },
            {
                type: "number",
                fieldProps: {
                    label: "Point",
                    disabled: true,
                },
                formProps: {
                    name: "point",
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

    const [user, setUser] = useState({
        email: data.email,
        userName: data.userName,
    });

    //handleSubmit update it
    const onSubmit = (values) => {
        user.email = values.email;
        user.userName = values.userName;
        userApi.update(userId, user)
            .then(() => navigate(`/users`))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (data) {
            console.log(data);
            setInitForm(
                data,
                ["email", "userName", "creditBalance", "point"],
                setValue
            );
        }
    }, [data]);

    return (
        <Paper sx={{ padding: "24px", marginBottom: "60px" }}>
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
                                    Edit User
                                </Typography>
                            </Box>
                            <AppForm fields={fields} />

                            <Box display={"flex"} justifyContent="flex-end">
                                <AppButton
                                    type="submit"
                                    variant="outlined"
                                    style={{ marginBlock: "24px" }}
                                >
                                    Edit
                                </AppButton>
                            </Box>
                        </Box>
                    </Box>
                </form>
            </FormProvider>
        </Paper>
    );
}
