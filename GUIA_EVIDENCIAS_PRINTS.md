# 📸 GUIA DE EVIDÊNCIAS - VALIDAÇÃO POR PRINTS

**Objetivo:** Este documento lista TODOS os prints necessários para validar que cada fase do sistema U.C.D Coffee Break está funcionando corretamente.

**Como usar:**
1. Execute cada teste descrito
2. Capture o screenshot solicitado
3. Marque ✅ quando capturado
4. Organize os prints em uma pasta com nome da fase

---

## 📋 FASE 1 — INFRAESTRUTURA

### Print 1.1: Site Carregado
**O que fazer:**
1. Abrir `index.html` em um navegador
2. Verificar que a página carrega sem erros

**Print deve mostrar:**
- [ ] Título "U.C.D Coffee Break"
- [ ] Formulário de configuração de salas
- [ ] Sem mensagens de erro Firebase

**Nome do arquivo:** `FASE1_1_site_carregado.png`

---

### Print 1.2: Firebase Console - Nó /teste
**O que fazer:**
1. Abrir Firebase Console
2. Acessar Realtime Database
3. Navegar até o nó `/teste`

**Print deve mostrar:**
- [ ] Nó `/teste` existe
- [ ] Contém `status: "ok"`
- [ ] Contém `timestamp` com data recente

**Nome do arquivo:** `FASE1_2_firebase_teste.png`

---

## 📋 FASE 2 — CONFIGURAÇÃO DE SALAS

### Print 2.1: Tela de Configuração
**O que fazer:**
1. Abrir `index.html`
2. Preencher: 2 salas adulto, 1 sala criança
3. Clicar em "Criar Salas"
4. Aguardar lista de salas aparecer

**Print deve mostrar:**
- [ ] Campos preenchidos (2 e 1)
- [ ] Lista com 3 salas criadas:
  - Sala Adulto 1
  - Sala Adulto 2
  - Sala Infantil 1
- [ ] Checkboxes "Sala Especial" visíveis

**Nome do arquivo:** `FASE2_1_salas_criadas.png`

---

### Print 2.2: Sala Especial Marcada
**O que fazer:**
1. Na mesma tela de index.html
2. Marcar checkbox "Sala Especial" da Sala Adulto 1
3. Verificar mudança visual

**Print deve mostrar:**
- [ ] Checkbox da Sala Adulto 1 marcado ✓
- [ ] Fundo da sala mudou para amarelo claro
- [ ] Outras salas permanecem com fundo normal
- [ ] Apenas uma sala marcada como especial

**Nome do arquivo:** `FASE2_2_sala_especial.png`

---

### Print 2.3: Firebase - Configuração
**O que fazer:**
1. Abrir Firebase Console
2. Navegar até `/configuracao`

**Print deve mostrar:**
- [ ] `salasAdulto: 2`
- [ ] `salasCrianca: 1`
- [ ] `salaEspecialId: "adulto_1"`

**Nome do arquivo:** `FASE2_3_firebase_configuracao.png`

---

### Print 2.4: Firebase - Salas
**O que fazer:**
1. No Firebase Console
2. Navegar até `/salas`
3. Expandir todos os nós

**Print deve mostrar:**
- [ ] Nó `adulto_1` com:
  - `especial: true`
  - `nome: "Sala Adulto 1"`
  - `pessoas: 0`
  - `tipo: "adulto"`
- [ ] Nó `adulto_2` com `especial: false`
- [ ] Nó `infantil_1` com `especial: false`

**Nome do arquivo:** `FASE2_4_firebase_salas.png`

---

### Print 2.5: Persistência (Reload)
**O que fazer:**
1. Com salas criadas, recarregar página (F5)
2. Verificar que dados persistem

**Print deve mostrar:**
- [ ] Campos preenchidos com valores anteriores (2 e 1)
- [ ] Lista de salas carregada automaticamente
- [ ] Sala especial ainda marcada

**Nome do arquivo:** `FASE2_5_persistencia_reload.png`

---

## 📋 FASE 3 — CHECK-IN POR SALA

