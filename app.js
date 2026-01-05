// app.js
// Lógica principal da aplicação - Fase 2: Configuração de Salas

/**
 * Teste de conexão com Firebase
 * Escreve dados simples no caminho /teste para verificar conectividade
 */
function testarConexaoFirebase() {
    // Verificar se db está disponível
    if (!db) {
        console.error("❌ Firebase não está inicializado. Configure o arquivo firebase.js primeiro.");
        return;
    }
    
    // Dados de teste
    const dadosTeste = {
        status: "ok",
        timestamp: new Date().toISOString()
    };
    
    // Escrever no Firebase
    db.ref('/teste').set(dadosTeste)
        .then(() => {
            console.log("✅ SUCESSO! Conexão com Firebase confirmada. Dados gravados em /teste");
        })
        .catch((error) => {
            console.error("❌ ERRO ao testar conexão:", error);
        });
}

/**
 * Aguarda o carregamento completo do DOM antes de executar
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Aplicação iniciada - Fase 2");
    
    // Verificar se Firebase está configurado antes de continuar
    if (!db) {
        console.error("❌ APLICAÇÃO NÃO PODE INICIAR: Firebase não configurado!");
        console.error("   Por favor, configure o arquivo firebase.js com suas credenciais.");
        console.error("   Veja o README.md para instruções detalhadas.");
        return; // Não continuar a inicialização
    }
    
    // Testar conexão com Firebase
    testarConexaoFirebase();
    
    // Carregar dados existentes do Firebase
    carregarDadosFirebase();
    
    // Configurar evento do botão criar salas
    const btnCriarSalas = document.getElementById('btnCriarSalas');
    if (btnCriarSalas) {
        btnCriarSalas.addEventListener('click', criarSalas);
    }
});

/**
 * Carrega dados existentes do Firebase ao inicializar
 */
function carregarDadosFirebase() {
    const configRef = db.ref('/configuracao');
    const salasRef = db.ref('/salas');
    
    // Carregar configuração
    configRef.once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const config = snapshot.val();
                console.log("✅ Configuração carregada:", config);
                
                // Preencher campos do formulário
                document.getElementById('qtdAdulto').value = config.salasAdulto || 0;
                document.getElementById('qtdCrianca').value = config.salasCrianca || 0;
                
                // Carregar salas
                return salasRef.once('value');
            }
        })
        .then((snapshot) => {
            if (snapshot && snapshot.exists()) {
                const salas = snapshot.val();
                console.log("✅ Salas carregadas:", salas);
                exibirSalas(salas);
            }
        })
        .catch((error) => {
            console.error("❌ Erro ao carregar dados:", error);
        });
}

/**
 * Cria as salas com base nos valores informados
 */
function criarSalas() {
    const qtdAdulto = parseInt(document.getElementById('qtdAdulto').value) || 0;
    const qtdCrianca = parseInt(document.getElementById('qtdCrianca').value) || 0;
    
    if (qtdAdulto === 0 && qtdCrianca === 0) {
        alert("Por favor, informe a quantidade de salas!");
        return;
    }
    
    console.log(`📝 Criando ${qtdAdulto} salas adulto e ${qtdCrianca} salas criança...`);
    
    const salas = {};
    
    // Gerar salas adulto
    for (let i = 1; i <= qtdAdulto; i++) {
        const id = `adulto_${i}`;
        salas[id] = {
            nome: `Sala Adulto ${i}`,
            tipo: "adulto",
            especial: false,
            pessoas: 0
        };
    }
    
    // Gerar salas infantil
    for (let i = 1; i <= qtdCrianca; i++) {
        const id = `infantil_${i}`;
        salas[id] = {
            nome: `Sala Infantil ${i}`,
            tipo: "infantil",
            especial: false,
            pessoas: 0
        };
    }
    
    // Salvar no Firebase
    salvarNoFirebase(qtdAdulto, qtdCrianca, salas);
}

/**
 * Salva a configuração e salas no Firebase
 */
