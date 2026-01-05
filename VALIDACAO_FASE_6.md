# Validação Fase 6 - Guia de Testes

Este documento descreve como validar todas as funcionalidades da Fase 6 do U.C.D Coffee Break.

## 📋 Check-list de Validação

### ✅ 1. Conectividade Firebase

**Objetivo:** Verificar se o Firebase inicializa sem erros.

**Passos:**
1. Abra qualquer uma das páginas HTML (index.html, sala.html, ou cozinha.html)
2. Pressione F12 para abrir o Console do Desenvolvedor
3. Verifique as mensagens de log

**Resultado Esperado:**
```
✅ Firebase inicializado com sucesso!
🔗 Conexão com Realtime Database estabelecida
🚀 Aplicação iniciada...
✅ SUCESSO! Conexão com Firebase confirmada. Dados gravados em /teste
```

**Falha se:**
- Aparecer `❌ Erro ao inicializar Firebase:`
- Não aparecer nenhuma mensagem de sucesso

---

### ✅ 2. Configuração de Salas (index.html)

**Objetivo:** Verificar se a criação de salas e marcação de sala especial persiste no banco.

**Passos:**
1. Abra `index.html`
2. Configure:
   - Quantidade de Salas ADULTO: 2
   - Quantidade de Salas CRIANÇA: 1
3. Clique em "Criar Salas"
4. Marque uma sala como "Sala Especial" usando o checkbox
5. Abra o Firebase Console e verifique o Realtime Database

**Resultado Esperado:**
- Lista de 3 salas aparece na interface
- No Firebase Console, em `/salas`:
  - `adulto_1`, `adulto_2`, `infantil_1` existem
  - Cada sala tem: `nome`, `tipo`, `especial`, `pessoas`
- Em `/configuracao`:
  - `salasAdulto: 2`
  - `salasCrianca: 1`
  - `salaEspecialId: "[id da sala marcada]"`
- Apenas uma sala tem `especial: true`

**Falha se:**
- Salas não aparecem na interface
- Dados não aparecem no Firebase
- Mais de uma sala marcada como especial
- Checkbox não funciona

---

### ✅ 3. Sincronização em Tempo Real (sala.html → cozinha.html)

**Objetivo:** Verificar se a adição de pessoas em uma sala reflete instantaneamente no Dashboard da Cozinha.

**Passos:**
1. Abra `cozinha.html` em uma aba/janela
2. Abra `sala.html` em outra aba/janela
3. Em `sala.html`:
   - Selecione uma sala
   - Clique em "+ ADICIONAR" 3 vezes
4. Observe imediatamente o `cozinha.html` (sem recarregar)

**Resultado Esperado:**
- Contador na `sala.html` atualiza para 3
- Dashboard na `cozinha.html` atualiza automaticamente:
  - Número de pessoas na sala aparece como 3
  - Total de adultos/crianças é recalculado
  - Demanda é recalculada automaticamente
- Atualização ocorre em menos de 1 segundo

**Falha se:**
- Número não atualiza no dashboard
- Necessário recarregar a página
- Demora mais de 2 segundos

---

### ✅ 4. Cálculos de Demanda (Fase 5)

**Objetivo:** Verificar se os cálculos aplicam margem de 10% e arredondamento prático (múltiplos de 0,5).

**Passos:**
1. Abra `cozinha.html`
2. Usando `sala.html` em outra aba, adicione:
   - 10 adultos em salas adulto
   - 5 crianças em salas infantil
3. Observe os valores de demanda calculados

**Cálculo Manual Esperado:**

**Café:**
- Base: 10 adultos × 150ml = 1500ml = 1,5L
- Com margem: 1,5L × 1,10 = 1,65L
- Arredondado: 2,0L (próximo 0,5 acima)

**Alimento Adulto:**
- Base: 10 adultos × 250g = 2500g = 2,5kg
- Com margem: 2,5kg × 1,10 = 2,75kg
- Arredondado: 3,0kg (próximo 0,5 acima)