### Print 3.1: Tela da Sala - Inicial
**O que fazer:**
1. Abrir `sala.html`
2. Selecionar "Sala Adulto 1" no dropdown

**Print deve mostrar:**
- [ ] Dropdown com lista de todas as salas
- [ ] Sala Adulto 1 selecionada
- [ ] Seção de check-in ativa
- [ ] Contador mostrando "0" pessoas
- [ ] Botões "+ ADICIONAR" e "- REMOVER" visíveis

**Nome do arquivo:** `FASE3_1_sala_inicial.png`

---

### Print 3.2: Check-in Com Pessoas
**O que fazer:**
1. Na mesma tela sala.html
2. Clicar 5 vezes em "+ ADICIONAR"

**Print deve mostrar:**
- [ ] Contador mostrando "5" pessoas
- [ ] Contador em tamanho grande e destaque
- [ ] Botões funcionais

**Nome do arquivo:** `FASE3_2_checkin_5_pessoas.png`

---

### Print 3.3: Firebase - Pessoas Atualizadas
**O que fazer:**
1. Abrir Firebase Console
2. Navegar até `/salas/adulto_1/pessoas`

**Print deve mostrar:**
- [ ] Valor atualizado para `5`
- [ ] Timestamp recente

**Nome do arquivo:** `FASE3_3_firebase_pessoas.png`

---

### Print 3.4: Dashboard Refletindo Mudança
**O que fazer:**
1. Manter sala.html aberta com 5 pessoas
2. Abrir `cozinha.html` em outra aba
3. **NÃO recarregar** - atualização deve ser automática

**Print deve mostrar:**
- [ ] Sala Adulto 1 mostrando "5" na coluna de pessoas
- [ ] Total de Adultos = 5
- [ ] Total Geral = 5
- [ ] Atualização ocorreu em tempo real

**Nome do arquivo:** `FASE3_4_dashboard_tempo_real.png`

---

### Print 3.5: Proteção Contra Negativo
**O que fazer:**
1. Em sala.html, com contador em "0"
2. Verificar estado do botão "- REMOVER"

**Print deve mostrar:**
- [ ] Contador em "0"
- [ ] Botão "- REMOVER" desabilitado (cinza)
- [ ] Cursor: not-allowed ao passar mouse

**Nome do arquivo:** `FASE3_5_protecao_negativo.png`

---

## 📋 FASE 4 — DASHBOARD DA COZINHA

### Print 4.1: Dashboard Completo
**O que fazer:**
1. Com salas criadas e pessoas adicionadas
2. Abrir `cozinha.html`

**Print deve mostrar:**
- [ ] Título "🍰 Cozinha"
- [ ] Seção "SALAS ATIVAS" com lista completa
- [ ] Cada sala mostrando nome e número de pessoas
- [ ] Cores diferentes para salas adulto (verde) e infantil (laranja)

**Nome do arquivo:** `FASE4_1_dashboard_completo.png`

---

### Print 4.2: Totais Consolidados
**O que fazer:**
1. Na mesma tela cozinha.html
2. Focar na seção "TOTAIS"

**Print deve mostrar:**
- [ ] Seção "TOTAIS" com fundo azul claro
- [ ] "Adultos: [número]"
- [ ] "Crianças: [número]"
- [ ] "Total Geral: [número]"
- [ ] Valores corretos somando todas as salas

**Nome do arquivo:** `FASE4_2_totais_consolidados.png`

---

### Print 4.3: Sala Especial Destacada
**O que fazer:**
1. Na mesma tela cozinha.html
2. Localizar a sala marcada como especial

**Print deve mostrar:**
- [ ] Sala especial com fundo amarelo
- [ ] Ícone ⭐ antes do nome
- [ ] Fonte em negrito
- [ ] Sala aparece primeiro na lista (ordenação)

**Nome do arquivo:** `FASE4_3_sala_especial_destacada.png`

---

## 📋 FASE 5 — CÁLCULO DE DEMANDA

### Print 5.1: Demanda Calculada
**O que fazer:**
1. Em sala.html, adicionar:
   - 10 pessoas em Sala Adulto 1
   - 5 pessoas em Sala Infantil 1