function salvarNoFirebase(qtdAdulto, qtdCrianca, salas) {
    const configuracao = {
        salasAdulto: qtdAdulto,
        salasCrianca: qtdCrianca,
        salaEspecialId: ""
    };
    
    // Salvar configuração
    db.ref('/configuracao').set(configuracao)
        .then(() => {
            console.log("✅ Configuração salva no Firebase");
            // Salvar salas
            return db.ref('/salas').set(salas);
        })
        .then(() => {
            console.log("✅ Salas salvas no Firebase");
            exibirSalas(salas);
        })
        .catch((error) => {
            console.error("❌ Erro ao salvar no Firebase:", error);
            alert("Erro ao salvar dados. Verifique o console.");
        });
}

/**
 * Exibe a lista de salas criadas na interface
 */
function exibirSalas(salas) {
    const listaSalas = document.getElementById('listaSalas');
    listaSalas.innerHTML = '';
    
    if (!salas || Object.keys(salas).length === 0) {
        listaSalas.innerHTML = '<p>Nenhuma sala criada ainda.</p>';
        return;
    }
    
    // Criar lista de salas
    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = '0';
    
    for (const [id, sala] of Object.entries(salas)) {
        const li = document.createElement('li');
        li.style.marginBottom = '10px';
        li.style.padding = '10px';
        li.style.backgroundColor = sala.especial ? '#fffacd' : '#f9f9f9';
        li.style.border = '1px solid #ddd';
        li.style.borderRadius = '5px';
        
        // Nome da sala
        const nomeSpan = document.createElement('span');
        nomeSpan.textContent = `${sala.nome} (${sala.tipo})`;
        nomeSpan.style.fontWeight = sala.especial ? 'bold' : 'normal';
        
        // Checkbox para marcar como especial
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = sala.especial;
        checkbox.style.marginLeft = '10px';
        checkbox.addEventListener('change', (e) => marcarSalaEspecial(id, e.target.checked));
        
        const labelEspecial = document.createElement('label');
        labelEspecial.textContent = ' Sala Especial';
        labelEspecial.style.marginLeft = '5px';
        
        li.appendChild(nomeSpan);
        li.appendChild(checkbox);
        li.appendChild(labelEspecial);
        
        ul.appendChild(li);
    }
    
    listaSalas.appendChild(ul);
}

/**
 * Marca uma sala como especial e desmarca as demais
 * Se isChecked for false, remove a sala especial
 */
function marcarSalaEspecial(salaId, isChecked) {
    const salasRef = db.ref('/salas');
    const configRef = db.ref('/configuracao');
    
    // Primeiro, carregar todas as salas
    salasRef.once('value')
        .then((snapshot) => {
            const salas = snapshot.val();
            
            // Atualizar todas as salas
            if (isChecked) {
                // Marcar apenas a selecionada como especial
                for (const id in salas) {
                    salas[id].especial = (id === salaId);
                }
            } else {
                // Desmarcar a sala especial
                if (salas[salaId]) {
                    salas[salaId].especial = false;
                }
            }
            
            // Determinar qual sala é especial agora
            const salaEspecialId = isChecked ? salaId : "";
            
            // Salvar salas atualizadas
            return Promise.all([
                salasRef.set(salas),
                configRef.update({ salaEspecialId: salaEspecialId })
            ]);
        })
        .then(() => {
            console.log(`✅ Sala ${salaId} ${isChecked ? 'marcada' : 'desmarcada'} como especial`);
            // Recarregar salas para atualizar interface
            return salasRef.once('value');
        })
        .then((snapshot) => {
            const salas = snapshot.val();
            exibirSalas(salas);
        })
        .catch((error) => {
            console.error("❌ Erro ao marcar sala especial:", error);
        });
}

// ============================================
// FUNÇÕES DA COZINHA - FASE 4
// ============================================

/**
 * Inicializa o dashboard da cozinha
 * Configura listener em tempo real para mudanças nas salas
 */
function iniciarDashboardCozinha() {
    // Verificar se Firebase está disponível
    if (!db) {
        console.error("❌ Firebase não está inicializado ao iniciar dashboard.");
        document.getElementById('listaSalas').innerHTML = 
            '<div class="empty-message">Erro: Firebase não configurado</div>';
        return;
    }
    
    console.log("📊 Iniciando listener em tempo real para salas...");
    const salasRef = db.ref('/salas');
    
    // Listener em tempo real - onValue dispara sempre que há mudanças
    salasRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
            const salas = snapshot.val();
            console.log("🔄 Atualização em tempo real:", Object.keys(salas).length, "salas encontradas");
            exibirDashboardCozinha(salas);
        } else {
            // Nenhuma sala criada ainda
            console.log("⚠️ Nenhuma sala encontrada no Firebase");
            document.getElementById('listaSalas').innerHTML = 
                '<div class="empty-message">Nenhuma sala criada ainda.</div>';
            atualizarTotais(0, 0);
            // Atualizar demanda para zero
            const demanda = calcularDemanda(0, 0, false);
            atualizarDemandaUI(demanda);
        }
    }, (error) => {
        console.error("❌ Erro ao escutar salas:", error);
        document.getElementById('listaSalas').innerHTML = 
            '<div class="empty-message">Erro ao carregar salas.</div>';
    });
}

