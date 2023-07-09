import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useMemo, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { AppButton } from "../../../components/Button";
import {AppForm, FIELD_TYPES} from "../../../components/Form";
import { setInitForm } from "../../../utils/setInitForm";
import { useGetProducts, useGetProducByProdctId} from "./api/hook";
import { productApi } from "../../../api/productApi";

export function EditProduct() {
    const methods = useForm({
        defaultValues: {
            name: "",
            price: 0,
            urlImage: "",
        },
    });
    const navigate = useNavigate();
    const { shopId, shopCateId, productId } = useParams();
    const { data, loading, error } = useGetProducByProdctId(productId);

    const {
        handleSubmit,
        setValue,
        formState: { errors },
    } = methods;

    const [image, setImage] = useState();

    const fields = useMemo(() => {
                            return [
                                {
                                    type: "text",
                                    fieldProps: {
                                        label: "Product Name",
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

            {
                type: "number",
                fieldProps: {
                    label: "Price",
                },
                formProps: {
                    name: "price",
                    rules: {
                        required: "required",
                        validate: (value) => {
                            const basePriceRule = +value <= 0;
                            if (basePriceRule) {
                                return "Price must > 0!";
                            }
                        },
                    },
                },
                cols: {
                    xs: 12,
                },
            },

            {
                type: "image_upload",
                fieldProps: {
                    image: image,
                    title: "Image",
                    max: 5,
                    setImage: setImage,
                    setValue: setValue,
                },
                formProps: {
                    name: "urlImage",
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
            name : values.name,
            price : values.price,
            urlImage: image,
            shopCategoryId : shopCateId,
        };
        console.log(data);
        productApi.updateProduct(productId, data)
            .then(() => navigate(`/shops/${shopId}/categories/${shopCateId}/products/`))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (data) {
            setImage(data.urlImage);
            console.log(data);
            setInitForm(
                data,
                [
                    "name",
                    "price",
                    "urlImage",
                ],
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
                                    Edit Product
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
