import {Box, FormControlLabel, Grid, Paper, Typography} from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppTable from "../../../components/Table";
import { useGetOrders } from "./api/hook";
import { AppButton } from "../../../components/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Swal from "sweetalert2";
import Switch from "@mui/material/Switch";
import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS} from "../../../features/user/userSlice";
import {userApi} from "../../../api/userApi";
import {orderApi} from "../../../api/orderApi";

export function OrderList() {
    const { data, error, loading } = useGetOrders();
    const navigate = useNavigate();

    // const CellSwitch = ({ value, row }) => {
    //     const [isChecked, setIsChecked] = useState(!value)
    //     const handleChange = (e) => {
    //         const id = row.id;
    //         const newChecked = e.target.checked;
    //         Swal.fire({
    //             title: " Active item",
    //             text: "Do you want to to active item?",
    //             showCancelButton: true,
    //             cancelButtonText: "Cancel",
    //             confirmButtonText: "OK",
    //         }).then((result) => {
    //             if(result.isConfirmed){
    //                 order.approachTransaction(id,1)
    //                     .then(() => {
    //                         setIsChecked(newChecked);
    //                     })
    //                     .catch((err) => console.log(err));
    //             }
    //             else {
    //                 setIsChecked(!newChecked);
    //             }
    //         });
    //     };

    //     return (
    //         <FormControlLabel
    //             control={
    //                 <Switch
    //                     checked={isChecked}
    //                     disabled={isChecked}
    //                     onChange={handleChange}
    //                 />
    //             }
    //             label={
    //                 <Typography
    //                     style={{
    //                         fontSize: "15px",
    //                         color: isChecked === true ? "black" : "red"
    //                     }}
    //                 >
    //                     {isChecked === true ? "active" : "inactive"}
    //                 </Typography>
    //             }
    //         />
    //     );
    // };
    const handleApprove = (value) => {
        console.log(value);
        Swal.fire({
            title: " Approve item",
            text: "Do you want to to approve item?",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "OK",
        }).then((result) => {
            if(result.isConfirmed){
                orderApi.approveOrder(value)
                    .then(() => {
                        // Perform any necessary actions after rejection
                        window.location.reload(); // Refresh the page
                    })
                    .catch((err) => console.log(err));
            }
        });
    };

    const handleReject = (value) => {
        console.log(value);
        Swal.fire({
            title: " Reject item",
            text: "Do you want to to reject item?",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "OK",
        }).then((result) => {
            if(result.isConfirmed){
                orderApi.rejectOrder(value)
                    .then(() => {
                        // Perform any necessary actions after rejection
                        window.location.reload(); // Refresh the page
                    })
                    .catch((err) => console.log(err));
            }
        });
    };
    const columns = useMemo(() => {
        return [
            { field: "totalAmount", headerName: "Total Amount", width: 100 },
            { field: "orderDate", headerName: "Order Date", width: 100 },
            {
                field: "cardId",
                headerName: "Card Id",
                width: 200,
                renderCell: ({ value }) => {
                    return (
                        <>
                            <AppButton
                                onClick={(e) => {
                                    navigate(`/cards/edit/${value}`);
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
            {
                field: "orderStatus",
                headerName: "Status",
                width: 100,
                renderCell: ({ value, row }) => {
                    return (
                        <>
                            {value === 2 &&
                                    <Typography>
                                        Pending
                                    </Typography>
                            }
                            {value === 0 &&
                                <Typography>
                                    Success
                                </Typography>
                            }
                            {value === 1 &&
                                <Typography>
                                    Fail
                                </Typography>
                            }
                        </>
                    );
                }
            },
            {
                field: "",
                headerName: "Action",
                width: 250,
                renderCell: ({ row }) => {
                    return (
                        <>
                            {row.orderStatus === 2 &&
                                <>
                                    <AppButton
                                        onClick={() => handleApprove(row.orderId)}
                                        style={{ textTransform: "capitalize" }}
                                    >
                                        Approve
                                    </AppButton>
                                    <AppButton
                                        onClick={() => handleReject(row.orderId)}
                                        style={{ textTransform: "capitalize" }}
                                    >
                                        Reject
                                    </AppButton>
                                </>
                            }
                        </>
                    );
                },
            },
            {
                field: "orderId",
                headerName: "",
                width: 200,
                renderCell: ({ value }) => {
                    return (
                        <>
                            <AppButton
                                onClick={(e) => {
                                    navigate(`/orders/edit/${value}`);
                                    e.stopPropagation();
                                }}
                                style={{ textTransform: "capitalize" }}
                            >
                                Edit
                            </AppButton>
                            <AppButton
                                onClick={(e) => {
                                    navigate(`${value}/orderDetails`);
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

    const pageSizeOptions = [5, 10, 20];

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });


    // Some API clients return undefined while loading
    // Following lines are here to prevent `rowCountState` from being undefined during the loading


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
                        <Typography variant="h5">Manage Order</Typography>
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
                        rowsPerPageOptions={pageSizeOptions}
                        pageSize={pageSizeOptions[0]}
                        pageSizeOptions={pageSizeOptions}
                        paginationMode="client"
                        onPaginationModelChange={setPaginationModel}
                        paginationTotalRows={data.length}
                        getRowId={(row) => row.orderId}
                    />
                </Paper>
            </Grid>
        </>
    );
}
