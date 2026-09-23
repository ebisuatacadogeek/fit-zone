// ==========================================
// CONFIGURAÇÃO DOS PRODUTOS
// ==========================================

const produtos = {

    whey: {

        nome: "Whey Protein",

        imagem: "images/whey.png",

        precos: {

            concentrado: {
                "900g": 129.90,
                "1.8kg": 239.90
            },

            isolado: {
                "900g": 179.90,
                "1.8kg": 329.90
            },

            "3w": {
                "900g": 159.90,
                "1.8kg": 299.90
            }

        }

    },


    creatina: {

        nome: "Creatina Monohidratada",

        imagem: "images/creatina.png",

        precos: {

            monohidratada: {
                "150g": 59.90,
                "300g": 89.90,
                "500g": 129.90
            }

        }

    },


    pretreino: {

        nome: "Pré-Treino",

        imagem: "images/pretreino.png",

        precos: {

            tradicional: {
                "150g": 79.90,
                "300g": 129.90
            }

        }

    },


    barras: {

        nome: "Barras Proteicas",

        imagem: "images/barras.png",

        precos: {

            proteica: {
                "12un": 89.90,
                "24un": 169.90
            }

        }

    }

};

// ==========================================
// IDENTIFICAR PRODUTO
// ==========================================

let produtoAtual =
    document.body.dataset.product;


// Compatibilidade com o whey.html atual
if (!produtoAtual) {

    produtoAtual = "whey";

}


const configuracaoProduto =
    produtos[produtoAtual];


// ==========================================
// ELEMENTOS
// ==========================================

let quantidade = 1;

const quantityElement =
    document.getElementById("quantity");

const decreaseButton =
    document.getElementById("decreaseQuantity");

const increaseButton =
    document.getElementById("increaseQuantity");

const typeButtons =
    document.querySelectorAll(".option-button");

const flavorSelect =
    document.getElementById("flavor");

const sizeSelect =
    document.getElementById("size");

const priceElement =
    document.getElementById("productPrice");

const cartButton =
    document.getElementById("addToCart");

const cartMessage =
    document.getElementById("cartMessage");


// ==========================================
// FORMATAR PREÇO
// ==========================================

function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ==========================================
// TIPO SELECIONADO
// ==========================================

function obterTipoSelecionado() {

    const selecionado =
        document.querySelector(
            ".option-button.active"
        );

    return selecionado
        ? selecionado.dataset.type
        : "";

}


// ==========================================
// PREÇO UNITÁRIO
// ==========================================

function obterPrecoUnitario() {

    if (!configuracaoProduto) {
        return 0;
    }

    const tipo =
        obterTipoSelecionado();

    const tamanho =
        sizeSelect?.value || "";

    return (
        configuracaoProduto
            .precos?.[tipo]?.[tamanho]
        || 0
    );

}


// ==========================================
// ATUALIZAR PREÇO
// ==========================================

function atualizarPreco() {

    if (!priceElement) {
        return;
    }

    const precoUnitario =
        obterPrecoUnitario();

    const total =
        precoUnitario * quantidade;

    priceElement.textContent =
        formatarPreco(total);

}


// ==========================================
// QUANTIDADE
// ==========================================

if (increaseButton) {

    increaseButton.addEventListener(
        "click",
        () => {

            quantidade++;

            quantityElement.textContent =
                quantidade;

            atualizarPreco();

        }
    );

}


if (decreaseButton) {

    decreaseButton.addEventListener(
        "click",
        () => {

            if (quantidade > 1) {
                quantidade--;
            }

            quantityElement.textContent =
                quantidade;

            atualizarPreco();

        }
    );

}


// ==========================================
// TROCAR TIPO
// ==========================================

typeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            typeButtons.forEach(item =>
                item.classList.remove("active")
            );

            button.classList.add("active");

            atualizarPreco();

        }
    );

});


// ==========================================
// TROCAR TAMANHO
// ==========================================

if (sizeSelect) {

    sizeSelect.addEventListener(
        "change",
        atualizarPreco
    );

}


// ==========================================
// ADICIONAR AO CARRINHO
// ==========================================

if (cartButton) {

    cartButton.addEventListener(
        "click",
        () => {

            if (!configuracaoProduto) {
                return;
            }

            const tipo =
                obterTipoSelecionado();

            const sabor =
                flavorSelect?.value || "";

            const tamanho =
                sizeSelect?.value || "";

            const precoUnitario =
                obterPrecoUnitario();


            const item = {

                id:
                    `${produtoAtual}-${tipo}-${sabor}-${tamanho}`,

                produto:
                    configuracaoProduto.nome,

                tipo:
                    tipo,

                sabor:
                    sabor,

                tamanho:
                    tamanho,

                quantidade:
                    quantidade,

                precoUnitario:
                    precoUnitario,

                imagem:
                    configuracaoProduto.imagem

            };


            adicionarAoCarrinho(item);


            cartMessage.textContent =
                `${quantidade} item(ns) adicionado(s) ao carrinho.`;

        }
    );

}


// ==========================================
// SALVAR CARRINHO
// ==========================================

function adicionarAoCarrinho(novoItem) {

    let carrinho =
        JSON.parse(
            localStorage.getItem("fitZoneCart")
        ) || [];


    const itemExistente =
        carrinho.find(
            item => item.id === novoItem.id
        );


    if (itemExistente) {

        itemExistente.quantidade +=
            novoItem.quantidade;

    } else {

        carrinho.push(novoItem);

    }


    localStorage.setItem(
        "fitZoneCart",
        JSON.stringify(carrinho)
    );

}


// ==========================================
// INICIAR
// ==========================================

atualizarPreco();