import { describe } from '@jest/globals';
import {
    criaAutor,
    validaRetornoAutorInvalido,
    dadoEsperadoGetById,
    getByIdNaoEncontrado,
    dadoEsperadoGetList,
    tentaCriarUmAutorComDadosInvalidos,
    atualizaAutor
} from '../data/author-data';
import { EntityService } from '../entity/entities';
import { authorsRoute } from '../routes/author-route';


const getListRoute = authorsRoute.getListAuthors;
const getByIdRoute = authorsRoute.getAuthorsById;
const createRoute = authorsRoute.criaAutors;
const updateRoute = authorsRoute.updateAuthors;
const deleteRoute = authorsRoute.deleteAuthors;

const entity = new EntityService();

describe('Exemplos de teste usando o Get list', () => {

    it('Deve encontrar o registro e retornar o código de status 200', async () => {
        await entity.getList(
            getListRoute, // Rota para listar autores
            200, // Código de status esperado
            dadoEsperadoGetList // Dados esperados na resposta
        )

    })
});

describe('Exemplos de teste usando o Get by id', () => {

    it('Deve encontrar o registro pelo id e retornar o código de status 200', async () => {
        await entity.getById(
            getByIdRoute,
            2, // ID do autor a ser buscado
            200,
            dadoEsperadoGetById // Dados esperados na resposta
        )
    })

    it('Deve tentar encontrar o registro pelo id, mas não encontrado e retornar o código de status 404', async () => {
        await entity.getById(
            getByIdRoute,
            1000,
            404,
            getByIdNaoEncontrado
        )
    })
});

describe('Exemplos de teste usando o Create', () => {

    it('Deve criar um autor e verificar os dados da resposta e o código de status 200', async () => {
        await entity.create(
            createRoute, // Rota para criar autor
            criaAutor, // Dados do autor a ser criado
            200,
            criaAutor
        )
    })

    it('Deve tentar criar um autor com dados inválidos e verificar a resposta e o código de status 400', async () => {
        await entity.create(
            createRoute, // Rota para criar autor
            tentaCriarUmAutorComDadosInvalidos, // Dados do autor a ser criado
            400, // Código de status esperado
            validaRetornoAutorInvalido
        )
    })

});

describe('Exemplos de teste usando o Update', () => {

    it('Deve criar um autor e verificar os dados da resposta e o código de status 200', async () => {
        await entity.update(
            updateRoute, // Rota para atualizar autor
            1, // ID do autor a ser atualizado
            atualizaAutor, // Dados do autor a ser atualizado
            200,
            atualizaAutor // Dados esperados na resposta
        )
    })
});


describe('Exemplos de teste usando o delete', () => {

    it('Deve deletar o registro pelo id e retornar o código de status 200', async () => {
        await entity.delete(
            deleteRoute,
            1, // ID do autor a ser deletado
            200
        )
    })
});