2. Abrir cozinha.html
3. Focar na seção "DEMANDA ATUAL"

**Print deve mostrar:**
- [ ] Seção "DEMANDA ATUAL" com fundo laranja
- [ ] Café: 2,0 L (ou valor correto)
- [ ] Alimento adulto: 3,0 kg (ou valor correto)
- [ ] Alimento infantil: 1,0 kg (ou valor correto)
- [ ] Valores com vírgula (padrão brasileiro)

**Nome do arquivo:** `FASE5_1_demanda_calculada.png`

---

### Print 5.2: Alerta "PRODUZIR AGORA"
**O que fazer:**
1. Com pessoas presentes (total > 0)
2. Verificar alerta abaixo da demanda

**Print deve mostrar:**
- [ ] Alerta vermelho visível
- [ ] Texto "⚠️ PRODUZIR AGORA"
- [ ] Fonte grande e em negrito
- [ ] Destaque visual claro

**Nome do arquivo:** `FASE5_2_alerta_produzir.png`

---

### Print 5.3: Alerta Sala Especial
**O que fazer:**
1. Com sala especial marcada e pessoas presentes
2. Verificar segundo alerta

**Print deve mostrar:**
- [ ] Alerta amarelo visível
- [ ] Texto "⭐ Sala especial ativa – priorizar"
- [ ] Aparece após o alerta "PRODUZIR AGORA"

**Nome do arquivo:** `FASE5_3_alerta_sala_especial.png`

---

### Print 5.4: Console - Log de Cálculo
**O que fazer:**
1. Abrir Console do navegador (F12)
2. Buscar por log de demanda

**Print deve mostrar:**
- [ ] Log: "🧮 Demanda calculada: Café=..."
- [ ] Valores corretos de café, alimento adulto e infantil
- [ ] Timestamp recente

**Nome do arquivo:** `FASE5_4_console_calculo.png`

---

### Print 5.5: Validação Manual
**O que fazer:**
1. Calcular manualmente:
   - 10 adultos × 150ml = 1500ml = 1,5L
   - Com margem: 1,5L × 1,10 = 1,65L
   - Arredondado: 2,0L
2. Comparar com valor exibido

**Print deve mostrar:**
- [ ] Valor na tela coincide com cálculo manual
- [ ] Margem de 10% aplicada
- [ ] Arredondamento correto (múltiplos de 0,5)

**Nome do arquivo:** `FASE5_5_validacao_manual.png`

---

## 📋 FASE 6 — PRODUÇÃO PRONTA

### Print 6.1: Status Inicial (A PRODUZIR)
**O que fazer:**
1. Abrir cozinha.html
2. Rolar até seção "STATUS DE PRODUÇÃO"

**Print deve mostrar:**
- [ ] Seção "STATUS DE PRODUÇÃO" com fundo verde claro
- [ ] Três itens: Café, Alimento Adulto, Alimento Infantil
- [ ] Todos com emoji 🟡
- [ ] Todos com texto "A PRODUZIR" em laranja/amarelo
- [ ] Botões "✔ MARCAR COMO PRONTO" habilitados

**Nome do arquivo:** `FASE6_1_status_inicial.png`

---

### Print 6.2: Marcando Café Como Pronto
**O que fazer:**
1. Clicar em "✔ MARCAR COMO PRONTO" do Café
2. Aguardar atualização (< 1 segundo)

**Print deve mostrar:**
- [ ] Emoji do café mudou para 🟢
- [ ] Texto mudou para "PRONTO" em verde
- [ ] Botão do café desabilitado (cinza)
- [ ] Outros itens permanecem em A PRODUZIR

**Nome do arquivo:** `FASE6_2_cafe_pronto.png`

---

### Print 6.3: Firebase - Status de Produção
**O que fazer:**
1. Abrir Firebase Console
2. Navegar até `/producao/cafe`

**Print deve mostrar:**
- [ ] `status: "PRONTO"`
- [ ] `atualizadoEm` com timestamp recente
- [ ] Formato ISO 8601 (ex: "2026-01-05T02:20:00.000Z")

