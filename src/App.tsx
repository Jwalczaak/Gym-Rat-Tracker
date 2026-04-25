import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Training from './pages/Training';
import Diet from './pages/Diet';
import Login from './pages/Login';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to="home" />}></Route>
        <Route path="home" element={<Home />} />
        <Route path="training" element={<Training />} />
        <Route path="diet" element={<Diet />} />
        <Route path="login" element={<Login />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