/**
 * Exibe o dashboard da cozinha com as salas e totais
 */
function exibirDashboardCozinha(salas) {
    console.log("🖼️ Exibindo dashboard com salas:", Object.keys(salas));
    const listaSalas = document.getElementById('listaSalas');
    
    if (!salas || Object.keys(salas).length === 0) {
        console.log("⚠️ Nenhuma sala para exibir");
        listaSalas.innerHTML = '<div class="empty-message">Nenhuma sala criada ainda.</div>';
        atualizarTotais(0, 0);
        // Atualizar demanda para zero
        const demanda = calcularDemanda(0, 0, false);
        atualizarDemandaUI(demanda);
        return;
    }
    
    // Limpar conteúdo
    listaSalas.innerHTML = '';
    
    // Converter objeto em array para ordenar
    const salasArray = Object.entries(salas).map(([id, sala]) => ({
        id,
        ...sala
    }));
    
    console.log("📋 Total de salas a exibir:", salasArray.length);
    
    // Ordenar: salas especiais primeiro, depois por tipo (adulto, infantil)
    salasArray.sort((a, b) => {
        if (a.especial && !b.especial) return -1;
        if (!a.especial && b.especial) return 1;
        if (a.tipo === 'adulto' && b.tipo === 'infantil') return -1;
        if (a.tipo === 'infantil' && b.tipo === 'adulto') return 1;
        return a.nome.localeCompare(b.nome);
    });
    
    // Criar elemento para cada sala
    salasArray.forEach(sala => {
        const div = document.createElement('div');
        div.className = 'sala-item';
        
        // Adicionar classe de tipo
        if (sala.tipo === 'infantil') {
            div.classList.add('infantil');
        }
        
        // Adicionar classe especial se aplicável
        if (sala.especial) {
            div.classList.add('especial');
        }
        
        // Nome da sala com ícone para sala especial
        const nomeDiv = document.createElement('div');
        nomeDiv.className = 'sala-nome';
        nomeDiv.innerHTML = sala.especial 
            ? `<span class="especial-icon">⭐</span>${sala.nome}` 
            : sala.nome;
        
        // Quantidade de pessoas
        const pessoasDiv = document.createElement('div');
        pessoasDiv.className = 'sala-pessoas';
        pessoasDiv.textContent = sala.pessoas || 0;
        
        div.appendChild(nomeDiv);
        div.appendChild(pessoasDiv);
        listaSalas.appendChild(div);
        
        console.log(`  ✅ Sala exibida: ${sala.nome} - ${sala.pessoas || 0} pessoas`);
    });
    
    console.log("✅ Dashboard atualizado com sucesso!");
    
    // Calcular e atualizar totais
    calcularTotais(salasArray);
}

/**
 * Calcula os totais de pessoas por tipo
 */
function calcularTotais(salasArray) {
    let totalAdultos = 0;
    let totalCriancas = 0;
    let temSalaEspecial = false;
    
    salasArray.forEach(sala => {
        const pessoas = sala.pessoas || 0;
        if (sala.tipo === 'adulto') {
            totalAdultos += pessoas;
        } else if (sala.tipo === 'infantil') {
            totalCriancas += pessoas;
        }
        
        // Verificar se há sala especial ativa
        if (sala.especial) {
            temSalaEspecial = true;
        }
    });
    
    atualizarTotais(totalAdultos, totalCriancas);
    
    // Calcular e atualizar demanda (Fase 5)
    const demanda = calcularDemanda(totalAdultos, totalCriancas, temSalaEspecial);
    atualizarDemandaUI(demanda);
    
    // Verificar mudança de demanda e resetar status se necessário (Fase 6)
    verificarMudancaDemanda(demanda);
}

