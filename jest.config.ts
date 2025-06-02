import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest', // Define o preset do jest
    testEnvironment: 'node', // Define o ambiente de teste
    testSequencer: './custom-sequencer.js',  // Define o sequenciador de testes
    maxWorkers: 1, // Define a quantidade de workers simultâneos, se mais de 1 habilita o paralelismo
    // testPathPattern: '.*.spec.ts', // Define o padrão de busca dos arquivos de teste
    // globalSetup: Define o setup global de configuração
    // modulePathIgnorePatterns: [] Ignora os arquivos que estão no caminho
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            diagnostics: {
                ignoreCodes: ['TS151001'],
            },
        }],
    },
    reporters: [
        "default",
        ["jest-html-reporters", {
            "publicPath": "./html-report",
            "filename": "report.html",
            "expand": true,
            "pageTitle": "Relatório Detalhado dos Testes"
        }],
        ["jest-junit", {
            "outputDirectory": ".",
            "outputName": "junit.xml"
        }]
    ],
    testLocationInResults: true
};

export default config;
