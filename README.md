# agenda
A simple REST api leveraging serverless, aws lambda, and DynamoDB

Test your service locally, without having to deploy it first.

## Setup

```bash
npm install
serverless dynamodb install
serverless offline start
serverless dynamodb migrate (this imports schema)
```

## Run service offline

```bash
serverless offline start
```


### Create an agenda

## Leverage Postman to test locally
- http://localhost:3000/agenda/
