// CONFIGURAÇÕES GLOBAIS DA NUVEM
window.bancoDeDados = [];

window.historicoPerguntas = JSON.parse(localStorage.getItem('historico_perguntas')) || {};

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

    if (!window.historicoPerguntas[materiaParaFiltrar]) {
        window.historicoPerguntas[materiaParaFiltrar] = [];
    }

    // FILTRO REAL: Só o que não está no histórico global
    let disponiveis = todasDestaMateria.filter(q => {
        const id = q.id || q.q;
        return !window.historicoPerguntas[materiaParaFiltrar].includes(id);
    });

    // Se as perguntas acabarem, faz reset ao histórico desta matéria
    if (disponiveis.length < 3) { 
        window.historicoPerguntas[materiaParaFiltrar] = [];
        disponiveis = todasDestaMateria;
    }

    // Escolhe 10 perguntas aleatórias das que sobraram
    const qtd = Math.min(10, disponiveis.length);
    perguntasAtuais = disponiveis.sort(() => Math.random() - 0.5).slice(0, qtd);

    // IMPORTANTE: Só vamos marcar como "feitas" no final ou à medida que ele acerta.
    // Para já, vamos manter a lógica de carregar a sessão.
    
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