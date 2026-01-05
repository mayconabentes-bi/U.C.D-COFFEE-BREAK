// firebase.js
// Configuração do Firebase U.C.D Coffee Break

const firebaseConfig = {
    apiKey: "AIzaSyCaBcq1p14qzXfx53ZKzxCcWQEehcC7gRo",
    authDomain: "sistema-cozinha-igreja.firebaseapp.com",
    databaseURL: "https://sistema-cozinha-igreja-default-rtdb.firebaseio.com",
    projectId: "sistema-cozinha-igreja",
    storageBucket: "sistema-cozinha-igreja.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};

try {
    firebase.initializeApp(firebaseConfig);
    window.db = firebase.database();
} catch (error) {
    console.error("❌ Erro crítico no Firebase:", error.message);
}