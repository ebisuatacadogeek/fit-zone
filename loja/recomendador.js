const respostas = {
    objetivo: "",
    treino: "",
    preferencia: ""
};


const steps =
    document.querySelectorAll(".quiz-step");

const answerButtons =
    document.querySelectorAll(".answer-button");

const result =
    document.getElementById("quizResult");

const resultTitle =
    document.getElementById("resultTitle");

const resultDescription =
    document.getElementById("resultDescription");

const resultLink =
    document.getElementById("resultLink");

const restartButton =
    document.getElementById("restartQuiz");


let etapaAtual = 1;


// ==========================================
// RESPOSTAS
// ==========================================

answerButtons.forEach(button => {

    button.addEventListener("click", () => {

        const pergunta =
            button.dataset.question;

        const valor =
            button.dataset.value;


        respostas[pergunta] = valor;


        if (etapaAtual < 3) {

            avancarEtapa();

        } else {

            mostrarResultado();

        }

    });

});


// ==========================================
// AVANÇAR
// ==========================================

function avancarEtapa() {

    const atual =
        document.querySelector(
            `.quiz-step[data-step="${etapaAtual}"]`
        );

    atual.classList.remove("active");

    etapaAtual++;

    const proxima =
        document.querySelector(
            `.quiz-step[data-step="${etapaAtual}"]`
        );

    proxima.classList.add("active");

}


// ==========================================
// RESULTADO
// ==========================================

function mostrarResultado() {

    steps.forEach(step =>
        step.classList.remove("active")
    );


    let recomendacao;


    // Preferência específica tem prioridade

    if (respostas.preferencia === "energia") {

        recomendacao = {
            titulo: "PRÉ-TREINO",

            descricao:
                "Você demonstrou interesse em uma categoria voltada à preparação para o treino. Confira nossas opções de pré-treino e verifique composição, porção e orientações do fabricante.",

            link: "pretreino.html"
        };

    }

    else if (respostas.preferencia === "forca") {

        recomendacao = {
            titulo: "CREATINA",

            descricao:
                "A creatina é uma das categorias mais utilizadas por quem busca suporte ao desempenho em exercícios de alta intensidade. Confira nossas opções disponíveis.",

            link: "creatina.html"
        };

    }

    else if (respostas.preferencia === "lanche") {

        recomendacao = {
            titulo: "BARRAS PROTEICAS",

            descricao:
                "Para quem prioriza praticidade, as barras proteicas são uma opção conveniente para complementar a ingestão de proteína na rotina.",

            link: "barras.html"
        };

    }

    else {

        recomendacao = {
            titulo: "WHEY PROTEIN",

            descricao:
                "Para quem procura uma forma prática de complementar a ingestão de proteínas, confira nossas opções de Whey Protein.",

            link: "whey.html"
        };

    }


    resultTitle.textContent =
        recomendacao.titulo;

    resultDescription.textContent =
        recomendacao.descricao;

    resultLink.href =
        recomendacao.link;


    result.classList.add("active");

}


// ==========================================
// REFAZER
// ==========================================

restartButton.addEventListener(
    "click",
    () => {

        respostas.objetivo = "";
        respostas.treino = "";
        respostas.preferencia = "";

        etapaAtual = 1;

        result.classList.remove("active");

        steps.forEach(step =>
            step.classList.remove("active")
        );

        document
            .querySelector(
                '.quiz-step[data-step="1"]'
            )
            .classList
            .add("active");

    }
);