import React from 'react';
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import { theme } from "./assets/theme";
import Header from './components/Header';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import {ShopList} from "./pages/Admin/Shop/shop-list";
import {ShopCategoryList} from "./pages/Admin/ShopCategory/shop_categories_list";
import {CreateShopCategory} from "./pages/Admin/ShopCategory/create";
import {EditShopCategory} from "./pages/Admin/ShopCategory/detail";
import {EditShop} from "./pages/Admin/Shop/detail";
import {CreateShop} from "./pages/Admin/Shop/create";
import {useSelector} from "react-redux";
import './css/main.css';
import './css/normalize.css';
import './css/sb-admin-2.css';
import './css/sb-admin-2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./pages/Login";
import {Product_list} from "./pages/Admin/Product/product_list";
import {EditProduct} from "./pages/Admin/Product/detail";
import {CreateProduct} from "./pages/Admin/Product/create";
import {TransactionCounterList} from "./pages/Admin/TransactionCounter/transaction_counter_list";
import {EditTransactionCounter} from "./pages/Admin/TransactionCounter/detail";
import {CreateTransactionCounter} from "./pages/Admin/TransactionCounter/create";
import {CardList} from "./pages/Admin/Card/card_list";
import {EditCard} from "./pages/Admin/Card/detail";
import {CreateCard} from "./pages/Admin/Card/create";
import {selectUser} from "./features/user/userSlice";
import {WalletList} from "./pages/Admin/Wallet/wallet_list";
import {EditWallet} from "./pages/Admin/Wallet/detail";
import {CreateWallet} from "./pages/Admin/Wallet/create";
import {ThemeProvider} from "@mui/material/styles";
import AdminLayout from "./layout/AdminLayout";

function App() {
    const userAccount = useSelector(selectUser);
    console.log(userAccount)
    return (
        <ThemeProvider theme={theme}>
        <BrowserRouter>
            {!userAccount.token? (
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            ):(
                // <div id="wrapper">
                //     <Navbar/>
                //     <div id="content-wrapper" className="d-flex flex-column">
                //         <div id="content">
                //             <Header/>
                            <Routes>
                                <Route path="/" element={<AdminLayout/>}>
                                    <Route path="" element={<ShopList/>}/>
                                    <Route path="/shops" element={<Outlet/>}>
                                        <Route
                                            path=""
                                            element={<ShopList/>}
                                            index={true}
                                        />
                                        <Route path=":shopId/categories/" element={<Outlet/>}>
                                            <Route
                                                path=""
                                                element={<ShopCategoryList/>}
                                                index={true}
                                            />
                                            <Route path=":shopCateId/products/" element={<Outlet/>}>
                                                <Route
                                                    path=""
                                                    element={<Product_list/>}
                                                    index={true}
                                                />
                                                <Route
                                                    path="edit/:productId"
                                                    element={<EditProduct/>}
                                                    index={true}
                                                />
                                                <Route
                                                    path="create"
                                                    element={<CreateProduct/>}
                                                    index={true}
                                                />
                                            </Route>
                                            <Route
                                                path="edit/:shopCateId"
                                                element={<EditShopCategory/>}
                                                index={true}
                                            />
                                            <Route
                                                path="create"
                                                element={<CreateShopCategory/>}
                                                index={true}
                                            />
                                        </Route>
                                        <Route
                                            path="edit/:shopId"
                                            element={<EditShop/>}
                                        />
                                        <Route
                                            path="create"
                                            element={<CreateShop/>}
                                        />
                                    </Route>
                                    <Route path="/transCounters" element={<Outlet/>}>
                                        <Route
                                            path=""
                                            element={<TransactionCounterList/>}
                                            index={true}
                                        />
                                        <Route
                                            path="edit/:transCounterId"
                                            element={<EditTransactionCounter/>}
                                            index={true}
                                        />
                                        <Route
                                            path="create"
                                            element={<CreateTransactionCounter/>}
                                            index={true}
                                        />
                                    </Route>
                                    <Route path="/cards" element={<Outlet/>}>
                                        <Route
                                            path=""
                                            element={<CardList/>}
                                            index={true}
                                        />
                                        <Route path=":cardId/wallets/" element={<Outlet/>}>
                                            <Route
                                                path=""
                                                element={<WalletList/>}
                                                index={true}
                                            />
                                            <Route
                                                path="edit/:walletId"
                                                element={<EditWallet/>}
                                                index={true}
                                            />
                                            <Route
                                                path="create"
                                                element={<CreateWallet/>}
                                                index={true}
                                            />
                                        </Route>
                                        <Route
                                            path="edit/:cardId"
                                            element={<EditCard/>}
                                            index={true}
                                        />
                                        <Route
                                            path="create"
                                            element={<CreateCard/>}
                                            index={true}
                                        />
                                    </Route>
                                </Route>
                            </Routes>


                //         </div>
                //     </div>
                // </div>
            )
            }
        </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;