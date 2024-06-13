import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "pages/SignIn/SignIn";
import SignUp from "pages/SignUp/SignUp";
import CreateOffer from "pages/CreateOffer/CreateOffer.tsx";
import CategoryPage from "pages/CategoryPages/CategoryPages";
import Category from "pages/Category/Category";
import AdminSignIn from "pages/AdminSignIn/AdminSignIn.tsx";
import OffersPage from "pages/OffersPages/OffersPage.tsx";
import ViewOffer from "pages/ViewOffer/ViewOffer.tsx";
import EditOffer from "pages/EditOffer/EditOffer.tsx";
import MyOffersPages from "pages/MyOffersPages/MyOffersPages.tsx";
import PersonalInformation from "pages/PersonalInformation/PersonalInformation.tsx";
import CreateCategory from "pages/CreateCategory/CreateCategory.tsx";
import ViewCategory from "pages/ViewCategory/ViewCategory.tsx";
import EditCategory from "pages/EditCategory/EditCategory.tsx";
import ListOffers from "pages/ListOffers/ListOffers.tsx";

import Layout from "./pages/Layout/Layout";
import AdminLayout from "./pages/AdminLayout/AdminLayout";
import Home from "./pages/Home/Home";
import Offers from "./pages/Offers/Offers.tsx";
import AboutUs from "./pages/About/AboutUs.tsx";
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage.tsx";
import ListCategories from "./pages/ListCategories/ListCategories.tsx";
import ViewAdminOffer from "pages/ViewAdminOffer/ViewAdminOffer.tsx";

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
          <Route path="aboutMe" element={<PersonalInformation />} />
          <Route path="/category">
            <Route index element={<Category />} />
            <Route path=":id" element={<CategoryPage />} />
          </Route>
          <Route path="/offers">
            <Route index element={<CreateOffer />} />
            <Route path=":offersId" element={<ViewOffer />} />
            <Route path="edit/:offersId" element={<EditOffer />} />
            <Route path="all" element={<Offers />} />
            <Route path="all/:id" element={<OffersPage />} />
            <Route path="users/:userId" element={<MyOffersPages />} />
            <Route path=":id" element={<OffersPage />} />
            <Route path=":ownerId" element={<OffersPage />} />
          </Route>
          <Route path="aboutUs" element={<AboutUs />} />
        </Route>

        {/* Routes for Admin Layout */}
        <Route path="admin/" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="auth/admin/login" element={<AdminSignIn />} />
          <Route path="categories/all" element={<ListCategories />} />
          <Route path="categories" element={<CreateCategory />} />
          <Route path="categories/edit/:id" element={<EditCategory />} />
          <Route path="categories/:id" element={<ViewCategory />} />
          <Route path="offers/all" element={<ListOffers />} />
          <Route path="offers/:id" element={<ViewAdminOffer />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
