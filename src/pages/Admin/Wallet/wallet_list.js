import {Box, FormControlLabel, Grid, Paper, Typography} from "@mui/material";
import { useMemo, useState } from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import AppTable from "../../../components/Table";
import {useGetWallets} from "./api/hook";
import {AppButton} from "../../../components/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {walletApi} from "../../../api/walletApi";
import Switch from "@mui/material/Switch";
import Swal from "sweetalert2";
import BorderColorIcon from '@mui/icons-material/BorderColor';

export function WalletList() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(4);
    const { cardId } = useParams();
    const { data, error, loading } = useGetWallets(cardId);
    const navigate = useNavigate();

    const CellSwitch = ({ value, row }) => {
        const [isChecked, setIsChecked] = useState(!value)
        const handleChange = (e) => {
            const walletId = row.id;
            const newChecked = e.target.checked;
            Swal.fire({
                title: " Active item",
                text: "Do you want to to active item?",
                showCancelButton: true,
                cancelButtonText: "Cancel",
                confirmButtonText: "OK",
            }).then((result) => {
                if(result.isConfirmed){
                    walletApi.approveWallet(walletId)
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
    const columns = useMemo(() => {
        return [
            {
                field: "cardId",
                headerName: "Card ID",
                width: 350,
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
            { field: "remainder", headerName: "Remainder", width: 250 },
            {
                field: "walletStatus",
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
                                    navigate(`/cards/${cardId}/wallets/edit/${value}`);
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
                        <Typography variant="h5">Manage Wallet </Typography>
                    </Box>
                    <Box>
                        <AppButton
                            variant="contained"
                            startIcon={<AddOutlinedIcon />}
                            onClick={() => {
                                navigate(`/cards/${cardId}/wallets/create`);
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
                        getRowId={(row) => row.id}
                    />
                </Paper>
            </Grid>
        </>
    );
}
