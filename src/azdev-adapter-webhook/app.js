'use strict'

const publisher = require("./publisher.js")

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {

    // API Gateway Proxy Integration with AWS Lambda Functions - structure must conform to this spec:
    // https://aws.amazon.com/premiumsupport/knowledge-center/malformed-502-api-gateway/
    // https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-output-format
    let response = {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {
        },
        body: {
            message: "OK"
        }
    }

    try {

        if(!event.body) {
            throw "The event structure is expected to contain a .body"
        }

        // TODO: Adapt or do whatever
        var adaptedEvent = event.body;

        await publisher.publishEvent(adaptedEvent)

    } catch (err) {
        response.statusCode = 500
        response.body.message = err;

        console.error(JSON.stringify(response))
    }

    response.body = JSON.stringify(response.body)
    return response
};
