import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "pages/SignIn/SignIn";
import SignUp from "pages/SignUp/SignUp";
import CreateOffer from "pages/CreateOffer/CreateOffer.tsx";
import CategoryPage from "pages/CategoryPages/CategoryPages";
import Category from "pages/Category/Category";
import AdminSignIn from "pages/AdminSignIn/AdminSignIn.tsx";
import OffersPage from "pages/OffersPages/OffersPage.tsx";

import Layout from "./pages/Layout/Layout";
import AdminLayout from "./pages/AdminLayout/AdminLayout";
import Home from "./pages/Home/Home";
import Offers from "./pages/Offers/Offers.tsx";
import AboutUs from "./pages/About/AboutUs.tsx";
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage.tsx";
import ListCategories from "./pages/ListCategories/ListCategories.tsx";

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
          <Route path="/category">
            <Route index element={<Category />} />
            <Route path=":id" element={<CategoryPage />} />
          </Route>
          <Route path="/offers/all">
            <Route index element={<Offers />} />
            <Route path=":id" element={<OffersPage />} />
          </Route>
          <Route path="aboutUs" element={<AboutUs />} />
        </Route>

        {/* Routes for Admin Layout */}
        <Route path="admin/" element={<AdminLayout />}>
          <Route path="auth/admin/login" element={<AdminSignIn />} />
          <Route path="admin/categories/all" element={<ListCategories />} />
          <Route index element={<AdminHomePage />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