/**
 * Atualiza os elementos de totais na interface
 */
function atualizarTotais(totalAdultos, totalCriancas) {
    const totalGeral = totalAdultos + totalCriancas;
    
    document.getElementById('totalAdultos').textContent = totalAdultos;
    document.getElementById('totalCriancas').textContent = totalCriancas;
    document.getElementById('totalGeral').textContent = totalGeral;
    
    console.log(`📊 Totais: Adultos=${totalAdultos}, Crianças=${totalCriancas}, Geral=${totalGeral}`);
}

// ============================================
// FUNÇÕES DE GESTÃO DE PRODUÇÃO - FASE 6
// ============================================

// Variável para armazenar demanda anterior e detectar mudanças (Fase 6)
// Encapsulada em um objeto para melhor gerenciamento de estado
const estadoProducao = {
    demandaAnterior: { cafe: 0, alimentoAdulto: 0, alimentoInfantil: 0 }
};

/**
 * Estados possíveis de produção
 */
const STATUS_PRODUCAO = {
    A_PRODUZIR: "A_PRODUZIR",
    EM_PRODUCAO: "EM_PRODUCAO",
    PRONTO: "PRONTO"
};

/**
 * Inicializa a estrutura de produção no Firebase se não existir
 */
function inicializarProducao() {
    const producaoRef = db.ref('/producao');
    
    producaoRef.once('value')
        .then((snapshot) => {
            if (!snapshot.exists()) {
                // Criar estrutura inicial
                const producaoInicial = {
                    cafe: {
                        status: STATUS_PRODUCAO.A_PRODUZIR,
                        atualizadoEm: new Date().toISOString()
                    },
                    alimentoAdulto: {
                        status: STATUS_PRODUCAO.A_PRODUZIR,
                        atualizadoEm: new Date().toISOString()
                    },
                    alimentoInfantil: {
                        status: STATUS_PRODUCAO.A_PRODUZIR,
                        atualizadoEm: new Date().toISOString()
                    }
                };
                
                return producaoRef.set(producaoInicial);
            }
        })
        .then(() => {
            console.log("✅ Estrutura de produção inicializada");
        })
        .catch((error) => {
            console.error("❌ Erro ao inicializar produção:", error);
        });
}

/**
 * Atualiza o status de um item de produção
 * @param {string} item - Nome do item (cafe, alimentoAdulto, alimentoInfantil)
 * @param {string} novoStatus - Novo status do item
 */
function atualizarStatusProducao(item, novoStatus) {
    const producaoRef = db.ref(`/producao/${item}`);
    
    const update = {
        status: novoStatus,
        atualizadoEm: new Date().toISOString()
    };
    
    producaoRef.update(update)
        .then(() => {
            console.log(`✅ Status de ${item} atualizado para ${novoStatus}`);
        })
        .catch((error) => {
            console.error(`❌ Erro ao atualizar status de ${item}:`, error);
        });
}

/**
 * Marca um item como PRONTO e realiza baixa automática do estoque (Fase 7)
 * @param {string} item - Nome do item (cafe, alimentoAdulto, alimentoInfantil)
 */
function marcarComoPronto(item) {
    // Verificar se já foi marcado como pronto antes
    const producaoRef = db.ref(`/producao/${item}`);
    
    producaoRef.once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const producaoData = snapshot.val();
                
                // Se já está pronto, não fazer nada
                if (producaoData.status === STATUS_PRODUCAO.PRONTO) {
                    console.log(`⚠️ Item ${item} já está marcado como PRONTO`);
                    return Promise.reject('JA_PRONTO');
                }
                
                // Obter a demanda atual para calcular quanto baixar do estoque
                return db.ref('/salas').once('value');
            }
        })
        .then((snapshot) => {
            if (!snapshot) return;
            
            const salas = snapshot.val();
            let totalAdultos = 0;
            let totalCriancas = 0;
            
            if (salas) {
                Object.values(salas).forEach(sala => {
                    const pessoas = sala.pessoas || 0;
                    if (sala.tipo === 'adulto') {
                        totalAdultos += pessoas;
                    } else if (sala.tipo === 'infantil') {
                        totalCriancas += pessoas;
                    }
                });
            }
            
            // Calcular demanda atual
            const demanda = calcularDemanda(totalAdultos, totalCriancas, false);
            
            // Definir qual quantidade baixar do estoque
            let quantidadeBaixar = 0;
            if (item === 'cafe') {
                quantidadeBaixar = demanda.cafe;
            } else if (item === 'alimentoAdulto') {
                quantidadeBaixar = demanda.alimentoAdulto;
            } else if (item === 'alimentoInfantil') {
                quantidadeBaixar = demanda.alimentoInfantil;
            }
            
            // Realizar baixa automática do estoque
            if (quantidadeBaixar > 0) {
                return baixarEstoqueAutomatico(item, quantidadeBaixar);
            }
        })
        .then(() => {
            // Atualizar status para PRONTO
            return atualizarStatusProducao(item, STATUS_PRODUCAO.PRONTO);
        })
        .catch((error) => {
            if (error === 'JA_PRONTO') {
                // Ignorar se já estava pronto
                return;
            }
            console.error(`❌ Erro ao marcar ${item} como pronto:`, error);
            alert('Erro ao marcar item como pronto');
        });
}

