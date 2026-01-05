# U.C.D Coffee Break

Sistema simples e leve de gerenciamento para igrejas, hospedado no GitHub Pages e usando Firebase Realtime Database.

## ⚠️ ATENÇÃO: Configuração Necessária

**Antes de usar o sistema, você DEVE configurar suas credenciais do Firebase!**

Este repositório contém código de exemplo com valores placeholder. Para o sistema funcionar, você precisa:

1. Criar um projeto no [Firebase Console](https://console.firebase.google.com)
2. Editar o arquivo `firebase.js` com suas credenciais reais
3. Veja a seção [🚀 Como Usar](#-como-usar) abaixo para instruções detalhadas

**Sem essa configuração, você verá o seguinte erro:**
```
Firebase error. Please ensure that you have the URL of your Firebase 
Realtime Database instance configured correctly.
```

## 🎯 Sobre o Projeto

O **U.C.D Coffee Break** é uma solução de baixo custo para gerenciamento de eventos e recursos em igrejas. O sistema está sendo desenvolvido em fases, começando pela fundação técnica até chegar a um sistema completo de gestão.

## 📍 Status Atual: FASE 7

### O que é a Fase 7?

A **Fase 7** implementa o **Controle de Estoque** completo, fechando o ciclo operacional do sistema. Nesta fase:

- ✅ Estrutura `/estoque` no Firebase com itens de estoque
- ✅ Página dedicada `estoque.html` para gestão de insumos
- ✅ Entrada e saída manual de estoque
- ✅ Ajuste de estoque mínimo por item
- ✅ Baixa automática de estoque quando produção é marcada como PRONTA
- ✅ Alertas visuais de estoque mínimo na cozinha e no estoque
- ✅ Bloqueio de produção quando estoque insuficiente
- ✅ Validação para nunca permitir valores negativos

### Estrutura no Firebase (Fase 7)

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
    "alimentoAdulto": {
      "status": "A_PRODUZIR" | "EM_PRODUCAO" | "PRONTO",
      "atualizadoEm": string
    },
    "alimentoInfantil": {
      "status": "A_PRODUZIR" | "EM_PRODUCAO" | "PRONTO",
      "atualizadoEm": string
    }
  },
  "estoque": {
    "cafe": {
      "nome": "Café",
      "unidade": "litros",
      "quantidadeAtual": number,
      "estoqueMinimo": number
    },
    "alimentoAdulto": {
      "nome": "Alimento Adulto",
      "unidade": "kg",
      "quantidadeAtual": number,
      "estoqueMinimo": number
    },
    "alimentoInfantil": {
      "nome": "Alimento Infantil",
      "unidade": "kg",
      "quantidadeAtual": number,
      "estoqueMinimo": number
    }
  }
}
```

### Funcionalidades Implementadas

#### Controle de Estoque (Fase 7)
- Nova página `estoque.html` dedicada à gestão de insumos
- Para cada item do estoque:
  - Visualização de quantidade atual e estoque mínimo
  - Entrada manual com botões rápidos (+1, +5, +10)
  - Saída manual (nunca permite valores negativos)
  - Ajuste de estoque mínimo
  - Alerta visual quando quantidade ≤ estoque mínimo
- Baixa automática de estoque:
  - Quando a cozinha marca item como PRONTO
  - Calcula quantidade baseada na demanda atual
  - Subtrai automaticamente do estoque correspondente
  - Garantia de baixa única por produção confirmada
- Dashboard da cozinha atualizado:
  - Exibe estoque atual de cada item
  - Alertas visuais de estoque mínimo
  - Bloqueio de produção se estoque insuficiente
  - Mensagem clara: "Estoque insuficiente para produzir"
  - Link direto para página de gerenciamento de estoque
- Regras de segurança:
  - Check-in nunca altera estoque
  - Apenas `estoque.html` permite entrada/saída manual
  - Cozinha NÃO altera estoque manualmente
  - Estoque só é reduzido quando produção é marcada como PRONTO

#### Confirmação de Produção (Fase 6)
- Página da cozinha com seção de status de produção
- Cada item (café, alimento adulto, alimento infantil) possui:
  - Indicador visual de status com emoji
  - Texto do status atual
  - Botão "✔ MARCAR COMO PRONTO"
- Status atualizado em tempo real no Firebase
- Botão desabilitado quando item já está pronto
- Reset automático quando demanda aumenta (mais pessoas entram)

#### Página da Sala para Voluntários (Fase 6)
- Nova página `sala.html` para acesso dos voluntários
- Funcionalidades:
  - Seleção da sala
  - Check-in de participantes (adicionar/remover pessoas)
  - Visualização em tempo real do status de produção
  - Notificações visuais quando itens ficam prontos:
    - "☕ Café pronto!"
    - "🍰 Lanche adulto pronto!"
    - "🧁 Lanche infantil pronto!"
- Notificações desaparecem automaticamente após 10 segundos
- Atualização automática sem reload da página

- ✅ Cálculo automático de demanda baseado em pessoas presentes
- ✅ Quantidade de café necessária (apenas para adultos)
- ✅ Quantidade de alimento adulto necessária
- ✅ Quantidade de alimento infantil necessária
- ✅ Margem de segurança de 10% aplicada
- ✅ Valores arredondados de forma prática
- ✅ Alertas visuais para produção
- ✅ Destaque para sala especial ativa

### Parâmetros de Consumo (Fase 5)

#### Consumo por pessoa:
- **Adulto:**
  - Café: 150 ml
  - Alimento: 250 g
- **Criança:**
  - Café: 0 ml (crianças não consomem café)
  - Alimento: 180 g

#### Margem de segurança:
- 10% (fixa nesta fase)

#### Arredondamento:
Os valores não-exatos são arredondados para o próximo múltiplo de 0,5 acima (para garantir margem de segurança).
Valores já múltiplos exatos de 0,5 permanecem inalterados.

Exemplos: 
- 12,3 L → 12,5 L (arredondado para cima)
- 12,6 L → 13,0 L (arredondado para cima)
- 12,0 L → 12,0 L (já exato, não alterado)
- 12,5 L → 12,5 L (já exato, não alterado)

#### Cálculo de Demanda (Fase 5)
- Cálculo automático em tempo real de:
  - Quantidade de café necessária (em litros)
  - Quantidade de alimento adulto necessária (em kg)
  - Quantidade de alimento infantil necessária (em kg)
- Parâmetros fixos de consumo:
  - Adulto: 150ml café + 250g alimento
  - Criança: 0ml café + 180g alimento
- Margem de segurança de 10% aplicada automaticamente
- Valores arredondados de forma prática (para 0,5 mais próximo)
- Alerta visual "PRODUZIR AGORA" quando há pessoas presentes
- Alerta "Sala especial ativa – priorizar" quando existe sala especial
- Interface clara e destacada para visualização rápida da demanda

#### Dashboard da Cozinha (Fase 4)
- Página dedicada para visualização em tempo real (`cozinha.html`)
- Lista de todas as salas ativas com:
  - Nome da sala
  - Tipo (adulto ou infantil)
  - Quantidade atual de pessoas
  - Destaque visual para sala especial (⭐)
- Totais consolidados:
  - Total de adultos
  - Total de crianças
  - Total geral
- Atualização automática em tempo real
- Interface simples e clara, otimizada para visualização rápida

#### Configuração de Salas (Fase 2)
- Campo para definir quantidade de salas ADULTO
- Campo para definir quantidade de salas CRIANÇA
- Botão "Criar Salas" que gera automaticamente:
  - Sala Adulto 1, Sala Adulto 2, ...
  - Sala Infantil 1, Sala Infantil 2, ...

#### Gerenciamento de Salas
- Visualização de todas as salas criadas
- Cada sala possui:
  - ID único
  - Nome
  - Tipo (adulto ou infantil)
  - Status especial (sim/não)
  - Contador de pessoas (iniciado em 0)

#### Sala Especial
- Permite marcar APENAS UMA sala como especial
- Ao selecionar uma nova sala especial, a anterior é desmarcada automaticamente
- Status salvo no Firebase

#### Persistência
Os dados são salvos no Firebase na seguinte estrutura:
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
    "alimentoAdulto": {
      "status": "A_PRODUZIR" | "EM_PRODUCAO" | "PRONTO",
      "atualizadoEm": string
    },
    "alimentoInfantil": {
      "status": "A_PRODUZIR" | "EM_PRODUCAO" | "PRONTO",
      "atualizadoEm": string
    }
  }
}
```

