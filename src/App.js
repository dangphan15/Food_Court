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
import SignUp from "./pages/Register";
import {Profile} from "./pages/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import {TransactionList} from "./pages/Admin/Transaction/transaction_list";
import {EditTransaction} from "./pages/Admin/Transaction/detail";
import {OrderList} from "./pages/Admin/Order/order_list";
import {OrderDetailList} from "./pages/Admin/OrderDetail/order_detail_list";
import {EditOrder} from "./pages/Admin/Order/detail";
import {UserShopList} from "./pages/User/Shop/shop-list";
import {UserShopCategoryList} from "./pages/User/ShopCategory/shop_categories_list";
import {UserProduct_list} from "./pages/User/Product/product_list";
import {UserEditProduct} from "./pages/User/Product/detail";
import {UserCreateProduct} from "./pages/User/Product/create";
import {UserEditShopCategory} from "./pages/User/ShopCategory/detail";
import {UserCreateShopCategory} from "./pages/User/ShopCategory/create";
import {UserEditShop} from "./pages/User/Shop/detail";
import {UserCreateShop} from "./pages/User/Shop/create";
import {UserList} from "./pages/Admin/User/user_list";
import {EditUser} from "./pages/Admin/User/detail";
import {CreateUser} from "./pages/Admin/User/create";
import {ChangePassword} from "./pages/ChangePassword";
import {UserOrderDetailList} from "./pages/User/OrderDetail/order_detail_list";
import {UserEditOrder} from "./pages/User/Order/detail";
import {UserOrderList} from "./pages/User/Order/order_list";

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
                    <Route path="/register" element={<SignUp/>}/>
                </Routes>
            ):(
                <>
                    {userAccount.userAccountInfor.Role === "Admin" &&
                        <Routes>
                            <Route path="/" element={<AdminLayout/>}>
                                <Route path="/profile/:userId" element={<Profile/>}/>
                                <Route path="/changePassword/:userId" element={<ChangePassword/>}/>
                                <Route path="/" element={<Dashboard/>}/>
                                <Route path="/dashboard" element={<Dashboard/>}/>
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
                                <Route path="/trans" element={<Outlet/>}>
                                    <Route
                                        path=""
                                        element={<TransactionList/>}
                                        index={true}
                                    />
                                    <Route
                                        path="edit/:transId"
                                        element={<EditTransaction/>}
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
                                <Route path="/orders" element={<Outlet/>}>
                                    <Route
                                        path=""
                                        element={<OrderList/>}
                                        index={true}
                                    />
                                    <Route path=":orderId/orderDetails/" element={<Outlet/>}>
                                        <Route
                                            path=""
                                            element={<OrderDetailList/>}
                                            index={true}
                                        />
                                    </Route>
                                    <Route
                                        path="edit/:orderId"
                                        element={<EditOrder/>}
                                        index={true}
                                    />
                                </Route>
                                <Route path="/users" element={<Outlet/>}>
                                    <Route
                                        path=""
                                        element={<UserList/>}
                                        index={true}
                                    />
                                    <Route
                                        path="edit/:userId"
                                        element={<EditUser/>}
                                        index={true}
                                    />
                                    <Route
                                        path="create"
                                        element={<CreateUser/>}
                                        index={true}
                                    />
                                </Route>
                            </Route>
                        </Routes>
                    }
                    {userAccount.userAccountInfor.Role === "User" &&
                        <Routes>
                            <Route path="/" element={<AdminLayout/>}>
                                <Route path="/profile/:userId" element={<Profile/>}/>
                                <Route path="/changePassword/:userId" element={<ChangePassword/>}/>
                                <Route path="/" element={<Dashboard/>}/>
                                <Route path="/dashboard" element={<Dashboard/>}/>
                                <Route path="/shops" element={<Outlet/>}>
                                    <Route
                                        path=""
                                        element={<UserShopList/>}
                                        index={true}
                                    />
                                    <Route path=":shopId/categories/" element={<Outlet/>}>
                                        <Route
                                            path=""
                                            element={<UserShopCategoryList/>}
                                            index={true}
                                        />
                                        <Route path=":shopCateId/products/" element={<Outlet/>}>
                                            <Route
                                                path=""
                                                element={<UserProduct_list/>}
                                                index={true}
                                            />
                                            <Route
                                                path="edit/:productId"
                                                element={<UserEditProduct/>}
                                                index={true}
                                            />
                                            <Route
                                                path="create"
                                                element={<UserCreateProduct/>}
                                                index={true}
                                            />
                                        </Route>
                                        <Route
                                            path="edit/:shopCateId"
                                            element={<UserEditShopCategory/>}
                                            index={true}
                                        />
                                        <Route
                                            path="create"
                                            element={<UserCreateShopCategory/>}
                                            index={true}
                                        />
                                    </Route>
                                    <Route
                                        path="edit/:shopId"
                                        element={<UserEditShop/>}
                                    />
                                    <Route
                                        path="create"
                                        element={<UserCreateShop/>}
                                    />
                                </Route>
                                <Route path="/orders" element={<Outlet/>}>
                                    <Route
                                        path=""
                                        element={<UserOrderList/>}
                                        index={true}
                                    />
                                    <Route path=":orderId/orderDetails/" element={<Outlet/>}>
                                        <Route
                                            path=""
                                            element={<UserOrderDetailList/>}
                                            index={true}
                                        />
                                    </Route>
                                    <Route
                                        path="edit/:orderId"
                                        element={<UserEditOrder/>}
                                        index={true}
                                    />
                                </Route>
                            </Route>
                        </Routes>
                    }
                </>
            )
            }
        </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;