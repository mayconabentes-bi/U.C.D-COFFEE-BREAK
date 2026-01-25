import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FirebaseProvider } from './context/FirebaseContext';
import { Home } from './pages/Home';
import { ConfiguracaoSalas } from './pages/ConfiguracaoSalas';
import { DashboardCozinha } from './pages/DashboardCozinha';
import { PaginaSala } from './pages/PaginaSala';
import { GerenciarEstoque } from './pages/GerenciarEstoque';
import './styles/global.css';
import './components/Salas/SalaCard.css';

function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<ConfiguracaoSalas />} />
          <Route path="/cozinha" element={<DashboardCozinha />} />
          <Route path="/sala" element={<PaginaSala />} />
          <Route path="/estoque" element={<GerenciarEstoque />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  );
}

export default App;
