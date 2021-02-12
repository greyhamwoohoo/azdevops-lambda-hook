'use strict';

const app = require('../../app.js');
const publisher = require("../../publisher.js")
const sinon = require('sinon')
const chai = require('chai');
const fs = require('fs')
const expect = chai.expect;
var event = {}, context = { }, sandbox = { };
var publishEventStub = { }
var consoleErrorStub = { }

describe('ServiceHook Lambda Tests', function () {

    beforeEach(function() {
        sandbox = sinon.createSandbox()
        publishEventStub = sandbox.stub(publisher, "publishEvent");
        consoleErrorStub = sandbox.stub(console, "error");
    })

    afterEach(function() {
        sandbox.restore()
    })

    describe("when the notification is adaptable", async() => {

        it('will adapt the notification and publish the event', async () => {

            event.body = fs.readFileSync("events/stage-state-changed-event.json")
    
            await app.lambdaHandler(event, context)

            expect(publishEventStub.calledOnce).to.be.true
        })

        it('will return a successful response to Azure DevOps', async () => {
            
            event.body = fs.readFileSync("events/stage-state-changed-event.json")

            const result = await app.lambdaHandler(event, context)

            expect(result).to.be.an('object');
            expect(result.statusCode).to.equal(200);
            expect(result.body).to.be.an('string');
            expect(JSON.parse(result.body).message).to.be.an('string')
        })        

    })

    describe("when the notification is not adaptable", function() {

        describe("and the entire notification is missing", async () => {
            
            it('will not publish an event', async () => {

                event.body = null
                
                await app.lambdaHandler(event, context)
                
                expect(publishEventStub.notCalled).to.be.true        
            });

            it('will log an error', async () => {

                event.body = null
                
                await app.lambdaHandler(event, context)
                
                expect(consoleErrorStub.calledOnce).to.be.true        
            });            
            
            it('will return an error response to the notification provider', async () => {
                
                event.body = null
                
                const result = await app.lambdaHandler(event, context)
                
                expect(result).to.be.an('object');
                expect(result.statusCode).to.equal(500);
                expect(result.body).to.be.an('string');
                expect(JSON.parse(result.body).message).to.be.an('string')
            })
        });        
    })
});
