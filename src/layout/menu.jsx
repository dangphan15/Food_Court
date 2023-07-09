import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton href={"/shops"}>
            <ListItemIcon>
                <StorefrontIcon />
            </ListItemIcon>
            <ListItemText primary="Shop" />
        </ListItemButton>
        <ListItemButton href={"/transCounters"}>
            <ListItemIcon>
                <AccountBalanceIcon/>
            </ListItemIcon>
            <ListItemText primary="Transaction Counter" />
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
    </React.Fragment>
);