# API Test Pattern com Jest, Supertest e Data Driven

Este projeto é uma arquitetura de testes automatizados para APIs REST, utilizando Jest, Supertest e abordagens data-driven (JSON e CSV). Ele foi pensado para ser flexível, escalável e fácil de integrar em pipelines CI/CD (ex: GitLab CI).

## Funcionalidades
- Testes automatizados de endpoints REST
- Suporte a múltiplos bancos de dados (MSSQL, MySQL, Postgres)
- Testes data-driven com arquivos JSON e CSV
- Geração de relatórios detalhados em HTML e XML (JUnit)
- Pipeline pronta para GitLab CI
- Estrutura modular e fácil de manter

## Estrutura de Pastas
```
constants/
  └── constants.ts

db-connection/

integration/
  ├── data/
  │   ├── json/
  │   └── csv/
  ├── entity/
  ├── routes/
  ├── tests/
  │   ├── exemplos-test-usando-db/
  │   └── exemplos-usando-data-driven/
  │   └── exemplo-usando-entities.test.ts
  │   └── exemplo-uso-padrao.test.ts
  └── utils/

custom-sequencer.js
jest.config.ts
.gitlab-ci.yml
.env
```

## Camadas da Arquitetura

- **constants/**  
  Armazena constantes e configurações globais utilizadas em todo o projeto.

- **db-connection/**  
  Responsável pela configuração e conexão com diferentes bancos de dados suportados (MSSQL, MySQL, Postgres).

- **integration/**  
  Camada principal dos testes automatizados, composta por:
  - **data/**: Dados utilizados nos testes data-driven, separados em JSON e CSV.
  - **entity/**: Entidades de exemplo para facilitar a criação de casos de teste consistentes e reutilizáveis.
  - **routes/**: Rotas das APIs que serão testadas.
  - **tests/**: Testes automatizados, organizados por abordagem (exemplos usando banco de dados, data-driven, entidades, etc).
  - **utils/**: Utilitários gerais, como funções para leitura de arquivos CSV/JSON.

- **custom-sequencer.js**  
  Sequenciador customizado do Jest para controlar a ordem de execução dos testes.

- **jest.config.ts**  
  Arquivo de configuração personalizada do Jest.

- **.gitlab-ci.yml**  
  Pipeline pronta para integração contínua no GitLab CI.

- **.env**  
  Arquivo de variáveis de ambiente e secrets.

---

## Instalação
1. Clone o repositório
2. Instale as dependências:
   ```sh
   npm install
   ```

## Execução dos Testes
- Para rodar todas as suítes de teste localmente:
  ```sh
  npm test
  ```
- Para rodar somente um teste localmente:
  ```sh
  npm test test-exemplo.test.ts
  ```
- Para rodar em modo CI (recomendado em pipelines):
  ```sh
  npm test -- --ci
  ```

## Relatórios de Teste
- **HTML:** Gerado através do [jest-html-reporters](https://www.npmjs.com/package/jest-html-reporters) em `html-report/report.html`
- **JUnit XML:** Gerado através do [jest-junit](https://www.npmjs.com/package/jest-junit) em `junit.xml` 

## Pipeline GitLab CI
O arquivo `.gitlab-ci.yml` já está configurado para:
- Instalar dependências
- Executar os testes
- Gerar e armazenar os relatórios como artefatos

## Bibliotecas e Versões
- **jest**: ^29.7.0
- **ts-jest**: ^29.1.2
- **supertest**: ^6.3.4
- **jest-html-reporters**: ^3.1.7
- **jest-junit**: ^16.0.0
- **@jest/globals**: ^29.7.0
- **@types/jest**: ^29.5.14
- **@types/node**: ^22.10.6
- **@types/supertest**: ^6.0.2
- **typescript**: ^5.3.3
- **ts-node**: ^10.9.2
- **mssql**: ^11.0.1
- **mysql2**: ^3.14.1
- **pg**: ^8.16.0
- **csvtojson**: ^2.0.10

## Observações
- Os dados de teste devem estar em `integration/data/json/` ou `integration/data/csv/`.
- O Jest está configurado para rodar testes em sequência (`maxWorkers: 1`), para executar com paralelismo é só comentar o parâmetro **maxWorkers** em *jest.config.ts* ou definir a quantidade de workers simultâneos.
- O sequenciador de execução customizado pode ser ajustado em `custom-sequencer.js`, atualmente ao executar uma suíte, segue a sequência por ordem alfabética.
- O arquivo *entities.ts* é responsável por definir as entidades que serão utilizadas nos testes, facilitando a criação de casos de teste consistentes e reutilizáveis.
- Para integração com banco, configure os dados de conexão nos arquivos em `db-connection/`.
- Para entender melhor a conexão com o banco de dados, baixe a *branch* **dbConfig** e execute o comando `docker-compose up` para subir e popular os bancos de dados localmente. O único banco que não vai popular automaticamente é o **MSSQL**, então será necessário executar um script separado para popular os dados:
```sh
docker exec -it mssql-container /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'yourStrong(!)Password' -d master -i /path/to/your/script.sql
```
