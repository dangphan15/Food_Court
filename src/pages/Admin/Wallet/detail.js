import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useMemo, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { AppButton } from "../../../components/Button";
import { AppForm } from "../../../components/Form";
import { setInitForm } from "../../../utils/setInitForm";
import {useGetWallets, useGetWalletById} from "./api/hook";
import {walletApi} from "../../../api/walletApi";

export function EditWallet() {
    const methods = useForm({
        defaultValues: {
            remainder: 0,
        },
    });
    const navigate = useNavigate();
    const { walletId, cardId } = useParams();
    const { data, loading, error } = useGetWalletById(walletId);
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
                    label: "Remainder",
                },
                formProps: {
                    name: "remainder",
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

    const [wallet, setWallet] = useState({
        remainder: data.remainder,
        cardId: data.cardId,
    });

    //handleSubmit update it
    const onSubmit = (values) => {
        wallet.remainder = values.remainder;
        wallet.cardId = cardId;
        console.log(wallet);
        walletApi.updateWallet(walletId, wallet)
            .then(() => navigate(`/cards/${cardId}/wallets`))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (data) {
            console.log(data);
            setInitForm(
                data,
                ["remainder"],
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
                                    Edit Wallet
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