**Alimento Infantil:**
- Base: 5 crianças × 180g = 900g = 0,9kg
- Com margem: 0,9kg × 1,10 = 0,99kg
- Arredondado: 1,0kg (próximo 0,5 acima)

**Resultado Esperado:**
- Café: 2,0 L
- Alimento adulto: 3,0 kg
- Alimento infantil: 1,0 kg
- Alerta "⚠️ PRODUZIR AGORA" aparece
- Console mostra: `🧮 Demanda calculada: Café=2L, Alimento adulto=3kg, Alimento infantil=1kg`

**Falha se:**
- Valores não são arredondados
- Margem de 10% não é aplicada
- Arredondamento não segue múltiplos de 0,5

---

### ✅ 5. Produção - Marcar como Pronto (Fase 6)

**Objetivo:** Verificar se o botão "Marcar como pronto" atualiza o status para 🟢 PRONTO em todas as telas.

**Passos:**
1. Abra `cozinha.html` em uma aba
2. Abra `sala.html` em outra aba (selecione qualquer sala)
3. Na `cozinha.html`, na seção "STATUS DE PRODUÇÃO":
   - Clique em "✔ MARCAR COMO PRONTO" para Café
4. Observe ambas as telas imediatamente

**Resultado Esperado:**

**Em cozinha.html:**
- Emoji muda de 🟡 para 🟢
- Texto muda de "A PRODUZIR" para "PRONTO"
- Cor do texto muda para verde
- Botão é desabilitado (cinza, cursor not-allowed)

**Em sala.html:**
- Status do Café atualiza para 🟢 PRONTO
- Atualização ocorre em menos de 1 segundo
- Notificação "☕ Café pronto!" aparece

**No Firebase Console:**
- `/producao/cafe/status` = "PRONTO"
- `/producao/cafe/atualizadoEm` = timestamp atual

**Falha se:**
- Status não atualiza
- Atualização não é instantânea
- Botão não é desabilitado
- Firebase não é atualizado

---

### ✅ 6. Notificações Visuais (Fase 6)

**Objetivo:** Verificar se o alerta visual de item pronto aparece na página da sala por exatamente 10 segundos.

**Passos:**
1. Abra `sala.html` e selecione uma sala
2. Observe o status inicial (🟡 A PRODUZIR)
3. Abra `cozinha.html` em outra aba
4. Clique em "✔ MARCAR COMO PRONTO" para Alimento Adulto
5. Volte imediatamente para `sala.html`
6. Use um cronômetro/relógio

