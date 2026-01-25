// app.js
// Lógica principal da aplicação - Fase 2: Configuração de Salas

/**
 * Teste de conexão com Firebase
 * Escreve dados simples no caminho /teste para verificar conectividade
 */
function testarConexaoFirebase() {
    if (!db) {
        console.error("❌ Firebase não está inicializado. Configure o arquivo firebase.js primeiro.");
        return;
    }
    
    const dadosTeste = {
        status: "ok",
        timestamp: new Date().toISOString()
    };
    
    db.ref('/teste').set(dadosTeste)
        .catch((error) => {
            console.error("❌ ERRO ao testar conexão:", error);
        });
}

/**
 * Aguarda o carregamento completo do DOM antes de executar
 */
document.addEventListener('DOMContentLoaded', function() {
    if (!db) {
        console.error("❌ Firebase não configurado! Configure firebase.js - veja README.md");
        return;
    }
    
    testarConexaoFirebase();
    carregarDadosFirebase();
    
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
    
    configRef.once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const config = snapshot.val();
                document.getElementById('qtdAdulto').value = config.salasAdulto || 0;
                document.getElementById('qtdCrianca').value = config.salasCrianca || 0;
                return salasRef.once('value');
            }
        })
        .then((snapshot) => {
            if (snapshot && snapshot.exists()) {
                exibirSalas(snapshot.val());
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
    
    const salas = {};
    
    for (let i = 1; i <= qtdAdulto; i++) {
        salas[`adulto_${i}`] = {
            nome: `Sala Adulto ${i}`,
            tipo: "adulto",
            especial: false,
            pessoas: 0
        };
    }
    
    for (let i = 1; i <= qtdCrianca; i++) {
        salas[`infantil_${i}`] = {
            nome: `Sala Infantil ${i}`,
            tipo: "infantil",
            especial: false,
            pessoas: 0
        };
    }
    
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
    
    db.ref('/configuracao').set(configuracao)
        .then(() => db.ref('/salas').set(salas))
        .then(() => exibirSalas(salas))
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
 */
function marcarSalaEspecial(salaId, isChecked) {
    const salasRef = db.ref('/salas');
    const configRef = db.ref('/configuracao');
    
    salasRef.once('value')
        .then((snapshot) => {
            const salas = snapshot.val();
            
            if (isChecked) {
                for (const id in salas) {
                    salas[id].especial = (id === salaId);
                }
            } else {
                if (salas[salaId]) {
                    salas[salaId].especial = false;
                }
            }
            
            const salaEspecialId = isChecked ? salaId : "";
            
            return Promise.all([
                salasRef.set(salas),
                configRef.update({ salaEspecialId: salaEspecialId })
            ]);
        })
        .then(() => salasRef.once('value'))
        .then((snapshot) => exibirSalas(snapshot.val()))
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
    if (!db) {
        console.error("❌ Firebase não configurado");
        document.getElementById('listaSalas').innerHTML = 
            '<div class="empty-message">Erro: Firebase não configurado</div>';
        return;
    }
    
    const salasRef = db.ref('/salas');
    
    salasRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
            exibirDashboardCozinha(snapshot.val());
        } else {
            document.getElementById('listaSalas').innerHTML = 
                '<div class="empty-message">Nenhuma sala criada ainda.</div>';
            atualizarTotais(0, 0);
            atualizarDemandaUI(calcularDemanda(0, 0, false));
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
    const listaSalas = document.getElementById('listaSalas');
    
    if (!salas || Object.keys(salas).length === 0) {
        listaSalas.innerHTML = '<div class="empty-message">Nenhuma sala criada ainda.</div>';
        atualizarTotais(0, 0);
        atualizarDemandaUI(calcularDemanda(0, 0, false));
        return;
    }
    
    listaSalas.innerHTML = '';
    
    const salasArray = Object.entries(salas).map(([id, sala]) => ({
        id,
        ...sala
    }));
    
    salasArray.sort((a, b) => {
        if (a.especial && !b.especial) return -1;
        if (!a.especial && b.especial) return 1;
        if (a.tipo === 'adulto' && b.tipo === 'infantil') return -1;
        if (a.tipo === 'infantil' && b.tipo === 'adulto') return 1;
        return a.nome.localeCompare(b.nome);
    });
    
    salasArray.forEach(sala => {
        const div = document.createElement('div');
        div.className = 'sala-item';
        
        if (sala.tipo === 'infantil') {
            div.classList.add('infantil');
        }
        
        if (sala.especial) {
            div.classList.add('especial');
        }
        
        const nomeDiv = document.createElement('div');
        nomeDiv.className = 'sala-nome';
        nomeDiv.innerHTML = sala.especial 
            ? `<span class="especial-icon">⭐</span>${sala.nome}` 
            : sala.nome;
        
        const pessoasDiv = document.createElement('div');
        pessoasDiv.className = 'sala-pessoas';
        pessoasDiv.textContent = sala.pessoas || 0;
        
        div.appendChild(nomeDiv);
        div.appendChild(pessoasDiv);
        listaSalas.appendChild(div);
    });
    
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
        
        if (sala.especial) {
            temSalaEspecial = true;
        }
    });
    
    atualizarTotais(totalAdultos, totalCriancas);
    
    const demanda = calcularDemanda(totalAdultos, totalCriancas, temSalaEspecial);
    atualizarDemandaUI(demanda);
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
        .catch((error) => {
            console.error("❌ Erro ao inicializar produção:", error);
        });
}

/**
 * Atualiza o status de um item de produção
 */
function atualizarStatusProducao(item, novoStatus) {
    const producaoRef = db.ref(`/producao/${item}`);
    
    const update = {
        status: novoStatus,
        atualizadoEm: new Date().toISOString()
    };
    
    producaoRef.update(update)
        .catch((error) => {
            console.error(`❌ Erro ao atualizar status de ${item}:`, error);
        });
}

/**
 * Marca um item como PRONTO e realiza baixa automática do estoque
 */
function marcarComoPronto(item) {
    const producaoRef = db.ref(`/producao/${item}`);
    
    producaoRef.once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const producaoData = snapshot.val();
                
                if (producaoData.status === STATUS_PRODUCAO.PRONTO) {
                    return Promise.reject('JA_PRONTO');
                }
                
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
            
            const demanda = calcularDemanda(totalAdultos, totalCriancas, false);
            
            let quantidadeBaixar = 0;
            if (item === 'cafe') {
                quantidadeBaixar = demanda.cafe;
            } else if (item === 'alimentoAdulto') {
                quantidadeBaixar = demanda.alimentoAdulto;
            } else if (item === 'alimentoInfantil') {
                quantidadeBaixar = demanda.alimentoInfantil;
            }
            
            if (quantidadeBaixar > 0) {
                return baixarEstoqueAutomatico(item, quantidadeBaixar);
            }
        })
        .then(() => {
            return atualizarStatusProducao(item, STATUS_PRODUCAO.PRONTO);
        })
        .catch((error) => {
            if (error !== 'JA_PRONTO') {
                console.error(`❌ Erro ao marcar ${item} como pronto:`, error);
                alert('Erro ao marcar item como pronto');
            }
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
 */
function escutarStatusProducao(callback) {
    const producaoRef = db.ref('/producao');
    
    producaoRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
            callback(snapshot.val());
        }
    }, (error) => {
        console.error("❌ Erro ao escutar status de produção:", error);
    });
}

