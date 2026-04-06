let progresso = JSON.parse(localStorage.getItem('estudoApp')) || {
    portugues: { acertos: 0, total: 0 },
    matematica: { acertos: 0, total: 0 },
    estudoMeio: { acertos: 0, total: 0 },
    // Inicializa as tabuadas de 2 a 10 se não existirem
    tabuada2: { acertos: 0, total: 0 },
    tabuada3: { acertos: 0, total: 0 },
    tabuada4: { acertos: 0, total: 0 },
    tabuada5: { acertos: 0, total: 0 },
    tabuada6: { acertos: 0, total: 0 },
    tabuada7: { acertos: 0, total: 0 },
    tabuada8: { acertos: 0, total: 0 },
    tabuada9: { acertos: 0, total: 0 },
    tabuada10: { acertos: 0, total: 0 }
};

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
/* --- FUNÇÕES DE VERIFICAÇÃO --- */

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
        setTimeout(proximaQuestao, 2000);
    } else {
        // Mostra qual era a opção correta (texto)
        const respostaCerta = item.o[item.r];
        mostrarFeedback(`❌ A certa era: ${respostaCerta}`, "erro", true);
    }
}

// 2. Para Matemática e Tabuadas (Caixa de Texto / Input)
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
        
        setTimeout(proximaQuestao, 2000);
    } else {
        mostrarFeedback(`❌ Errado! Era ${item.r}`, "erro", true);
    }
}

// 3. A Função Mestre (O "Cérebro" que salva tudo)
function registrarResultado(acertou, materia) {
    if (!progresso[materia]) {
        progresso[materia] = { acertos: 0, total: 0 };
    }

    if (acertou) {
        progresso[materia].acertos++;
    }
    progresso[materia].total++;

    localStorage.setItem('estudoApp', JSON.stringify(progresso));
    
    // Se estiver na index, atualiza o gráfico/tabela na hora
    if (typeof atualizarPanorama === "function") {
        atualizarPanorama();
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
    // 1. Garantia: se a matéria não existe no progresso (ex: uma tabuada nova), cria agora
    if (!progresso[materia]) {
        progresso[materia] = { acertos: 0, total: 0 };
    }

    // 2. Soma os pontos
    if (acertou) {
        progresso[materia].acertos++;
    }
    progresso[materia].total++;

    // 3. Salva no computador do utilizador
    localStorage.setItem('estudoApp', JSON.stringify(progresso));
    
    // 4. Atualiza o panorama visual se ele existir na página
    if (typeof atualizarPanorama === "function") atualizarPanorama();
}
function proximaQuestao() {
    // 1. Força a saída do foco do botão atual
    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }
    
    // 2. Pequena limpeza visual no container antes de renderizar
    const zona = document.getElementById('zona-pergunta');
    if(zona) zona.focus(); // Move o foco para a área geral, longe dos botões

    indiceAtual++;
    renderizarQuestao();
}

// Inicia 10 perguntas sem repetir
function treinar(materia) {
    materiaAtiva = materia;
    modoDesafio = false;
    indiceAtual = 0;
    
    // Filtramos o banco para pegar apenas o que ainda não foi muito usado nesta sessão
    let todas = shuffle([...bancoDados[materia]]);
    perguntasAtuais = todas.slice(0, 10).map(q => ({...q, materia}));
    
    renderizarQuestao();
}

// Desafio Diário: 5 de cada sem repetir
function iniciarDesafio() {
    modoDesafio = true;
    indiceAtual = 0;
    let poolDesafio = [];

    // Lista todas as matérias que entram no desafio
    const materias = ['portugues', 'matematica', 'estudoMeio', 'tabuada2', 'tabuada3', 'tabuada4', 'tabuada5'];

    materias.forEach(m => {
        if (bancoDados[m]) {
            const extraidas = shuffle([...bancoDados[m]]).slice(0, 3).map(q => ({...q, materia: m}));
            poolDesafio.push(...extraidas);
        }
    });

    perguntasAtuais = shuffle(poolDesafio);
    renderizarQuestao();
}

function finalizarSessao() {
    const zona = document.getElementById('zona-pergunta');
    if(typeof atualizarPanorama === "function") atualizarPanorama();
    
    zona.innerHTML = `
        <div class="card-pergunta">
            <h2>🎉 Sessão Terminada!</h2>
            <p>Concluíste esta missão!</p>
            <button class="missao" onclick="location.reload()">🔄 Escolher Outra Matéria</button>
            <button class="missao" style="background:#636e72" onclick="window.location.href='../index.html'">🏠 Menu Principal</button>
        </div>
    `;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Atualiza o ecrã inicial
function atualizarPanorama() {
    const status = document.getElementById('status');
    if(!status) return;
    
    let html = "<h3> O teu Panorama de Foco:</h3>";
    for (let m in progresso) {
        let percent = progresso[m].total > 0 ? Math.round((progresso[m].acertos / progresso[m].total) * 100) : 0;
        let cor = percent < 50 ? "#e74c3c" : "#2ecc71";
        html += `<p><strong>${m.toUpperCase()}:</strong> ${percent}% de acerto (${progresso[m].acertos}/${progresso[m].total}) 
                 <div style="background:#eee; height:10px; border-radius:5px;">
                    <div style="background:${cor}; width:${percent}%; height:10px; border-radius:5px;"></div>
                 </div></p>`;
    }
    status.innerHTML = html;
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

window.onload = atualizarPanorama;