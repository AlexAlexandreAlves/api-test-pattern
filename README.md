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
constants/                 # Configurações globais
  └── constants.ts

db-connection/             # Conexão com bancos de dados

integration/
  ├── data/                # Dados para testes
  │   ├── json/            # Arquivos JSON para data-driven
  │   └── csv/             # Arquivos CSV para data-driven
  ├── entity/              # Entidades prontas de exemplo
  ├── routes/              # Rotas das APIs
  ├── tests/               # Testes automatizados
  │   ├── exemplos-test-usando-db/          # Exemplos de testes com conexão a banco de dados
  │   └── exemplos-usando-data-driven/      # Exemplos de testes usando data-driven
  │   └── exemplo-usando-entities.test.ts   # Exemplos de testes usando o padrão de entidades
  │   └── exemplo-uso-padrao.test.ts        # Exemplos de testes sem padrão
  └── utils/               # Utilitários (ex: leitura de CSV/JSON)

custom-sequencer.js        # Sequenciador customizado do Jest
jest.config.ts             # Configuração personalizada do Jest
.gitlab-ci.yml             # Pipeline para GitLab CI
.env                       # Arquivo de secrets
```

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
- O Jest está configurado para rodar testes em sequência (`maxWorkers: 1`), para executar com paralelismo é só comentar o parâmetro **maxWorkers** ou definir a quantidade de workers simultâneos.
- O sequenciador de execução customizado pode ser ajustado em `custom-sequencer.js`.
- Para integração com banco, configure os dados de conexão nos arquivos em `db-connection/`.
- Para entender melhor a conexão com o banco de dados, baixe a *branch* **dbConfig**, execute o comando `docker-compose up` para subir os bancos de dados localmente e executar testes automatizados integrados.

