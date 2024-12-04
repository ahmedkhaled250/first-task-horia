import React, { useContext, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Notfound from './Components/Notfount/Notfound';
import Category from './Components/Ctegory/Category';
import Contact from './Components/Contact/Contact';
import SubscribtionPlan from './Components/SubscribtionPlan/SubscribtionPlan';
import BusinessRegister from './Components/BusinessRegister/BusinessRegister';
import IndividualRegister from './Components/IndividualRegister/IndividualRegister';
import CustomerRegister from './Components/CustomerRegister/CustomerRegister';
import Login from './Components/Login/Login';
import UserContextProvider, { UserContext } from './Context/UserContext';
import Products from './Components/Products/Products';
import Profile from './Components/Profile/Profile';
import AdminProfile from './Components/Dashboard/Profile/Profile';
import ProfileData from './Components/Profile/ProfileData/ProfileData';
import Wishlist from './Components/Profile/Wishlist/Wishlist';
import { ProtectedAdminRoute, ProtectedAuthRoute, ProtectedRoute } from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Dashboard from './Components/Profile/Dashboard/Dashboard';
import AdminDashboard from './Components/Dashboard/Dashboard';
import { ChatProvider } from './Context/ChatContext';
import Chat from './Components/Profile/Chat/Chat';
import FriendsList from './Components/Profile/Chat/FriendsList/FriendsList';
import Message from './Components/Profile/Chat/Messages/Messages';
import { CustomerAuth, TradererAuth } from './Components/Authorization/Authorization';
import { SkeletonTheme } from 'react-loading-skeleton';
import AddProduct from './Components/Profile/AddProduct/AddProduct';
import MyProducts from './Components/Profile/MyProducts/MyProducts';
import AdminLayout from './Components/Layout/AdminLayout';
import AdminCategory from './Components/Dashboard/Category/Category';
import CreateCategory from './Components/Dashboard/Category/CreateCategory/CreateCategory';
import UpdateCategory from './Components/Dashboard/Category/UpdateCategory/UpdateCategory';
import AdminSubcategory from './Components/Dashboard/Category copy/Subcategory';
import UpdateSubcategory from './Components/Dashboard/Category copy/UpdateSubcategory/UpdateSubcategory';
import CreateSubcategory from './Components/Dashboard/Category copy/CreateSubcategory/CreateSubcategory';
import AdminBrand from './Components/Dashboard/Category copy 2/Brand';
import CreateBrand from './Components/Dashboard/Category copy 2/CreateBrand/CreateBrand';
import UpdateBrand from './Components/Dashboard/Category copy 2/UpdateBrand/UpdateBrand';
import TraderRequests from './Components/Dashboard/Trader/Trader';
import TraderDetails from './Components/Dashboard/TraderDetails/TraderDetails';
import ProductRequests from './Components/Dashboard/ProductRequests/ProductRequests';
import ProductRequestDetails from './Components/Dashboard/ProductRequestDetails/ProductRequestDetails';

function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "category", element: <Category /> },
        { path: "contact", element: <Contact /> },
        { path: "products", element: <Products /> },
        { path: "product/:id", element: <ProductDetails /> },
        {
          path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute>, children: [
            { path: "", element: <ProfileData /> },
            { path: "profileData", element: <ProfileData /> },
            { path: "wishlist", element: <CustomerAuth><Wishlist /></CustomerAuth> },
            {
              path: "chat", element: <Chat />, children: [
                { path: "", element: <FriendsList /> },
                { path: "friend", element: <FriendsList /> },
                { path: "messages/:friendId", element: <Message /> },
              ]
            },
            { path: "dashboard", element: <TradererAuth><Dashboard /></TradererAuth> },
            { path: "addproduct", element: <TradererAuth><AddProduct /></TradererAuth> },
            { path: "myProducts", element: <TradererAuth><MyProducts /></TradererAuth> },
          ]
        },
        { path: "subscribtionPlan", element: <ProtectedAuthRoute><SubscribtionPlan /></ProtectedAuthRoute> },
        { path: "businessRegister", element: <ProtectedAuthRoute><BusinessRegister /></ProtectedAuthRoute> },
        { path: "individualRegister", element: <ProtectedAuthRoute> <IndividualRegister /></ProtectedAuthRoute> },
        { path: "customerRegister", element: <ProtectedAuthRoute><CustomerRegister /></ProtectedAuthRoute > },
        {
          path: "login", element: <ProtectedAuthRoute><Login /></ProtectedAuthRoute>
        },
        { path: "*", element: <Notfound /> },
      ]
    }, {
      path: "/dashboard", element: <ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>, children: [
        {
          index: true, element: <AdminProfile />
        },
        {
          path: "category", element: <CreateCategory />
        },
        // { path: "addcategory", element:  },
        // { path: "updatecategory", element: <UpdateCategory /> },
        {
          path: "subcategory", element: < CreateSubcategory />
        },
        // { path: "addsubcategory", element:  },
        // { path: "updatesubcategory", element: <UpdateSubcategory /> },
        {
          path: "brand", element: <CreateBrand /> 
        },
        // { path: "addbrand", element: },
        // { path: "updatebrand", element: <UpdateBrand /> },
        { path: "traderRequests", element: <TraderRequests /> },
        { path: "traderDetails/:id", element: <TraderDetails /> },
        { path: "productRequests", element: <ProductRequests /> },
        { path: "productRequestDetails/:id", element: <ProductRequestDetails /> },
        { path: "*", element: <Notfound /> },
      ]
    },

  ]);

  return (
    <UserContextProvider>
      <ChatProvider>
        <SkeletonTheme baseColor="#FFBD59" highlightColor="#D48D3B">
          <RouterProvider router={router} />
        </SkeletonTheme>
      </ChatProvider>
    </UserContextProvider>
  );
}

export default App;
