
let dadosSalvos = JSON.parse(localStorage.getItem('estudoApp'));

let progresso = dadosSalvos || {
    portugues: { acertos: 0, total: 0 },
    matematica: { acertos: 0, total: 0 },
    estudoMeio: { acertos: 0, total: 0 },
    carteira: { creditos: 0, totalPartidas: 0 },
    personagens: 0
};

// 2. CORREÇÃO CRUCIAL: Se o usuário já tinha o app mas não a carteira, adicionamos agora
if (!progresso.carteira) {
    progresso.carteira = { creditos: 0, totalPartidas: 0 };
    progresso.personagens = 0;
    localStorage.setItem('estudoApp', JSON.stringify(progresso));
}

let acertosDestaSessao = 0;

let perguntasAtuais = [];
let indiceAtual = 0;
let materiaAtiva = "";
let modoDesafio = false;

// --- SISTEMA DE NÃO REPETIÇÃO ---
// Guardamos o ID das perguntas já feitas nesta sessão
let perguntasFeitasIds = []; 

function renderizarQuestao() {
    const zona = document.getElementById('zona-pergunta');
    
    if (indiceAtual >= perguntasAtuais.length) {
        finalizarSessao();
        return;
    }

    const item = perguntasAtuais[indiceAtual];
    
    // Identifica o tema para o CSS
    const classeTema = item.materia === 'portugues' ? 'tema-portugues' : '';

    let html = `<div class="card-pergunta ${classeTema}">
        <span class="badge">${item.materia.toUpperCase()}</span>
        <h3>Pergunta ${indiceAtual + 1} de ${perguntasAtuais.length}</h3>
        <p class="texto-pergunta">${item.q}</p>`;

    if (item.tipo === "input") {
        // Renderiza campo de texto com bloqueio de sinais (+, -, .)
        html += `
            <div class="input-container">
                <input type="number" 
                       id="resposta-user" 
                       class="input-resposta" 
                       placeholder="?" 
                       autofocus
                       oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                       onkeypress="if(event.key === 'Enter') verificarRespostaInput()">
                
                <button class="missao" onclick="verificarRespostaInput()">Verificar Conta</button>
            </div>
        `;
    } else {
        // Renderiza botões com a nova classe de espaçamento
        html += `<div class="opcoes-container">`;
        item.o.forEach((op, i) => {
            html += `<button class="btn-opcao" onclick="verificarResposta(${i})">${op}</button>`;
        });
        html += `</div>`;
    }

    html += `</div>`;
    zona.innerHTML = html;

    // Focar automaticamente no campo
    if(item.tipo === "input") {
        setTimeout(() => {
            const el = document.getElementById('resposta-user');
            if(el) el.focus();
        }, 100);
    }
}

// 1. Para Português e Estudo do Meio (Botões de Opção)
function verificarResposta(escolha) {
    const item = perguntasAtuais[indiceAtual];
    const acertou = escolha === item.r;
    
    // Bloqueia cliques repetidos nos botões
    document.querySelectorAll('.btn-opcao').forEach(b => b.disabled = true);

    // Usa a função mestre para salvar
    registrarResultado(acertou, item.materia);

    if (acertou) {
        mostrarFeedback("✅ CORRETO!", "sucesso");
        setTimeout(proximaQuestao, 1000);
    } else {
        // Mostra qual era a opção correta (texto)
        const respostaCerta = item.o[item.r];
        mostrarFeedback(`❌ A certa era: ${respostaCerta}`, "erro", true);
    }
}

// 2. Para Matemática (Caixa de Texto / Input)
function verificarRespostaInput() {
    const input = document.getElementById('resposta-user');
    if (!input) return;

    const item = perguntasAtuais[indiceAtual];
    const valor = input.value.trim();

    if (valor === "") return;

    const acertou = parseInt(valor) === item.r;
    
    // Usa a mesma função mestre para salvar
    registrarResultado(acertou, item.materia);

    if (acertou) {
        mostrarFeedback("✅ CORRETO!", "sucesso");
        // Desativa o botão para evitar múltiplos envios
        const btn = document.querySelector('.input-container .missao');
        if(btn) btn.disabled = true;
        
        setTimeout(proximaQuestao, 1000);
    } else {
        mostrarFeedback(`❌ Errado! Era ${item.r}`, "erro", true);
    }
}

