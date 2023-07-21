import {Box, FormControlLabel, Grid, Paper, Typography} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import { useNavigate } from "react-router-dom";
import AppTable from "../../../components/Table";
import { useGetCards } from "./api/hook";
import { AppButton } from "../../../components/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Swal from "sweetalert2";
import Switch from "@mui/material/Switch";
import {transactionCounterApi} from "../../../api/transactionCounterApi";
import {cardTypeApi} from "../../../api/cardTypeApi";
import {shopApi} from "../../../api/shopApi";
import {CloudinaryImage} from "@cloudinary/url-gen";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {AdvancedImage} from "@cloudinary/react";

export function CardList() {
    const { data, error, loading } = useGetCards();
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
                    cardTypeApi.deleteCard(id)
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

    const RenderCellComponent = ({ value }) => {
        const [cardType, setCardType] = useState(null);
        const [myImage, setMyImage] = useState();
        useEffect(() => {
            const fetchTransactionCounter = async () => {
                try {
                    const pro = await cardTypeApi.getCardTypeById(value);
                    console.log(pro);
                    setMyImage(new CloudinaryImage(pro.result.avatar, {cloudName: 'di7yhx8nt'}).resize(fill().width(50).height(50)));
                } catch (error) {
                    console.error("Error fetching transaction counter:", error);
                }
            };

            fetchTransactionCounter();
        }, [value]);

        if (!myImage) {
            // You can return a loading state or placeholder here while waiting for the data to load
            return <div>Loading...</div>;
        }

        return (
            <>
                <AdvancedImage cldImg={myImage} />
            </>
        );
    };
    const columns = useMemo(() => {
        return [
            { field: "cardNumber", headerName: "Card Number", width: 150},
            { field: "securityCode", headerName: "Security Code", width: 120 },
            { field: "expirationDate", headerName: "Expiration Date", width: 200 },
            {
                field: "cardTypeId",
                headerName: "Rank",
                width: 100 ,
                renderCell: RenderCellComponent,
            },
            {
                field: "isDeleted",
                headerName: "Status",
                width: 150,
                renderCell: ({ value, row }) => {
                    return <CellSwitch value={value} row={row} />;
                }
            },
            {
                field: "id",
                headerName: "",
                width: 150,
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
                                Edit
                            </AppButton>
                            <AppButton
                                onClick={(e) => {
                                    navigate(`/cards/${value}/wallets`);
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
                        <Typography variant="h5">Manage Card </Typography>
                    </Box>
                    <Box>
                        <AppButton
                            variant="contained"
                            startIcon={<AddOutlinedIcon />}
                            onClick={() => {
                                navigate("/cards/create");
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
