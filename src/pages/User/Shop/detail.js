import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useMemo, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { AppButton } from "../../../components/Button";
import { AppForm } from "../../../components/Form";
import { setInitForm } from "../../../utils/setInitForm";
import { useGetShopById } from "./api/hook";
import {shopApi} from "../../../api/shopApi";
import {getOptions} from "../../../utils/getOptions";

export function UserEditShop() {
    const methods = useForm({
        defaultValues: {
            shopName: "",
            location: "",
        },
    });
    const navigate = useNavigate();
    const { shopId } = useParams();
    const { data, loading, error } = useGetShopById(shopId);
    const {
        handleSubmit,
        setValue,
        formState: { errors },
    } = methods;

    const locations = [
        { location: 'VN', label: 'VN' },
        { location: 'UK', label: 'UK' },
        { location: 'US', label: 'US' },
        { location: 'Australia', label: 'Australia' },
    ];
    const fields = useMemo(() => {
        return [

            {
                type: "text",
                fieldProps: {
                    label: "Shop Name",
                },
                formProps: {
                    name: "shopName",
                    rules: {
                        required: "required",
                    },
                },
                cols: {
                    xs: 12,
                },
            },
            //
            // {
            //     type: "text",
            //     fieldProps: {
            //         label: "Location",
            //     },
            //     formProps: {
            //         name: "location",
            //         rules: {
            //             required: "required",
            //         },
            //     },
            //     cols: {
            //         xs: 12,
            //     },
            // },

            {
                type: "select",
                fieldProps: {
                    options: getOptions(locations || []),
                    label: "Location",
                },
                formProps: {
                    name: "location",
                },
                cols: {
                    xs: 12,
                },
            },

        ];
    }, []);

    const [shop, setShop] = useState({
        shopName: data.shopName,
        location: data.location,
    });

    //handleSubmit update it
    const onSubmit = (values) => {
        shop.shopName = values.shopName;
        shop.location =values.location;
        console.log(shop);
        shopApi.updateShop(shopId, shop)
            .then(() => navigate("/shops"))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (data) {
            console.log(shopId);
            console.log(data);
            setInitForm(
                data,
                ["shopName","location"],
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
                                    Edit Shop
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
