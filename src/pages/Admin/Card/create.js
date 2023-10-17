import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AppButton } from "../../../components/Button";
import { AppForm, FIELD_TYPES } from "../../../components/Form";
import { shopApi } from "../../../api/shopApi";
import { useNavigate } from "react-router-dom";
import {getOptions} from "../../../utils/getOptions";
import {transactionCounterApi} from "../../../api/transactionCounterApi";
import {cardTypeApi} from "../../../api/cardTypeApi";


export function CreateCard() {
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
                    label: "Card Number",
                },
                formProps: {
                    name: "cardNumber",
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
                    label: "Security Code",
                },
                formProps: {
                    name: "securityCode",
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
                    label: "Card Type Id",
                },
                formProps: {
                    name: "cardTypeId",
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
            cardNumber: values.cardNumber,
            securityCode: values.securityCode,
            cardTypeId: values.cardTypeId,
        };
        console.log(data);
        cardTypeApi.addCart(data)
            .then(() => navigate("/cards"))
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
                                    Create Card
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
