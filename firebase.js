// firebase.js
// Configuração do Firebase U.C.D Coffee Break

const firebaseConfig = {
    apiKey: "AIzaSyCaBcq1p14qzXfx53ZKzxCcWQEehcC7gRo", // Substitua pela sua Key real se for diferente
    authDomain: "sistema-cozinha-igreja.firebaseapp.com",
    databaseURL: "https://sistema-cozinha-igreja-default-rtdb.firebaseio.com",
    projectId: "sistema-cozinha-igreja",
    storageBucket: "sistema-cozinha-igreja.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};

// Inicialização segura
try {
    firebase.initializeApp(firebaseConfig);
    console.log("✅ Firebase inicializado com sucesso!");
    
    // GARANTIA DE ACESSO GLOBAL (MUITO IMPORTANTE)
    window.db = firebase.database();
    console.log("🔗 Conexão com Realtime Database estabelecida em:", firebaseConfig.databaseURL);
} catch (error) {
    console.error("❌ Erro crítico no Firebase:", error.message);
}