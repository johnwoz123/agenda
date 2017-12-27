const uuid = require('uuid');
const dynamodb = require('../config/dynamodb');

module.exports.handler = (event, context, cb) => {
    console.log(event);
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    if (typeof data.text !== 'string') {
        console.log('Validation error should be a string');
        cb(null, {
            statusCode: 400,
            headers: {'Content-Type': 'text/plain'},
            body: 'Couldn\'t create the todo item.',
        });
        return;
    }
    const params = {
        TableName: process.env.TABLE_AGENDA,
        Item: {
            id: uuid.v1(),
            text: data.text,
            checked: false,
            createdAt: timestamp,
            updatedAt: timestamp,
        },
    };

    dynamodb.put(params, (error) => {
        if (error) {
            cb(null, {
                statusCode: error.statusCode || 501,
                headers: {'Content=Type': 'text/plain'},
                body: 'Could not create the agenda item'
            });
            return;
        }

        // response
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
        cb(null, response);
    });
};
