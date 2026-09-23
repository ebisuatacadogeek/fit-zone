// ==========================================
// CONFIGURAÇÃO DE PREÇOS DO WHEY
// ==========================================

const precosWhey = {

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

};


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
// DESCOBRIR PREÇO UNITÁRIO
// ==========================================

function obterPrecoUnitario() {

    const tipoSelecionado =
        document.querySelector(
            ".option-button.active"
        );

    if (!tipoSelecionado || !sizeSelect) {
        return 0;
    }

    const tipo =
        tipoSelecionado.dataset.type;

    const tamanho =
        sizeSelect.value;

    return precosWhey[tipo]?.[tamanho] || 0;

}


// ==========================================
// ATUALIZAR PREÇO NA TELA
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
// AUMENTAR QUANTIDADE
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


// ==========================================
// DIMINUIR QUANTIDADE
// ==========================================

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

            typeButtons.forEach(item => {

                item.classList.remove("active");

            });

            button.classList.add("active");

            atualizarPreco();

        }
    );

});


// ==========================================
// TROCAR PESO
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

            const tipoSelecionado =
                document.querySelector(
                    ".option-button.active"
                );

            const tipo =
                tipoSelecionado
                    ? tipoSelecionado.dataset.type
                    : "";

            const sabor =
                flavorSelect?.value || "";

            const tamanho =
                sizeSelect?.value || "";

            const precoUnitario =
                obterPrecoUnitario();


            const item = {

                id:
                    `whey-${tipo}-${sabor}-${tamanho}`,

                produto:
                    "Whey Protein",

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
                    "images/whey.png"

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


    atualizarContadorCarrinho();

}


// ==========================================
// CONTADOR DO CARRINHO
// ==========================================

function atualizarContadorCarrinho() {

    const carrinho =
        JSON.parse(
            localStorage.getItem("fitZoneCart")
        ) || [];


    const quantidadeTotal =
        carrinho.reduce(
            (total, item) =>
                total + item.quantidade,
            0
        );


    localStorage.setItem(
        "fitZoneCartCount",
        quantidadeTotal
    );

}


// ==========================================
// INICIAR
// ==========================================

atualizarPreco();
atualizarContadorCarrinho();