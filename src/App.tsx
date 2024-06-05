import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "pages/SignIn/SignIn";
import SignUp from "pages/SignUp/SignUp";
import CreateOffer from "pages/CreateOffer/CreateOffer.tsx";
import CategoryPage from "pages/CategoryPages/CategoryPages";
import Category from "pages/Category/Category";
import AdminSignIn from "pages/AdminSignIn/AdminSignIn.tsx";

import Layout from "./pages/Layout/Layout";
import AdminLayout from "./pages/AdminLayout/AdminLayout";
import Home from "./pages/Home/Home";
import Offers from "./pages/Offers/Offers.tsx";
import AboutUs from "./pages/About/AboutUs.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes for regular Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="auth/user/login" element={<SignIn />} />
          <Route path="offers" element={<CreateOffer />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="category" element={<Category />} />
          <Route path="category/:name" element={<CategoryPage />} />
          <Route path="offers/all" element={<Offers />} />
          <Route path="aboutUs" element={<AboutUs />} />
        </Route>

        {/* Routes for Admin Layout */}
        <Route path="auth/admin/login" element={<AdminLayout />}>
          <Route index element={<AdminSignIn />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
