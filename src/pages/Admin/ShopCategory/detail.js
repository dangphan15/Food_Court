import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useMemo, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { AppButton } from "../../../components/Button";
import { AppForm } from "../../../components/Form";
import { setInitForm } from "../../../utils/setInitForm";
import {useGetShopCategories, useGetShopCategoriesByCateId} from "./api/hook";
import {shopApi} from "../../../api/shopApi";

export function EditShopCategory() {
    const methods = useForm({
        defaultValues: {
            name: "",
        },
    });
    const navigate = useNavigate();
    const { shopCateId, shopId } = useParams();
    const { data, loading, error } = useGetShopCategoriesByCateId(shopCateId);
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

    const [shopCate, setShopCate] = useState({
        name: data.name,
        shopId: data.shopId,
    });

    //handleSubmit update it
    const onSubmit = (values) => {
        shopCate.name = values.name;
        shopCate.shopId = data.shopId;
        console.log(shopCate);
        shopApi.updateShopCate(shopCateId, shopCate)
            .then(() => navigate(`/shops/${shopCate.shopId}/categories`))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (data) {
            console.log(data);
            setInitForm(
                data,
                ["name"],
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
                                    Edit Shop Category
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
