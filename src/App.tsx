import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import CategoryPage from 'pages/CategoryPages/CategoryPages';
import Category from 'pages/Category/Category';


function App() {  

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="*" element="Page Not Found" />
        </Routes>
      </Layout>   
      
    </BrowserRouter>
  );
}

export default App;
