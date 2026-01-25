import './ContadorPessoas.css';

export function ContadorPessoas({ quantidade, onAdicionar, onRemover }) {
  return (
    <>
      <div className="contador">
        <div className="contador-valor">{quantidade}</div>
        <div className="contador-label">pessoas presentes</div>
      </div>

      <div className="btn-group">
        <button
          className="btn-adicionar"
          onClick={onAdicionar}
          aria-label="Adicionar pessoa"
        >
          + ADICIONAR
        </button>
        <button
          className="btn-remover"
          onClick={onRemover}
          disabled={quantidade === 0}
          aria-label="Remover pessoa"
        >
          - REMOVER
        </button>
      </div>
    </>
  );
}
