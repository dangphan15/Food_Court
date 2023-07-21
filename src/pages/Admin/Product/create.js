import { Box, Paper, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AppButton } from "../../../components/Button";
import { AppForm, FIELD_TYPES } from "../../../components/Form";
import { productApi } from "../../../api/productApi";
import {useNavigate, useParams} from "react-router-dom";


export function CreateProduct() {
    const navigate = useNavigate();
    const { shopId, shopCateId } = useParams();
    const methods = useForm({
        defaultValues: {},
    });

    const { handleSubmit, setValue } = methods;
    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");

    const uploadImage = (i) => {
        const data = new FormData()
        data.append("file", i.urlImage)
        console.log(i.urlImage);
        data.append("upload_preset", "zgq4mlru")
        data.append("cloud_name","di7yhx8nt")
        fetch("https://api.cloudinary.com/v1_1/di7yhx8nt/image/upload",{
            method:"post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                const product = {
                    name : i.name,
                    price : i.price,
                    urlImage: data.public_id,
                    shopCategoryId : shopCateId,
                };
                //const myImage = new CloudinaryImage(url, {cloudName: 'di7yhx8nt'}).resize(fill().width(300).height(300));
                console.log(product);
                productApi
                    .addProduct(product)
                    .then((res) => navigate(`/shops/${shopId}/categories/${shopCateId}/products`))
                    .catch((err) => console.log(err));
            })
            .catch(err => console.log(err))
    }


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
                type: FIELD_TYPES.UPLOAD,
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


    const onSubmit = (values) => {
        uploadImage(values)
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
                                    Create Product
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
