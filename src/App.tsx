import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CategoryPage from 'pages/CategoryPages/CategoryPages';
import Category from 'pages/Category/Category';

import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import SignIn from 'pages/SignIn/SignIn';
import SignUp from 'pages/SignUp/SignUp';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/category' element={<Category />} />
          <Route path='/category/:name' element={<CategoryPage />} />
          <Route path='*' element='Page Not Found' />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
