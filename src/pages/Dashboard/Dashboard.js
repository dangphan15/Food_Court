import {useEffect, useState} from 'react';
import Chart from 'chart.js/auto'
import { Doughnut, Line, Pie, Bar } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import {selectUser} from "../../features/user/userSlice";
import {useGetShops} from "../Admin/Shop/api/hook";
import { Helmet } from "react-helmet";
import {useGetTransactionCounters} from "../Admin/TransactionCounter/api/hook";
import {useGetReports} from "./api/hook";
import {useGetUsers} from "../Admin/User/api/hook";
import {useGetOrders} from "../Admin/Order/api/hook";

export default function Dashboard() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const shops = useGetShops();
    const transCounters = useGetTransactionCounters();
    const users = useGetUsers();
    const orders = useGetOrders();
    const reports = useGetReports();



    console.log(reports.data);

    const [months,setMonths] = useState([]);
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        if (reports.data) {
            const newMonths = reports.data.map(row => {
                const dateObject = new Date(row.startDate);
                return monthNames[dateObject.getMonth()];
            });
            setMonths(newMonths);
        }
    }, [reports.data]);
    const lineState = {
        labels: months,
        datasets: [
            {
                label: `Order For Each Month`,
                borderColor: '#8A39E1',
                backgroundColor: '#8A39E1',
                data: reports.data.map((m, i) => m.totalSales),
            },
        ],
    };
    //
    // const statuses = ['Processing', 'Shipped', 'Delivered'];
    //
    // const pieState = {
    //     labels: statuses,
    //     datasets: [
    //         {
    //             backgroundColor: ['#9333ea', '#facc15', '#4ade80'],
    //             hoverBackgroundColor: ['#a855f7', '#fde047', '#86efac'],
    //             data: statuses.map((status) => orders?.filter((item) => item.orderStatus === status).length),
    //         },
    //     ],
    // };

    // const doughnutState = {
    //     labels: ['Active', 'Inactive'],
    //     datasets: [
    //         {
    //             backgroundColor: ['#ef4444', '#22c55e'],
    //             hoverBackgroundColor: ['#dc2626', '#16a34a'],
    //             data: [outOfStock, products.length - outOfStock],
    //         },
    //     ],
    // };

    // const barState = {
    //     labels: categories,
    //     datasets: [
    //         {
    //             label: "Products",
    //             borderColor: '#9333ea',
    //             backgroundColor: '#9333ea',
    //             hoverBackgroundColor: '#6b21a8',
    //             data: categories.map((cat) => products?.filter((item) => item.category === cat).length),
    //         },
    //     ],
    // };

    return (
        <>
            <Helmet>
                <title>Admin Dashboard | Flipkart</title>
            </Helmet>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6">
                <div style={{height:"120px", padding:"20px"}} className="flex flex-col bg-purple-600 text-white gap-1 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 style={{fontSize:"20px"}} className="text-gray-100 font-medium">Total Shops</h4>
                    <h2 className="text-2xl font-bold">{shops.data.length}</h2>
                </div>
                <div style={{height:"120px", padding:"20px"}} className="flex flex-col bg-red-500 text-white gap-1 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 style={{fontSize:"20px"}} className="text-gray-100 font-medium">Total Orders</h4>
                    <h2 className="text-2xl font-bold">{orders.data.length}</h2>
                </div>
                <div style={{height:"120px", padding:"20px"}} className="flex flex-col bg-yellow-500 text-white gap-1 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 style={{fontSize:"20px"}} className="text-gray-100 font-medium">Total TransactionCounter</h4>
                    <h2 className="text-2xl font-bold">{transCounters.data.length}</h2>
                </div>
                <div style={{height:"120px", padding:"20px"}} className="flex flex-col bg-green-500 text-white gap-1 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 style={{fontSize:"20px"}}    className="text-gray-100 font-medium">Total Users</h4>
                    <h2 className="text-2xl font-bold">{users.data.length}</h2>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-8 min-w-full mt-4">
                <div className="bg-white rounded-xl h-auto w-full shadow-lg p-2 text-center">
                    <span className="font-medium uppercase text-gray-800">Order</span>
                    <Line data={lineState} />
                </div>
            </div>

            {/*    <div className="bg-white rounded-xl shadow-lg p-4 text-center">*/}
            {/*        <span className="font-medium uppercase text-gray-800">Order Status</span>*/}
            {/*        <Pie data={pieState} />*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-8 min-w-full mb-6">*/}
            {/*    <div className="bg-white rounded-xl h-auto w-full shadow-lg p-2">*/}
            {/*        <Bar data={barState} />*/}
            {/*    </div>*/}

            {/*    <div className="bg-white rounded-xl shadow-lg p-4 text-center">*/}
            {/*        <span className="font-medium uppercase text-gray-800">Stock Status</span>*/}
            {/*        <Doughnut data={doughnutState} />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
};
