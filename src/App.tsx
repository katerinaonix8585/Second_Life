import { HashRouter, Route, Routes } from "react-router-dom";

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
import ViewAdminOffer from "pages/ViewAdminOffer/ViewAdminOffer.tsx";
import SearchPages from "pages/SearchPages/SearchPages.tsx";

import Layout from "./pages/Layout/Layout";
import AdminLayout from "./pages/AdminLayout/AdminLayout";
import Home from "./pages/Home/Home";
import Offers from "./pages/Offers/Offers.tsx";
import AboutUs from "./pages/About/AboutUs.tsx";
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage.tsx";
import ListCategories from "./pages/ListCategories/ListCategories.tsx";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="auth/user/login" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="aboutMe" element={<PersonalInformation />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route
            path="search/:pattern_request/:location_id"
            element={<SearchPages />}
          />
          <Route path="search/:pattern_request" element={<SearchPages />} />

          <Route path="offers">
            <Route index element={<CreateOffer />} />
            <Route path=":offersId" element={<ViewOffer />} />
            <Route path="edit/:offersId" element={<EditOffer />} />
            <Route path="all" element={<Offers />} />
            <Route path="all/:id" element={<OffersPage />} />
            <Route path="users/:userId" element={<MyOffersPages />} />
          </Route>

          <Route path="category">
            <Route index element={<Category />} />
            <Route path=":id" element={<CategoryPage />} />
          </Route>
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="auth/admin/login" element={<AdminSignIn />} />

          <Route path="categories">
            <Route path="all" element={<ListCategories />} />
            <Route index element={<CreateCategory />} />
            <Route path="edit/:id" element={<EditCategory />} />
            <Route path=":id" element={<ViewCategory />} />
          </Route>

          <Route path="offers">
            <Route path="all/:status" element={<ListOffers />} />
            <Route path=":offerId" element={<ViewAdminOffer />} />
          </Route>
        </Route>

        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
