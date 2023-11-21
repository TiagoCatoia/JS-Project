export function efetuarAcesso() {
    let usuario = document.querySelector("#usuario").value
    let senha = document.querySelector("#senha").value

    if (usuario === "" || senha === "") {
        alert("Preencha corretamente o Usuário e a Senha!")
    } else {
        // Obtém a lista de logins do localStorage
        try {
            var loginsData = localStorage.getItem("loginsData")
            var logins = []

            if (loginsData) {
                // Converte a string JSON em uma lista de logins
                logins = JSON.parse(loginsData)
            }
        } catch (error) {
            alert("Erro ao acessar o localStorage: " + error.message)
        }

        // Verifica se o login está cadastrado
        var loginEncontrado = logins.find(login => login.usn === usuario && login.psw === senha)

        if (loginEncontrado) {
            // Troca para página do dashboard e passa o usuário no parametro
            window.location.href = "dashboard.html?parametro=" + encodeURIComponent(usuario)
        } else {
            alert("Login não cadastrado. Verifique seu Usuário e Senha.")
        }
    }
}