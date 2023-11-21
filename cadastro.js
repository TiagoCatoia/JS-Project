// O localStorage armazena os dados no próprio navegador
export function verificaLocalStorage() {
    // Verifica se existem dados de login salvos no localStorage
    try {
        var loginsData = localStorage.getItem("loginsData")
    } catch (error) {
        alert("Erro ao acessar o localStorage: " + error.message)
    }

    if (loginsData) {
        // Se houver dados no localStorage, converte a string JSON em uma lista de logins
        var logins = JSON.parse(loginsData)
    }
    else {
        var logins = []
    }
    return logins
}

export function finalizarCadastro() {

    // Chama a função que carrega os logins armazenados no localStorage
    var logins = verificaLocalStorage()

    // obtem os valores de usuário e senha do formulário
    try {
        var usuario = document.querySelector("#usuario").value
        var senha = document.querySelector("#senha").value
    } catch (error) {
        alert("Erro ao obter valores do formulário: " + error.message)
    }

    // Verifica se os campos de usuário e senha estão preenchidos
    if (usuario === "" || senha === "") {
        alert("Preencha corretamente o Usuário e a Senha!")
    } else if (senha.length < 5) {
        alert("A senha precisa de no mínimo 5 caracteres!")
    } else {
        // Verifica se o usuário já está cadastrado
        var usuarioJaCadastrado = logins.some(function(login) { //  Método some para verificar se algúm dos objetos na lista logins possui o mesmo nome de usuário (usn) que está sendo cadastrado
            return login.usn === usuario
        })
        // some() é um método em JavaScript que é usado em arrays. Ele verifica se pelo menos um elemento do array atende a uma determinada condição e retorna true se pelo menos um elemento passar na condição, ou false se nenhum elemento passar
        if (usuarioJaCadastrado) {
            alert("Este Usuário já está Cadastrado!")
        } else {
            // Cria um objeto com os dados de login
            var login = { usn: usuario, psw: senha }

            // Adiciona o objeto à lista de logins
            logins.push(login)

            // Converte a lista de logins em uma string JSON
            var loginsData = JSON.stringify(logins)

            // Armazena a string JSON no localStorage
            try {
                localStorage.setItem("loginsData", loginsData)
                alert("Cadastro realizado com sucesso! Voltando para página de Login...")
                window.location.href = "login.html"
            } catch (error) {
                alert("Erro ao armazenar dados no localStorage: " + error.message)
            }
        }
    }
}