import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CategoryCard from './components/CategoryCard/CategoryCard';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';

function App() {  

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<></>} /> 
          <Route path="*" element="Page Not Found" />
        </Routes>
      </Layout>   
      
    </BrowserRouter>
  );
}

export default App;
