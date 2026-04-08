// CONFIGURAÇÕES GLOBAIS DA NUVEM
window.bancoDeDados = []; 
window.historicoPerguntas = {}; 

// Ajuste inteligente de caminho para subpastas ou raiz
const caminhoBase = window.location.pathname.includes("/materias/") ? "../data/questoes.json" : "data/questoes.json";
const URL_DADOS = window.location.hostname.includes("github.io") 
    ? '/estudo-facil/data/questoes.json' 
    : caminhoBase;

async function carregarDadosDaNuvem() {
    try {
        const resposta = await fetch(`${URL_DADOS}?t=${new Date().getTime()}`);
        if (!resposta.ok) throw new Error("Não encontrei o arquivo JSON");
        window.bancoDeDados = await resposta.json();
        console.log("✅ Nuvem carregada!");
    } catch (erro) {
        console.error("❌ Erro na nuvem:", erro);
    }
}
// Carregar imediatamente
carregarDadosDaNuvem();

async function treinar(materia) {
    if (window.bancoDeDados.length === 0) {
        await carregarDadosDaNuvem();
    }

    const materiaParaFiltrar = (materia === 'estudoMeio') ? 'estudo' : materia;
    let todasDestaMateria = window.bancoDeDados.filter(q => q.materia === materiaParaFiltrar);

    if (todasDestaMateria.length === 0) {
        alert("Erro: Perguntas não encontradas para " + materiaParaFiltrar);
        return;
    }

    if (!window.historicoPerguntas[materiaParaFiltrar]) {
        window.historicoPerguntas[materiaParaFiltrar] = [];
    }

    // Sistema de não repetição
    let disponiveis = todasDestaMateria.filter(q => !window.historicoPerguntas[materiaParaFiltrar].includes(q.id || q.q));

    if (disponiveis.length < 5) { // Reset se houver poucas novas
        window.historicoPerguntas[materiaParaFiltrar] = [];
        disponiveis = todasDestaMateria;
    }

    const qtd = Math.min(10, disponiveis.length);
    perguntasAtuais = disponiveis.sort(() => Math.random() - 0.5).slice(0, qtd);
    perguntasAtuais.forEach(p => window.historicoPerguntas[materiaParaFiltrar].push(p.id || p.q));

    indiceAtual = 0;
    materiaAtiva = materia;

    // CORREÇÃO DO ERRO DE STYLE: Verifica se os elementos existem antes de mexer
    const menu = document.getElementById('menu-treino') || document.querySelector('.menu-container');
    const zona = document.getElementById('zona-pergunta');

    if (menu) menu.style.display = 'none';
    if (zona) {
        zona.style.display = 'block';
        renderizarQuestao();
    } else {
        console.error("ERRO: Elemento 'zona-pergunta' não encontrado no HTML!");
    }
}