/**
 * Reseta o status de um item para A_PRODUZIR
 * @param {string} item - Nome do item (cafe, alimentoAdulto, alimentoInfantil)
 */
function resetarStatusProducao(item) {
    atualizarStatusProducao(item, STATUS_PRODUCAO.A_PRODUZIR);
}

/**
 * Escuta mudanças no status de produção em tempo real
 * @param {Function} callback - Função a ser chamada quando houver mudanças
 */
function escutarStatusProducao(callback) {
    const producaoRef = db.ref('/producao');
    
    producaoRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
            const producao = snapshot.val();
            console.log("🔄 Status de produção atualizado:", producao);
            callback(producao);
        }
    }, (error) => {
        console.error("❌ Erro ao escutar status de produção:", error);
    });
}

/**
 * Retorna o emoji correspondente ao status
 * @param {string} status - Status do item
 * @returns {string} Emoji correspondente
 */
function getEmojiStatus(status) {
    switch (status) {
        case STATUS_PRODUCAO.A_PRODUZIR:
            return "🟡";
        case STATUS_PRODUCAO.EM_PRODUCAO:
            return "🔴";
        case STATUS_PRODUCAO.PRONTO:
            return "🟢";
        default:
            return "⚪";
    }
}

/**
 * Retorna o texto formatado do status
 * @param {string} status - Status do item
 * @returns {string} Texto formatado
 */
function getTextoStatus(status) {
    switch (status) {
        case STATUS_PRODUCAO.A_PRODUZIR:
            return "A PRODUZIR";
        case STATUS_PRODUCAO.EM_PRODUCAO:
            return "EM PRODUÇÃO";
        case STATUS_PRODUCAO.PRONTO:
            return "PRONTO";
        default:
            return "DESCONHECIDO";
    }
}

/**
 * Verifica se a demanda mudou e reseta status se necessário
 * @param {Object} demandaAtual - Demanda atual calculada
 */
function verificarMudancaDemanda(demandaAtual) {
    const producaoRef = db.ref('/producao');
    
    // Verificar se houve aumento na demanda
    const aumentouCafe = demandaAtual.cafe > estadoProducao.demandaAnterior.cafe;
    const aumentouAlimentoAdulto = demandaAtual.alimentoAdulto > estadoProducao.demandaAnterior.alimentoAdulto;
    const aumentouAlimentoInfantil = demandaAtual.alimentoInfantil > estadoProducao.demandaAnterior.alimentoInfantil;
    
    // Se houve aumento, resetar os status correspondentes
    if (aumentouCafe || aumentouAlimentoAdulto || aumentouAlimentoInfantil) {
        producaoRef.once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const producao = snapshot.val();
                    const updates = {};
                    
                    if (aumentouCafe && producao.cafe.status === STATUS_PRODUCAO.PRONTO) {
                        updates['/producao/cafe'] = {
                            status: STATUS_PRODUCAO.A_PRODUZIR,
                            atualizadoEm: new Date().toISOString()
                        };
                        console.log("🔄 Demanda de café aumentou - resetando status");
                    }
                    
                    if (aumentouAlimentoAdulto && producao.alimentoAdulto.status === STATUS_PRODUCAO.PRONTO) {
                        updates['/producao/alimentoAdulto'] = {
                            status: STATUS_PRODUCAO.A_PRODUZIR,
                            atualizadoEm: new Date().toISOString()
                        };
                        console.log("🔄 Demanda de alimento adulto aumentou - resetando status");
                    }
                    
                    if (aumentouAlimentoInfantil && producao.alimentoInfantil.status === STATUS_PRODUCAO.PRONTO) {
                        updates['/producao/alimentoInfantil'] = {
                            status: STATUS_PRODUCAO.A_PRODUZIR,
                            atualizadoEm: new Date().toISOString()
                        };
                        console.log("🔄 Demanda de alimento infantil aumentou - resetando status");
                    }
                    
                    if (Object.keys(updates).length > 0) {
                        return db.ref().update(updates);
                    }
                }
            })
            .catch((error) => {
                console.error("❌ Erro ao verificar mudança de demanda:", error);
            });
    }
    
    // Atualizar demanda anterior
    estadoProducao.demandaAnterior = {
        cafe: demandaAtual.cafe,
        alimentoAdulto: demandaAtual.alimentoAdulto,
        alimentoInfantil: demandaAtual.alimentoInfantil
    };
}

