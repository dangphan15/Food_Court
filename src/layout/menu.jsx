import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

// Move the contents inside a functional component
const MainListItems = () => {
    const user = useSelector(selectUser);

    return (
        <React.Fragment>
            <ListItemButton href={"/shops"}>
                <ListItemIcon>
                    <StorefrontIcon />
                </ListItemIcon>
                <ListItemText primary="Shop" />
            </ListItemButton>
            {user.userAccountInfor.Role === "Admin" &&
                <>
                    <ListItemButton href={"/orders"}>
                        <ListItemIcon>
                            <ReceiptLongIcon />
                        </ListItemIcon>
                        <ListItemText primary="Order" />
                    </ListItemButton>
                    <ListItemButton href={"/transCounters"}>
                        <ListItemIcon>
                            <AccountBalanceIcon />
                        </ListItemIcon>
                        <ListItemText primary="Transaction Counter" />
                    </ListItemButton>
                    <ListItemButton href={"/trans"}>
                        <ListItemIcon>
                            <ReceiptLongIcon />
                        </ListItemIcon>
                        <ListItemText primary="Transaction" />
                    </ListItemButton>
                    <ListItemButton href={"/cards"}>
                        <ListItemIcon>
                            <CreditCardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Card" />
                    </ListItemButton>
                    <ListItemButton href={"/users"}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="User" />
                    </ListItemButton>
                </>
            }
        </React.Fragment>
    );
};

const SecondaryListItems = () => {
    return (
        <React.Fragment>
            {/*<ListSubheader component="div" inset>*/}
            {/*    Dashboard*/}
            {/*</ListSubheader>*/}
            <ListItemButton href={"/dashboard"}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
        </React.Fragment>
    );
};

export { MainListItems, SecondaryListItems };