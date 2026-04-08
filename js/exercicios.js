// CONFIGURAÇÕES GLOBAIS DA NUVEM
window.bancoDeDados = []; 
window.historicoPerguntas = {}; // Memória para não repetir

const URL_DADOS = window.location.hostname.includes("github.io") 
    ? '/estudo-facil/data/questoes.json' 
    : 'data/questoes.json';

async function carregarDadosDaNuvem() {
    try {
        const resposta = await fetch(`${URL_DADOS}?t=${new Date().getTime()}`);
        if (!resposta.ok) throw new Error("Erro ao baixar dados.");
        window.bancoDeDados = await resposta.json();
        console.log("✅ Nuvem carregada!");
    } catch (erro) {
        console.error("❌ Erro na nuvem:", erro);
    }
}
carregarDadosDaNuvem();

async function treinar(materia) {
    if (window.bancoDeDados.length === 0) {
        await carregarDadosDaNuvem();
    }

    const materiaParaFiltrar = (materia === 'estudoMeio') ? 'estudo' : materia;
    
    // Filtra todas as perguntas da matéria
    let todasDestaMateria = window.bancoDeDados.filter(q => q.materia === materiaParaFiltrar);

    if (!window.historicoPerguntas[materiaParaFiltrar]) {
        window.historicoPerguntas[materiaParaFiltrar] = [];
    }

    // Filtra apenas as que ainda não foram feitas nesta sessão/ciclo
    let disponiveis = todasDestaMateria.filter(q => !window.historicoPerguntas[materiaParaFiltrar].includes(q.id || q.q));

    // Se houver poucas perguntas novas, reseta o histórico para não travar o jogo
    if (disponiveis.length < 10) {
        window.historicoPerguntas[materiaParaFiltrar] = [];
        disponiveis = todasDestaMateria;
    }

    // Sorteia 10 e guarda no histórico
    perguntasAtuais = disponiveis.sort(() => Math.random() - 0.5).slice(0, 10);
    perguntasAtuais.forEach(p => window.historicoPerguntas[materiaParaFiltrar].push(p.id || p.q));

    indiceAtual = 0;
    materiaAtiva = materia;

    if(document.getElementById('menu-treino')) document.getElementById('menu-treino').style.display = 'none';
    const zona = document.getElementById('zona-pergunta');
    if(zona) zona.style.display = 'block';

    renderizarQuestao();
}
