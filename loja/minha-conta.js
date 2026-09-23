// ==========================================
// SUPABASE
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
// ELEMENTOS
// ==========================================

const userName =
    document.getElementById("userName");

const userEmail =
    document.getElementById("userEmail");

const userPhone =
    document.getElementById("userPhone");

const welcomeMessage =
    document.getElementById("welcomeMessage");

const logoutButton =
    document.getElementById("logoutButton");


// ==========================================
// CARREGAR USUÁRIO
// ==========================================

async function carregarUsuario() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();


    // Se não estiver logado
    if (error || !user) {

        window.location.href =
            "login.html";

        return;
    }


    const metadata =
        user.user_metadata || {};


    const nome =
        metadata.nome || "Cliente";

    const telefone =
        metadata.telefone || "Não informado";


    userName.textContent =
        nome;

    userEmail.textContent =
        user.email;

    userPhone.textContent =
        telefone;


    const primeiroNome =
        nome.split(" ")[0];


    welcomeMessage.textContent =
        `Olá, ${primeiroNome}. Bem-vindo à sua FIT ZONE.`;

}


// ==========================================
// LOGOUT
// ==========================================

logoutButton.addEventListener(
    "click",
    async () => {

        logoutButton.disabled = true;

        logoutButton.textContent =
            "SAINDO...";


        const { error } =
            await supabaseClient.auth.signOut();


        if (error) {

            console.error(
                "Erro ao sair:",
                error
            );

            logoutButton.disabled = false;

            logoutButton.textContent =
                "SAIR DA CONTA";

            return;
        }


        window.location.href =
            "index.html";

    }
);


// ==========================================
// INICIAR
// ==========================================

carregarUsuario();