function mostrarFeedback(mensagem, tipo, persistente = false) {
    // Remove qualquer toast anterior para não acumular
    const anterior = document.querySelector('.feedback-toast');
    if (anterior) anterior.remove();

    const toast = document.createElement('div');
    toast.className = `feedback-toast feedback-${tipo}`;
    
    // Se for erro, adicionamos a instrução informativa
    if (tipo === 'erro') {
        toast.innerHTML = `
            <div>${mensagem}</div>
            <div style="font-size: 0.8rem; margin-top: 8px; font-weight: normal; opacity: 0.9;">
                ⚠️ Clique aqui para continuar
            </div>
        `;
    } else {
        toast.innerText = mensagem;
    }

    document.body.appendChild(toast);

    if (tipo === 'sucesso') {
        // Para o "Correto!", removemos após 3 segundos
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500); // tempo para a animação de sumir
        }, 3000);
    } else {
        // Se for erro, só remove ao clicar
        toast.onclick = () => {
            toast.remove();
            proximaQuestao();
        };
    }
}
function registrarResultado(acertou, materia) {
    if (!progresso[materia]) {
        progresso[materia] = { acertos: 0, total: 0 };
    }

    if (acertou) {
        progresso[materia].acertos++;
        acertosDestaSessao++; // Soma o acerto para a rodada atual
    }
    progresso[materia].total++;

    localStorage.setItem('estudoApp', JSON.stringify(progresso));
    
    if (typeof atualizarPanorama === "function") atualizarPanorama();
}
function proximaQuestao() {
    // 1. Força a saída do foco do botão atual
    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }
    

    const zona = document.getElementById('zona-pergunta');
    if(zona) zona.focus(); // Move o foco para a área geral, longe dos botões

    indiceAtual++;
    renderizarQuestao();
}

// Desafio Diário: 5 de cada sem repetir
function iniciarDesafio() {
    modoDesafio = true;
    indiceAtual = 0;
    let poolDesafio = [];

    // Lista todas as matérias que entram no desafio
    const materias = ['portugues', 'matematica', 'estudoMeio'];

    materias.forEach(m => {
    // Agora lê da nuvem (window.bancoDeDados)
    const materiaFiltro = (m === 'estudoMeio') ? 'estudo' : m;
    const bancoFiltrado = window.bancoDeDados.filter(q => q.materia === materiaFiltro);

    if (bancoFiltrado.length > 0) {
        const extraidas = shuffle([...bancoFiltrado]).slice(0, 3);
        poolDesafio.push(...extraidas);
    }
    });

    perguntasAtuais = shuffle(poolDesafio);
    renderizarQuestao();
}