// ============================================
// FUNÇÕES DE CÁLCULO DE DEMANDA - FASE 5
// ============================================

/**
 * Parâmetros de consumo fixos para Fase 5
 */
const PARAMETROS_CONSUMO = {
    adulto: {
        cafe: 150,      // ml por pessoa
        alimento: 250   // g por pessoa
    },
    crianca: {
        cafe: 0,        // ml por pessoa
        alimento: 180   // g por pessoa
    },
    margemSeguranca: 0.10  // 10%
};

/**
 * Calcula a demanda de café e alimentos
 * @param {number} totalAdultos - Total de adultos presentes
 * @param {number} totalCriancas - Total de crianças presentes
 * @param {boolean} temSalaEspecial - Se existe sala especial ativa
 * @returns {Object} Objeto com as demandas calculadas
 */
function calcularDemanda(totalAdultos, totalCriancas, temSalaEspecial) {
    // Cálculo base
    const cafeBase = totalAdultos * PARAMETROS_CONSUMO.adulto.cafe; // ml
    const alimentoAdultoBase = totalAdultos * PARAMETROS_CONSUMO.adulto.alimento; // g
    const alimentoInfantilBase = totalCriancas * PARAMETROS_CONSUMO.crianca.alimento; // g
    
    // Aplicar margem de segurança
    const margem = 1 + PARAMETROS_CONSUMO.margemSeguranca;
    const cafe = cafeBase * margem; // ml
    const alimentoAdulto = alimentoAdultoBase * margem; // g
    const alimentoInfantil = alimentoInfantilBase * margem; // g
    
    // Converter e arredondar de forma prática
    const cafeLitros = arredondarPratico(cafe / 1000); // ml para litros
    const alimentoAdultoKg = arredondarPratico(alimentoAdulto / 1000); // g para kg
    const alimentoInfantilKg = arredondarPratico(alimentoInfantil / 1000); // g para kg
    
    console.log(`🧮 Demanda calculada: Café=${cafeLitros}L, Alimento adulto=${alimentoAdultoKg}kg, Alimento infantil=${alimentoInfantilKg}kg`);
    
    return {
        cafe: cafeLitros,
        alimentoAdulto: alimentoAdultoKg,
        alimentoInfantil: alimentoInfantilKg,
        temPessoas: (totalAdultos + totalCriancas) > 0,
        temSalaEspecial: temSalaEspecial
    };
}

/**
 * Arredonda valores de forma prática para cima
 * Se o valor não for múltiplo exato de 0,5, arredonda para o próximo 0,5 acima
 * Se o valor já for múltiplo exato de 0,5, mantém o valor
 * Exemplos: 12,3 → 12,5 | 12,6 → 13,0 | 12,0 → 12,0 | 12,5 → 12,5
 * @param {number} valor - Valor a ser arredondado
 * @returns {number} Valor arredondado para o próximo múltiplo de 0,5
 */
function arredondarPratico(valor) {
    // Math.ceil arredonda para cima, mas valores já exatos permanecem iguais
    return Math.ceil(valor * 2) / 2;
}

/**
 * Formata número com vírgula (padrão brasileiro)
 * @param {number} numero - Número a ser formatado
 * @param {number} decimais - Quantidade de casas decimais
 * @returns {string} Número formatado com vírgula
 */
