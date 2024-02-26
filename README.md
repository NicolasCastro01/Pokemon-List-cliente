<h1 align="center">PokeHub | Cliente</h1>

<p align="center" margin-top="25px" >
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/NicolasCastro01/Pokemon-List-cliente?color=purple">
</p>

## Sobre o projeto

O intuito do projeto é criar uma plataforma de armazenamento de dados dos pokemons disponibilizados pela [PokeAPI](https://pokeapi.co).

## Tecnologias e ferramentas utilizadas

- [NextJs](https://nextjs.org/docs)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)
- [Testing Library React](https://testing-library.com/docs/react-testing-library/intro/)

## Arquitetura e padrões de projeto

A aplicação foi desenvolvida utilizando os padrões de projeto DDD (Domain Driven Design), Compound Pattern, e Barrel Pattern. A aplicação foi desenvolvida utilizando a arquitetura multicamadas.

### Arquitetura multicamadas

A escolha da arquitetura multicamadas se deu pela facilidade de manutenção e escalabilidade do projeto. A arquitetura multicamadas é composta por 3 camadas principais: camada de apresentação, camada de domínio e camada de dados. A camada de apresentação é responsável por toda a parte visual da aplicação, a camada de domínio é responsável por toda a regra de negócio e a camada de dados é responsável por toda a parte de acesso a dados.

### DDD (Domain Driven Design)

O DDD é um padrão de projeto que visa a separação de responsabilidades entre as camadas da aplicação. O DDD é composto por 4 camadas principais:

- Camada de aplicação: responsável por toda a parte da regra de negócio da aplicação.
- Camada de domínio: responsável por toda a parte de entidades dando suporte a camada de aplicação.
- Camada de infraestrutura: responsável por toda a parte de acesso a dados.
- Camada de apresentação: responsável por toda a parte visual da aplicação.

### Barrel Pattern

O Barrel Pattern é um padrão de projeto que visa a simplificação de importações de arquivos. O Barrel Pattern é composto por um arquivo `index` que exporta todos os arquivos de uma determinada pasta.

### Compound Pattern

O Compound Pattern é um padrão de projeto que facilita na construção de um componente, onde não há acomplamento sobre os elementos filhos com relação ao pai. O Compound Pattern é composto por uma pasta onde é armazenado o `index` que é responsável por exportar um objeto padrão composto por todos os componentes de forma única para que possam ser chamados em qualquer lugar da aplicação, onde a ordem não importa.

## Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/en/)

### Variáveis de ambiente
- É importante a configuração das url's no arquivo `.env`.
- Há um arquivo exemplo chamado `.env.example`.

### Instalação

#### Clonar o repositório

```bash
$ git clone https://github.com/NicolasCastro01/Pokemon-List-cliente.git
```

#### Instalar as dependências

```bash
$ cd Pokemon-List-cliente
$ npm install
```

#### Executar o projeto

```bash
$ npm run build
$ npm run start # npm run dev (não precisa rodar o build)
```

### Executar os testes

#### Executar cobertura de testes

```bash
$ npm run test:ci
```

#### Executar testes sem cobertura

```bash
$ npm run test
```

## Considerações finais

A aplicação contém 2 telas principais que são: a tela de login, onde é possível efetuar a autênticação do usuário e a tela home, onde é possível visualizar os pokemóns armazenados no banco local, buscar novos pokemóns no [PokeAPI](https://pokeapi.co) e importá-los para o banco local.