import { expect } from '@jest/globals';
import * as request from 'supertest';
import { BASE_URL } from '../../../constants/constants';
import * as path from 'path';
import generics from '../../utils/generics'
import { authorsRoute } from '../../routes/author-route';

const randomId = Math.floor(Math.random() * 1000) + 1;


describe('Testes de exemplo com requisições POST consumindo os dados de um arquivo JSON', () => {

    it('Deve criar vários autores e verificar a resposta, então confere se o status code é 200', async () => {

        const filePath = path.join(__dirname, '../../data/json/authors.json');
        const authors = await generics.readJsonFile(filePath);

        for (const author of authors) {
            const novoAutor = {
                id: randomId,
                idBook: 2,
                firstName: author.firstName,
                lastName: author.lastName
            };

            const response = await request(BASE_URL)
                .post(authorsRoute.criaAutors)
                .send(novoAutor);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({
                id: randomId,
                idBook: 2,
                firstName: author.firstName,
                lastName: author.lastName
            }));
        }
    });

});