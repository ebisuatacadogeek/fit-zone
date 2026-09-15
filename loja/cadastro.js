// ==========================================
// CONEXÃO COM O SUPABASE
// ==========================================

const SUPABASE_URL = "https://iwsttbsraspdnhkprnzm.supabase.co";

// COLE SUA PUBLISHABLE KEY ENTRE AS ASPAS ABAIXO
const SUPABASE_KEY = "sb_publishable_ylsz0S8Dn5QCNgMLLsBOiQ_oR05wpsi";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ==========================================
// ELEMENTOS DO FORMULÁRIO
// ==========================================

const form = document.getElementById("cadastroForm");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");

const message = document.getElementById("formMessage");
const button = document.getElementById("submitButton");


// ==========================================
// ANIMAÇÃO DA PÁGINA
// ==========================================

// ==========================================
// MÁSCARA DO TELEFONE
// ==========================================

telefone.addEventListener("input", () => {

    let valor = telefone.value.replace(/\D/g, "");

    valor = valor.substring(0, 11);

    if (valor.length > 10) {

        valor = valor.replace(
            /(\d{2})(\d{5})(\d{4})/,
            "($1) $2-$3"
        );

    } else if (valor.length > 6) {

        valor = valor.replace(
            /(\d{2})(\d{4})(\d{0,4})/,
            "($1) $2-$3"
        );

    } else if (valor.length > 2) {

        valor = valor.replace(
            /(\d{2})(\d+)/,
            "($1) $2"
        );

    }

    telefone.value = valor;
});


// ==========================================
// CADASTRO
// ==========================================

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    limparMensagem();

    const nomeValor = nome.value.trim();
    const emailValor = email.value.trim();
    const telefoneValor = telefone.value.trim();


    // VALIDAÇÃO DO NOME

    if (nomeValor.length < 3) {

        mostrarErro("Digite seu nome completo.");

        return;
    }


    // VALIDAÇÃO DA SENHA

    if (senha.value.length < 8) {

        mostrarErro(
            "Sua senha precisa ter pelo menos 8 caracteres."
        );

        return;
    }


    // CONFIRMAÇÃO DA SENHA

    if (senha.value !== confirmarSenha.value) {

        mostrarErro("As senhas não coincidem.");

        return;
    }


    // BLOQUEIA O BOTÃO

    button.disabled = true;

    button.textContent = "CRIANDO CONTA...";


    try {

        // CRIA O USUÁRIO NO SUPABASE

        const { data, error } =
            await supabaseClient.auth.signUp({

                email: emailValor,

                password: senha.value,

                options: {

                    data: {

                        nome: nomeValor,

                        telefone: telefoneValor

                    }

                }

            });


        // SE O SUPABASE RETORNAR ERRO

        if (error) {

            throw error;

        }


        // CADASTRO REALIZADO

        mostrarSucesso(
            "Conta criada com sucesso! Verifique seu e-mail."
        );


        console.log(
            "Usuário criado:",
            data.user
        );


        // LIMPA O FORMULÁRIO

        form.reset();


    } catch (error) {

        console.error(
            "Erro no cadastro:",
            error
        );


        mostrarErro(
            traduzirErro(error.message)
        );


    } finally {

        button.disabled = false;

        button.textContent =
            "CRIAR MINHA CONTA";

    }

});


// ==========================================
// MENSAGEM DE ERRO
// ==========================================

function mostrarErro(texto) {

    message.textContent = texto;

    message.className =
        "form-message error";

}


// ==========================================
// MENSAGEM DE SUCESSO
// ==========================================

function mostrarSucesso(texto) {

    message.textContent = texto;

    message.className =
        "form-message success";

}


// ==========================================
// LIMPAR MENSAGEM
// ==========================================

function limparMensagem() {

    message.textContent = "";

    message.className =
        "form-message";

}


// ==========================================
// TRADUZIR ERROS DO SUPABASE
// ==========================================

function traduzirErro(erro) {

    const mensagem =
        erro.toLowerCase();


    if (
        mensagem.includes("already registered") ||
        mensagem.includes("already exists")
    ) {

        return "Este e-mail já possui uma conta.";

    }


    if (
        mensagem.includes("invalid email")
    ) {

        return "Digite um e-mail válido.";

    }


    if (
        mensagem.includes("password")
    ) {

        return "A senha informada não atende aos requisitos.";

    }


    if (
        mensagem.includes("rate limit")
    ) {

        return "Muitas tentativas. Aguarde um pouco e tente novamente.";

    }


    return "Não foi possível criar sua conta. Tente novamente.";

}