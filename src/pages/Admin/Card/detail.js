import { Box, Paper, Typography } from "@mui/material";
import { useMemo, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { AppButton } from "../../../components/Button";
import {AppForm, FIELD_TYPES} from "../../../components/Form";
import { setInitForm } from "../../../utils/setInitForm";
import { useGetCardById } from "./api/hook";
import {getOptions} from "../../../utils/getOptions";
import {cardTypeApi} from "../../../api/cardTypeApi";

export function EditCard() {
    const methods = useForm({
        defaultValues: {
            cardNumber: "",
            securityCode: "",
            expirationDate:"",
        },
    });
    const navigate = useNavigate();
    const { cardId } = useParams();
    const { data, loading, error } = useGetCardById(cardId);
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
                type: FIELD_TYPES.DATE,
                fieldProps: {
                    label: "Expiration Date",
                },
                formProps: {
                    name: "expirationDate",
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

    //handleSubmit update it
    const onSubmit = (values) => {
        const data = {
            cardNumber: values.cardNumber,
            securityCode: values.securityCode,
            points:values.points,
            expirationDate:values.expirationDate,
        };
        console.log(data);
        cardTypeApi.updateCard(cardId, data)
            .then(() => navigate("/cards"))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (data) {
            console.log(cardId);
            console.log(data);
            setInitForm(
                data,
                ["cardNumber", "securityCode", "points", "expirationDate"],
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
                                    Edit Card
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
