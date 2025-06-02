import { expect } from '@jest/globals';
import * as request from 'supertest';
import { BASE_URL } from '../../../constants/constants';
import * as path from 'path';
import generics from '../../utils/generics'

const randomId = Math.floor(Math.random() * 1000) + 1;


describe('Post request example test', () => {

    it('Should create an author then check response data and check the return status code 200', async () => {

        const filePath = path.join(__dirname, '../data/json/authors.json');
        const authors = await generics.readJsonFile(filePath);

        for (const author of authors) {
            const novoAutor = {
                id: randomId,
                idBook: randomId,
                firstName: author.firstName,
                lastName: author.lastName
            };

            const response = await request(BASE_URL)
                .post('/api/v1/Authors')
                .send(novoAutor);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({
                id: randomId,
                idBook: randomId,
                firstName: author.firstName,
                lastName: author.lastName
            }));
        }
    });

});