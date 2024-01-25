import { describe } from '@jest/globals';
import {
    createAuthor,
    createInvalidAuthorReturnBody,
    getByIdExpectData,
    getByIdNotFounded,
    getListExpectData,
    tryToCreateAnAuthorWithInvalidData
} from '../data/author-data';
import { EntityService } from '../entity/entities';
import { authors } from '../routes/author-route';

const getList = authors.getListAuthors
const getById = authors.getAuthorsById
const create = authors.createAuthors

const entity = new EntityService();

describe('Get list request example test', () => {

    it('Should find the register and return status code 200', async () => {
        await entity.getList(getList, 200, getListExpectData)
    })
});

describe('Get by id request example test', () => {

    it('Should find the register by id and return status code 200', async () => {
        await entity.getById(getById, 2, 200, getByIdExpectData)
    })

    it('Should try to find the register by id but not found and return 404 status code', async () => {
        await entity.getById(getById, 1000, 404, getByIdNotFounded)
    })
});

describe('Post request example test', () => {

    it('Should create an author then check response data and check the return status code 200', async () => {
        await entity.create(create, createAuthor, 200, createAuthor)
    })

    it('Should try to create an author with invalid data then check response and check the return status code 400', async () => {
        await entity.create(create, tryToCreateAnAuthorWithInvalidData, 400, createInvalidAuthorReturnBody)
    })
});
