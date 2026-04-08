// CONFIGURAÇÕES GLOBAIS DA NUVEM
window.bancoDeDados = []; 
const URL_DADOS = window.location.hostname.includes("github.io") 
    ? '/estudo-facil/data/questoes.json' 
    : 'data/questoes.json';

// Carrega os dados assim que o arquivo é lido
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

window.historicoPerguntas = {}; 

async function treinar(materia) {
    if (window.bancoDeDados.length === 0) {
        await carregarDadosDaNuvem();
    }

    const materiaParaFiltrar = (materia === 'estudoMeio') ? 'estudo' : materia;
    let todasDestaMateria = window.bancoDeDados.filter(q => q.materia === materiaParaFiltrar);

    // SEGURANÇA: Se o filtro falhar, não deixa o código continuar
    if (todasDestaMateria.length === 0) {
        console.error("ERRO: Nenhuma pergunta encontrada para " + materiaParaFiltrar);
        alert("Erro técnico: Perguntas não encontradas. Verifique o arquivo JSON.");
        return; 
    }

    if (!window.historicoPerguntas[materiaParaFiltrar]) {
        window.historicoPerguntas[materiaParaFiltrar] = [];
    }

    let disponiveis = todasDestaMateria.filter(q => !window.historicoPerguntas[materiaParaFiltrar].includes(q.id || q.q));

    if (disponiveis.length < 1) { // Mudança aqui: resetar se estiver totalmente vazio
        window.historicoPerguntas[materiaParaFiltrar] = [];
        disponiveis = todasDestaMateria;
    }

    // Pega 10 ou o máximo disponível se houver menos de 10
    const quantidadeParaPegar = Math.min(10, disponiveis.length);
    perguntasAtuais = disponiveis.sort(() => Math.random() - 0.5).slice(0, quantidadeParaPegar);
    
    perguntasAtuais.forEach(p => window.historicoPerguntas[materiaParaFiltrar].push(p.id || p.q));

    indiceAtual = 0;
    materiaAtiva = materia;

    document.getElementById('menu-treino').style.display = 'none';
    document.getElementById('zona-pergunta').style.display = 'block';

    renderizarQuestao();
}