/**
 * Retorna o emoji correspondente ao status
 */
function getEmojiStatus(status) {
    const statusMap = {
        [STATUS_PRODUCAO.A_PRODUZIR]: "🟡",
        [STATUS_PRODUCAO.EM_PRODUCAO]: "🔴",
        [STATUS_PRODUCAO.PRONTO]: "🟢"
    };
    return statusMap[status] || "⚪";
}

/**
 * Retorna o texto formatado do status
 */
function getTextoStatus(status) {
    const statusMap = {
        [STATUS_PRODUCAO.A_PRODUZIR]: "A PRODUZIR",
        [STATUS_PRODUCAO.EM_PRODUCAO]: "EM PRODUÇÃO",
        [STATUS_PRODUCAO.PRONTO]: "PRONTO"
    };
    return statusMap[status] || "DESCONHECIDO";
}

/**
 * Verifica se a demanda mudou e reseta status se necessário
 */
function verificarMudancaDemanda(demandaAtual) {
    const producaoRef = db.ref('/producao');
    
    const aumentouCafe = demandaAtual.cafe > estadoProducao.demandaAnterior.cafe;
    const aumentouAlimentoAdulto = demandaAtual.alimentoAdulto > estadoProducao.demandaAnterior.alimentoAdulto;
    const aumentouAlimentoInfantil = demandaAtual.alimentoInfantil > estadoProducao.demandaAnterior.alimentoInfantil;
    
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
                    }
                    
                    if (aumentouAlimentoAdulto && producao.alimentoAdulto.status === STATUS_PRODUCAO.PRONTO) {
                        updates['/producao/alimentoAdulto'] = {
                            status: STATUS_PRODUCAO.A_PRODUZIR,
                            atualizadoEm: new Date().toISOString()
                        };
                    }
                    
                    if (aumentouAlimentoInfantil && producao.alimentoInfantil.status === STATUS_PRODUCAO.PRONTO) {
                        updates['/producao/alimentoInfantil'] = {
                            status: STATUS_PRODUCAO.A_PRODUZIR,
                            atualizadoEm: new Date().toISOString()
                        };
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
 */
function calcularDemanda(totalAdultos, totalCriancas, temSalaEspecial) {
    const cafeBase = totalAdultos * PARAMETROS_CONSUMO.adulto.cafe;
    const alimentoAdultoBase = totalAdultos * PARAMETROS_CONSUMO.adulto.alimento;
    const alimentoInfantilBase = totalCriancas * PARAMETROS_CONSUMO.crianca.alimento;
    
    const margem = 1 + PARAMETROS_CONSUMO.margemSeguranca;
    const cafe = cafeBase * margem;
    const alimentoAdulto = alimentoAdultoBase * margem;
    const alimentoInfantil = alimentoInfantilBase * margem;
    
    const cafeLitros = arredondarPratico(cafe / 1000);
    const alimentoAdultoKg = arredondarPratico(alimentoAdulto / 1000);
    const alimentoInfantilKg = arredondarPratico(alimentoInfantil / 1000);
    
    return {
        cafe: cafeLitros,
        alimentoAdulto: alimentoAdultoKg,
        alimentoInfantil: alimentoInfantilKg,
        temPessoas: (totalAdultos + totalCriancas) > 0,
        temSalaEspecial: temSalaEspecial
    };
}

/**
 * Arredonda valores para o próximo múltiplo de 0,5
 * Exemplos: 12,3 → 12,5 | 12,6 → 13,0 | 12,0 → 12,0 | 12,5 → 12,5
 */
function arredondarPratico(valor) {
    return Math.ceil(valor * 2) / 2;
}

/**
 * Formata número com vírgula (padrão brasileiro)
 */
function formatarNumero(numero, decimais = 1) {
    return numero.toFixed(decimais).replace('.', ',');
}

/**
 * Atualiza a interface com os valores de demanda calculados
 */
function atualizarDemandaUI(demanda) {
    const elemCafe = document.getElementById('demandaCafe');
    const elemAlimentoAdulto = document.getElementById('demandaAlimentoAdulto');
    const elemAlimentoInfantil = document.getElementById('demandaAlimentoInfantil');
    
    if (elemCafe) elemCafe.textContent = `${formatarNumero(demanda.cafe)} L`;
    if (elemAlimentoAdulto) elemAlimentoAdulto.textContent = `${formatarNumero(demanda.alimentoAdulto)} kg`;
    if (elemAlimentoInfantil) elemAlimentoInfantil.textContent = `${formatarNumero(demanda.alimentoInfantil)} kg`;
    
    const alertaProduzir = document.getElementById('alertaProduzir');
    if (alertaProduzir) {
        alertaProduzir.classList.toggle('ativo', demanda.temPessoas);
    }
    
    const alertaEspecial = document.getElementById('alertaEspecial');
    if (alertaEspecial) {
        alertaEspecial.classList.toggle('ativo', demanda.temSalaEspecial);
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
        .catch((error) => {
            console.error("❌ Erro ao inicializar estoque:", error);
        });
}

/**
 * Escuta mudanças no estoque em tempo real
 */
function escutarEstoque(callback) {
    const estoqueRef = db.ref('/estoque');
    
    estoqueRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
            callback(snapshot.val());
        }
    }, (error) => {
        console.error("❌ Erro ao escutar estoque:", error);
    });
}

