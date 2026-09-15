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

const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const senha = document.getElementById("senha");

const message = document.getElementById("formMessage");
const button = document.getElementById("submitButton");


// ==========================================
// VERIFICA SE JÁ ESTÁ LOGADO
// ==========================================

async function verificarSessao() {

    const { data } =
        await supabaseClient.auth.getSession();

    if (data.session) {

        window.location.href = "index.html";

    }

}

verificarSessao();


// ==========================================
// LOGIN
// ==========================================

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    message.textContent = "";
    message.className = "form-message";

    button.disabled = true;
    button.textContent = "ENTRANDO...";

    try {

        const { data, error } =
            await supabaseClient.auth.signInWithPassword({

                email: email.value.trim(),

                password: senha.value

            });


        if (error) {
            throw error;
        }


        message.textContent =
            "Login realizado! Entrando na FIT ZONE...";

        message.className =
            "form-message success";


        console.log(
            "Usuário conectado:",
            data.user
        );


        setTimeout(() => {

            window.location.href =
                "index.html";

        }, 700);


    } catch (error) {

        console.error(
            "Erro no login:",
            error
        );


        if (
            error.message
                .toLowerCase()
                .includes("invalid login credentials")
        ) {

            message.textContent =
                "E-mail ou senha incorretos.";

        } else if (
            error.message
                .toLowerCase()
                .includes("email not confirmed")
        ) {

            message.textContent =
                "Confirme seu e-mail antes de entrar.";

        } else {

            message.textContent =
                "Não foi possível entrar. Tente novamente.";

        }


        message.className =
            "form-message error";


    } finally {

        button.disabled = false;

        button.textContent =
            "ENTRAR NA MINHA CONTA";

    }

});