function finalizarSessao() {
    const zona = document.getElementById('zona-pergunta');
    
    const notaFinal = acertosDestaSessao; 
    let ganhouCredito = false;
    
    if (notaFinal >= 8) {
        progresso.carteira.creditos += 1;
        ganhouCredito = true;
        localStorage.setItem('estudoApp', JSON.stringify(progresso));
    }

    let feedback;
    if (ganhouCredito) {
        feedback = `
            <div style="background:#f1c40f; border: 3px solid #d4ac0d; padding:15px; border-radius:15px;">
                <h2 style="margin:0;">🔥 BRUTAL!</h2>
                <p>Nota: <b>${notaFinal}/10</b></p>
                <p style="font-size:24px;">🪙 +1 CRÉDITO</p>
            </div>`;
    } else {
        feedback = `
            <div style="background:#ecf0f1; padding:15px; border-radius:15px;">
                <h2>Quase lá!</h2>
                <p>Nota: <b>${notaFinal}/10</b></p>
                <p>Precisas de pelo menos <b>8/10</b> para ganhar moedas.</p>
            </div>`;
    }

    zona.innerHTML = `
        <div class="card-pergunta">
            ${feedback}
            <button class="missao" style="margin-top:20px;" onclick="location.reload()">Continuar</button>
        </div>
    `;

    // Limpa para a próxima partida
    acertosDestaSessao = 0; 
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Atualiza o ecrã inicial
function atualizarPanorama() {
    const container = document.getElementById('status-container');
    if (!container) return;

    // Cores para as barras baseadas nas tuas variáveis
    const cores = {
        portugues: "#FFD966",
        matematica: "#3498db",
        estudo: "#78e08f",
        tabuadas: "#ff7675"
    };

    container.innerHTML = ""; // Limpa o carregamento

    // Se não houver progresso ainda
    if (Object.keys(progresso).length === 0) {
        container.innerHTML = "<p style='color:#999'>Faz a tua primeira missão para veres o progresso!</p>";
        return;
    }

    for (const materia in progresso) {
        const dados = progresso[materia];
        const percentagem = Math.round((dados.acertos / dados.total) * 100) || 0;
        const cor = cores[materia] || "#ccc";

        container.innerHTML += `
            <div class="materia-progresso">
                <div class="label-progresso">
                    <span>${materia.toUpperCase()}</span>
                    <span>${percentagem}% (${dados.acertos}/${dados.total})</span>
                </div>
                <div class="barra-fundo">
                    <div class="barra-preenchida" 
                         style="width: ${percentagem}%; background-color: ${cor}; shadow: 0 0 5px ${cor}">
                    </div>
                </div>
            </div>
        `;
    }
}

function resetarProgresso() {
    if (confirm("Tens a certeza que queres apagar todas as tuas estrelas e progresso?")) {
        // Remove especificamente a chave que o teu código usa
        localStorage.removeItem('estudoApp');
        
        // Reinicia a variável local para o estado inicial
        progresso = {
            portugues: { acertos: 0, total: 0 },
            matematica: { acertos: 0, total: 0 },
            estudoMeio: { acertos: 0, total: 0 }
        };

        // Força a atualização visual e da memória
        atualizarPanorama();
        location.reload(); 
    }
}

function iniciarTabuadaDinamica(numero) {
    materiaAtiva = `tabuada${numero}`;
    indiceAtual = 0;
    perguntasAtuais = [];

    // Gerar de 0 a 10 de forma sequencial
    for (let i = 0; i <= 10; i++) {
        perguntasAtuais.push({
            q: `${numero} x ${i} = ?`,
            r: numero * i,
            tipo: "input",
            materia: `tabuada${numero}`
        });
    }

    // Gerir interface
    document.getElementById('menu-treino').style.display = 'none';
    const zona = document.getElementById('zona-pergunta');
    zona.style.display = 'block';

    // Ajustar o botão Voltar para resetar a tabuada
    const btnVoltar = document.getElementById('link-voltar');
    if (btnVoltar) {
        btnVoltar.innerHTML = "⬅ Escolher outra Tabuada";
        btnVoltar.href = "#";
        btnVoltar.onclick = (e) => { e.preventDefault(); location.reload(); };
    }

    renderizarQuestao();
}

// --- PANORAMA FILTRADO (SÓ TABUADAS) ---
function atualizarPanoramaTabuadas() {
    const container = document.getElementById('status-tabuadas');
    if (!container) return;

    container.innerHTML = "";
    
    // Filtramos o progresso para pegar apenas as chaves que começam com "tabuada"
    const tabuadasSalvas = Object.keys(progresso).filter(key => key.startsWith('tabuada'));

    if (tabuadasSalvas.length === 0) {
        container.innerHTML = "<p style='color:#7f8c8d; font-size: 0.9rem;'>Ainda não treinaste nenhuma tabuada.</p>";
        return;
    }

    tabuadasSalvas.forEach(key => {
        const dados = progresso[key];
        const numTabuada = key.replace('tabuada', '');
        const percentagem = Math.round((dados.acertos / dados.total) * 100) || 0;

        container.innerHTML += `
            <div class="materia-progresso">
                <div class="label-progresso">
                    <span>TABUADA DO ${numTabuada}</span>
                    <span>${percentagem}%</span>
                </div>
                <div class="barra-fundo">
                    <div class="barra-preenchida" style="width: ${percentagem}%; background-color: #ff7675;"></div>
                </div>
            </div>
        `;
    });
}

function voltarSelecaoTabuada() {
    const zona = document.getElementById('zona-pergunta');
    const menuTreino = document.getElementById('menu-treino');
    const btnVoltar = document.getElementById('link-voltar');

    // Esconde a zona de perguntas e mostra o menu de números
    zona.style.display = 'none';
    zona.innerHTML = '';
    menuTreino.style.display = 'block';

    // Restaura o botão "Voltar ao Início" original
    if (btnVoltar) {
        btnVoltar.innerHTML = "⬅ Voltar ao Início";
        btnVoltar.onclick = null; // Remove o preventDefault se existir
        btnVoltar.href = "../index.html"; 
    }
}


// 2. Função para ganhar crédito (Chamar no finalizarSessao do exercicios.js)
function validarPremio(acertos, total) {
    if (acertos >= 8) {
        progresso.carteira.creditos += 1;
        salvarProgresso();
        return true;
    }
    return false;
}

// 3. Função para gastar crédito ao jogar
function gastarCredito() {
    if (progresso.carteira.creditos > 0) {
        progresso.carteira.creditos -= 1;
        progresso.carteira.totalPartidas += 1;
        
        // Lógica de ganhar personagem a cada 5 partidas
        if (progresso.carteira.totalPartidas % 5 === 0) {
            progresso.personagens += 1;
            alert("🌟 INCRÍVEL! Desbloqueaste um novo Personagem!");
        }
        
        salvarProgresso();
        return true;
    }
    return false;
}

function salvarProgresso() {
    localStorage.setItem('estudoApp', JSON.stringify(progresso));
    atualizarInterfaceMoedas();
}

function atualizarInterfaceMoedas() {
    const creditos = progresso.carteira.creditos;
    
    // Atualiza no botão do Arcade
    const elBtn = document.getElementById('contador-creditos-btn');
    if(elBtn) elBtn.innerText = creditos;
    
    // Se tiver outros contadores na tela, atualiza também
    const elGeral = document.getElementById('contador-creditos');
    if(elGeral) elGeral.innerText = creditos;
}

function gastarCreditoParaJogar() {
    if (progresso.carteira.creditos > 0) {
        progresso.carteira.creditos -= 1;
        progresso.carteira.totalPartidas += 1;
        
        // Ganha personagem a cada 5 partidas gastas
        if (progresso.carteira.totalPartidas % 5 === 0) {
            progresso.personagens += 1;
            alert("🔥 BRUTAL! Desbloqueaste um novo Personagem!");
        }
        
        localStorage.setItem('estudoApp', JSON.stringify(progresso));
        return true;
    }
    return false;
}
window.addEventListener('load', atualizarInterfaceMoedas);
window.onload = atualizarPanorama;