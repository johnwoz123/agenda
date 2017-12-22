const dynamodb = require('../config/dynamodb');

module.exports.handler = (event, context, cb) => {
    const params = {
        TableName: process.env.TABLE_AGENDA,
        Key: {
            id: event.pathParameters.id,
        },
    };

    // delete the agenda item from the database
    dynamodb.delete(params, (error) => {
        // handle potential errors
        if (error) {
            console.error(error);
            cb(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Could not remove the todo item.',
            });
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify({}),
        };
        cb(null, response);
    });
};