**Nome do arquivo:** `FASE6_3_firebase_producao.png`

---

### Print 6.4: Notificação na Sala (Voluntário)
**O que fazer:**
1. Manter sala.html aberta em outra aba
2. Quando café marcado como PRONTO em cozinha.html
3. Alternar para aba sala.html

**Print deve mostrar:**
- [ ] Status do café atualizado para 🟢 PRONTO
- [ ] Notificação visível: "☕ Café pronto!"
- [ ] Fundo verde claro na notificação
- [ ] Borda verde
- [ ] Animação pulsante

**Nome do arquivo:** `FASE6_4_notificacao_sala.png`

---

### Print 6.5: Notificação Desaparece
**O que fazer:**
1. Aguardar 10 segundos após notificação aparecer
2. Verificar se desaparece automaticamente

**Print deve mostrar:**
- [ ] Notificação não mais visível
- [ ] Status do café permanece 🟢 PRONTO
- [ ] Tempo decorrido: ~10 segundos

**Nome do arquivo:** `FASE6_5_notificacao_desapareceu.png`

---

### Print 6.6: Reset Automático - Antes
**O que fazer:**
1. Com café marcado como PRONTO
2. Verificar contador de pessoas atual

**Print deve mostrar:**
- [ ] Café com status 🟢 PRONTO
- [ ] Contador de pessoas (ex: 5)
- [ ] Demanda calculada (ex: Café 2,0 L)

**Nome do arquivo:** `FASE6_6_antes_reset.png`

---

### Print 6.7: Reset Automático - Adicionar Pessoas
**O que fazer:**
1. Em sala.html, adicionar 2 pessoas (aumentar contador)
2. Voltar imediatamente para cozinha.html

**Print deve mostrar:**
- [ ] Contador aumentado (ex: de 5 para 7)
- [ ] Demanda recalculada (ex: Café 2,5 L)
- [ ] Status do café voltou para 🟡 A PRODUZIR
- [ ] Botão reabilitado

**Nome do arquivo:** `FASE6_7_apos_reset.png`

---

### Print 6.8: Console - Log de Reset
**O que fazer:**
1. Abrir Console do navegador (F12) em cozinha.html
2. Buscar por log de reset

**Print deve mostrar:**
- [ ] Log: "🔄 Demanda de café aumentou - resetando status"
- [ ] Timestamp do reset
- [ ] Outros logs de atualização

**Nome do arquivo:** `FASE6_8_console_reset.png`

---

### Print 6.9: Reset NÃO Ocorre ao Diminuir
**O que fazer:**
1. Com café marcado como PRONTO
2. REMOVER pessoas (diminuir contador)
3. Verificar que status permanece PRONTO

**Print deve mostrar:**
- [ ] Contador diminuído
- [ ] Status do café permanece 🟢 PRONTO
- [ ] Nenhum reset ocorreu
- [ ] Botão permanece desabilitado

**Nome do arquivo:** `FASE6_9_sem_reset_diminuir.png`

---

### Print 6.10: Múltiplos Itens Prontos
**O que fazer:**
1. Marcar todos os 3 itens como PRONTO
2. Verificar na sala.html

**Print deve mostrar:**
- [ ] Três notificações simultâneas:
  - "☕ Café pronto!"
  - "🍰 Lanche adulto pronto!"
  - "🧁 Lanche infantil pronto!"
- [ ] Todas com animação pulsante
- [ ] Todas em fundo verde

**Nome do arquivo:** `FASE6_10_multiplos_prontos.png`

---

## 📋 FASE 7 — CONTROLE DE ESTOQUE

### Status: ❌ NÃO IMPLEMENTADO

**Prints não disponíveis** - Fase não foi implementada.

**O que seria necessário:**
- [ ] estoque.html com interface de gerenciamento
- [ ] Cadastro de itens (nome, quantidade, unidade, mínimo)
- [ ] Botões de entrada/saída manual
- [ ] Integração com sistema de produção
- [ ] Alerta de estoque mínimo
- [ ] Bloqueio de produção se estoque insuficiente

---

