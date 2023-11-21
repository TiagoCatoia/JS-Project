# Sistema de Dashboard Financeiro

Bem-vindo ao Sistema de Dashboard Financeiro! Este sistema permite que os usuários analisem visualmente dados financeiros por meio de gráficos interativos. Aqui está um guia rápido para começar:

## Funcionalidades Principais:

1. **Login:**
   - Acesse a página de login fornecendo suas credenciais.
   - Se você não tiver uma conta, pode criar uma clicando em "Registrar" na página de login.

2. **Cadastro:**
   - Na página de cadastro, forneça as informações necessárias para criar uma conta.
   - Após o cadastro, você será redirecionado para a página de login.

3. **Dashboard:**
   - Após o login, você será direcionado ao dashboard principal.
   - Escolha entre diferentes opções de gráficos para visualizar variações percentuais ou análises financeiras.
   - Selecione a ação desejada, o intervalo de tempo e visualize os gráficos dinâmicos.

Agora, vamos explorar cada uma das páginas HTML e seus respectivos arquivos JavaScript:

## 1. Página de Login (`login.html`)

- **Arquivo JavaScript: `login.js`**
  - Gerencia a lógica de autenticação.
  - Redireciona para o dashboard após o login bem-sucedido.

## 2. Página de Cadastro (`cadastro.html`)

- **Arquivo JavaScript: `cadastro.js`**
  - Lida com a criação de novas contas.
  - Valida e envia os dados de registro.

## Uso do Local Storage:
O sistema utiliza o **LocalStorage** para armazenar temporariamente as informações de login e cadastro. Ao fazer o cadastro, as credenciais do usuário são armazenadas localmente, permitindo o acesso na página de login nas próximas visitas.

## 3. Página do Dashboard (`dashboard.html`)

- **Arquivo JavaScript: `boardStructureOptions.js`**
  - Cria a estrutura HTML do dashboard.
  - Gerencia as escolhas de gráficos e interações do usuário.

- **Arquivo JavaScript: `boardLoadData.js`**
  - Carrega e formata os dados para serem usados nos gráficos.

- **Arquivo JavaScript: `boardGrafCreate.js`**
  - Criação dinâmica dos gráficos com base nos dados processados.
    
## Inicialização do Servidor:

Para executar o servidor, siga estas etapas:

1. Certifique-se de ter a pasta `node_modules` instalada executando o seguinte comando:
   npm install

2. Abra o terminal na raiz do projeto e inicialize o servidor com o comando (necessário node instalado):
   node index.js

# Instruções de Utilização do Sistema

Ao realizar o login, o usuário terá duas opções para representação gráfica dos dados:

1. **Variação Percentual:**
   - Representa o valor de fechamento da ação subtraído do valor de abertura.
   - O resultado é dividido pelo valor de abertura e multiplicado por 100 para representar a variação percentual de cada dia no intervalo de tempo definido pelo usuário.
   - Essa variação percentual será exibida em um Gráfico de Linha.

2. **Análise Financeira:**
   - Representa os valores de Abertura, Fechamento, Máxima e Mínima, juntamente com a data de cada ação no intervalo de tempo escolhido.
   - Essa análise será visualizada em um Gráfico de Vela.

**Observações Importantes:**
- O usuário deve escolher entre as ações disponíveis: ITSA3, MGLU3, VALE3, PETR3, BBAS3.
- O intervalo de tempo selecionado pelos usuários abrange dados do final do ano de 2022 (10º, 11º e 12º mês) e do ano de 2023 (do mês 1º ao 10º).