function formatarNumero(numero, decimais = 1) {
    return numero.toFixed(decimais).replace('.', ',');
}

/**
 * Atualiza a interface com os valores de demanda calculados
 * @param {Object} demanda - Objeto com os valores de demanda
 */
function atualizarDemandaUI(demanda) {
    // Atualizar valores de demanda com verificação de elementos
    const elemCafe = document.getElementById('demandaCafe');
    const elemAlimentoAdulto = document.getElementById('demandaAlimentoAdulto');
    const elemAlimentoInfantil = document.getElementById('demandaAlimentoInfantil');
    
    if (elemCafe) elemCafe.textContent = `${formatarNumero(demanda.cafe)} L`;
    if (elemAlimentoAdulto) elemAlimentoAdulto.textContent = `${formatarNumero(demanda.alimentoAdulto)} kg`;
    if (elemAlimentoInfantil) elemAlimentoInfantil.textContent = `${formatarNumero(demanda.alimentoInfantil)} kg`;
    
    // Controlar alerta de produzir
    const alertaProduzir = document.getElementById('alertaProduzir');
    if (alertaProduzir) {
        if (demanda.temPessoas) {
            alertaProduzir.classList.add('ativo');
        } else {
            alertaProduzir.classList.remove('ativo');
        }
    }
    
    // Controlar alerta de sala especial
    const alertaEspecial = document.getElementById('alertaEspecial');
    if (alertaEspecial) {
        if (demanda.temSalaEspecial) {
            alertaEspecial.classList.add('ativo');
        } else {
            alertaEspecial.classList.remove('ativo');
        }
    }
}

// ============================================
// FUNÇÕES DE CONTROLE DE ESTOQUE - FASE 7
// ============================================

/**
 * Inicializa a estrutura de estoque no Firebase se não existir
 */
function inicializarEstoque() {
    const estoqueRef = db.ref('/estoque');
    
    estoqueRef.once('value')
        .then((snapshot) => {
            if (!snapshot.exists()) {
                // Criar estrutura inicial
                const estoqueInicial = {
                    cafe: {
                        nome: "Café",
                        unidade: "litros",
                        quantidadeAtual: 10,
                        estoqueMinimo: 5
                    },
                    alimentoAdulto: {
                        nome: "Alimento Adulto",
                        unidade: "kg",
                        quantidadeAtual: 15,
                        estoqueMinimo: 5
                    },
                    alimentoInfantil: {
                        nome: "Alimento Infantil",
                        unidade: "kg",
                        quantidadeAtual: 10,
                        estoqueMinimo: 3
                    }
                };
                
                return estoqueRef.set(estoqueInicial);
            }
        })
        .then(() => {
            console.log("✅ Estrutura de estoque inicializada");
        })
        .catch((error) => {
            console.error("❌ Erro ao inicializar estoque:", error);
        });
}

/**
 * Escuta mudanças no estoque em tempo real
 * @param {Function} callback - Função a ser chamada quando houver mudanças
 */
function escutarEstoque(callback) {
    const estoqueRef = db.ref('/estoque');
    
    estoqueRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
            const estoque = snapshot.val();
            console.log("🔄 Estoque atualizado:", estoque);
            callback(estoque);
        }
    }, (error) => {
        console.error("❌ Erro ao escutar estoque:", error);
    });
}

/**
 * Adiciona quantidade ao estoque (entrada manual)
 * @param {string} item - Nome do item (cafe, alimentoAdulto, alimentoInfantil)
 * @param {number} quantidade - Quantidade a adicionar
 */
function entradaEstoque(item, quantidade) {
    const itemRef = db.ref(`/estoque/${item}`);
    
    itemRef.once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const itemData = snapshot.val();
                const novaQuantidade = itemData.quantidadeAtual + quantidade;
                return itemRef.update({ quantidadeAtual: novaQuantidade });
            }
        })
        .then(() => {
            console.log(`✅ Entrada de estoque: +${quantidade} em ${item}`);
        })
        .catch((error) => {
            console.error(`❌ Erro ao adicionar estoque de ${item}:`, error);
        });
}

/**
 * Remove quantidade do estoque (saída manual)
 * @param {string} item - Nome do item (cafe, alimentoAdulto, alimentoInfantil)
 * @param {number} quantidade - Quantidade a remover
 */
