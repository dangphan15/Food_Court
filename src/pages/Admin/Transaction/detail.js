import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useMemo, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { AppButton } from "../../../components/Button";
import { AppForm } from "../../../components/Form";
import { setInitForm } from "../../../utils/setInitForm";
import {useGetTransactionById} from "./api/hook";
import {transactionApi} from "../../../api/transactionApi";

export function EditTransaction() {
    const methods = useForm({
        defaultValues: {
            money: 0,
        },
    });
    const navigate = useNavigate();
    const { transId, cardId } = useParams();
    const { data, loading, error } = useGetTransactionById(transId);
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
                    name: "money",
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

    const [trans, setTrans] = useState({
        money: data.money,
        orderId: data.orderId,
        walletId: data.walletId,
        transactionCounterId: data.transactionCounterId,
    });

    //handleSubmit update it
    const onSubmit = (values) => {
        trans.money = values.money;
        trans.orderId = data.orderId;
        trans.walletId = data.walletId;
        trans.transactionCounterId = data.transactionCounterId;
        console.log(trans);
        transactionApi.updateTransaction(transId, trans)
            .then(() => navigate(`/trans`))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (data) {
            console.log(data);
            setInitForm(
                data,
                ["money"],
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
                                    Edit Transaction
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
