import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useMemo, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { AppButton } from "../../../components/Button";
import {AppForm, FIELD_TYPES} from "../../../components/Form";
import { setInitForm } from "../../../utils/setInitForm";
import {useGetOrderById} from "./api/hook";
import {orderApi} from "../../../api/orderApi";

export function EditOrder() {
    const methods = useForm({
        defaultValues: {
            totalAmount: 0,
            orderDate: "",
        },
    });
    const navigate = useNavigate();
    const { orderId } = useParams();
    const { data, loading, error } = useGetOrderById(orderId);
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
                    label: "Money",
                },
                formProps: {
                    name: "totalAmount",
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
                    label: "Order Date",
                },
                formProps: {
                    name: "orderDate",
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

    const [order, setOrder] = useState({
        totalAmount: data.totalAmount,
        cardId: data.cardId,
        orderDate: data.orderDate,
    });

    //handleSubmit update it
    const onSubmit = (values) => {
        order.totalAmount = values.totalAmount;
        order.cardId = data.cardId;
        order.orderDate = values.orderDate;
        console.log(order);
        orderApi.updateOrder(orderId, order)
            .then(() => navigate(`/orders`))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (data) {
            console.log(data);
            setInitForm(
                data,
                ["totalAmount","orderDate"],
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
                                    Edit Order
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