### ⚠️ O que NÃO está nesta fase

A Fase 7 **NÃO** inclui:
- ❌ Histórico de movimentações de estoque
- ❌ Histórico de produções
- ❌ Edição de parâmetros de consumo
- ❌ Alertas sonoros
- ❌ Autenticação de usuários
- ❌ Relatórios e gráficos

O sistema está completo e operacional para as necessidades básicas de gestão de eventos em igrejas.

## 🛠️ Stack Tecnológica

- **Frontend**: HTML + JavaScript puro (sem frameworks)
- **Hospedagem**: GitHub Pages
- **Banco de Dados**: Firebase Realtime Database
- **Arquitetura**: Frontend estático sem backend

## 📁 Estrutura de Arquivos

```
/
├── index.html      # Página principal (configuração)
├── cozinha.html    # Dashboard da cozinha (Fases 4, 5, 6 e 7)
├── sala.html       # Página da sala para voluntários (Fase 6)
├── estoque.html    # Controle de estoque (Fase 7)
├── app.js          # Lógica da aplicação
├── firebase.js     # Inicialização do Firebase
└── README.md       # Este arquivo
```

## 🚀 Como Usar

### Pré-requisitos

#### 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Clique em "Adicionar projeto"
3. Dê um nome ao projeto (exemplo: "minha-igreja-coffee")
4. Siga o assistente até concluir a criação

