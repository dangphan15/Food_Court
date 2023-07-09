import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AppButton } from "../../../components/Button";
import { AppForm, FIELD_TYPES } from "../../../components/Form";
import { shopApi } from "../../../api/shopApi";
import { useNavigate } from "react-router-dom";
import {getOptions} from "../../../utils/getOptions";


export function CreateShop() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {},
  });

  const { handleSubmit, setValue } = methods;

  const locations = [
    { location: 'VN', label: 'VN' },
    { location: 'UK', label: 'UK' },
    { location: 'US', label: 'US' },
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

      {
        type: "select",
        fieldProps: {
          options: getOptions(locations || []),
          label: "Location",
        },
        formProps: {
          name: "location",
          defaultValue: "",
        },
        cols: {
          xs: 12,
        },
      },

    ];
  }, []);

  const onSubmit = (values) => {
    const data = {
      email : values.email,
      userName : values.userName,
      password : values.password,
      shopName : values.shopName,
      location : values.location
    };
    shopApi
      .addShop(data)
      .then((res) => navigate("/shops"))
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
                  Create Shop
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
