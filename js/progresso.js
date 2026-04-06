let progresso = JSON.parse(localStorage.getItem('estudoApp')) || {
    portugues: { acertos: 0, total: 0 },
    matematica: { acertos: 0, total: 0 },
    estudoMeio: { acertos: 0, total: 0 }
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
    
    let html = `<div class="card-pergunta">
        <span class="badge">${item.materia.toUpperCase()}</span>
        <h3>Pergunta ${indiceAtual + 1} de ${perguntasAtuais.length}</h3>
        <p class="texto-pergunta">${item.q}</p>`;

    if (item.tipo === "input") {
        // Renderiza campo de texto para contas
        html += `
            <div class="input-container">
                <input type="number" id="resposta-user" class="input-resposta" placeholder="?" autofocus>
                <button class="missao" onclick="verificarRespostaInput()">Verificar Conta</button>
            </div>
        `;
    } else {
        // Renderiza botões normais
        html += `<div class="opcoes">`;
        item.o.forEach((op, i) => {
            html += `<button class="btn-opcao" onclick="verificarResposta(${i})">${op}</button>`;
        });
        html += `</div>`;
    }

    html += `</div>`;
    zona.innerHTML = html;

    // Focar automaticamente no campo se for input
    if(item.tipo === "input") {
        setTimeout(() => document.getElementById('resposta-user').focus(), 100);
    }
}

function verificarRespostaInput() {
    const input = document.getElementById('resposta-user');
    const valorUser = parseInt(input.value);
    const item = perguntasAtuais[indiceAtual];

    if (isNaN(valorUser)) {
        alert("Por favor, escreve um número!");
        return;
    }

    const acertou = valorUser === item.r;

    if (acertou) {
        progresso[item.materia].acertos++;
        mostrarFeedback("✅ EXCELENTE! Conta certa!", "sucesso");
        setTimeout(proximaQuestao, 2000);
    } else {
        mostrarFeedback(
            `❌ Quase! <br> O resultado era <strong>${item.r}</strong>. <br><br> 
            <em>Clica para continuar...</em>`, 
            "erro", 
            true
        );
    }
    
    progresso[item.materia].total++;
    localStorage.setItem('estudoApp', JSON.stringify(progresso));
}

function verificarResposta(escolha) {
    const item = perguntasAtuais[indiceAtual];
    const acertou = escolha === item.r;
    
    // Bloquear cliques extras nos botões de opção
    const botoes = document.querySelectorAll('.btn-opcao');
    botoes.forEach(b => b.disabled = true);

    if (acertou) {
        progresso[item.materia].acertos++;
        mostrarFeedback("✅ CORRETO! Parabéns!", "sucesso");
        
        // Se estiver certa, dura 3 segundos e pula automaticamente
        setTimeout(() => {
            proximaQuestao();
        }, 2000);

    } else {
        const respostaCerta = item.o[item.r];
        // Se errar, mostra a explicação e só passa ao clicar
        mostrarFeedback(
            `❌ ERRADO! <br> A resposta certa era: <strong>${respostaCerta}</strong>. <br><br> 
            <em>Clica em qualquer lugar para continuar...</em>`, 
            "erro", 
            true // Indica que precisa de clique
        );
    }
    
    progresso[item.materia].total++;
    localStorage.setItem('estudoApp', JSON.stringify(progresso));
}

function mostrarFeedback(msg, tipo, aguardarClique = false) {
    // Remover feedbacks antigos se existirem
    const antigo = document.querySelector('.feedback-toast');
    if(antigo) antigo.remove();

    const toast = document.createElement('div');
    toast.className = `feedback-toast feedback-${tipo}`;
    toast.innerHTML = msg;
    document.body.appendChild(toast);
    
    if (aguardarClique) {
        // Cria um fundo invisível que deteta o clique em "qualquer canto"
        const overlay = document.createElement('div');
        overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; z-index:999;";
        document.body.appendChild(overlay);

        const avancar = () => {
            toast.remove();
            overlay.remove();
            window.removeEventListener('click', avancar);
            proximaQuestao();
        };

        // Adiciona o evento de clique para avançar apenas no erro
        setTimeout(() => { 
            window.addEventListener('click', avancar);
        }, 500); // Pequeno atraso para evitar cliques acidentais
    }
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
    
    const p8 = shuffle([...bancoDados.portugues]).slice(0, 5).map(q => ({...q, materia: 'portugues'}));
    const m8 = shuffle([...bancoDados.matematica]).slice(0, 5).map(q => ({...q, materia: 'matematica'}));
    const e8 = shuffle([...bancoDados.estudoMeio]).slice(0, 5).map(q => ({...q, materia: 'estudoMeio'}));
    const tab2 = shuffle([...bancoDados.tabuada2]).slice(0, 5).map(q => ({...q, materia: 'tabuada2'}));
    const tab3 = shuffle([...bancoDados.tabuada3]).slice(0, 5).map(q => ({...q, materia: 'tabuada3'}));
    const tab4 = shuffle([...bancoDados.tabuada4]).slice(0, 5).map(q => ({...q, materia: 'tabuada4'}));
    const tab5 = shuffle([...bancoDados.tabuada5]).slice(0, 5).map(q => ({...q, materia: 'tabuada5'}));
    const tab6 = shuffle([...bancoDados.tabuada6]).slice(0, 5).map(q => ({...q, materia: 'tabuada6'}));
    const tab7 = shuffle([...bancoDados.tabuada7]).slice(0, 5).map(q => ({...q, materia: 'tabuada7'}));
    const tab8 = shuffle([...bancoDados.tabuada8]).slice(0, 5).map(q => ({...q, materia: 'tabuada8'}));
    const tab9 = shuffle([...bancoDados.tabuada9]).slice(0, 5).map(q => ({...q, materia: 'tabuada9'}));
    const tab10 = shuffle([...bancoDados.tabuada10]).slice(0, 5).map(q => ({...q, materia: 'tabuada10'}));

    perguntasAtuais = shuffle([...p8, ...m8, ...e8, ...tab2, ...tab3, ...tab4, ...tab5, ...tab6, ...tab7, ...tab8, ...tab9, ...tab10]);
    renderizarQuestao();
}

function finalizarSessao() {
    const zona = document.getElementById('zona-pergunta');
    if(typeof atualizarPanorama === "function") atualizarPanorama();
    
    zona.innerHTML = `
        <div class="card-pergunta">
            <h2>🎉 Sessão Terminada!</h2>
            <p>Concluíste todas as questões desta missão.</p>
            <button class="missao" onclick="${modoDesafio ? 'iniciarDesafio()' : `treinar('${materiaAtiva}')`}"> Treinar Novamente</button>
            <button class="missao" style="background:#636e72" onclick="window.location.href='../index.html'"> Voltar ao Menu</button>
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