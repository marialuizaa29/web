
document.addEventListener("DOMContentLoaded", function () {

    const botaoIniciar = document.querySelector(".iniciar");
    const botaoReiniciar = document.querySelector(".reiniciar");

    const cardPontuacao = document.querySelector(".cards .card:nth-child(1)");
    const cardFase = document.querySelector(".cards .card:nth-child(2)");
    const cardPedras = document.querySelector(".cards .card:nth-child(3)");

    const cenario = document.querySelector(".cenario");

    const roboHaxel = document.querySelector(".haxel");
    const roboAiron = document.querySelector(".airon");
    const roboOptimus = document.querySelector(".optimus");
    const roboWalle = document.querySelector(".walle");

    const estrela = document.querySelector(".estrela");
    const moeda = document.querySelector(".moeda");
    const energia = document.querySelector(".energia");
    const coracao = document.querySelector(".coracao");

    const pedra = document.querySelector(".pedra");
    const fogo = document.querySelector(".fogo");

    let pontuacao = 0;
    let fase = 1;
    let pedras = 0;

    let jogoRodando = false;

    let posicaoHaxel = 0;
    let posicaoAiron = 0;
    let posicaoOptimus = 0;
    let posicaoWalle = 0;

    let intervaloJogo;

    function atualizarInformacoes() {
        cardPontuacao.textContent =
            "Pontuação: " + String(pontuacao).padStart(3, "0");

        cardFase.textContent =
            "Fase: " + fase;

        cardPedras.textContent =
            "Pedras: " + pedras;
    }

    botaoIniciar.addEventListener("click", function () {

        if (jogoRodando) {
            return;
        }

        jogoRodando = true;

        botaoIniciar.textContent = "Jogando...";

        intervaloJogo = setInterval(function () {

            moverRobos();
            verificarColisoes();
            adicionarPontuacao();

        }, 100);
    });
    botaoReiniciar.addEventListener("click", function () {

        clearInterval(intervaloJogo);

        jogoRodando = false;

        pontuacao = 0;
        fase = 1;
        pedras = 0;

        posicaoHaxel = 0;
        posicaoAiron = 0;
        posicaoOptimus = 0;
        posicaoWalle = 0;

        roboHaxel.style.left = "0px";
        roboAiron.style.left = "0px";
        roboOptimus.style.left = "0px";
        roboWalle.style.left = "0px";

        estrela.style.display = "block";
        moeda.style.display = "block";
        energia.style.display = "block";
        coracao.style.display = "block";

        pedra.style.display = "block";
        fogo.style.display = "block";

        botaoIniciar.textContent = "Iniciar";

        posicionarItens();

        atualizarInformacoes();
    });

    function moverRobos() {

        const larguraCenario = cenario.clientWidth;

        posicaoHaxel += 2;
        posicaoAiron += 2.5;
        posicaoOptimus += 3;
        posicaoWalle += 3.5;

        if (posicaoHaxel > larguraCenario - 100) {
            posicaoHaxel = 0;
            pontuacao += 10;
        }

        if (posicaoAiron > larguraCenario - 100) {
            posicaoAiron = 0;
            pontuacao += 10;
        }

        if (posicaoOptimus > larguraCenario - 100) {
            posicaoOptimus = 0;
            pontuacao += 10;
        }

        if (posicaoWalle > larguraCenario - 100) {
            posicaoWalle = 0;
            pontuacao += 10;
        }

        roboHaxel.style.left = posicaoHaxel + "px";
        roboAiron.style.left = posicaoAiron + "px";
        roboOptimus.style.left = posicaoOptimus + "px";
        roboWalle.style.left = posicaoWalle + "px";

        atualizarInformacoes();
    }
    function adicionarPontuacao() {

        pontuacao++;

        if (pontuacao > 0 && pontuacao % 100 === 0) {
            fase++;

            mostrarMensagem("Fase " + fase + "!");
        }

        atualizarInformacoes();
    }

    function verificarColisoes() {

        verificarColisaoItem(roboHaxel, estrela, 20);
        verificarColisaoItem(roboHaxel, moeda, 30);
        verificarColisaoItem(roboHaxel, energia, 20);
        verificarColisaoItem(roboHaxel, coracao, 15);

        verificarColisaoObstaculo(roboHaxel, pedra);
        verificarColisaoObstaculo(roboHaxel, fogo);

        verificarColisaoItem(roboAiron, estrela, 20);
        verificarColisaoItem(roboAiron, moeda, 30);
        verificarColisaoItem(roboAiron, energia, 20);
        verificarColisaoItem(roboAiron, coracao, 15);

        verificarColisaoObstaculo(roboAiron, pedra);
        verificarColisaoObstaculo(roboAiron, fogo);

        verificarColisaoItem(roboOptimus, estrela, 20);
        verificarColisaoItem(roboOptimus, moeda, 30);
        verificarColisaoItem(roboOptimus, energia, 20);
        verificarColisaoItem(roboOptimus, coracao, 15);

        verificarColisaoObstaculo(roboOptimus, pedra);
        verificarColisaoObstaculo(roboOptimus, fogo);

        verificarColisaoItem(roboWalle, estrela, 20);
        verificarColisaoItem(roboWalle, moeda, 30);
        verificarColisaoItem(roboWalle, energia, 20);
        verificarColisaoItem(roboWalle, coracao, 15);

        verificarColisaoObstaculo(roboWalle, pedra);
        verificarColisaoObstaculo(roboWalle, fogo);
    }

    function verificarColisaoItem(robo, item, pontos) {

        if (
            item.style.display !== "none" &&
            colisao(robo, item)
        ) {

            pontuacao += pontos;

            item.style.display = "none";

            atualizarInformacoes();

            mostrarMensagem("+" + pontos + " pontos!");

            setTimeout(function () {
                if (jogoRodando) {
                    item.style.display = "block";
                    posicionarItem(item);
                }
            }, 2000);
        }
    }

    function verificarColisaoObstaculo(robo, obstaculo) {

        if (
            obstaculo.style.display !== "none" &&
            colisao(robo, obstaculo)
        ) {

            pedras++;

            pontuacao -= 10;

            if (pontuacao < 0) {
                pontuacao = 0;
            }

            obstaculo.style.display = "none";

            atualizarInformacoes();

            mostrarMensagem("-10 pontos!");

            setTimeout(function () {
                if (jogoRodando) {
                    obstaculo.style.display = "block";
                    posicionarItem(obstaculo);
                }
            }, 2500);
        }
    }

    function colisao(elemento1, elemento2) {

        const ret1 = elemento1.getBoundingClientRect();
        const ret2 = elemento2.getBoundingClientRect();

        return !(
            ret1.right < ret2.left ||
            ret1.left > ret2.right ||
            ret1.bottom < ret2.top ||
            ret1.top > ret2.bottom
        );
    }

    function posicionarItens() {

        posicionarItem(estrela);
        posicionarItem(moeda);
        posicionarItem(energia);
        posicionarItem(coracao);

        posicionarItem(pedra);
        posicionarItem(fogo);
    }

    function posicionarItem(item) {

        const largura = cenario.clientWidth;
        const altura = cenario.clientHeight;

        const novaPosicaoX =
            Math.random() * (largura - 100);

        const novaPosicaoY =
            Math.random() * (altura - 100);

        item.style.left = novaPosicaoX + "px";
        item.style.top = novaPosicaoY + "px";
    }

    function mostrarMensagem(texto) {

        const mensagem = document.createElement("div");

        mensagem.textContent = texto;

        mensagem.style.position = "fixed";
        mensagem.style.top = "50%";
        mensagem.style.left = "50%";
        mensagem.style.transform = "translate(-50%, -50%)";
        mensagem.style.fontSize = "35px";
        mensagem.style.fontWeight = "bold";
        mensagem.style.background = "rgba(0, 0, 0, 0.8)";
        mensagem.style.color = "white";
        mensagem.style.padding = "15px 30px";
        mensagem.style.borderRadius = "15px";
        mensagem.style.zIndex = "9999";

        document.body.appendChild(mensagem);

        setTimeout(function () {
            mensagem.remove();
        }, 800);
    }

    document.addEventListener("keydown", function (evento) {

        if (!jogoRodando) {
            return;
        }

        if (evento.code === "Space") {

            posicaoHaxel += 20;

            roboHaxel.style.left =
                posicaoHaxel + "px";

            pontuacao += 5;

            atualizarInformacoes();
        }
    });
    posicionarItens();
    atualizarInformacoes();

});