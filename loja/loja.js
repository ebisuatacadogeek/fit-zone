// ==========================================
// CONFIGURAÇÃO SUPABASE
// ==========================================

const SUPABASE_URL =
    "https://iwsttbsraspdnhkprnzm.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_ylsz0S8Dn5QCNgMLLsBOiQ_oR05wpsi";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ==========================================
// INICIAR LOJA
// ==========================================

window.addEventListener("DOMContentLoaded", async () => {

    document.body.classList.add("page-loaded");

    await atualizarMinhaConta();

});


// ==========================================
// VERIFICAR LOGIN
// ==========================================

async function atualizarMinhaConta() {

    const accountButton =
        document.querySelector(".account-button");

    if (!accountButton) {
        return;
    }


    const {
        data: { session }
    } = await supabaseClient.auth.getSession();


    // ======================================
    // USUÁRIO DESLOGADO
    // ======================================

    if (!session) {

        accountButton.textContent =
            "MINHA CONTA";

        accountButton.href =
            "login.html";

        return;
    }


    // ======================================
    // USUÁRIO LOGADO
    // ======================================

    const user =
        session.user;

    const metadata =
        user.user_metadata || {};

    const nome =
        metadata.nome || "Cliente";

    const primeiroNome =
        nome.split(" ")[0];


    accountButton.textContent =
        `OLÁ, ${primeiroNome.toUpperCase()}`;

    accountButton.href =
        "minha-conta.html";

}


// ==========================================
// ALTERAÇÃO DE LOGIN / LOGOUT
// ==========================================

supabaseClient.auth.onAuthStateChange(
    (event, session) => {

        const accountButton =
            document.querySelector(".account-button");

        if (!accountButton) {
            return;
        }


        if (session) {

            const nome =
                session.user.user_metadata?.nome ||
                "Cliente";

            const primeiroNome =
                nome.split(" ")[0];

            accountButton.textContent =
                `OLÁ, ${primeiroNome.toUpperCase()}`;

            accountButton.href =
                "minha-conta.html";

        } else {

            accountButton.textContent =
                "MINHA CONTA";

            accountButton.href =
                "login.html";

        }

    }
);

// ==========================================
// CONTADOR VISUAL DO CARRINHO
// ==========================================

function atualizarCarrinhoHeader() {

    const carrinho =
        JSON.parse(
            localStorage.getItem("fitZoneCart")
        ) || [];

    const quantidadeTotal =
        carrinho.reduce(
            (total, item) =>
                total + Number(item.quantidade || 0),
            0
        );

    const cartCount =
        document.querySelector(".cart-count");

    if (cartCount) {

        cartCount.textContent =
            `${quantidadeTotal} ${
                quantidadeTotal === 1
                    ? "ITEM"
                    : "ITENS"
            }`;

    }

}


// Atualiza quando a loja abrir
window.addEventListener(
    "DOMContentLoaded",
    atualizarCarrinhoHeader
);

// ==========================================
// CONTADOR DO CARRINHO
// ==========================================

function atualizarCarrinhoHeader() {

    const carrinho =
        JSON.parse(localStorage.getItem("fitZoneCart")) || [];

    const quantidadeTotal =
        carrinho.reduce(
            (total, item) =>
                total + Number(item.quantidade || 0),
            0
        );

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = quantidadeTotal;
    }
}


// Atualiza assim que a página carregar
atualizarCarrinhoHeader();


// Atualiza quando voltar para a página
window.addEventListener("pageshow", () => {
    atualizarCarrinhoHeader();
});