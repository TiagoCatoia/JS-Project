export function dashboard(usuario, callback) {

    var body = document.querySelector("body")
    var dashboard = document.createElement("div")
    dashboard.id = "dashboard"
    body.appendChild(dashboard)

    // Cria a div da esquerda do gráfico com as escolhas
    var barraLateral = document.createElement("div")
    barraLateral.id = "barraLateral"
    dashboard.appendChild(barraLateral)

    // Cria a div em que os gráficos aparecerão
    var divGrafico = document.createElement("div")
    divGrafico.id = "divGraf"
    dashboard.appendChild(divGrafico)
    
    // Cria a escolha do gráfico
    function escolhaDosGraficos() {
        divGrafico.innerHTML = 
        `<div id='graficoArea'>
            <h1>Dashboard</h1>
            <div id='escolhaGrafico'>
                <div id="variacaoPercentual"><h2>Variação Percentual<h2><i id='iconGraf' class="fa-solid fa-chart-line"></i></div>
                <div id="analiseFinanceira"><h2>Análise Financeira<h2><i id='iconGraf' class="fa-solid fa-chart-simple"></i></div>
            </div>
        </div>`
    }
    escolhaDosGraficos()

    var conteudoBarraLateral = document.createElement("div")
    conteudoBarraLateral.id = "conteudoBarraLateral"

    // Cria o conteúdo da barra Lateral
    conteudoBarraLateral.innerHTML =
    `<div class="divDivisaoConteudo">
        <i id='iconBarraLateral' class="fa-solid fa-user"></i>
        <h2 id="user">${usuario}</h2>
    </div>
    <div class="divDivisaoConteudo">
        <h3 id="acaoAnalisada">Ação Analisada:<br></h3>
        <div id="acaoAnalisadaLinha"></div>
    </div>
    <div class="divDivisaoConteudo">
        <h3 id="dataAnalisada">Período Analisado:</h3>
        <div id="dataAnalisadaLinha"></div>
    </div>
    <div class="divDivisaoConteudo">
        <h3 id="tipoGraf">Gráfico:</h3>
        <div id = "linhaTipoGraf"></div>
    </div>`
    

    barraLateral.appendChild(conteudoBarraLateral)

    // Volta para tela de login se apertar o ícone de usuário
    var userIcon = document.querySelector("#iconBarraLateral")
    userIcon.addEventListener("click", function() {
        window.location.href = "login.html"
    })

    // Armazena qual vai ser o gráfico escolhido pelo usuário
    var tipoDoGrafico

    // 1º Opção dos Gráficos (divGrafico)
    var variacaoPercentual = document.querySelector("#variacaoPercentual")
    variacaoPercentual.addEventListener("click", function() {

        var linhaTipoGraf = document.querySelector("#linhaTipoGraf")
        linhaTipoGraf.innerHTML = "<h3>Variação Percentual</h3>"
        tipoDoGrafico = "Variação Percentual"
        opcoesParaGrafico(tipoDoGrafico)
    })

    // 2º Opção dos Gráficos (divGrafico)
    var analiseFinanceira = document.querySelector("#analiseFinanceira")
    analiseFinanceira.addEventListener("click", function() {
        var linhaTipoGraf = document.querySelector("#linhaTipoGraf")
        linhaTipoGraf.innerHTML = "<h3>Análise Financeira</h3>"
        tipoDoGrafico = "Análise Financeira"

        opcoesParaGrafico(tipoDoGrafico)
    })

    // Função para reatribuir eventos
    function reatribuirEventos() {
        // Chama escolhaDosGraficos() novamente
        linhaTipoGraf.innerHTML = ""
        acaoAnalisadaLinha.innerHTML = ""
        dataAnalisadaLinha.innerHTML = ""
        escolhaDosGraficos()

        variacaoPercentual = document.querySelector("#variacaoPercentual")
        analiseFinanceira = document.querySelector("#analiseFinanceira")

        variacaoPercentual.addEventListener("click", function() {
            var linhaTipoGraf = document.querySelector("#linhaTipoGraf")
            linhaTipoGraf.innerHTML = "<h3>Variação Percentual</h3>"
            tipoDoGrafico = "Variação Percentual"
            opcoesParaGrafico(tipoDoGrafico)
        })

        analiseFinanceira.addEventListener("click", function() {
            var linhaTipoGraf = document.querySelector("#linhaTipoGraf")
            linhaTipoGraf.innerHTML = "<h3>Análise Financeira</h3>"
            tipoDoGrafico = "Análise Financeira"
            opcoesParaGrafico(tipoDoGrafico)
        })
    }

    function opcoesParaGrafico(tipoDoGrafico){
        var conteudoEscolhaGrafico = document.createElement("div")
        conteudoEscolhaGrafico.id = "conteudoEscolhaGrafico"

        var escolhaGrafico = document.querySelector("#escolhaGrafico")
        escolhaGrafico.innerHTML = ""
        
        var opcoesAcoes = document.createElement("div")
        opcoesAcoes.id = "opcoesAcoes"
        var divPetr3 = document.createElement("div")
        divPetr3.id = "divPetr3"
        divPetr3.innerHTML = "<h2>PETR3<h2>"
        var divBbas3 = document.createElement("div")
        divBbas3.id = "divBbas3"
        divBbas3.innerHTML = "<h2>BBAS3<h2>"
        var divItsa3 = document.createElement("div")
        divItsa3.id = "divItsa3"
        divItsa3.innerHTML = "<h2>ITSA3<h2>"
        var divMglu3 = document.createElement("div")
        divMglu3.id = "divMglu3"
        divMglu3.innerHTML = "<h2>MGLU3<h2>"
        var divVale3 = document.createElement("div")
        divVale3.id = "divVale3"
        divVale3.innerHTML = "<h2>VALE3<h2>"

        // Armazena qual a ação vai ser escolhida pelo usuário
        var acaoAnalisada
        
        // Função para limpar todas as cores
        function limparCores() {
            divMglu3.style.backgroundColor = "rgb(106, 80, 177)";
            divVale3.style.backgroundColor = "rgb(106, 80, 177)";
            divBbas3.style.backgroundColor = "rgb(106, 80, 177)";
            divPetr3.style.backgroundColor = "rgb(106, 80, 177)";
            divItsa3.style.backgroundColor = "rgb(106, 80, 177)";
        }

        // Função para destacar a ação selecionada
        function destacarAcao(acao, elemento) {
            limparCores();  // Limpa todas as cores primeiro
            elemento.style.backgroundColor = "rgb(152, 121, 224)";
            acaoAnalisadaLinha.innerHTML = `<h3>${acao}</h3>`;
            acaoAnalisada = acao;
        }

        // Adiciona os ouvintes de evento apropriados a cada elemento
        divPetr3.addEventListener("click", function() {
            destacarAcao("PETR3", divPetr3);
        });

        divBbas3.addEventListener("click", function() {
            destacarAcao("BBAS3", divBbas3);
        });

        divItsa3.addEventListener("click", function() {
            destacarAcao("ITSA3", divItsa3);
        });

        divMglu3.addEventListener("click", function() {
            destacarAcao("MGLU3", divMglu3);
        });

        divVale3.addEventListener("click", function() {
            destacarAcao("VALE3", divVale3);
        });

        // Armazena qual o Intervalo de Tempo que vai ser escolhido pelo usuário
        var inicioIntervalo
        var fimIntervalo


        var opcaoData = document.createElement("div")
        opcaoData.id = "opcaoData"

        // Cria o Calendário
        opcaoData.innerHTML =
        `
        <h2>Intervalo de Tempo</h2>
        <br>
        <div id="reportrange">
            <i class="fa fa-calendar"></i>&nbsp
            <span></span> <i class="fa fa-caret-down"></i>
        </div>
        `
        try {
            $(function() {
                var start = moment().subtract(29, 'days')
                var end = moment()

                function cb(start, end) {
                    $('#reportrange span').html(' Desde ' + start.format('DD/MM/YYYY') + ' até ' + end.format('DD/MM/YYYY'))
                    var intervaloSelecionado = $('#reportrange span').text()
                    // Armazena o intervalo de tempo
                    inicioIntervalo = `${start.format('YYYY-MM-DD')}`
                    fimIntervalo = `${end.format('YYYY-MM-DD')}`
                    // Envia o intervalo selecionado para a barra lateral (barraLateral)
                    dataAnalisadaLinha.innerHTML = `<h3>${intervaloSelecionado}</h3>`
                }

                $('#reportrange').daterangepicker({
                    startDate: start,
                    endDate: end,
                    locale: {
                        format: 'DD/MM/YYYY',
                        customRangeLabel: 'Intervalo Personalizado'
                    },
                    ranges: {
                        'Mês passado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                        '2 Meses Atrás': [moment().subtract(2, 'months').startOf('month'), moment().subtract(2, 'months').endOf('month')],
                        '3 Meses Atrás': [moment().subtract(3, 'months').startOf('month'), moment().subtract(3, 'months').endOf('month')],
                        'Ano Passado': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
                        'Esse Ano': [moment().startOf('year'), moment().endOf('year')]
                    }
                }, cb)

                cb(start, end)
        
            }) 
        } catch {
            // Informa ao usuário que houve um erro ao criar o calendário
            alert("Erro na inicialização do intervalo de tempo: " + error)
        }

        // Container dos botões
        var containerBotoes = document.createElement("div")
        containerBotoes.id = "containerBotoes"

        // Botão que vai retornar a resposta para carregar o gráfico
        var btnCarregar = document.createElement("div")
        btnCarregar.id = "btnCarregar"
        btnCarregar.innerHTML = "<h3>Carregar</h3>"
        containerBotoes.appendChild(btnCarregar)

        btnCarregar.addEventListener("click", function() {
            // Verifica se o usuário selecionou os campos necessários para gerar o gráfico
            if (acaoAnalisadaLinha.innerHTML !== "" && dataAnalisadaLinha.innerHTML !== "") {
                // Limpa a região onde o gráfico será mostrado (divGraficoArea)
                let divGraficoArea = document.getElementById('graficoArea')
                divGraficoArea.innerHTML = ""

                // Retorna as informações do gráfico que serão usadas para tratar os dados do servidor e criar o gráfico
                var infosOptions = [inicioIntervalo, fimIntervalo, acaoAnalisada, tipoDoGrafico]
                
                // Chame o callback passando as informações
                callback(infosOptions)
            } else {
                alert("Ação e/ou Intervalo de Tempo não foram selecionadas!")
            }
        })

        // Botão para Voltar para Escolha dos Gráficos
        var btnVoltar = document.createElement("div")
        btnVoltar.id = "btnVoltar"
        btnVoltar.innerHTML = "<h3>Voltar</h3>"
        containerBotoes.appendChild(btnVoltar)
        btnVoltar.addEventListener("click", reatribuirEventos)
        
        opcoesAcoes.appendChild(divItsa3)
        opcoesAcoes.appendChild(divMglu3)
        opcoesAcoes.appendChild(divVale3)
        opcoesAcoes.appendChild(divPetr3)
        opcoesAcoes.appendChild(divBbas3)
        conteudoEscolhaGrafico.appendChild(opcoesAcoes)
        conteudoEscolhaGrafico.appendChild(opcaoData)
        conteudoEscolhaGrafico.appendChild(containerBotoes)
        escolhaGrafico.appendChild(conteudoEscolhaGrafico)
    }
}