import {Box, FormControlLabel, Grid, Paper, Typography} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import AppTable from "../../../components/Table";
import {useGetOrderDetails} from "./api/hook";
import {AppButton} from "../../../components/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Switch from "@mui/material/Switch";
import Swal from "sweetalert2";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {productApi} from "../../../api/productApi";
import {transactionCounterApi} from "../../../api/transactionCounterApi";
import {orderApi} from "../../../api/orderApi";
import {UserEditOrder} from "../Order/detail";

export function UserOrderDetailList() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(4);
    const { orderId } = useParams();
    const { data, error, loading } = useGetOrderDetails(orderId);
    const navigate = useNavigate();

    const RenderCellComponent = ({ value }) => {
        const [product, setProduct] = useState(null);

        useEffect(() => {
            const fetchTransactionCounter = async () => {
                try {
                    const pro = await productApi.getProductById(value);
                    console.log(pro);
                    setProduct(pro);
                } catch (error) {
                    console.error("Error fetching transaction counter:", error);
                }
            };

            fetchTransactionCounter();
        }, [value]);

        if (!product) {
            // You can return a loading state or placeholder here while waiting for the data to load
            return <div>Loading...</div>;
        }

        return (
            <>
                <AppButton
                    onClick={(e) => {
                        navigate(`/orders/edit/${value}`);
                        e.stopPropagation();
                    }}
                    style={{ textTransform: "capitalize" }}
                >
                    {/* Render the content based on the fetched transCounter */}
                    {product.result.name}
                </AppButton>
            </>
        );
    };

    const columns = useMemo(() => {
        return [
            { field: "quantity", headerName: "Quantity", width: 100 },
            {
                field: "productId",
                headerName: "Product",
                width: 200,
                renderCell: RenderCellComponent,
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
                        <Typography variant="h5">Manage Order Detail </Typography>
                    </Box>i
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
                        getRowId={(row) => row.productId}
                    />
                </Paper>
            </Grid>
        </>
    );
}
