var mainState = {
    preload: function () {
        // Imagens
        game.load.image('player', 'assets/player.png');
        game.load.image('background', 'assets/background.png');
        game.load.image('catapulta', 'assets/catapulta.png');
        game.load.image('estrela', 'assets/estrela.png');
        game.load.image('cogumelo', 'assets/cogumelo.png');

        // Sons
        game.load.audio('fly_sound', 'assets/sound_fly.ogg');
        game.load.audio('knocking_sound', 'assets/sound_knocking.ogg');
        game.load.audio('die_sound', 'assets/sound_die.ogg');
        game.load.audio('point_sound', 'assets/sound_point.ogg');
    },

    create: function () {
        // --- AJUSTE DE TELA PARA CELULAR ---
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // Faz o jogo caber na tela
        game.scale.pageAlignHorizontally = true;            // Centraliza
        game.scale.pageAlignVertically = true;
        game.scale.forceOrientation(true, false);
        game.scale.refresh();

        // Configurações Globais
        game.world.setBounds(0, 0, 100000, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.highScore = localStorage.getItem("highScore") || 0;

        // Lógica de Jogo
        this.gameStarted = false;
        this.timerSeconds = 40;
        this.gameSpeed = 180;
        this.score = 0;

        // Configuração de Áudio
        this.flySound = game.add.audio('fly_sound');
        this.knockingSound = game.add.audio('knocking_sound');
        this.dieSound = game.add.audio('die_sound');
        this.pointSound = game.add.audio('point_sound');

        // --- 1. FUNDO 
        this.background = game.add.tileSprite(-138, 0, 2000, 800, 'background');
        this.background.fixedToCamera = true;
        this.background.tileScale.set(0.7);
        game.stage.backgroundColor = "#ffffff";

        // --- 2. CATAPULTA 
        this.catapulta = game.add.sprite(120, 530, 'catapulta');
        this.catapulta.anchor.setTo(0.5);
        this.catapulta.width = 210;
        this.catapulta.height = 150;

        // --- 3. JOGADOR 
        this.player = game.add.sprite(80, 480, 'player');
        this.player.anchor.setTo(0.5);
        this.player.width = 130;
        this.player.height = 120;
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 0;
        this.player.body.velocity.x = 0;
        this.player.body.setSize(this.player.width * 2.0, this.player.height * 2.0);

        // --- 4. GRUPOS DE OBJETOS ---
        this.cogumelos = game.add.group();
        this.cogumelos.enableBody = true;
        this.estrelas = game.add.group();
        this.estrelas.enableBody = true;

        // --- 5. INTERFACE ---
        this.labelInfo = game.add.text(20, 20, "Tempo: 40s | Pontos: 0 | Recorde: " + this.highScore, { font: "30px Arial", fill: "#060606" });
        this.labelInfo.fixedToCamera = true;

        // --- 6. CONTROLES E CÂMERA ---
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.input.onDown.add(this.flap, this);
        game.camera.follow(this.player);
    },

    update: function () {
        if (this.gameStarted) {
            // Colisões
            game.physics.arcade.overlap(this.player, this.cogumelos, this.hitCogumelo, null, this);
            game.physics.arcade.overlap(this.player, this.estrelas, this.collectStar, null, this);

            // Movimento e Parallax
            this.player.body.velocity.x = this.gameSpeed;
            this.background.tilePosition.x = -game.camera.x * 0.5;
        } else {
            // Mantém travado na catapulta (conforme solicitado)
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
            this.player.y = 480;
            this.player.x = 80;
        }

        if (this.spaceKey.justDown) {
            this.flap();
        }

        // Morte por limites da tela
        if (this.player.y < 0 || this.player.y > 600) {
            this.die();
        }

    },

    flap: function () {
        if (!this.player) return;

        // Som de voar (Regra 1)
        this.flySound.play();

        if (!this.gameStarted) {
            this.gameStarted = true;
            this.player.body.gravity.y = 1200;
            this.player.body.velocity.x = this.gameSpeed;
            this.player.body.velocity.y = -550;

            // Timers de Jogo
            this.timerEvent = game.time.events.loop(1000, this.updateTimer, this);
            this.spawnEvent = game.time.events.loop(1000, this.spawnObjects, this);
            this.speedEvent = game.time.events.loop(60000, this.increaseDifficulty, this);
        } else {
            this.player.body.velocity.y = -350;
        }
    },

    updateTimer: function () {
        this.timerSeconds--;
        this.score++; // Pontos são os segundos (Regra 10)
        this.labelInfo.text = "Tempo: " + this.timerSeconds + "s | Pontos: " + this.score;

        if (this.timerSeconds <= 0) {
            this.die(); // Som de die e reseta (Regra 7)
        }
    },

    spawnObjects: function () {
        // Spawna objetos um pouco à frente da visão da câmera
        var x = game.camera.x + 850;
        var y = Math.floor(Math.random() * 500) + 50;
        
        
        // 20% de chance de estrela, 80% de cogumelo (Regra 4 e 8)
        if (Math.random() < 0.1) {
            this.addEstrela(x, y);
        } else {
            this.addCogumelo(x, y);
        }
    },

    addCogumelo: function (x, y) {
        var cogumelo = game.add.sprite(x, y, 'cogumelo');
        this.cogumelos.add(cogumelo);
        cogumelo.width = 95;
        cogumelo.height = 95;
        // Sentido contrário (Regra 8)
        cogumelo.body.velocity.x = -150;
        cogumelo.checkWorldBounds = true;
        cogumelo.outOfBoundsKill = true
        cogumelo.body.setSize(cogumelo.width * 7.0, cogumelo.height * 7.0);
    },

    addEstrela: function (x, y) {
        var estrela = game.add.sprite(x, y, 'estrela');
        this.estrelas.add(estrela);
        estrela.width = 80;
        estrela.height = 80;
        estrela.body.velocity.x = -80;
        estrela.checkWorldBounds = true;
        estrela.outOfBoundsKill = true;
    },

    collectStar: function (player, estrela) {
        estrela.kill();
        this.pointSound.play(); // Som de ponto
        this.timerSeconds += 20; // +20 segundos (Regra 4)
    },

    hitCogumelo: function () {
        this.knockingSound.play();
        this.die(); // Regra 9
    },

    increaseDifficulty: function () {
        this.gameSpeed += 40; // Aumenta velocidade (Regra 11)
    },

    die: function () {
        // Verificar se bateu o recorde
        if (this.score > this.highScore) {
            localStorage.setItem("highScore", this.score);
        }

        this.dieSound.play();
        game.state.restart();
    }
};

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv');
game.state.add('main', mainState);
game.state.start('main');