**Resultado Esperado:**
- Notificação "🍰 Lanche adulto pronto!" aparece instantaneamente
- Notificação tem:
  - Fundo verde claro (#c8e6c9)
  - Borda verde (#4CAF50)
  - Animação pulsante
  - Texto em verde escuro
- Notificação desaparece automaticamente após 10 segundos (±0,5s)
- Não há erro no console

**Falha se:**
- Notificação não aparece
- Notificação desaparece antes de 9,5 segundos
- Notificação permanece após 10,5 segundos
- Notificação não é visível ou mal formatada

**Teste Adicional:**
- Marque todos os 3 itens como prontos rapidamente
- Todas as 3 notificações devem aparecer simultaneamente
- Cada uma desaparece após seus próprios 10 segundos

---

### ✅ 7. Reset Automático do Status (Fase 6)

**Objetivo:** Verificar se o status reseta automaticamente para 🟡 A PRODUZIR quando o número de pessoas aumenta.

**Passos:**
1. Configure uma sala com 5 pessoas (sala.html)
2. Em cozinha.html, marque Café como PRONTO (🟢)
3. Verifique que o status está PRONTO em ambas as telas
4. Volte para sala.html e adicione 1 pessoa (total: 6)
5. Observe o status imediatamente

**Resultado Esperado:**
- Status do Café volta automaticamente para 🟡 A PRODUZIR
- Mudança ocorre em menos de 1 segundo
- Console mostra: `🔄 Demanda de café aumentou - resetando status`
- Botão "Marcar como pronto" é reabilitado em cozinha.html
- Demanda recalculada e atualizada

**Regra de Negócio Validada:**
- Reset APENAS quando:
  1. Demanda aumenta (mais pessoas)
  2. Status atual é PRONTO
- Não reseta se:
  - Pessoas são removidas
  - Status não é PRONTO
  - Demanda permanece igual

**Teste Negativo:**
1. Marque como PRONTO
2. Remova 1 pessoa (diminui demanda)
3. Status deve permanecer PRONTO (não reseta)

**Falha se:**
- Status não reseta quando deveria
- Status reseta quando não deveria (demanda diminui)
- Demanda não é recalculada

---

## 🧪 Testes de Integração

### Teste Completo do Fluxo

**Cenário:** Evento com múltiplas salas e mudanças dinâmicas

**Passos:**
1. Configure 3 salas adulto e 2 salas infantil (index.html)
2. Marque Sala Adulto 2 como especial
3. Abra 3 abas:
   - Aba 1: cozinha.html (Dashboard)
   - Aba 2: sala.html (Sala Adulto 1)
   - Aba 3: sala.html (Sala Adulto 2 - especial)
4. Adicione 10 pessoas na Sala Adulto 1
5. Adicione 8 pessoas na Sala Adulto 2
6. Verifique que o alerta "⭐ Sala especial ativa – priorizar" aparece
7. Marque todos os itens como prontos em cozinha.html
8. Verifique notificações nas duas salas
9. Adicione 2 pessoas na Sala Adulto 1
10. Verifique que status volta para A PRODUZIR

**Resultado Esperado:**
- Todos os totais atualizados corretamente
- Sala especial destacada com ⭐
- Alerta de sala especial aparece
- Demanda calculada corretamente
- Marcação como pronto funciona
- Notificações aparecem em todas as salas
- Reset ocorre apenas na sala que teve aumento

---

## 🐛 Troubleshooting

### Problema: Firebase não inicializa

**Sintomas:**
- Erro no console: `❌ Erro ao inicializar Firebase:`

**Soluções:**
1. Verifique se `firebase.js` tem a configuração correta
2. Confirme que o projeto Firebase existe
3. Verifique regras do Realtime Database
4. Confirme que a API Key é válida

### Problema: Dados não sincronizam

**Sintomas:**
- Mudanças em sala.html não aparecem em cozinha.html

**Soluções:**
1. Abra o console (F12) em ambas as páginas
2. Procure por erros JavaScript
3. Verifique se `db.ref()` está sendo chamado corretamente
4. Confirme que os listeners estão ativos
5. Verifique regras de leitura no Firebase

### Problema: Cálculos incorretos

**Sintomas:**
- Demanda não aplica 10% de margem
- Valores não arredondados corretamente

**Soluções:**
1. Verifique console: `🧮 Demanda calculada:`
2. Calcule manualmente com a fórmula
3. Confirme que `arredondarPratico()` usa `Math.ceil(valor * 2) / 2`

### Problema: Notificações não desaparecem

**Sintomas:**
- Alerta permanece na tela após 10 segundos

**Soluções:**
1. Verifique console por erros JavaScript
2. Confirme que `setTimeout` está configurado para 10000ms
3. Teste em navegador diferente

---

## 📊 Critérios de Sucesso

Todas as 7 validações devem passar para considerar a Fase 6 completa e funcional:

- [x] Firebase inicializa sem erros
- [x] Criação de salas persiste corretamente
- [x] Sincronização em tempo real funciona
- [x] Cálculos aplicam margem e arredondamento
- [x] Botão "Marcar como pronto" funciona
- [x] Notificações aparecem por 10 segundos
- [x] Reset automático ocorre corretamente

---

**Versão:** Fase 6  
**Data:** Janeiro 2026  
**Desenvolvido com ❤️ para a comunidade**
