# 🐦 Bird Siege: Time Attack

Um jogo de sobrevivência e navegação técnica desenvolvido com **Phaser.js**. O objetivo é gerenciar o tempo de voo enquanto desvia de obstáculos perigosos e coleta itens de bônus em um ambiente infinito e progressivamente mais rápido.

## 🚀 Sobre o Jogo

O **Bird Siege** mistura a mecânica clássica de clique/salto com elementos de gerenciamento de tempo. Diferente de clones tradicionais, aqui o tempo é seu maior inimigo. Você é arremessado de uma catapulta e deve se manter no ar o máximo de tempo possível.

### 🛠 Mecânicas e Regras
* **Arremesso Inicial:** O jogo começa com o personagem na catapulta. O primeiro clique aciona a física e o lançamento.
* **Gestão de Tempo:** Você inicia com **50 segundos** de voo. Cada segundo que passa reduz seu tempo, mas aumenta sua pontuação.
* **Estrelas (Bônus):** Coletar uma estrela adiciona **+20 segundos** ao seu cronômetro.
* **Cogumelos (Obstáculos):** Cogumelos gigantes voam em sentido contrário. Colidir com um deles resulta em fim de jogo instantâneo.
* **Abismo e Teto:** Tocar o limite superior ou inferior da tela resulta em derrota.
* **Dificuldade Progressiva:** A cada 60 segundos de sobrevivência, a velocidade do jogo aumenta.
* **High Score:** O recorde de pontos fica salvo no navegador (`localStorage`).

## 🎮 Como Jogar

1.  Aperte a tecla **Espaço** ou **Clique na tela** para disparar a catapulta.
2.  Continue clicando/apertando para manter o pássaro voando.
3.  Desvie dos cogumelos e busque as estrelas para não deixar o tempo acabar.

## 📱 PWA (Versão Mobile)
Este jogo foi configurado como um **Progressive Web App**. Para instalar no seu celular:
1.  Acesse o link do GitHub Pages do projeto.
2.  No Android (Chrome), selecione "Instalar Aplicativo".
3.  No iOS (Safari), clique em "Compartilhar" e "Adicionar à Tela de Início".

## 🛠 Tecnologias Utilizadas
* [Phaser 2 (Phaser.js)](https://phaser.io/) - O motor de física e renderização.
* JavaScript (ES6).
* HTML5 / CSS3.
* Web Storage API (para o Recorde).

## 📂 Estrutura de Arquivos

├── assets/             # Imagens (PNG) e Sons (OGG)
├── index.html          # Ponto de entrada e registro do PWA
├── game.js             # Lógica principal do jogo (Phaser State)
├── manifest.json       # Configurações de instalação PWA
└── sw.js               # Service Worker para funcionamento offline