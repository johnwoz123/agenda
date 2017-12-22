const dynamodb = require('../config/dynamodb');

module.exports.handler = (event, context, cb) => {
    const params = {
        TableName: process.env.TABLE_AGENDA,
    };

    dynamodb.scan(params, (error, result) => {
        if (error) {
            console.log(error);
            cb(null, {
                statusCode: error.statusCode || 501,
                headers: {'Context-type': 'text/plain'},
                body: 'There seems to be no items on the agenda today'
            });
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items)
        };
        cb(null, response);
    });

};