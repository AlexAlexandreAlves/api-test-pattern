import { expect } from '@jest/globals';
import * as request from 'supertest';
import { BASE_URL } from '../../../constants/constants';
import * as path from 'path';
import generics from '../../utils/generics';
import { authorsRoute } from '../../routes/author-route';


const randomId = Math.floor(Math.random() * 1000) + 1;

describe('Post request example test with CSV', () => {

    it('Should create authors from CSV file and check response data and status code 200', async () => {

        const filePath = path.join(__dirname, '../../data/csv/authors.csv');
        const authors = await generics.readCsvFile(filePath);

        for (const author of authors) {
            const novoAutor = {
                id: randomId,
                idBook: 1,
                firstName: author.firstName,
                lastName: author.lastName
            };

            const response = await request(BASE_URL)
                .post(authorsRoute.createAuthors)
                .send(novoAutor);
                
                console.log(response.body);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({
                id: randomId,
                idBook: 1,
                firstName: author.firstName,
                lastName: author.lastName
            }));
        }
    });
});