/**
 * Adiciona quantidade ao estoque (entrada manual)
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
        .catch((error) => {
            console.error(`❌ Erro ao adicionar estoque de ${item}:`, error);
        });
}

/**
 * Remove quantidade do estoque (saída manual)
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
        .catch((error) => {
            console.error(`❌ Erro ao remover estoque de ${item}:`, error);
        });
}

/**
 * Atualiza o estoque mínimo de um item
 */
function atualizarEstoqueMinimoFirebase(item, novoMinimo) {
    const itemRef = db.ref(`/estoque/${item}`);
    
    itemRef.update({ estoqueMinimo: novoMinimo })
        .then(() => {
            alert('Estoque mínimo atualizado com sucesso!');
        })
        .catch((error) => {
            console.error(`❌ Erro ao atualizar estoque mínimo de ${item}:`, error);
            alert('Erro ao atualizar estoque mínimo');
        });
}

/**
 * Realiza baixa automática do estoque baseado na produção pronta
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
        .catch((error) => {
            console.error(`❌ Erro ao baixar estoque de ${item}:`, error);
            throw error;
        });
}

/**
 * Verifica se há estoque suficiente para produzir
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
            
            const items = [
                { key: 'cafe', nome: 'Café', unidade: 'L' },
                { key: 'alimentoAdulto', nome: 'Alimento Adulto', unidade: 'kg' },
                { key: 'alimentoInfantil', nome: 'Alimento Infantil', unidade: 'kg' }
            ];
            
            items.forEach(item => {
                if (demanda[item.key] > 0 && estoque[item.key].quantidadeAtual < demanda[item.key]) {
                    faltantes.push(`${item.nome} (necessário: ${formatarNumero(demanda[item.key])}${item.unidade}, disponível: ${formatarNumero(estoque[item.key].quantidadeAtual)}${item.unidade})`);
                }
            });
            
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
