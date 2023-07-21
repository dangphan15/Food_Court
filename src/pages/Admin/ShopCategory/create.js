import { Box, Paper, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AppButton } from "../../../components/Button";
import { AppForm, } from "../../../components/Form";
import { shopApi } from "../../../api/shopApi";
import {useNavigate, useParams} from "react-router-dom";


export function CreateShopCategory() {
    const navigate = useNavigate();
    const { shopId } = useParams();
    const methods = useForm({
        defaultValues: {},
    });

    const { handleSubmit, setValue } = methods;

    const fields = useMemo(() => {
        return [
            {
                type: "text",
                fieldProps: {
                    label: "Shop Category Name",
                },
                formProps: {
                    name: "name",
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
            name : values.name,
            shopId : shopId,
        };
        shopApi
            .addShopCate(data)
            .then((res) => navigate(`/shops/${data.shopId}/categories`))
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
                                    Create Shop Category
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
