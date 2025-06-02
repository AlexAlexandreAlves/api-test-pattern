import { describe } from '@jest/globals';
import {
    criaAutor,
    validaRetornoAutorInvalido,
    dadoEsperadoGetById,
    getByIdNaoEncontrado,
    dadoEsperadoGetList,
    tentaCriarUmAutorComDadosInvalidos
} from '../data/author-data';
import { EntityService } from '../entity/entities';
import { authorsRoute } from '../routes/author-route';


const getList = authorsRoute.getListAuthors
const getById = authorsRoute.getAuthorsById
const create = authorsRoute.criaAutors

const entity = new EntityService();

describe('Exemplos de teste usando o Get list', () => {

    it('Deve encontrar o registro e retornar o código de status 200', async () => {
        await entity.getList(
            getList, // Rota para listar autores
            200, // Código de status esperado
            dadoEsperadoGetList // Dados esperados na resposta
        )

    })
});

describe('Exemplos de teste usando o Get by id', () => {

    it('Deve encontrar o registro pelo id e retornar o código de status 200', async () => {
        await entity.getById(
            getById,
            2, // ID do autor a ser buscado
            200,
            dadoEsperadoGetById // Dados esperados na resposta
        )
    })

    it('Deve tentar encontrar o registro pelo id, mas não encontrado e retornar o código de status 404', async () => {
        await entity.getById(
            getById,
            1000,
            404,
            getByIdNaoEncontrado
        )
    })
});

describe('Exemplos de teste usando o Create', () => {

    it('Deve criar um autor e verificar os dados da resposta e o código de status 200', async () => {
        await entity.create(
            create, // Rota para criar autor
            criaAutor, // Dados do autor a ser criado
            200,
            criaAutor
        )
    })

    it('Deve tentar criar um autor com dados inválidos e verificar a resposta e o código de status 400', async () => {
        await entity.create(
            create, // Rota para criar autor
            tentaCriarUmAutorComDadosInvalidos, // Dados do autor a ser criado
            400, // Código de status esperado
            validaRetornoAutorInvalido
        )
    })
});
