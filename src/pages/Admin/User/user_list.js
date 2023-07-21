import {Box, FormControlLabel, Grid, Paper, Typography} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import { useNavigate } from "react-router-dom";
import AppTable from "../../../components/Table";
import { useGetUsers } from "./api/hook";
import { AppButton } from "../../../components/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export function UserList() {
    const { data, error, loading } = useGetUsers();
    const navigate = useNavigate();

    const columns = useMemo(() => {
        return [
            { field: "email", headerName: "Email", width: 150 },
            { field: "userName", headerName: "User Name", width: 100 },
            {
                field: "creditBalance",
                headerName: "Credit Balance",
                width: 100,
            },
            {
                field: "point",
                headerName: "Point",
                width: 100,
            },
            {
                field: "role",
                headerName: "Role",
                width: 200,
                renderCell: ({ value }) => {
                    return (
                        <>
                            {value === 0 && <Typography>Admin</Typography>}
                            {value === 1 && <Typography>User</Typography>}
                        </>
                    );
                },
            },
            {
                field: "userId",
                headerName: "",
                width: 200,
                renderCell: ({ value }) => {
                    return (
                        <>
                            <AppButton
                                onClick={(e) => {
                                    navigate(`/users/edit/${value}`);
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
                        <Typography variant="h5">Manage User</Typography>
                    </Box>
                    <Box>
                        <AppButton
                            variant="contained"
                            startIcon={<AddOutlinedIcon />}
                            onClick={() => {
                                navigate(`/users/create`);
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
                        getRowId={(row) => row.userId}
                    />
                </Paper>
            </Grid>
        </>
    );
}