## 📊 RESUMO DE EVIDÊNCIAS

### Total de Prints por Fase

| Fase | Quantidade | Status |
|------|-----------|--------|
| Fase 1 | 2 prints | ✅ Disponível |
| Fase 2 | 5 prints | ✅ Disponível |
| Fase 3 | 5 prints | ✅ Disponível |
| Fase 4 | 3 prints | ✅ Disponível |
| Fase 5 | 5 prints | ✅ Disponível |
| Fase 6 | 10 prints | ✅ Disponível |
| Fase 7 | 0 prints | ❌ Não implementado |
| **TOTAL** | **30 prints** | **Fases 1-6** |

---

## ✅ CHECKLIST FINAL

Após capturar todos os prints, você terá evidência visual completa de que:

- [ ] ✅ FASE 1: Sistema conecta ao Firebase e funciona
- [ ] ✅ FASE 2: Salas são criadas e persistem
- [ ] ✅ FASE 3: Check-in funciona em tempo real
- [ ] ✅ FASE 4: Dashboard mostra tudo corretamente
- [ ] ✅ FASE 5: Cálculos de demanda estão precisos
- [ ] ✅ FASE 6: Sistema de produção funciona perfeitamente
- [ ] ❌ FASE 7: Não implementado (nenhum print possível)

---

## 📁 ORGANIZAÇÃO SUGERIDA

Crie uma estrutura de pastas para os prints:

```
evidencias/
├── FASE1_INFRAESTRUTURA/
│   ├── FASE1_1_site_carregado.png
│   └── FASE1_2_firebase_teste.png
├── FASE2_CONFIGURACAO/
│   ├── FASE2_1_salas_criadas.png
│   ├── FASE2_2_sala_especial.png
│   ├── FASE2_3_firebase_configuracao.png
│   ├── FASE2_4_firebase_salas.png
│   └── FASE2_5_persistencia_reload.png
├── FASE3_CHECKIN/
│   ├── FASE3_1_sala_inicial.png
│   ├── FASE3_2_checkin_5_pessoas.png
│   ├── FASE3_3_firebase_pessoas.png
│   ├── FASE3_4_dashboard_tempo_real.png
│   └── FASE3_5_protecao_negativo.png
├── FASE4_DASHBOARD/
│   ├── FASE4_1_dashboard_completo.png
│   ├── FASE4_2_totais_consolidados.png
│   └── FASE4_3_sala_especial_destacada.png
├── FASE5_DEMANDA/
│   ├── FASE5_1_demanda_calculada.png
│   ├── FASE5_2_alerta_produzir.png
│   ├── FASE5_3_alerta_sala_especial.png
│   ├── FASE5_4_console_calculo.png
│   └── FASE5_5_validacao_manual.png
└── FASE6_PRODUCAO/
    ├── FASE6_1_status_inicial.png
    ├── FASE6_2_cafe_pronto.png
    ├── FASE6_3_firebase_producao.png
    ├── FASE6_4_notificacao_sala.png
    ├── FASE6_5_notificacao_desapareceu.png
    ├── FASE6_6_antes_reset.png
    ├── FASE6_7_apos_reset.png
    ├── FASE6_8_console_reset.png
    ├── FASE6_9_sem_reset_diminuir.png
    └── FASE6_10_multiplos_prontos.png
```

---

## 🎬 DICAS PARA CAPTURA

1. **Resolução:** Use resolução de tela adequada (mínimo 1366x768)
2. **Zoom:** 100% no navegador para prints consistentes
3. **Console:** Para prints de console, use F12 e aba Console
4. **Firebase:** Para prints do Firebase, use modo claro (melhor legibilidade)
5. **Timing:** Para notificações, use cronômetro para validar 10 segundos
6. **Múltiplas abas:** Use screenshots que mostrem timestamp nas duas abas

---

**Elaborado por:** Sistema de Análise Técnica  
**Data:** 05 de Janeiro de 2026  
**Versão:** 1.0  
**Total de Evidências:** 30 prints para Fases 1-6

---

**FIM DO GUIA DE EVIDÊNCIAS**
