import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Header from './components/Header';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import './css/main.css';
import './css/normalize.css';
import './css/sb-admin-2.css';
import './css/sb-admin-2.min.css';
import UserList from "./pages/User/user-list";
import ProductList from "./pages/Product/product-list";
import Login from "./pages/Login";

function App() {
  return (
      <Login/>
      // <div id="wrapper">
      //     <Navbar />
      //     <div id="content-wrapper" className="d-flex flex-column">
      //         <div id="content">
      //             <Header />
      //             <Routes>
      //                 <Route path="/" element={<UserList/>} />
      //                 <Route path="/users" element={<UserList/>} />
      //                 <Route path="/products" element={<ProductList/>} />
      //             </Routes>
      //         </div>
      //     </div>
      // </div>
  );
}

export default App;