#### 2. Ativar o Realtime Database

1. No console do Firebase, vá em "Realtime Database" no menu lateral
2. Clique em "Criar banco de dados"
3. Escolha a localização (recomendado: mais próxima do Brasil)
4. Escolha "Iniciar no modo de teste" (para desenvolvimento)
   
   ⚠️ **IMPORTANTE:** As regras de teste permitem acesso público por 30 dias. 
   Para produção, configure regras de segurança adequadas!

#### 3. **PASSO CRÍTICO:** Configurar o arquivo firebase.js

Este é o passo mais importante! Sem ele, o sistema não funcionará.

1. **Obter suas credenciais:**
   - No Firebase Console, clique no ícone de engrenagem ⚙️ (Configurações do projeto)
   - Role até a seção "Seus apps"
   - Se não houver nenhum app, clique em "Adicionar app" e escolha "Web" (ícone `</>`)
   - Copie o objeto `firebaseConfig` que aparece

2. **Editar o arquivo firebase.js:**
   - Abra o arquivo `firebase.js` na raiz do projeto
   - Localize as linhas 21-28 (o objeto `firebaseConfig`)
   - Substitua TODOS os valores placeholder pelos valores reais que você copiou:
   
   ```javascript
   // ❌ ANTES (valores placeholder - NÃO funcionam)
   const firebaseConfig = {
       apiKey: "SEU_API_KEY_AQUI",
       authDomain: "seu-projeto.firebaseapp.com",
       databaseURL: "https://seu-projeto-default-rtdb.firebaseio.com",
       // ...
   };
   
   // ✅ DEPOIS (valores reais do seu projeto)
   const firebaseConfig = {
       apiKey: "AIzaSyD1234567890abcdefghijklmnop",
       authDomain: "minha-igreja-coffee.firebaseapp.com",
       databaseURL: "https://minha-igreja-coffee-default-rtdb.firebaseio.com",
       // ...
   };
   ```

3. **Salve o arquivo**

⚠️ **NOTA DE SEGURANÇA:** 
- Se você vai fazer um fork público deste repositório, NUNCA faça commit das suas credenciais reais
- Considere usar variáveis de ambiente ou um arquivo de configuração local
- O arquivo `firebase-config.js` está no `.gitignore` para ajudar com isso

