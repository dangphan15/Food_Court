import {Box, FormControlLabel, Grid, Paper, Typography} from "@mui/material";
import { useMemo, useState } from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import AppTable from "../../../components/Table";
import {useGetShopCategories} from "./api/hook";
import {AppButton} from "../../../components/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {shopApi} from "../../../api/shopApi";
import Switch from "@mui/material/Switch";
import Swal from "sweetalert2";

export function UserShopCategoryList() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(4);
    const { shopId } = useParams();
    const { data, error, loading } = useGetShopCategories(shopId);
    const navigate = useNavigate();

    const CellSwitch = ({ value, row }) => {
        const [isChecked, setIsChecked] = useState(!value)
        const handleChange = (e) => {
            const shopCategoryId = row.shopCategoryId;
            const newChecked = e.target.checked;
            Swal.fire({
                title: " Delete item",
                text: "Do you wan to to delete item?",
                showCancelButton: true,
                cancelButtonText: "Cancel",
                confirmButtonText: "OK",
            }).then((result) => {
                if(result.isConfirmed){
                    shopApi.deleteShopCate(shopCategoryId)
                        .then(() => {
                            setIsChecked(newChecked);
                        })
                        .catch((err) => console.log(err));
                }
                else {
                    setIsChecked(!newChecked);
                }
            });
        };

        return (
            <FormControlLabel
                control={
                    <Switch
                        checked={isChecked}
                        disabled={!isChecked}
                        onChange={handleChange}
                    />
                }
                label={
                    <Typography
                        style={{
                            fontSize: "15px",
                            color: isChecked === true ? "black" : "red"
                        }}
                    >
                        {isChecked === true ? "active" : "inactive"}
                    </Typography>
                }
            />
        );
    };
    const columns = useMemo(() => {
        return [
            {
                field: "shopId",
                headerName: "Shop ID",
                width: 350,
                renderCell: ({ value }) => {
                    return (
                        <>
                            <AppButton
                                onClick={(e) => {
                                    navigate(`/shops/edit/${value}`);
                                    e.stopPropagation();
                                }}
                                style={{ textTransform: "capitalize" }}
                            >
                                ${value}
                            </AppButton>
                        </>
                    );
                },
            },
            { field: "name", headerName: "Shop Category Name", width: 250 },
            {
                field: "isDeleted",
                headerName: "Status",
                width: 200,
                renderCell: ({ value, row }) => {
                    return <CellSwitch value={value} row={row} />;
                }
            },
            {
                field: "shopCategoryId",
                headerName: "",
                width: 200,
                renderCell: ({ value }) => {
                    return (
                        <>
                            <AppButton
                                onClick={(e) => {
                                    navigate(`/shops/${shopId}/categories/edit/${value}`);
                                    e.stopPropagation();
                                }}
                                style={{ textTransform: "capitalize" }}
                            >
                                Edit
                            </AppButton>
                            <AppButton
                                onClick={(e) => {
                                    navigate(`/shops/${shopId}/categories/${value}/products/`);
                                    e.stopPropagation();
                                }}
                                style={{ textTransform: "capitalize" }}
                            >
                                Detail
                            </AppButton>
                        </>
                    );
                },
            },
        ];
    }, []);

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const pageSizeOptions = [5, 10, 20];

    return (
        <>
            <Grid item variant="outlined" style={{ display: "flex" }}>
                {/* For search & Filter */}
                <Paper
                    sx={{
                        width: "100%",
                        padding: "12px",
                        display: "flex",
                        justifyContent: "space-between",
                        paddingInline: "24px",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Typography variant="h5">Manage Shop Category </Typography>
                    </Box>
                    <Box>
                        <AppButton
                            variant="contained"
                            startIcon={<AddOutlinedIcon />}
                            onClick={() => {
                                navigate(`/shops/${shopId}/categories/create`);
                            }}
                            style={{ textTransform: "capitalize" }}
                        >
                            Create
                        </AppButton>
                    </Box>
                </Paper>
            </Grid>
            <Grid
                item
                sx={{ width: "100%" }}
                variant="outlined"
                style={{ display: "flex" }}
            >
                <Paper
                    sx={{
                        width: "100%",
                        padding: "24px",
                        height: "100%",
                        marginBottom: "60px",
                    }}
                >
                    <AppTable
                        columns={columns}
                        rows={data}
                        {...data}
                        pagination={true}
                        rowCount={data.length}
                        paginationModel={paginationModel}
                        paginationMode="client"
                        paginationModel={paginationModel}
                        rowsPerPageOptions={pageSizeOptions}
                        pageSize={pageSizeOptions[0]}
                        pageSizeOptions={pageSizeOptions}
                        onPaginationModelChange={setPaginationModel}
                        paginationTotalRows={data.length}
                        getRowId={(row) => row.shopCategoryId}
                    />
                </Paper>
            </Grid>
        </>
    );
}
