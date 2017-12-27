const assert = require('chai').assert;
const dynamodb = require('../config/dynamodb');
const create = require('../api/create');

beforeAll((done) => {
    done();
});

describe('Test database save and get item', () => {
    const item =
        {
            "body": "{\"text\":\"this is a new thing\", \"checked\":\"true\"}"
        };
    const context = {};
    let callback = () => {};

    it('should create a new item', done => {
        create.handler(item, context, callback);
        done();
    });
});