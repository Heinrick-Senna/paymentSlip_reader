const request = require('supertest'), app = require(__dirname + '/src/routes/mainRoute'),
      fs = require('fs');

const arrOfTests = JSON.parse(fs.readFileSync(__dirname + '/tests.json', 'utf-8'));

describe('Testing Aplication', () => {
    arrOfTests.forEach(test => {
        it (test.input, async () => {
            const res = await request(app).get('/boleto/' + test.input);

            expect(JSON.stringify(res.body)).toBe(JSON.stringify(test.output));
        });    
    });
});