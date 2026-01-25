import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CREDENTIALS } from '../utils/constants';
import './Home.css';

export function Home() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shakeCard, setShakeCard] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('');
    
    const usuarioLower = usuario.trim().toLowerCase();
    
    if (!usuarioLower) {
      setError('Por favor, digite o usuário');
      setShakeCard(true);
      setTimeout(() => setShakeCard(false), 500);
      return;
    }
    
    if (!senha) {
      setError('Por favor, digite a senha');
      setShakeCard(true);
      setTimeout(() => setShakeCard(false), 500);
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      if (CREDENTIALS[usuarioLower] && CREDENTIALS[usuarioLower].senha === senha) {
        navigate(CREDENTIALS[usuarioLower].redirect);
      } else {
        setLoading(false);
        setError('Usuário ou senha incorretos');
        setSenha('');
        setShakeCard(true);
        setTimeout(() => setShakeCard(false), 500);
      }
    }, 600);
  };

  return (
    <div className="glassmorphism-bg">
      <div className="home-container">
        <div className={`login-card ${shakeCard ? 'shake' : ''}`}>
          <div className="header">
            <span className="logo" role="img" aria-label="Ícone de café">☕</span>
            <h1 className="title">U.C.D Coffee Break</h1>
            <p className="subtitle">Portal de Acesso</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="usuario">Usuário</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                autoComplete="username"
                placeholder="Digite seu usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className={error ? 'error' : ''}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="senha">Senha</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="senha"
                  name="senha"
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className={error ? 'error' : ''}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Mostrar/Ocultar senha"
                  title="Mostrar/Ocultar senha"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`btn-login ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? '' : 'Entrar'}
            </button>

            {error && (
              <div className="error-message show">
                {error}
              </div>
            )}
          </form>

          <div className="footer">
            Sistema de gestão de eventos
          </div>
        </div>
      </div>
    </div>
  );
}
