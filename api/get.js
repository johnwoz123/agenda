const dynamodb = require('../config/dynamodb');

module.exports.handler = (event, context, callback) => {
    const params = {
        TableName: process.env.TABLE_AGENDA,
        Key: {
            id: event.pathParameters.id,
        },
    };

    // get the agenda item from the database
    // fetch  from the database
    dynamodb.get(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t fetch the todo item.',
            });
            return;
        }

        // if (result.Item) {
        //     const {id} = result.Item;
        // }


        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result),
        };
        callback(null, response);
    });
};