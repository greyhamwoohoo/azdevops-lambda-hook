# Azure DevOps Adapter Webhook
Azure DevOps ServiceHook Lambda.

## Assumption
The Platform and Application Stacks have been created. 
Development is happening using Visual Studio Code Remote Container. 

## Activities (Common)
| Activity                                | Command                    |
| --------------------------------------- | -------------------------- |
| Build                                   | npm run build              | 
| Run unit tests                          | npm run test:unit          |
| TDD (Unit Tests)                        | npm run tdd:unit           |

## Activities (Stack Specific)
| Activity                                | Dev                        | Prod                       |
| --------------------------------------- | -------------------------- |--------------------------- |
| Build and push the Lambda code in AWS   | npm run dev:lambda:update  | npm run prod:lambda:update | 

## Events
The events/ folder contains Test events sent from Azure DevOps ServiceHook.
