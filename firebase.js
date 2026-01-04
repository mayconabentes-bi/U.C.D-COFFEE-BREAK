// firebase.js
// Responsável pela inicialização do Firebase e conexão com Realtime Database

/**
 * CONFIGURAÇÃO DO FIREBASE
 * IMPORTANTE: Substitua os valores abaixo pela configuração real do seu projeto Firebase
 * Para obter essas informações:
 * 1. Acesse o Console do Firebase (https://console.firebase.google.com)
 * 2. Selecione seu projeto
 * 3. Vá em Configurações do Projeto > Geral
 * 4. Role até "Seus apps" e copie a configuração
 */
const firebaseConfig = {
    apiKey: "SEU_API_KEY_AQUI",
    authDomain: "seu-projeto.firebaseapp.com",
    databaseURL: "https://seu-projeto-default-rtdb.firebaseio.com",
    projectId: "seu-projeto",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};

/**
 * Inicializa o Firebase com a configuração fornecida
 */
let app;
try {
    app = firebase.initializeApp(firebaseConfig);
    console.log("✅ Firebase inicializado com sucesso!");
} catch (error) {
    console.error("❌ Erro ao inicializar Firebase:", error);
}

/**
 * Cria referência ao Realtime Database
 * Esta referência será usada em app.js para operações de leitura/escrita
 */
const db = firebase.database();

// Log de confirmação da conexão com o banco
console.log("🔗 Conexão com Realtime Database estabelecida");

/**
 * Exporta a referência do banco para uso em outros arquivos
 * Nota: Como estamos usando JavaScript puro sem módulos ES6,
 * a variável 'db' estará disponível globalmente
 */
