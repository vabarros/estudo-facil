let dadosSalvos = JSON.parse(localStorage.getItem('estudoApp'));

let progresso = dadosSalvos || {
    portugues: { acertos: 0, total: 0 },
    matematica: { acertos: 0, total: 0 },
    estudoMeio: { acertos: 0, total: 0 },
    carteira: { creditos: 4, totalPartidas: 0 }, // Começa com 4 se for novo
    personagens: 0
};

// CORREÇÃO: Dá 4 créditos na primeira vez após a atualização
if (!progresso.carteira || localStorage.getItem('versao_atualizada') !== 'true') {
    progresso.carteira = { creditos: 4, totalPartidas: 0 };
    progresso.personagens = 0;
    localStorage.setItem('versao_atualizada', 'true');
    localStorage.setItem('estudoApp', JSON.stringify(progresso));
}

let acertosDestaSessao = 0;
let perguntasAtuais = [];
let indiceAtual = 0;
let materiaAtiva = "";

function renderizarQuestao() {
    const zona = document.getElementById('zona-pergunta');
    if (!zona) return;

    const item = perguntasAtuais[indiceAtual];
    const classeTema = item.materia === 'portugues' ? 'tema-portugues' : '';

    let html = `<div class="card-pergunta ${classeTema}">
        <span class="badge">${item.materia.toUpperCase()}</span>
        <h3>Pergunta ${indiceAtual + 1} de ${perguntasAtuais.length}</h3>
        <p class="texto-pergunta">${item.q}</p>`;

    if (item.tipo === "input") {
        html += `
            <div class="input-container">
                <input type="number" id="resposta-user" class="input-resposta" placeholder="?" autofocus
                       oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                       onkeypress="if(event.key === 'Enter') verificarRespostaInput()">
                <button class="missao" onclick="verificarRespostaInput()">Verificar Conta</button>
            </div>`;
    } else {
        html += `<div class="opcoes-container">`;
        item.o.forEach((op, i) => {
            html += `<button class="btn-opcao" onclick="verificarResposta(${i})">${op}</button>`;
        });
        html += `</div>`;
    }

    html += `</div>`;
    zona.innerHTML = html;

    if(item.tipo === "input") {
        setTimeout(() => { document.getElementById('resposta-user')?.focus(); }, 100);
    }
}

function verificarResposta(escolha) {
    const item = perguntasAtuais[indiceAtual];
    const acertou = escolha === item.r;
    registrarResultado(acertou, item.materia);

    if (acertou) {
        mostrarFeedback("✅ CORRETO!", "sucesso");
        setTimeout(proximaQuestao, 1000);
    } else {
        const respostaCerta = item.o[item.r];
        mostrarFeedback(`❌ A certa era: ${respostaCerta}`, "erro");
    }
}

function verificarRespostaInput() {
    const input = document.getElementById('resposta-user');
    const item = perguntasAtuais[indiceAtual];
    const acertou = parseInt(input.value) === item.r;
    
    registrarResultado(acertou, item.materia);

    if (acertou) {
        mostrarFeedback("✅ CORRETO!", "sucesso");
        setTimeout(proximaQuestao, 1000);
    } else {
        mostrarFeedback(`❌ Errado! Era ${item.r}`, "erro");
    }
}

function registrarResultado(acertou, materia) {
    if (acertou) {
        progresso[materia].acertos++;
        acertosDestaSessao++;
    }
    progresso[materia].total++;
    localStorage.setItem('estudoApp', JSON.stringify(progresso));
}

function proximaQuestao() {
    indiceAtual++;
    if (indiceAtual < perguntasAtuais.length) {
        renderizarQuestao();
    } else {
        finalizarSessao();
    }
}

function finalizarSessao() {
    const zona = document.getElementById('zona-pergunta');
    const notaFinal = acertosDestaSessao; 
    let mensagemCredito = "";
    
    if (notaFinal >= 8) {
        if (progresso.carteira.creditos < 5) { // Aumentei o limite para 5 para dar folga
            progresso.carteira.creditos += 1;
            mensagemCredito = "🪙 +1 MOEDA GANHA!";
        } else {
            mensagemCredito = "✅ Nota 10! Carteira cheia!";
        }
        localStorage.setItem('estudoApp', JSON.stringify(progresso));
    }

    zona.innerHTML = `
        <div class="card-pergunta">
            <h2>Fim da Missão!</h2>
            <p>Acertaste ${notaFinal} de 10</p>
            <p><b>${mensagemCredito}</b></p>
            <button class="missao" onclick="location.href='index.html'">Voltar ao Menu</button>
        </div>
    `;
    acertosDestaSessao = 0;
    atualizarInterfaceMoedas();
}

function atualizarInterfaceMoedas() {
    const el = document.getElementById('contador-creditos-btn');
    if(el) el.innerText = progresso.carteira.creditos;
}

window.onload = () => {
    atualizarInterfaceMoedas();
    if(typeof atualizarPanorama === 'function') atualizarPanorama();
};
