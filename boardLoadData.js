// Carrega e Formata os dados para serem usados no gráfico
export function carregarDados(inicioIntervalo, fimIntervalo, acaoAnalisada, tipoDoGrafico, callback) {
    // Variável que acessa todos os dados do servidor
    let dadosAcoes
    // Array que vai armazenar todos os dados no intervalo específico
    let dadosNoIntervalo = []
    // Declare e inicialize as variáveis de intervalo
    let inicioData = new Date(inicioIntervalo)
    let fimData = new Date(fimIntervalo)

    try {
        fetch(`http://localhost:8000/historico/geral-data`)
            .then((dadosAcoes) => {
                console.log("Processando dados...")
                return dadosAcoes.json()
            })
            .then((dadosAcoes) => {

                for (let i = 0; i < dadosAcoes.length; i++) {
                    let dataVerificada = new Date(dadosAcoes[i].Date)

                    // Verifica se a data está entre o período definido pelo usuário e o Ticker bate com a escolha do usuário
                    if (dataVerificada >= inicioData && dataVerificada <= fimData && dadosAcoes[i].Tick === acaoAnalisada) {
                        dadosNoIntervalo.push(dadosAcoes[i])
                    }
                }
                // Chama a função que vai criar o gráfico
                if (dadosNoIntervalo.length < 2) {
                    alert("Não existem dados suficientes neste intervalo de tempo !!!")
                    location.reload()
                }
                else {
                    // Retorna os dados no intervalo de tempo escolhido necessários para criar o gráfico
                    callback(dadosNoIntervalo)
                }
            })
            .catch((error) => {
                // Informa o usuário sobre o erro
                alert("Erro na solicitação de dados: " + error)
            })
            .finally(() => {
                console.log(`Processamento terminado`)
            })
    } catch (error) {
        // Informa o usuário sobre o erro
        alert("Erro na solicitação de dados: " + error)
    }
}