function saidaEstoque(item, quantidade) {
    const itemRef = db.ref(`/estoque/${item}`);
    
    itemRef.once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const itemData = snapshot.val();
                const novaQuantidade = Math.max(0, itemData.quantidadeAtual - quantidade);
                
                if (itemData.quantidadeAtual === 0) {
                    alert('Estoque já está zerado!');
                    return;
                }
                
                return itemRef.update({ quantidadeAtual: novaQuantidade });
            }
        })
        .then(() => {
            console.log(`✅ Saída de estoque: -${quantidade} em ${item}`);
        })
        .catch((error) => {
            console.error(`❌ Erro ao remover estoque de ${item}:`, error);
        });
}

/**
 * Atualiza o estoque mínimo de um item
 * @param {string} item - Nome do item (cafe, alimentoAdulto, alimentoInfantil)
 * @param {number} novoMinimo - Novo valor de estoque mínimo
 */
function atualizarEstoqueMinimoFirebase(item, novoMinimo) {
    const itemRef = db.ref(`/estoque/${item}`);
    
    itemRef.update({ estoqueMinimo: novoMinimo })
        .then(() => {
            console.log(`✅ Estoque mínimo de ${item} atualizado para ${novoMinimo}`);
            alert('Estoque mínimo atualizado com sucesso!');
        })
        .catch((error) => {
            console.error(`❌ Erro ao atualizar estoque mínimo de ${item}:`, error);
            alert('Erro ao atualizar estoque mínimo');
        });
}

/**
 * Realiza baixa automática do estoque baseado na produção pronta
 * @param {string} item - Nome do item (cafe, alimentoAdulto, alimentoInfantil)
 * @param {number} quantidadeProduzida - Quantidade produzida a ser baixada
 */
function baixarEstoqueAutomatico(item, quantidadeProduzida) {
    const itemRef = db.ref(`/estoque/${item}`);
    
    return itemRef.once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const itemData = snapshot.val();
                const novaQuantidade = Math.max(0, itemData.quantidadeAtual - quantidadeProduzida);
                return itemRef.update({ quantidadeAtual: novaQuantidade });
            }
        })
        .then(() => {
            console.log(`✅ Baixa automática: -${quantidadeProduzida} em ${item}`);
        })
        .catch((error) => {
            console.error(`❌ Erro ao baixar estoque de ${item}:`, error);
            throw error;
        });
}

/**
 * Verifica se há estoque suficiente para produzir
 * @param {Object} demanda - Objeto com cafe, alimentoAdulto, alimentoInfantil
 * @returns {Promise<Object>} Objeto com {suficiente: boolean, faltantes: array}
 */
function verificarEstoqueSuficiente(demanda) {
    const estoqueRef = db.ref('/estoque');
    
    return estoqueRef.once('value')
        .then((snapshot) => {
            if (!snapshot.exists()) {
                return { suficiente: false, faltantes: ['Estoque não inicializado'] };
            }
            
            const estoque = snapshot.val();
            const faltantes = [];
            
            // Verificar cada item
            if (demanda.cafe > 0 && estoque.cafe.quantidadeAtual < demanda.cafe) {
                faltantes.push(`Café (necessário: ${formatarNumero(demanda.cafe)}L, disponível: ${formatarNumero(estoque.cafe.quantidadeAtual)}L)`);
            }
            
            if (demanda.alimentoAdulto > 0 && estoque.alimentoAdulto.quantidadeAtual < demanda.alimentoAdulto) {
                faltantes.push(`Alimento Adulto (necessário: ${formatarNumero(demanda.alimentoAdulto)}kg, disponível: ${formatarNumero(estoque.alimentoAdulto.quantidadeAtual)}kg)`);
            }
            
            if (demanda.alimentoInfantil > 0 && estoque.alimentoInfantil.quantidadeAtual < demanda.alimentoInfantil) {
                faltantes.push(`Alimento Infantil (necessário: ${formatarNumero(demanda.alimentoInfantil)}kg, disponível: ${formatarNumero(estoque.alimentoInfantil.quantidadeAtual)}kg)`);
            }
            
            return {
                suficiente: faltantes.length === 0,
                faltantes: faltantes
            };
        })
        .catch((error) => {
            console.error("❌ Erro ao verificar estoque:", error);
            return { suficiente: false, faltantes: ['Erro ao verificar estoque'] };
        });
}
