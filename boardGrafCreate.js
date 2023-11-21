export function criaGrafico(dadosNoIntervalo, tipoDoGrafico, acaoAnalisada) {
    // Botão para Voltar para Escolha dos Gráficos
    let conteudoBarraLateral = document.querySelector("#conteudoBarraLateral")
    let btnVoltarBarraLateral = document.createElement("div")
    btnVoltarBarraLateral.id = "btnVoltarBarraLateral"
    btnVoltarBarraLateral.innerHTML = "<h3>Voltar</h3>"
    btnVoltarBarraLateral.addEventListener("click", function(){
        // Recarrega a página
        location.reload()
    })
    // Adiciona o botão para voltar na barra lateral (conteudoBarraLateral)
    conteudoBarraLateral.appendChild(btnVoltarBarraLateral)

    // Se o tipo do gráfico escolhido foi o de Variação Percentual
    if (tipoDoGrafico === "Variação Percentual"){
        // Processa os dados para obter as Variações Percentuais e as Datas
        var variacaoDatas = calcularVariacao(dadosNoIntervalo)

        // Onde o Gráfico vai ser implementado
        var divGraficoArea = document.getElementById('graficoArea')
        var canvas = document.createElement("canvas")
        divGraficoArea.appendChild(canvas)

        // Separa as Datas e as Variações Percentuais
        let datas = []
        let variacoes = []
        for (let i=0; i < variacaoDatas.length; i++) {
            datas.push(variacaoDatas[i].data)
            variacoes.push(variacaoDatas[i].variacao)
        }

        // Datas representa a linha horizontal (eixo y)
        var labels = datas
        // Variação Percentual representa a linha vertical (eixo x)
        const dataPoints = variacoes

        const config = {
            type: 'line', // Define o tipo do Gráfico como em Linha
            data: {
                labels: labels,
                datasets: [{
                    label: `Variação Percentual ${acaoAnalisada}`,
                    data: dataPoints, // dataPoints refere-se a uma coleção de pontos de dados
                    fill: false,
                    borderColor: 'rgb(51%, 34%, 90%)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true, // Torna o gráfico responsivo
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true,
                        // Use uma função de retorno para formatar os valores do eixo Y
                        ticks: {
                            callback: function (value) {
                                return value + '%' // Adicione o símbolo de porcentagem
                            }
                        }
                    }
                }
            }
        }

        // Renderiza o gráfico no canvas
        const ctx = canvas.getContext('2d')
        new Chart(ctx, config)

    } else if (tipoDoGrafico === "Análise Financeira") { // Se o tipo do gráfico escolhido foi o de Análise Financeira

        // Processa os dados para obter a Análise Financeira e as Datas e armazena em um array dataPoints
        let dataPoints = []

        for (let i = 0; i < dadosNoIntervalo.length; i++) {

            /*
            Problema Enfrentado:
             Quando converto os dados de datas para new Date (new Date(dadosNoIntervalo[i].Date))
             Isso está caunsando um problema nos dados dos dias representados no gráfico
             (pega os dados do dia da frente e usa no dia anterior e adiciona dias que não existem nos dados
              ex:
                2023-09-04,35.660000,35.799999,35.139999,35.200001,35.200001,5697600
                2023-09-05,35.060001,37.000000,35.000000,36.820000,36.820000,24924500)
                **No gráfico o dia 4 usa os dados do dia 5 e mesmo não tendo dia 3 nos dados, ele cria
                um dia 3 e usa os dados do dia 4.**

             Porém o uso do formato new Date é obrigatório para este gráfico
            */

            const dataPoint = {
                x: new Date(dadosNoIntervalo[i].Date), // Carrega a data para o eixo x (horizontal)
                y: [
                    // Carrega os dados de Abertura, Máxima, Mínima e Fechamento para o eixo y (vertical)
                    parseFloat(dadosNoIntervalo[i].Open),
                    parseFloat(dadosNoIntervalo[i].High),
                    parseFloat(dadosNoIntervalo[i].Low),
                    parseFloat(dadosNoIntervalo[i].Close)
                ]
            }
            // Adiciona os dados do objeto dataPoint dos eixos x e y no array dataPoints
            dataPoints.push(dataPoint)
        }
        
        // Onde o Gráfico vai ser implementado
        var divGraficoArea = document.getElementById("graficoArea")
        divGraficoArea.style.display = "block"
        divGraficoArea.style.width = "75%"
        divGraficoArea.style.height = "75%"

        // Implementação do Gráfico em Vela
        var chart = new CanvasJS.Chart("graficoArea", {
        title: {
            text: `Análise Financeira ${acaoAnalisada}`
        },
        zoomEnabled: true,
        axisY: {
            includeZero: false,
        },
        axisX: {
            interval: 6,
            intervalType: "day", // Intervalo diário
            valueFormatString: "MMM-DD", // Formato da data (dia mês ano)
            labelAngle: -45
        },
        data: [
            {
                color: "rgb(29%, 25%, 34%)",
                risingColor: "rgb(25%, 53%, 44%)",
                fallingColor: "rgb(226, 72, 119)",
                type: "candlestick",
                toolTipContent: "<strong>Data:</strong> {x}<br><strong>Abertura:</strong> {y[0]}<br><strong>Máxima:</strong> {y[1]}<br><strong>Mínima:</strong> {y[2]}<br><strong>Fechamento:</strong> {y[3]}",
                dataPoints: dataPoints  // Use o array de objetos dataPoints
            }
        ],
    })
    // Renderiza o gráfico
    chart.render()
    }
}

// Calcula a Variação Percentual entre o preço de abertura e fechamento para o período analisado
function calcularVariacao(dadosNoIntervalo) {
    let variacaoDatas = []
    let variacao
    let data
    for (let i=0; i<dadosNoIntervalo.length; i++) {
        try {
            variacao = ((dadosNoIntervalo[i].Close - dadosNoIntervalo[i].Open) / dadosNoIntervalo[i].Open) * 100
        } catch (error) {
            console.error("Erro no cálculo de variação: " + error)
            variacao = 0 // Atribui um valor padrão
        }
        data = dadosNoIntervalo[i].Date
        variacaoDatas.push({variacao: variacao.toFixed(2), data: data})
    }
    return variacaoDatas
}