### Uso Local

1. Clone o repositório:
   ```bash
   git clone https://github.com/mayconabentes-bi/U.C.D-COFFEE-BREAK.git
   cd U.C.D-COFFEE-BREAK
   ```

2. Configure o git para usar merge ao invés de rebase (recomendado):
   ```bash
   git config pull.rebase false
   ```

3. Abra os arquivos HTML no navegador:
   - **index.html** - Para configuração de salas
   - **cozinha.html** - Para visualização do dashboard da cozinha
   - **sala.html** - Para check-in de voluntários e visualização do status de produção
   - **estoque.html** - Para gerenciamento de estoque (Fase 7)
   
   Você pode simplesmente clicar duas vezes nos arquivos ou usar um servidor local simples:
   ```bash
   python -m http.server 8000
   # ou
   npx serve
   ```

4. Abra o **Console do Navegador** (F12):
   - Você verá logs indicando a conexão com Firebase
   - Verificará se o teste de escrita foi bem-sucedido

### Fluxo de Uso

1. **Configuração Inicial** (index.html):
   - Defina a quantidade de salas adulto e criança
   - Clique em "Criar Salas"
   - Marque uma sala como especial (opcional)

2. **Dashboard da Cozinha** (cozinha.html):
   - Abra em outra aba ou dispositivo
   - Visualize em tempo real todas as salas
   - Acompanhe os totais consolidados
   - A sala especial aparecerá destacada com ⭐
   - Visualize a demanda calculada automaticamente:
     - Quantidade de café necessária
     - Quantidade de alimento adulto necessária
     - Quantidade de alimento infantil necessária
   - Quando houver pessoas presentes, verá o alerta "PRODUZIR AGORA"
   - Se houver sala especial ativa, verá o alerta "Sala especial ativa – priorizar"
   - **FASE 7**: Visualize o estoque atual:
     - Quantidade disponível de cada item
     - Alertas visuais quando estoque ≤ mínimo
     - Alertas de estoque insuficiente para produção
     - Link para gerenciar estoque
   - **FASE 6**: Marque os itens como prontos:
     - Clique em "✔ MARCAR COMO PRONTO" para cada item produzido
     - Acompanhe o status visual com emojis (🟡 🔴 🟢)
     - O botão é desabilitado automaticamente quando o item está pronto
     - **FASE 7**: Estoque é baixado automaticamente ao marcar como pronto

3. **Página da Sala** (sala.html):
   - Abra em dispositivos nas salas (tablets, celulares)
   - Selecione a sala correspondente
   - Faça check-in dos participantes:
     - Use "+ ADICIONAR" para registrar cada pessoa que chega
     - Use "- REMOVER" se alguém sair
   - Acompanhe o status de produção em tempo real:
     - Veja quando o café está pronto
     - Veja quando os lanches estão prontos
     - Notificações visuais aparecem automaticamente quando cada item fica pronto
   - Saiba quando servir os alimentos

4. **Controle de Estoque** (estoque.html):
   - **FASE 7**: Página dedicada à gestão de insumos
   - Visualize todos os itens do estoque:
     - Quantidade atual
     - Estoque mínimo
     - Status (OK ou Alerta)
   - Realize entrada manual:
     - Botões rápidos: +1, +5, +10
   - Realize saída manual:
     - Botão -1 (nunca permite valores negativos)
   - Ajuste o estoque mínimo de cada item
   - Veja alertas visuais de itens com estoque baixo
   - Resumo de alertas no topo da página

5. **Atualização em Tempo Real**:
   - Qualquer mudança na contagem de pessoas em uma sala
   - É automaticamente refletida no dashboard da cozinha
   - Estoque atualizado em tempo real em todas as páginas
   - Sem necessidade de recarregar a página

### Uso via GitHub Pages

