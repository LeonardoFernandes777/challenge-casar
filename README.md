# Challenge Casar

Este é um projeto desenvolvido para buscar e visualizar repositórios do GitHub usando Next.js 14, Tailwind CSS e a API do GitHub.

## Ambiente PRD 

https://challenge-casar.vercel.app/

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Uso](#uso)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Testes](#testes)

## Visão Geral

Este projeto permite que os usuários busquem perfis do GitHub e vejam seus repositórios favoritos. Ele utiliza a API do GitHub para obter dados sobre usuários e repositórios.

## Funcionalidades

- Busca de usuários do GitHub
- Visualização de informações do perfil do usuário
- Listagem dos repositórios do usuário
- Adicionar e remover repositórios favoritos
- Interface responsiva e estilizada com Tailwind CSS

## Instalação

Siga os passos abaixo para instalar e executar o projeto localmente:

1. Clone o repositório:

    ```bash
    git clone https://github.com/LeonardoFernandes777/challenge-casar.git
    cd challenge-casar
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis de ambiente:

    ```env
    GITHUB_TOKEN=seu_github_token
    ```

4. Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o projeto.

## Uso

Para buscar um usuário do GitHub, digite o nome de usuário no campo de busca e pressione Enter. A página do perfil do usuário será exibida com suas informações e lista de repositórios.

## Variáveis de Ambiente

O projeto utiliza a variável de ambiente `GITHUB_TOKEN` para autenticar as requisições à API do GitHub. Certifique-se de adicionar essa variável ao arquivo `.env.local`

## Testes

Este projeto utiliza a biblioteca [Jest](https://jestjs.io/) e [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) para escrever e executar testes.

### Configuração

Para configurar o ambiente de testes, foram utilizados os seguintes arquivos:

- `jest.config.js`: Configurações gerais do Jest.
- `jest.setup.js`: Configurações específicas de inicialização.

### Executando os Testes

Para rodar os testes, use o seguinte comando:

```bash
npm test
