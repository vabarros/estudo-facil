const bancoDados = {
    portugues: [
        // --- ORTOGRAFIA E REVISÃO (Fichas 1 a 10) ---
        { q: "Na palavra 'exame', a letra 'x' tem o som de:", o: ["z", "ch", "cs"], r: 0 }, // Ficha 9
        { q: "Qual destas palavras está escrita corretamente?", o: ["Bicicleta", "Bicicreta"], r: 0 }, // Ficha 10 (Grupos consonânticos)
        { q: "Como se escreve o nome da estação do ano?", o: ["Inverno", "Inuerno"], r: 0 }, // Ficha 7 (am, em, im...)
        { q: "Qual é o som do 'c' na palavra 'cebola'?", o: ["Som de 's'", "Som de 'k'"], r: 0 }, // Ficha 4
        { q: "Indica a palavra que usa 'gu' corretamente:", o: ["Guerrilha", "Gerilha"], r: 0 }, // Ficha 6

        // --- GRAMÁTICA: SÍLABAS E ACENTUAÇÃO (Fichas 11 a 17) ---
        { q: "Classifica a palavra 'Livro' quanto ao número de sílabas:", o: ["Monossílaba", "Dissílaba", "Trissílaba"], r: 1 }, // Ficha 12
        { q: "Na palavra 'Caneta', a sílaba tónica é:", o: ["Ca", "ne", "ta"], r: 1 }, // Ficha 15
        { q: "Qual destas palavras precisa de um acento agudo (´)?", o: ["Agua", "Mesa", "Cadeira"], r: 0 }, // Ficha 14

        // --- NOMES E FLEXÃO (Fichas 18 a 22) ---
        { q: "Identifica o nome próprio na frase: 'O gato do Rui é bonito.'", o: ["gato", "Rui", "bonito"], r: 1 }, // Ficha 21
        { q: "Qual é o género masculino do nome 'Galinha'?", o: ["Galo", "Pinto"], r: 0 }, // Ficha 22
        { q: "Como se forma o plural da palavra 'Anel'?", o: ["Anéis", "Anels"], r: 0 }, // Ficha 22
        { q: "A palavra 'cardume' é um nome:", o: ["Comum", "Próprio", "Coletivo"], r: 2 }, // Conteúdo de Nomes
        { q: "Qual destas palavras é um nome comum?", o: ["Porto", "Cidade", "Maria"], r: 1 }, // Ficha 21
        // --- ORTOGRAFIA E REVISÃO (Fichas 1 a 10) ---
        { q: "Qual o som do 'x' na palavra 'exemplo'?", o: ["Som de 'z'", "Som de 'ch'", "Som de 's'"], r: 0 },
        { q: "Qual palavra da Ficha 6 usa o 'u' mudo?", o: ["Guitarra", "Gema"], r: 0 },
        { q: "Segundo a Ficha 7, como escrevemos antes de 'p' e 'b'?", o: ["Usamos 'm'", "Usamos 'n'"], r: 0 },

        // --- GRAMÁTICA: SÍLABAS E ACENTUAÇÃO (Fichas 11 a 17) ---
        { q: "Na Ficha 12, a palavra 'Sol' é classificada como:", o: ["Monossílaba", "Dissílaba"], r: 0 },
        { q: "Segundo a Ficha 14, qual destas palavras tem acento circunflexo?", o: ["Pêssego", "Maçã"], r: 0 },
        { q: "Na Ficha 11, o que significa assinalar com uma cruz?", o: ["Escolha múltipla", "Construção de frase"], r: 0 },

        // --- NOMES E FLEXÃO (Fichas 18 a 22) ---
        { q: "Identifica o nome próprio na frase: 'O gato do Rui é bonito.'", o: ["gato", "Rui", "bonito"], r: 1 }, // Ficha 21
        { q: "Qual é o género masculino do nome 'Galinha'?", o: ["Galo", "Pinto"], r: 0 }, // Ficha 22
        { q: "Como se forma o plural da palavra 'Anel'?", o: ["Anéis", "Anels"], r: 0 }, // Ficha 22
        { q: "A palavra 'cardume' (conjunto de peixes) é um nome:", o: ["Comum", "Próprio", "Coletivo"], r: 2 }, // Conteúdo de Nomes
        { q: "Qual destas palavras é um nome comum?", o: ["Porto", "Cidade", "Maria"], r: 1 }, // Ficha 21
        { q: "Qual o plural de 'Pão'?", o: ["Pães", "Pãos"], r: 0 },
        { q: "Qual é o feminino de 'Padrinho' segundo a Ficha 22?", o: ["Madrinha", "Mãe"], r: 0 },
        { q: "O nome 'Porto' na Ficha 21 refere-se a uma cidade, logo é:", o: ["Nome Próprio", "Nome Comum"], r: 0 },
        { q: "O coletivo de 'Livros' (Ficha 20) é:", o: ["Biblioteca", "Pinacoteca"], r: 0 },
        // --- ORTOGRAFIA E SONS (Fichas 1 a 10) ---
        { q: "Na Ficha 4, como se escreve a palavra que usamos para temperar a comida?", o: ["Açúcar", "Asúcar"], r: 0 },
        { q: "Segundo a Ficha 6, qual a escrita correta da ave?", o: ["Águia", "Agia"], r: 0 },
        { q: "Na Ficha 9, em qual destas palavras o 'x' soa como 'ch'?", o: ["Peixe", "Próximo", "Texto"], r: 0 },
        { q: "Na Ficha 10, qual é o grupo consonântico correto para 'fruta'?", o: ["fr", "fl", "gr"], r: 0 },
        { q: "Como escrevemos o som nasal na palavra 'Cinto' (Ficha 7)?", o: ["com 'in'", "com 'im'"], r: 0 },

        // --- GRAMÁTICA E ACENTUAÇÃO (Fichas 11 a 17) ---
        { q: "Na Ficha 12, a palavra 'Hipopótamo' tem 5 sílabas. Ela é:", o: ["Polissílaba", "Trissílaba"], r: 0 },
        { q: "Qual o nome do sinal (ç) na Ficha 4?", o: ["Cedilha", "Til"], r: 0 },
        { q: "Na Ficha 14, qual acento usamos para o som aberto em 'Pé'?", o: ["Acento agudo (´)", "Acento circunflexo (^)"], r: 0 },
        { q: "Quantas sílabas tem a palavra 'Ar' (Ficha 12)?", o: ["Uma (Monossílaba)", "Duas (Dissílaba)"], r: 0 },

        // --- NOMES, GÉNERO E NÚMERO (Fichas 18 a 22) ---
        { q: "Na Ficha 21, qual destas palavras é um nome próprio de um país?", o: ["Portugal", "País", "Europa"], r: 0 },
        { q: "Segundo a Ficha 20, o coletivo de 'Ovelhas' é:", o: ["Rebanho", "Matilha"], r: 0 },
        { q: "Qual é o feminino de 'Doutor' na Ficha 22?", o: ["Doutora", "Doutriz"], r: 0 },
        { q: "Como se escreve o plural de 'Nariz' (Ficha 22)?", o: ["Narizes", "Narizs"], r: 0 },
        { q: "Na Ficha 22, qual o masculino de 'Égua'?", o: ["Cavalo", "Boi"], r: 0 },
        { q: "Como se forma o plural de 'Jardim' (Ficha 22)?", o: ["Jardins", "Jardims"], r: 0 },
        { q: "Na frase 'A Maria corre', 'Maria' é um nome:", o: ["Próprio", "Comum"], r: 0 },
        { q: "Qual é o coletivo de 'Cães' segundo a Ficha 20?", o: ["Matilha", "Alcateia"], r: 0 },
        { q: "Na Ficha 22, o plural de 'Mão' é:", o: ["Mãos", "Mães"], r: 0 },
        { q: "A palavra 'Pincel' termina em 'l'. Qual o seu plural?", o: ["Pincéis", "Pincels"], r: 0 },
        // --- ORTOGRAFIA E SONS (Fichas 1 a 10) ---
        { q: "Na Ficha 4, qual é a letra que usamos antes de 'e' ou 'i' para o som 'ss'?", o: ["A letra 'c'", "A letra 'q'"], r: 0 },
        { q: "Segundo a Ficha 6, como se escreve a palavra para apagar o fogo?", o: ["Extintor", "Estintor"], r: 0 },
        { q: "Na Ficha 8, qual destas palavras tem o som 'lh'?", o: ["Coelho", "Coelo"], r: 0 },
        { q: "Na Ficha 5, como se escreve corretamente?", o: ["Bochecha", "Boxexa"], r: 0 },
        { q: "Segundo a Ficha 7, como escrevemos o som nasal em 'Bomba'?", o: ["com 'm'", "com 'n'"], r: 0 },

        // --- GRAMÁTICA: SÍLABAS E ACENTUAÇÃO (Fichas 11 a 17) ---
        { q: "Na Ficha 12, a palavra 'Jacaré' tem 3 sílabas. Ela é:", o: ["Trissílaba", "Dissílaba"], r: 0 },
        { q: "Segundo a Ficha 14, qual acento usamos em 'Vovó' (som aberto)?", o: ["Acento agudo (´)", "Acento circunflexo (^)"], r: 0 },
        { q: "Quantas sílabas tem a palavra 'Comboio' (Ficha 12)?", o: ["3 (Trissílaba)", "4 (Polissílaba)"], r: 0 },

        // --- NOMES E FLEXÃO (Fichas 18 a 22) ---
        { q: "Na Ficha 21, 'Lisboa' é um nome próprio porque indica:", o: ["Uma cidade específica", "Um objeto comum"], r: 0 },
        { q: "Segundo a Ficha 20, o coletivo de 'Jogadores' é:", o: ["Equipa", "Turma"], r: 0 },
        { q: "Qual é o feminino de 'Pai' (Ficha 22)?", o: ["Mãe", "Titio"], r: 0 },
        { q: "Como se escreve o plural de 'Lençol' (Ficha 22)?", o: ["Lençóis", "Lençols"], r: 0 },
        { q: "Na Ficha 22, qual o masculino de 'Rainha'?", o: ["Rei", "Príncipe"], r: 0 },
        { q: "Qual é o plural de 'Botão' (Ficha 22)?", o: ["Botões", "Botãos"], r: 0 },
        { q: "Na Ficha 20, como chamamos a um conjunto de aviões?", o: ["Esquadrilha", "Frota"], r: 0 },
        { q: "Na Ficha 22, o masculino de 'Atriz' é:", o: ["Ator", "Artista"], r: 0 },
        { q: "Como se forma o plural de 'Nuvem' (Ficha 22)?", o: ["Nuvens", "Nuvems"], r: 0 },
        { q: "Na Ficha 21, qual destas palavras é um nome comum?", o: ["Livro", "Porto", "Espanha"], r: 0 },
        // --- SÍLABA TÓNICA E ÁTONA (Ficha 15) ---
        { q: "Na palavra 'Menino', a sílaba tónica é 'ni'. Como se chamam as outras sílabas (me-no)?", o: ["Átonas", "Tónicas"], r: 0 },
        { q: "Qual é a sílaba tónica da palavra 'Rápido'?", o: ["Rá", "pi", "do"], r: 0 },
        { q: "Na palavra 'Estrela', qual é a sílaba que pronunciamos com mais força (tónica)?", o: ["Es", "tre", "la"], r: 1 },
        { q: "Quantas sílabas átonas tem a palavra 'Café'?", o: ["Uma ('ca')", "Duas"], r: 0 },
        { q: "Identifica a sílaba tónica da palavra 'Escola':", o: ["Es", "co", "la"], r: 1 },
        { q: "Qual destas palavras tem a sílaba tónica na última sílaba?", o: ["Anzol", "Livro", "Lápis"], r: 0 },
        { q: "Na palavra 'Sábado', a sílaba tónica é 'Sá'. As sílabas 'ba' e 'do' são:", o: ["Átonas", "Tónicas"], r: 0 },
        { q: "Qual é a sílaba tónica de 'Coração'?", o: ["Co", "ra", "ção"], r: 2 },
        { q: "Na palavra 'Janela', a sílaba tónica é:", o: ["Ja", "ne", "la"], r: 1 },
        { q: "As sílabas de uma palavra que não são tónicas chamam-se sempre:", o: ["Átonas", "Fracas"], r: 0 },
        { q: "Em 'Porto', a sílaba tónica é 'Por'. Ela é a:", o: ["Penúltima sílaba", "Última sílaba"], r: 0 },
        { q: "Qual é a sílaba tónica de 'Jacaré'?", o: ["Ja", "ca", "ré"], r: 2 },
    ],
    matematica: [
        // --- 1. NÚMEROS E OPERAÇÕES (Até 399, Dobro, Metade, Pares/Ímpares) ---
        { q: "Qual número vem logo a seguir ao 398?", o: ["397", "399"], r: 1 },
        { q: "Qual o antecessor de 300?", o: ["299", "301"], r: 0 },
        { q: "Qual o número que vem imediatamente antes de 399?", o: ["398", "400"], r: 0 },
        { q: "O número 399 é o sucessor de:", o: ["398", "400"], r: 0 },
        { q: "Qual número está entre 250 e 252?", o: ["251", "253"], r: 0 },
        { q: "Qual o número maior?", o: ["309", "390"], r: 1 },
        { q: "Qual o número par?", o: ["122", "123"], r: 0 },
        { q: "O número 200 termina em 0, por isso é:", o: ["Par", "Ímpar"], r: 0 },
        { q: "Qual o número ímpar?", o: ["350", "351"], r: 1 },
        { q: "O dobro de 150 é:", o: ["300", "200"], r: 0 },
        { q: "Qual número é o dobro de 100?", o: ["200", "150"], r: 0 },
        { q: "A metade de 200 é:", o: ["100", "150"], r: 0 },
        { q: "A metade de 100 é:", o: ["50", "25"], r: 0 },
        { q: "Qual é a metade de 20?", o: ["10", "5"], r: 0 },
        { q: "Como se escreve o número ordinal 5.º?", o: ["Quinto", "Quarto"], r: 0 },
        { q: "Como se escreve o número ordinal 10.º?", o: ["Décimo", "Nono"], r: 0 },
        { q: "Na numeração romana, o que representa o 'V'?", o: ["5", "10"], r: 0 },
        { q: "Na numeração romana, o que representa o 'X'?", o: ["10", "5"], r: 0 },

        // --- 2. DECOMPOSIÇÃO E VALOR POSICIONAL ---
        { q: "3 Centenas + 4 Dezenas + 2 Unidades é:", o: ["342", "243"], r: 0 },
        { q: "3 Centenas + 9 Unidades é o número:", o: ["309", "390"], r: 0 },
        { q: "3 Centenas + 5 Unidades é igual a:", o: ["305", "350"], r: 0 },
        { q: "3 centenas e 2 dezenas formam o número:", o: ["320", "302"], r: 0 },
        { q: "O número 382 tem:", o: ["3 Centenas, 8 Dezenas e 2 Unidades", "3 Dezenas e 8 Unidades"], r: 0 },
        { q: "O número 245 tem quantas dezenas no total?", o: ["24", "4"], r: 0 },
        { q: "Quantas dezenas há numa centena?", o: ["10 dezenas", "100 dezenas"], r: 0 },
        { q: "O número 300 tem quantas dezenas?", o: ["30", "3"], r: 0 },
        { q: "10 dezenas formam:", o: ["1 Centena", "1 Unidade"], r: 0 },
        { q: "O número 100 é uma:", o: ["Centena", "Dezena"], r: 0 },
        { q: "Trezentos e oitenta e cinco escreve-se:", o: ["385", "358"], r: 0 },

        // --- 3. GEOMETRIA E SÓLIDOS (Poliedros e Não Poliedros) ---
        { q: "Os poliedros têm apenas superfícies:", o: ["Planas", "Curvas"], r: 0 },
        { q: "Qual destes sólidos geométricos é um poliedro?", o: ["Cubo", "Esfera"], r: 0 },
        { q: "A pirâmide é um poliedro porque todas as suas faces são:", o: ["Planas", "Curvas"], r: 0 },
        { q: "O cubo tem quantas faces?", o: ["6", "8"], r: 0 },
        { q: "Qual sólido tem 12 arestas e 6 faces quadradas?", o: ["Cubo", "Esfera"], r: 0 },
        { q: "A esfera, o cilindro e o cone são sólidos:", o: ["Não poliedros", "Poliedros"], r: 0 },
        { q: "Quantos vértices tem um triângulo?", o: ["3", "4"], r: 0 },
        { q: "Um retângulo tem quantos lados?", o: ["4", "3"], r: 0 },
        { q: "Se dividires um quadrado ao meio por uma linha, essa linha chama-se:", o: ["Eixo de Simetria", "Vértice"], r: 0 },

        // --- 4. DINHEIRO E MEDIDAS ---
        { q: "Uma moeda de 1€ vale quantos cêntimos?", o: ["100", "50"], r: 0 },
        { q: "Qual destas moedas vale mais?", o: ["50 cêntimos", "20 cêntimos"], r: 0 },
        { q: "Quantas moedas de 50 cêntimos preciso para fazer 2€?", o: ["4", "2"], r: 0 },
        { q: "Tens 2 moedas de 50 cêntimos. Quanto tens no total?", o: ["1 Euro", "2 Euros"], r: 0 },
        { q: "Uma nota de 10€ e duas de 5€ totalizam:", o: ["20€", "15€"], r: 0 },
        { q: "Quanto valem 2 notas de 5€ e 1 moeda de 2€?", o: ["12€", "15€"], r: 0 },
        { q: "Se pagas 2€ por um gelado que custa 1,50€, qual o troco?", o: ["0,50€", "1,00€"], r: 0 },
        { q: "Para medir a massa (peso) de um objeto usamos a:", o: ["Balança", "Régua"], r: 0 },
        { q: "Qual é a unidade principal para medir o comprimento?", o: ["Metro (m)", "Quilo (kg)"], r: 0 },
        { q: "Quantos meses tem um ano?", o: ["12", "10"], r: 0 },

        // --- 5. DADOS E ESTATÍSTICA (Carroll e Frequências) ---
        { q: "O diagrama de Carroll serve para organizar dados por:", o: ["Duas características (ex: cor e forma)", "Ordem de tamanho"], r: 0 },
        { q: "Numa tabela, o que indica a 'frequência absoluta'?", o: ["O número de vezes que um dado aparece", "A cor do gráfico"], r: 0 },
        { q: "Como se chama o gráfico que usa pontos para marcar dados?", o: ["Gráfico de Pontos", "Gráfico de Barras"], r: 0 },
        { q: "Num gráfico de barras, a barra mais pequena representa o valor:", o: ["Menos frequente", "Mais frequente"], r: 0 },

        // --- 6. ITINERÁRIOS E ORIENTAÇÃO NO ESPAÇO ---
        { q: "Num itinerário, o que significa a seta ↑?", o: ["Seguir em frente", "Virar à esquerda"], r: 0 },
        { q: "Rodar 90 graus à direita corresponde a um:", o: ["Quarto de volta", "Meia volta"], r: 0 },
        { q: "Se deres uma 'meia volta', quantos graus rodaste?", o: ["180º", "90º"], r: 0 },
        { q: "Qual o objeto que usamos para saber onde fica o Norte?", o: ["Bússola", "Termómetro"], r: 0 },
        { q: "Se estiveres de frente para o Norte, o Sul fica:", o: ["Atrás de ti", "À tua direita"], r: 0 }
    ],
    estudoMeio: [
        // --- 1. REGRAS, CONVIVÊNCIA E CIDADANIA (Páginas 10, 25, 45, 46) ---
        { q: "Para vivermos bem com os outros, o que é fundamental?", o: ["Respeitar as diferenças", "Falar sempre mais alto"], r: 0 },
        { q: "Qual é uma regra importante de boa convivência?", o: ["Saber ouvir os outros", "Empurrar na fila"], r: 0 },
        { q: "Ser amigo e respeitar os colegas faz parte de:", o: ["Ser um bom cidadão", "Ser um bom atleta"], r: 0 },
        { q: "Um exemplo de um direito da criança é:", o: ["Ter proteção", "Trabalhar para ganhar dinheiro"], r: 0 },
        { q: "Um exemplo de um dever da criança na escola é:", o: ["Estudar e prestar atenção", "Poder brincar"], r: 0 },
        { q: "Qual destas é uma regra de segurança na escola?", o: ["Não correr nos corredores", "Gritar na sala"], r: 0 },
        { q: "O que significa ser solidário na comunidade?", o: ["Ajudar os outros", "Pensar só em nós"], r: 0 },
        { q: "As pessoas que vieram de outros países e vivem em Portugal devem ser:", o: ["Respeitadas e acolhidas", "Ignoradas"], r: 0 },

        // --- 2. O CORPO HUMANO: OSSOS E MÚSCULOS (Páginas 12 a 17) ---
        { q: "Quais são as três partes principais em que se divide o corpo humano?", o: ["Cabeça, tronco e membros", "Mãos, pés e joelhos"], r: 0 },
        { q: "Quais são as partes do corpo que dão suporte e nos permitem mexer?", o: ["Os ossos e os músculos", "A pele e o cabelo"], r: 0 },
        { q: "Como se chama o conjunto de todos os ossos do nosso corpo?", o: ["Esqueleto", "Músculo"], r: 0 },
        { q: "Como se chama o osso que protege o nosso cérebro?", o: ["Crânio", "Costela"], r: 0 },
        { q: "Os ossos das costas que nos mantêm direitos formam a:", o: ["Coluna vertebral", "Bacia"], r: 0 },
        { q: "Os músculos servem para nos ajudar a:", o: ["Fazer movimentos", "Pensar"], r: 0 },
        { q: "Como se chama o lugar onde os ossos se unem e permitem dobrar o corpo?", o: ["Articulações", "Músculos"], r: 0 },
        { q: "Quantos ossos aproximados tem um adulto? (Escreve o número: 206)", tipo: "input", r: 206, materia: "estudoMeio" },

        // --- 3. ÓRGÃOS VITAIS E FUNÇÕES (Páginas 16 a 19) ---
        { q: "Qual é o órgão responsável por bombear o sangue para todo o corpo?", o: ["Coração", "Pulmões"], r: 0 },
        { q: "Onde se localiza o coração?", o: ["No tórax, entre os pulmões", "Na barriga"], r: 0 },
        { q: "Os pulmões são os órgãos principais de qual função?", o: ["Respiração", "Digestão"], r: 0 },
        { q: "O que acontece ao peito quando inspiramos (entrada de ar)?", o: ["Aumenta de tamanho", "Diminui de tamanho"], r: 0 },
        { q: "Qual o órgão que nos ajuda a digerir os alimentos que comemos?", o: ["Estômago", "Coração"], r: 0 },
        { q: "Qual é o órgão que controla todo o nosso corpo e pensamentos?", o: ["Cérebro", "Coração"], r: 0 },
        { q: "Onde se localiza o cérebro?", o: ["Na cabeça", "No abdómen"], r: 0 },
        { q: "Os ossos que protegem o coração e os pulmões chamam-se:", o: ["Costelas", "Fémur"], r: 0 },

        // --- 4. SAÚDE, HIGIENE E BEM-ESTAR (Páginas 20 a 24) ---
        { q: "O que serve para nos proteger de doenças graves?", o: ["A vacinação", "Ver televisão"], r: 0 },
        { q: "Devemos tomar medicamentos apenas quando receitados pelo:", o: ["Médico", "Amigo"], r: 0 },
        { q: "O que deves fazer se encontrares um medicamento em casa?", o: ["Não mexer e avisar um adulto", "Provar para ver o sabor"], r: 0 },
        { q: "Para termos uma vida saudável, o que devemos evitar?", o: ["Comer muitos doces", "Dormir bem"], r: 0 },
        { q: "Ter uma alimentação equilibrada faz parte do nosso:", o: ["Bem-estar", "Dever de casa"], r: 0 },
        { q: "Para ter dentes saudáveis, devo escová-los:", o: ["Depois das refeições", "Uma vez por semana"], r: 0 },
        { q: "O que deves fazer antes de comer para manter a higiene?", o: ["Lavar as mãos", "Pentear o cabelo"], r: 0 },
        { q: "A postura correta ao sentar na cadeira ajuda a proteger a:", o: ["Coluna", "Visão"], r: 0 },
        { q: "Para proteger os ouvidos, devemos evitar:", o: ["Sons muito altos", "Usar chapéu"], r: 0 },

        // --- 5. PASSADO PESSOAL E FAMÍLIA (Páginas 30 a 36) ---
        { q: "Como se chama o documento que prova a nossa identidade e cidadania?", o: ["Cartão de Cidadão", "Livro de Matemática"], r: 0 },
        { q: "Os teus avós maternos são os pais da tua:", o: ["Mãe", "Pai"], r: 0 },
        { q: "Os filhos dos teus tios são teus:", o: ["Primos", "Irmãos"], r: 0 },

        // --- 6. PORTUGAL E COMUNIDADE (Páginas 37 a 42) ---
        { q: "Em que país vives?", o: ["Portugal", "Espanha"], r: 0 },
        { q: "Portugal situa-se no extremo de qual continente?", o: ["Europeu", "Americano"], r: 0 },
        { q: "Portugal situa-se no extremo de qual continente?", o: ["Europeu", "Americano"], r: 0 },
        { q: "Qual é o símbolo nacional que representa Portugal?", o: ["Bandeira Nacional", "Um brinquedo"], r: 0 },
        { q: "O conjunto de pessoas que partilha a mesma língua e história forma uma:", o: ["Nação / Povo", "Turma"], r: 0 },
        { q: "O conjunto de pessoas que vivem e trabalham no mesmo lugar chama-se:", o: ["Comunidade", "Família nuclear"], r: 0 },
        { q: "Além da família, qual é outro grupo importante a que pertences?", o: ["Turma / Escola", "Grupo de desconhecidos"], r: 0 },
        { q: "As pessoas que vivem num prédio ou na mesma rua formam uma:", o: ["Vizinhança", "Família nuclear"], r: 0 },
        { q: "Os vizinhos são pessoas que vivem:", o: ["Perto da nossa casa", "Noutro país"], r: 0 },
        { q: "Na escola, as decisões que interessam a todos devem ser:", o: ["Tomadas em conjunto / Grupo", "Tomadas por uma só pessoa"], r: 0 },
        { q: "Quem é o responsável por orientar a nossa turma na escola?", o: ["Professor(a)", "Presidente"], r: 0 },

        // --- 7. SERES VIVOS (Páginas Gerais de Revisão) ---
        { q: "As plantas e os animais são seres vivos porque:", o: ["Nascem, crescem e morrem", "Não precisam de comer"], r: 0 }
    ]
};