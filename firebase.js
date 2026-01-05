// firebase.js
// Responsável pela inicialização do Firebase e conexão com Realtime Database

/**
 * CONFIGURAÇÃO DO FIREBASE
 * 
 * IMPORTANTE: Configure suas credenciais do Firebase aqui
 * 
 * INSTRUÇÕES PARA CONFIGURAÇÃO:
 * 1. Acesse o Console do Firebase (https://console.firebase.google.com)
 * 2. Selecione seu projeto (ou crie um novo)
 * 3. Vá em Configurações do Projeto > Geral
 * 4. Role até "Seus apps" e copie a configuração
 * 5. Substitua os valores abaixo (SEU_API_KEY_AQUI, seu-projeto, etc.) pelos valores reais
 * 
 * NOTA DE SEGURANÇA:
 * - Se você clonou este repositório, NUNCA faça commit das suas credenciais reais
 * - Use variáveis de ambiente ou mantenha suas credenciais em um arquivo local
 * - O arquivo firebase-config.js está no .gitignore para ajudar com isso
 */
const firebaseConfig = {
    apiKey: "AIzaSyCaBcq1p14qzXfx53ZKzxCcWQEehcC7gRo",
    authDomain: "sistema-cozinha-igreja.firebaseapp.com",
    databaseURL: "https://sistema-cozinha-igreja-default-rtdb.firebaseio.com",
    projectId: "sistema-cozinha-igreja",
    storageBucket: "sistema-cozinha-igreja.firebasestorage.app",
    messagingSenderId: "573871776810",
    appId: "1:573871776810:web:db2a892693f77183814f53"
};

/**
 * Valida se a configuração parece ser real (não é placeholder)
 */
function validarConfiguracao(config) {
    const placeholders = ['SEU_API_KEY_AQUI', 'seu-projeto'];
    const valores = Object.values(config).join(' ');
    
    for (const placeholder of placeholders) {
        if (valores.includes(placeholder)) {
            return false;
        }
    }
    return true;
}

/**
 * Inicializa o Firebase com a configuração fornecida
 */
let app;
let db = null; // Inicializa como null para evitar erros se a inicialização falhar
try {
    // Validar se a configuração foi atualizada
    if (!validarConfiguracao(firebaseConfig)) {
        console.warn("⚠️⚠️⚠️ CONFIGURAÇÃO DO FIREBASE PENDENTE ⚠️⚠️⚠️");
        console.warn("");
        console.warn("A configuração do Firebase ainda contém valores placeholder.");
        console.warn("");
        console.warn("📋 PASSO A PASSO PARA CONFIGURAR:");
        console.warn("  1. Acesse: https://console.firebase.google.com");
        console.warn("  2. Selecione seu projeto Firebase");
        console.warn("  3. Vá em: Configurações > Geral");
        console.warn("  4. Copie a configuração do seu app");
        console.warn("  5. Edite o arquivo firebase.js (linhas 21-28)");
        console.warn("  6. Substitua os valores placeholder pelos valores reais");
        console.warn("");
        console.warn("📖 Veja o README.md para mais detalhes");
        console.warn("");
        
        throw new Error("Firebase não configurado. Configure o arquivo firebase.js com suas credenciais reais.");
    }
    
    app = firebase.initializeApp(firebaseConfig);
    console.log("✅ Firebase inicializado com sucesso!");
    console.log("🔗 Conectado a:", firebaseConfig.databaseURL);
    
    /**
     * Cria referência ao Realtime Database
     * Esta referência será usada em app.js para operações de leitura/escrita
     */
    db = firebase.database();
    console.log("🔗 Conexão com Realtime Database estabelecida");
    
} catch (error) {
    console.error("❌ Erro ao inicializar Firebase:", error.message);
    
    // Função para criar o alerta visual
    function criarAlertaVisual() {
        const alerta = document.createElement('div');
        alerta.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#f44336;color:white;padding:15px;text-align:center;z-index:9999;font-family:Arial,sans-serif;';
        alerta.innerHTML = '<strong>⚠️ FIREBASE NÃO CONFIGURADO</strong><br>' +
                          'Configure o arquivo <code>firebase.js</code> com suas credenciais do Firebase. ' +
                          'Veja o console (F12) e o README.md para instruções detalhadas.';
        document.body.insertBefore(alerta, document.body.firstChild);
    }
    
    // Mostrar alerta visual para o usuário
    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            // DOM ainda carregando, aguardar DOMContentLoaded
            document.addEventListener('DOMContentLoaded', criarAlertaVisual);
        } else {
            // DOM já carregado, criar alerta imediatamente
            criarAlertaVisual();
        }
    }
}

/**
 * Exporta a referência do banco para uso em outros arquivos
 * Nota: Como estamos usando JavaScript puro sem módulos ES6,
 * a variável 'db' estará disponível globalmente
 */
