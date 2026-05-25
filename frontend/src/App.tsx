import { Route, Routes } from 'react-router';
import { Layout } from './components/layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;
