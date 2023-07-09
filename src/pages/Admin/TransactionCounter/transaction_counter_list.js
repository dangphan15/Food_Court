import {Box, FormControlLabel, Grid, Paper, Typography} from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppTable from "../../../components/Table";
import { useGetTransactionCounters } from "./api/hook";
import { AppButton } from "../../../components/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Swal from "sweetalert2";
import {productApi} from "../../../api/productApi";
import Switch from "@mui/material/Switch";
import {transactionApi} from "../../../api/transactionApi";
import {transactionCounterApi} from "../../../api/transactionCounterApi";

export function TransactionCounterList() {
    const { data, error, loading } = useGetTransactionCounters();
    const navigate = useNavigate();
    const CellSwitch = ({ value, row }) => {
        const [isChecked, setIsChecked] = useState(!value)
        const handleChange = (e) => {
            const id = row.id;
            const newChecked = e.target.checked;
            Swal.fire({
                title: " Delete item",
                text: "Do you wan to to delete item?",
                showCancelButton: true,
                cancelButtonText: "Cancel",
                confirmButtonText: "OK",
            }).then((result) => {
                if(result.isConfirmed){
                    transactionCounterApi.deleteTransactionCounter(id)
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
            { field: "transactionCounterName", headerName: "Transaction Counter Name", width: 300 },
            { field: "location", headerName: "Location", width: 200 },
            {
                field: "isDeleted",
                headerName: "Status",
                width: 200,
                renderCell: ({ value, row }) => {
                    return <CellSwitch value={value} row={row} />;
                }
            },
            {
                field: "id",
                headerName: "",
                width: 200,
                renderCell: ({ value }) => {
                    return (
                        <>
                            <AppButton
                                onClick={(e) => {
                                    navigate(`/transCounters/edit/${value}`);
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
                        <Typography variant="h5">Manage Transaction Counter </Typography>
                    </Box>
                    <Box>
                        <AppButton
                            variant="contained"
                            startIcon={<AddOutlinedIcon />}
                            onClick={() => {
                                navigate("/transCounters/create");
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
                        rowsPerPageOptions={pageSizeOptions}
                        pageSize={pageSizeOptions[0]}
                        pageSizeOptions={pageSizeOptions}
                        paginationMode="client"
                        onPaginationModelChange={setPaginationModel}
                        paginationTotalRows={data.length}
                        getRowId={(row) => row.id}
                    />
                </Paper>
            </Grid>
        </>
    );
}
