# U.C.D Coffee Break - React + Vite

Sistema moderno de gerenciamento de Coffee Break para igrejas, desenvolvido com React, Vite e Firebase Realtime Database.

## 🎯 Sobre o Projeto

O **U.C.D Coffee Break** é uma solução completa para gerenciamento de eventos em igrejas, oferecendo:

- 🏠 Portal de acesso com design glassmorphism
- ⚙️ Configuração de salas (adulto/infantil)
- 🍽️ Dashboard da cozinha com cálculo automático de demanda
- 👥 Check-in de participantes por sala
- 📦 Controle de estoque com alertas inteligentes
- ⚡ Atualizações em tempo real via Firebase

## 🛠️ Stack Tecnológica

- **Framework**: React 18.x
- **Build Tool**: Vite 5.x
- **Roteamento**: React Router v6
- **Database**: Firebase Realtime Database (SDK v10)
- **Linguagem**: JavaScript (ES6+)
- **Estilização**: CSS puro (CSS Modules pattern)

## 📁 Estrutura do Projeto

```
/
├── src/
│   ├── components/
│   │   ├── Checkin/        # Componentes de check-in
│   │   ├── Cozinha/        # Componentes da cozinha
│   │   ├── Estoque/        # Componentes de estoque
│   │   ├── Salas/          # Componentes de salas
│   │   └── shared/         # Componentes compartilhados
│   ├── context/
│   │   └── FirebaseContext.jsx
│   ├── hooks/
│   │   ├── useFirebase.js
│   │   ├── useSalas.js
│   │   ├── useEstoque.js
│   │   └── useProducao.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ConfiguracaoSalas.jsx
│   │   ├── DashboardCozinha.jsx
│   │   ├── PaginaSala.jsx
│   │   └── GerenciarEstoque.jsx
│   ├── services/
│   │   ├── firebase.js
│   │   └── calculations.js
│   ├── utils/
│   │   └── constants.js
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── .env.example
└── README.md
```

## 🚀 Como Usar

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn
- Projeto Firebase com Realtime Database configurado

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/mayconabentes-bi/U.C.D-COFFEE-BREAK.git
cd U.C.D-COFFEE-BREAK
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Edite o arquivo `.env` com suas credenciais do Firebase:
```env
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://seu-projeto-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

### Desenvolvimento

Execute o servidor de desenvolvimento:
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

### Build para Produção

Gere a build otimizada:
```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`

### Preview da Build

Visualize a build de produção localmente:
```bash
npm run preview
```

## 🔑 Credenciais de Acesso

| Usuário  | Senha      | Acesso         |
|----------|------------|----------------|
| admin    | ucd123     | /admin         |
| cozinha  | cafe       | /cozinha       |
| sala     | voluntario | /sala          |
| estoque  | ucdstock   | /estoque       |

## 📋 Funcionalidades

### 1. Portal de Acesso (/)
- Design moderno com glassmorphism
- Autenticação simples por credenciais
- Navegação para diferentes módulos

### 2. Configuração de Salas (/admin)
- Criar salas adulto e criança
- Marcar sala especial (apenas uma por vez)
- Visualizar todas as salas criadas

### 3. Dashboard da Cozinha (/cozinha)
- Lista de salas em tempo real
- Totais consolidados (adultos, crianças, total)
- Cálculo automático de demanda:
  - Café: 150ml/adulto
  - Alimento adulto: 250g/adulto
  - Alimento infantil: 180g/criança
  - Margem de segurança: 10%
- Status de produção (A_PRODUZIR, EM_PRODUCAO, PRONTO)
- Estoque atual com alertas
- Botões para marcar produção como pronta

### 4. Página da Sala (/sala)
- Seletor de sala
- Check-in de participantes (+/-)
- Visualização de status de produção
- Notificações quando itens ficam prontos (desaparecem após 10s)

### 5. Gerenciar Estoque (/estoque)
- Visualização de todos os itens
- Entrada rápida (+1, +5, +10)
- Saída manual (-1, nunca negativo)
- Ajuste de estoque mínimo
- Alertas visuais para estoque baixo

## 🔧 Regras de Negócio

### Cálculo de Demanda
- **Adultos**: 150ml café + 250g alimento
- **Crianças**: 0ml café + 180g alimento
- **Margem de segurança**: 10% adicional
- **Arredondamento**: Próximo múltiplo de 0.5 acima

### Gestão de Estoque
- ✅ Baixa automática ao marcar produção como PRONTA
- ✅ Nunca permite valores negativos
- ✅ Check-in NÃO altera estoque
- ✅ Alertas quando quantidade ≤ estoque mínimo

### Status de Produção
- 🟡 **A_PRODUZIR**: Aguardando início
- 🔴 **EM_PRODUCAO**: Em andamento
- 🟢 **PRONTO**: Finalizado
- ⚠️ Reset automático se demanda aumentar

## 🔥 Firebase - Estrutura de Dados

```json
{
  "configuracao": {
    "salasAdulto": number,
    "salasCrianca": number,
    "salaEspecialId": string
  },
  "salas": {
    "[salaId]": {
      "nome": string,
      "tipo": "adulto" | "infantil",
      "especial": boolean,
      "pessoas": number
    }
  },
  "producao": {
    "cafe": {
      "status": "A_PRODUZIR" | "EM_PRODUCAO" | "PRONTO",
      "atualizadoEm": string
    },
    "alimentoAdulto": {...},
    "alimentoInfantil": {...}
  },
  "estoque": {
    "cafe": {
      "nome": "Café",
      "unidade": "litros",
      "quantidadeAtual": number,
      "estoqueMinimo": number
    },
    "alimentoAdulto": {...},
    "alimentoInfantil": {...}
  }
}
```

## 🎨 Design

O projeto mantém a identidade visual original com:
- 🌟 Glassmorphism na página inicial
- 🎨 Gradientes animados
- 📱 Design responsivo
- ✨ Transições suaves
- 🎯 Interface intuitiva

### Cores Principais
- **Primary**: #2196F3
- **Success**: #4CAF50
- **Error**: #f44336
- **Warning**: #FF9800

## 🔒 Segurança

⚠️ **IMPORTANTE**: As credenciais de exemplo no código são apenas para demonstração. Para uso em produção:

1. Implemente autenticação real (Firebase Auth)
2. Configure regras de segurança no Firebase
3. Use variáveis de ambiente para credenciais
4. Nunca exponha chaves de API publicamente

## 📝 Licença

Este projeto está sob a licença especificada no arquivo LICENSE.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📧 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para a comunidade**
