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