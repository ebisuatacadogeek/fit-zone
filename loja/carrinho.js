const cartProducts =
    document.getElementById("cartProducts");

const cartSubtotal =
    document.getElementById("cartSubtotal");

const cartTotal =
    document.getElementById("cartTotal");

const cartPageCount =
    document.getElementById("cartPageCount");


function pegarCarrinho() {

    return JSON.parse(
        localStorage.getItem("fitZoneCart")
    ) || [];

}


function salvarCarrinho(carrinho) {

    localStorage.setItem(
        "fitZoneCart",
        JSON.stringify(carrinho)
    );

}


function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


function renderizarCarrinho() {

    const carrinho = pegarCarrinho();

    cartProducts.innerHTML = "";

    // CARRINHO VAZIO

    if (carrinho.length === 0) {

        cartProducts.innerHTML = `
            <div class="empty-cart">
                <h2>SEU CARRINHO ESTÁ VAZIO</h2>

                <p>
                    Adicione produtos para continuar.
                </p>

                <a href="index.html">
                    VOLTAR PARA A LOJA →
                </a>
            </div>
        `;

        cartSubtotal.textContent = "R$ 0,00";
        cartTotal.textContent = "R$ 0,00";
        cartPageCount.textContent = "0 ITENS";

        return;
    }


    let subtotal = 0;
    let quantidadeTotal = 0;


    carrinho.forEach((item, index) => {

        const totalItem =
            Number(item.precoUnitario) *
            Number(item.quantidade);

        subtotal += totalItem;

        quantidadeTotal +=
            Number(item.quantidade);


        const produto = document.createElement("article");

        produto.className = "cart-item";


        produto.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${item.imagem}"
                    alt="${item.produto}"
                >

            </div>


            <div class="cart-item-info">

                <span>
                    ${item.tipo || ""}
                </span>

                <h2>
                    ${item.produto}
                </h2>

                <p>
                    ${item.sabor || ""}
                    ${item.tamanho ? " • " + item.tamanho : ""}
                </p>

                <button
                    class="remove-item"
                    data-index="${index}">

                    REMOVER

                </button>

            </div>


            <div class="cart-item-quantity">

                <button
                    class="cart-minus"
                    data-index="${index}">
                    −
                </button>

                <span>
                    ${item.quantidade}
                </span>

                <button
                    class="cart-plus"
                    data-index="${index}">
                    +
                </button>

            </div>


            <div class="cart-item-price">

                <small>
                    ${formatarPreco(
                        Number(item.precoUnitario)
                    )} / un.
                </small>

                <strong>
                    ${formatarPreco(totalItem)}
                </strong>

            </div>

        `;


        cartProducts.appendChild(produto);

    });


    cartSubtotal.textContent =
        formatarPreco(subtotal);

    cartTotal.textContent =
        formatarPreco(subtotal);

    cartPageCount.textContent =
        `${quantidadeTotal} ${
            quantidadeTotal === 1
                ? "ITEM"
                : "ITENS"
        }`;


    adicionarEventos();

}


function adicionarEventos() {

    document
        .querySelectorAll(".cart-plus")
        .forEach(button => {

            button.addEventListener("click", () => {

                const carrinho = pegarCarrinho();

                const index =
                    Number(button.dataset.index);

                carrinho[index].quantidade++;

                salvarCarrinho(carrinho);

                renderizarCarrinho();

            });

        });


    document
        .querySelectorAll(".cart-minus")
        .forEach(button => {

            button.addEventListener("click", () => {

                const carrinho = pegarCarrinho();

                const index =
                    Number(button.dataset.index);

                if (carrinho[index].quantidade > 1) {

                    carrinho[index].quantidade--;

                } else {

                    carrinho.splice(index, 1);

                }

                salvarCarrinho(carrinho);

                renderizarCarrinho();

            });

        });


    document
        .querySelectorAll(".remove-item")
        .forEach(button => {

            button.addEventListener("click", () => {

                const carrinho = pegarCarrinho();

                const index =
                    Number(button.dataset.index);

                carrinho.splice(index, 1);

                salvarCarrinho(carrinho);

                renderizarCarrinho();

            });

        });

}


renderizarCarrinho();