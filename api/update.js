const dynamodb = require('../config/dynamodb');

module.exports.handler = (event, context, cb) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    if (typeof data.text !== 'string' ) {
        console.error('Validation error');
        console.log(timestamp);
        cb(null, {
            statusCode: 400,
            headers: {'Content-Type': 'text/plain'},
            body: 'Could not update the agenda item'
        });
        return;
    }
    if (typeof data.checked !== 'boolean' ) {
        console.error('Validation error');
        cb(null, {
            statusCode: 401,
            headers: {'Content-Type': 'text/plain'},
            body: 'Could not update the agenda item boolean problem'
        });
        return;
    }
    const params = {
        TableName: process.env.TABLE_AGENDA,
        Key: {
            id: event.pathParameters.id,
        },
        ExpressionAttributeNames: {
            '#agenda_text': 'text',
        },
        ExpressionAttributeValues: {
            ':text': data.text,
            ':checked': data.checked,
            ':updatedAt': timestamp,
        },
        UpdateExpression: 'SET #agenda_text = :text, checked = :checked, updatedAt = :updatedAt',
        ReturnValues: 'ALL_NEW',
    };

    dynamodb.update(params, (error, result) => {
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
            body: JSON.stringify(result.Attributes)
        };
        cb(null, response);
    });

};