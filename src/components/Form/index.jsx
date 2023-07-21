import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
// import { InputImageList } from "../ImageList";

const renderTextField = ({ fieldProps, controllerProps }) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field }) => {
        return <TextField fullWidth {...field} {...fieldProps} />;
      }}
    />
  );
};

const renderPassword = ({ fieldProps, controllerProps }) => {
    return (
        <Controller
            {...controllerProps}
            render={({ field }) => {
                return <TextField type={"password"} fullWidth {...field} {...fieldProps} />;
            }}
        />
    );
};

const renderNumber = ({ fieldProps, controllerProps }) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field }) => {
        return (
          <TextField type={"number"} fullWidth {...field} {...fieldProps} disabled={fieldProps.disabled} />
        );
      }}
    />
  );
};

const renderDate = ({ fieldProps, controllerProps }) => {
    return (
        <Controller
            {...controllerProps}
            render={({ field }) => {
                return (
                    <TextField type={"datetime-local"} fullWidth {...field} {...fieldProps} />
                );
            }}
        />
    );
};

const renderMultiline = ({ fieldProps, controllerProps }) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field }) => {
        return (
          <TextField multiline rows={6} fullWidth {...field} {...fieldProps} />
        );
      }}
    />
  );
};

const renderLargeMultiline = ({ fieldProps, controllerProps }) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field }) => {
        return (
          <TextField multiline rows={20} fullWidth {...field} {...fieldProps} />
        );
      }}
    />
  );
};

const renderSelect = ({ fieldProps, controllerProps }) => {
  const { options, ...restFieldProps } = fieldProps;

  return (
    <Controller
      {...controllerProps}
      render={({ field }) => {
        return (
          <FormControl fullWidth label={restFieldProps.label}>
            <InputLabel
              style={{
                color: restFieldProps?.error
                  ? "var(--bs-danger)"
                  : "var(--bs-gray)",
              }}
            >
              {restFieldProps.label}
            </InputLabel>
            <Select {...field} {...restFieldProps}>
              {Boolean(options) && options.length !== 0 ? (
                options.map((option, index) => {
                  return (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem disabled>No Items Found</MenuItem>
              )}
            </Select>
            {restFieldProps?.helperText && (
              <FormHelperText
                style={{ color: "var(--bs-danger)" }}
                id="my-helper-text"
              >
                {restFieldProps?.helperText}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

const renderAutoComplete = ({ fieldProps, controllerProps }) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field }) => {
        return <Autocomplete fullWidth {...field} {...fieldProps} />;
      }}
    />
  );
};

const renderUpload = ({ fieldProps, controllerProps }) => {
  const { setValue, ...restFieldProps } = fieldProps;
  let img = ""
  return (
    <Controller
      {...controllerProps}
      render={({ field: { onChange, value, ...rest } }) => {
        const handleChange = ({ target }) => {
          //Maybe call process upload or set directory files
          setValue(controllerProps.name, target.files[0]);
             var i = document.getElementById("imgC");
            const file = target.files[0];
            const url = URL.createObjectURL(file);
             i.src = url;
        };
        return (
          <FormControl fullWidth label={restFieldProps.label}>
            <InputLabel
              style={{
                color: restFieldProps?.error
                  ? "var(--bs-danger)"
                  : "var(--bs-gray)",
              }}
            >
              {restFieldProps.label}
            </InputLabel>
            <TextField
              type="file"
              onChange={handleChange}
              {...rest}
              {...fieldProps}
            />
              <br />
              <img  id="imgC" loading="lazy"
                    style={{width: "500px",height: "500px"}}
                    onerror="this.src='https://i.ibb.co/8sQwx76/images-q-tbn-ANd9-Gc-TE3ogc-Suv-DVe-N1iwin1a-Tlbrk2-QXSKYv-Vz7t-Sn0-LV9k7h2-L-FPu-Pndu-Ow-HIE8jc3-L.png'"/>
          </FormControl>
        );
      }}
    />
  );
};

const renderUploadImage = ({ fieldProps, controllerProps }) => {
  const { setValue, images, setListImages, title, max, ...restFieldProps } =
    fieldProps;
  return (
      <Controller
          {...controllerProps}
          render={({ field }) => {
              return <TextField type={"file"} fullWidth {...field} {...fieldProps} />;
          }}
      />
  );
};

export const FIELD_TYPES = {
  TEXT: "text",
    PASSWORD: "password",
  SELECT: "select",
  AUTOCOMPLETE: "autocomplete",
  UPLOAD: "upload",
  MULTILINE: "multiline",
  LARGE_MULTILINE: "large_multiline",
  NUMBER: "number",
  DATE: "date",
  IMAGE_UPLOAD: "image_upload",
};

const FORM_MAPPING = {
  [FIELD_TYPES.TEXT]: renderTextField,
    [FIELD_TYPES.PASSWORD]: renderPassword,
  [FIELD_TYPES.MULTILINE]: renderMultiline,
  [FIELD_TYPES.SELECT]: renderSelect,
  [FIELD_TYPES.AUTOCOMPLETE]: renderAutoComplete,
  [FIELD_TYPES.UPLOAD]: renderUpload,
  [FIELD_TYPES.LARGE_MULTILINE]: renderLargeMultiline,
  [FIELD_TYPES.NUMBER]: renderNumber,
  [FIELD_TYPES.DATE]: renderDate,
  [FIELD_TYPES.IMAGE_UPLOAD]: renderUploadImage,
};

export const AppForm = ({ fields }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container spacing={"24px"}>
      {fields.map(({ type, cols, fieldProps, formProps }, index) => {
        const controllerProps = { control, ...formProps };
        const isError = formProps.name in errors;
        const helperText = isError ? errors[formProps.name]?.message : "";

        return (
          <Grid item {...cols} key={index}>
            {FORM_MAPPING[type]({
              fieldProps: { ...fieldProps, helperText, error: isError },
              controllerProps,
              errors,
            })}
          </Grid>
        );
      })}
    </Grid>
  );
};
