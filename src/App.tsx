import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import DespachoPage from './pages/DespachoPage'; // Importar la nueva página


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      {/* Redirige a Login por defecto */}
      <Route path="/despacho" element={<DespachoPage />} />
    </Routes>
  )
}

export default App