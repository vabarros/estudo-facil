// CONFIGURAÇÕES GLOBAIS DA NUVEM
window.bancoDeDados = []; 
const URL_DADOS = '/estudo-facil/data/questoes.json';

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

// Esta função agora serve apenas para "dar o pontapé de saída"
async function treinar(materia) {
    if (window.bancoDeDados.length === 0) {
        await carregarDadosDaNuvem();
    }

    // Normaliza o nome da matéria (de estudoMeio para estudo)
    const materiaParaFiltrar = (materia === 'estudoMeio') ? 'estudo' : materia;
    
    // Filtra as perguntas da nuvem
    let perguntasDaMateria = window.bancoDeDados.filter(q => q.materia === materiaParaFiltrar);

    if (perguntasDaMateria.length === 0) {
        alert("Nenhuma pergunta encontrada para: " + materia);
        return;
    }

    // Prepara as 10 perguntas globais que o progresso.js vai usar
    perguntasAtuais = perguntasDaMateria.sort(() => Math.random() - 0.5).slice(0, 10);
    indiceAtual = 0;
    materiaAtiva = materia;

    // Esconde o menu e mostra a zona de pergunta
    if(document.getElementById('menu-treino')) document.getElementById('menu-treino').style.display = 'none';
    const zona = document.getElementById('zona-pergunta');
    if(zona) zona.style.display = 'block';

    // Chama a função que está no progresso.js para desenhar na tela
    renderizarQuestao();
}