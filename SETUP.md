# Guia de Configuração Rápida - U.C.D Coffee Break

Este guia fornece instruções passo a passo para executar o projeto localmente.

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** versão 16 ou superior ([Download](https://nodejs.org/))
- **npm** (incluído com Node.js)
- **Git** ([Download](https://git-scm.com/))

Para verificar se já possui instalado:
```bash
node --version   # Deve mostrar v16.x.x ou superior
npm --version    # Deve mostrar 8.x.x ou superior
git --version    # Deve mostrar 2.x.x ou superior
```

## 🚀 Passo 1: Clonar o Repositório

```bash
git clone https://github.com/mayconabentes-bi/U.C.D-COFFEE-BREAK.git
cd U.C.D-COFFEE-BREAK
```

## 📦 Passo 2: Instalar Dependências

Execute o seguinte comando no diretório do projeto:

```bash
npm install
```

Este comando irá:
- Baixar todas as dependências do projeto
- Criar a pasta `node_modules/`
- Configurar o ambiente de desenvolvimento

**Tempo estimado:** 1-2 minutos

## 🔑 Passo 3: Configurar Variáveis de Ambiente

### 3.1 Copiar o arquivo de exemplo

```bash
cp .env.example .env
```

No Windows (cmd):
```cmd
copy .env.example .env
```

### 3.2 Obter credenciais do Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com)
2. Crie um novo projeto ou selecione um existente
3. Clique no ícone de engrenagem ⚙️ > **Configurações do projeto**
4. Role até a seção **Seus apps**
5. Clique em **Adicionar app** > Escolha **Web** (`</>`)
6. Registre o app e copie o objeto `firebaseConfig`

### 3.3 Editar o arquivo `.env`

Abra o arquivo `.env` criado e substitua os valores de exemplo pelas suas credenciais reais do Firebase:

```env
VITE_FIREBASE_API_KEY=AIzaSyD1234567890abcdefghijklmnop
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://seu-projeto-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

⚠️ **IMPORTANTE**: Nunca faça commit do arquivo `.env` com credenciais reais!

### 3.4 Ativar Firebase Realtime Database

1. No Firebase Console, vá em **Realtime Database** no menu lateral
2. Clique em **Criar banco de dados**
3. Escolha a localização (preferencialmente próxima ao Brasil)
4. Inicie em **modo de teste** (para desenvolvimento)

⚠️ **ATENÇÃO**: Regras de teste permitem acesso público por 30 dias. Configure regras de segurança para produção!

## ▶️ Passo 4: Executar o Projeto

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

Você verá uma mensagem similar a:

```
  VITE v5.0.x  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**Nota:** O servidor está configurado para usar a porta 3000 (veja `vite.config.js`)

## 🌐 Passo 5: Acessar o Sistema

Abra seu navegador e acesse:

```
http://localhost:3000
```

### Credenciais de Acesso

| Usuário  | Senha      | Página       | Descrição                      |
|----------|------------|--------------|--------------------------------|
| admin    | ucd123     | /admin       | Configuração de salas          |
| cozinha  | cafe       | /cozinha     | Dashboard da cozinha           |
| sala     | voluntario | /sala        | Check-in de participantes      |
| estoque  | ucdstock   | /estoque     | Gerenciamento de estoque       |

## 🛑 Parar o Servidor

Para parar o servidor de desenvolvimento, pressione `Ctrl + C` no terminal.

## 🔧 Comandos Disponíveis

| Comando          | Descrição                                    |
|------------------|----------------------------------------------|
| `npm run dev`    | Inicia o servidor de desenvolvimento         |
| `npm run build`  | Gera build otimizada para produção          |
| `npm run preview`| Visualiza a build de produção localmente    |
| `npm run lint`   | Executa o linter (ESLint)                   |

## ❓ Solução de Problemas

### Erro: "Cannot find module"
**Solução:** Execute `npm install` novamente

### Erro: "Firebase error. Please ensure that you have the URL..."
**Solução:** Verifique se o arquivo `.env` está configurado corretamente com suas credenciais do Firebase

### Erro: "Port 3000 is already in use"
**Solução:** 
- Feche outras aplicações usando a porta 3000
- Ou edite o arquivo `vite.config.js` e altere a porta

### Erro de permissão ao executar npm
**Solução (Linux/Mac):** Não use `sudo`. Configure npm para não requerer sudo: [Guia oficial](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

## 📚 Documentação Adicional

- [README.md](./README.md) - Documentação geral do projeto
- [README_REACT.md](./README_REACT.md) - Documentação técnica da versão React
- [MIGRATION_COMPLETE.md](./MIGRATION_COMPLETE.md) - Detalhes da migração para React

## 🆘 Precisa de Ajuda?

Se encontrar algum problema não listado aqui:

1. Verifique as [Issues abertas](https://github.com/mayconabentes-bi/U.C.D-COFFEE-BREAK/issues)
2. Abra uma nova issue com detalhes do erro
3. Inclua a versão do Node.js (`node --version`)
4. Inclua a mensagem de erro completa

---

**Desenvolvido com ❤️ para a comunidade**
