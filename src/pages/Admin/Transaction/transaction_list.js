import {Box, FormControlLabel, Grid, Paper, Typography} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import { useNavigate } from "react-router-dom";
import AppTable from "../../../components/Table";
import { useGetTransactions } from "./api/hook";
import { AppButton } from "../../../components/Button";
import Swal from "sweetalert2";
import Switch from "@mui/material/Switch";
import {transactionApi} from "../../../api/transactionApi";
import {transactionCounterApi} from "../../../api/transactionCounterApi";

export function TransactionList() {
    const { data, error, loading } = useGetTransactions();
    const navigate = useNavigate();

    const CellSwitch = ({ value, row }) => {
        const [isChecked, setIsChecked] = useState(!value)
        const handleChange = (e) => {
            const id = row.transactionId;
            const newChecked = e.target.checked;
            Swal.fire({
                title: " Active item",
                text: "Do you want to to active item?",
                showCancelButton: true,
                cancelButtonText: "Cancel",
                confirmButtonText: "OK",
            }).then((result) => {
                if(result.isConfirmed){
                    transactionApi.approachTransaction(id,1)
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
                        disabled={isChecked}
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

    const RenderCellComponent = ({ value }) => {
        const [transCounter, setTransCounter] = useState(null);

        useEffect(() => {
            const fetchTransactionCounter = async () => {
                try {
                    const counter = await transactionCounterApi.getTransactionCounterById(
                        value
                    );
                    console.log(counter);
                    setTransCounter(counter);
                } catch (error) {
                    console.error("Error fetching transaction counter:", error);
                }
            };

            fetchTransactionCounter();
        }, [value]);

        if (!transCounter) {
            // You can return a loading state or placeholder here while waiting for the data to load
            return <div>Loading...</div>;
        }

        return (
            <>
                <AppButton
                    onClick={(e) => {
                        navigate(`/transCounters/edit/${value}`);
                        e.stopPropagation();
                    }}
                    style={{ textTransform: "capitalize" }}
                >
                    {/* Render the content based on the fetched transCounter */}
                    {transCounter.result.transactionCounterName}
                </AppButton>
            </>
        );
    };

    const columns = useMemo(() => {
        return [
            { field: "money", headerName: "Money", width: 100 },
            {
                field: "orderId",
                headerName: "Order Id",
                width: 200,
                renderCell: ({ value }) => {
                    return (
                        <>
                            <AppButton
                                onClick={(e) => {
                                    // navigate(`/shops/edit/${value}`);
                                    e.stopPropagation();
                                }}
                                style={{ textTransform: "capitalize" }}
                            >
                                ${value}
                            </AppButton>
                        </>
                    );
                },},
            {
                field: "walletId",
                headerName: "Wallet Id",
                width: 200,
            },
            {
                field: "transactionCounterId",
                headerName: "Transaction Counter",
                width: 200,
                renderCell: RenderCellComponent,
            },
            {
                field: "TransactionStatus",
                headerName: "Status",
                width: 200,
                renderCell: ({ value, row }) => {
                    return <CellSwitch value={value} row={row} />;
                }
            },
            {
                field: "transactionId",
                headerName: "",
                width: 200,
                renderCell: ({ value }) => {
                    return (
                        <>
                            <AppButton
                                onClick={(e) => {
                                    navigate(`/trans/edit/${value}`);
                                    e.stopPropagation();
                                }}
                                style={{ textTransform: "capitalize" }}
                            >
                                Edit
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
                        <Typography variant="h5">Manage Transaction</Typography>
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
                        getRowId={(row) => row.transactionId}
                    />
                </Paper>
            </Grid>
        </>
    );
}