1. Acesse as configurações do repositório no GitHub
2. Vá em **Settings** > **Pages**
3. Configure a fonte como `main branch` (ou `master`)
4. Aguarde alguns minutos para o site ser publicado
5. Acesse a URL fornecida: `https://mayconabentes-bi.github.io/U.C.D-COFFEE-BREAK/`

## 🔍 Verificando a Conexão

Após abrir a página:

1. Abra o **Console do Navegador** (pressione F12)
2. Procure por mensagens como:
   - ✅ "Firebase inicializado com sucesso!"
   - ✅ "Conexão com Realtime Database estabelecida"
   - ✅ "SUCESSO! Dados gravados no Firebase"

3. No Firebase Console:
   - Vá até **Realtime Database**
   - Verifique se existe um nó `/teste` com os dados gravados

## 🔐 Configuração de Segurança do Firebase

**ATENÇÃO**: Para esta fase de testes, você pode usar regras abertas, mas **NUNCA** em produção!

Regras de teste (temporárias):
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Para produção, sempre implemente regras de segurança adequadas.

## 🗺️ Roadmap

### Fase 1 - Fundação Técnica ✅ (CONCLUÍDA)
- [x] Estrutura de arquivos
- [x] Conexão com Firebase
- [x] Teste de escrita
- [x] Documentação básica

### Fase 2 - Configuração de Salas ✅ (CONCLUÍDA)
- [x] Interface de configuração de salas
- [x] Geração automática de salas adulto e criança
- [x] Sistema de sala especial (apenas uma por vez)
- [x] Persistência no Firebase Realtime Database
- [x] Carregamento de configurações existentes

### Fase 3 - Check-in ✅ (CONCLUÍDA)
- [x] Registro de pessoas por sala
- [x] Contador de participantes
- [x] Atualização da contagem em tempo real

### Fase 4 - Dashboard da Cozinha ✅ (CONCLUÍDA)
- [x] Página dedicada para visualização (cozinha.html)
- [x] Listagem de salas em tempo real
- [x] Totais consolidados (adultos, crianças, geral)
- [x] Destaque visual para sala especial
- [x] Atualização automática via listeners

### Fase 5 - Cálculo de Demanda ✅ (CONCLUÍDA)
- [x] Cálculo de consumo de café/alimentos
- [x] Parâmetros fixos de consumo (adulto: 150ml café + 250g alimento, criança: 0ml café + 180g alimento)
- [x] Margem de segurança de 10%
- [x] Arredondamento prático de valores
- [x] Alerta visual "PRODUZIR AGORA" quando há pessoas presentes
- [x] Alerta "Sala especial ativa" quando existe sala especial
- [x] Interface de demanda integrada ao dashboard da cozinha

### Fase 6 - Confirmação de Produção ✅ (CONCLUÍDA)
- [x] Estrutura `/producao` no Firebase
- [x] Atualização de status pela cozinha
- [x] Status visuais (🟡 A_PRODUZIR, 🔴 EM_PRODUCAO, 🟢 PRONTO)
- [x] Página da sala (sala.html) para voluntários
- [x] Check-in de participantes por sala
- [x] Exibição em tempo real do status de produção
- [x] Notificações quando itens ficam prontos
- [x] Reset automático quando demanda aumenta

### Fase 7 - Controle de Estoque ✅ (ATUAL - COMPLETA)
- [x] Estrutura `/estoque` no Firebase
- [x] Página estoque.html para gestão de insumos
- [x] Entrada manual de estoque (+1, +5, +10)
- [x] Saída manual de estoque (nunca permite negativos)
- [x] Ajuste de estoque mínimo por item
- [x] Baixa automática de estoque ao marcar produção como PRONTA
- [x] Alertas visuais de estoque mínimo
- [x] Exibição de estoque no dashboard da cozinha
- [x] Verificação de estoque suficiente antes da produção
- [x] Bloqueio de produção quando estoque insuficiente
- [x] Sistema completo e operacional

## 📝 Licença

Este projeto está sob a licença especificada no arquivo LICENSE.

## 👥 Contribuindo

Este projeto está em desenvolvimento inicial. Contribuições serão bem-vindas nas próximas fases.

## 📧 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para a comunidade**