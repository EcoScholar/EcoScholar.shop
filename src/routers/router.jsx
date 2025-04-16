import React, { useEffect, useRef, useState } from 'react';
import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../n.components/Login";
import Register from "../n.components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../n.components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import UserDashboard from "../pages/dashboard/users/UserDashboard";
import Library from "../pages/Library";
import { StudyProvider } from '../context/StudyContext';
import { StudyMaterials } from '../pages/study/StudyMaterials';
import { Ebooks } from '../pages/study/Ebooks';
import { Projects } from '../pages/study/Projects';
import { HandwrittenNotes } from '../pages/study/HandwrittenNotes&pyq';
import Sell from '../n.components/Sell';
import AllItems from '../pages/AllItems';
import Wishlist from '../pages/books/WishlistPage';

const router = createBrowserRouter([
    {
      path: "/",
      element: <StudyProvider><App/></StudyProvider>,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/orders",
            element: <PrivateRoute><OrderPage/></PrivateRoute>
        },
        {
            path: "/about",
            element: <div>About</div>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/cart",
          element: <CartPage/>
        },
        {
          path: "/checkout",
          element: <PrivateRoute><CheckoutPage/></PrivateRoute>
        },
        {
          path: "/books/:id",
          element: <SingleBook/>
        },
        {
          path: "/user-dashboard",
          element: <PrivateRoute><UserDashboard/></PrivateRoute>
        },
        {
          path: "/library",
          element: <Library/>
        },
        {
          path: "/study-materials",
          element: <StudyMaterials/>
        },
        {
          path: "/studymaterials",
          element: <StudyMaterials/>
        },
        {
          path: "/ebooks",
          element: <Ebooks/>
        },
        {
          path: "/projects",
          element: <Projects/>
        },
        {
          path: "/notes",
          element: <HandwrittenNotes/>
        },
        {
          path: "/sell",
          element: <Sell/>
        },
        {
          path: "/all-items",
          element: <AllItems/>
        },
        {
          path: "/wishlist",
          element: <PrivateRoute><Wishlist/></PrivateRoute>
        }
      ]
    },
    {
      path: "/admin",
      element: <AdminLogin/>
    },
    {
      path: "/dashboard",
      element: <AdminRoute>
        <DashboardLayout/>
      </AdminRoute>,
      children:[
        {
          path: "",
          element: <AdminRoute><Dashboard/></AdminRoute>
        },
        {
          path: "add-new-book",
          element: <AdminRoute>
            <AddBook/>
          </AdminRoute>
        },
        {
          path: "edit-book/:id",
          element: <AdminRoute>
            <UpdateBook/>
          </AdminRoute>
        },
        {
          path: "manage-books",
          element: <AdminRoute>
            <ManageBooks/>
          </AdminRoute>
        }
      ]
    }
  ]);

  export default router;