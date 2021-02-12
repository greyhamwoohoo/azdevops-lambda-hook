# azdevops-lambda-hook
An Azure DevOps ServiceHook implemented as a NodeJS Lambda on AWS using Cloudformation. 

The Lambda is exposed using HTTPS via a subdomain (ie: dev-turkana.greyhamwoohoo.com/v1/webhook, turkana.greyhamwoohoo.com/v1/webhook) and requires an API Key. Each 'environment' can have its own sub-domain. 

Shows an opinionated way to work with AWS Cloudformation and Lambas by using "Layers" separated by Lifecyle and Ownership.

The components are called 'Turkana' so references are easy to replace in future :)

Design decision: 100% Cloudformation. No SAM CLI, no Serverless, no Terraform. 

# Workflow
The following lifecycle is adopted based on lifecycle, ownership and the frequency of change:

| Layer | Activity                              | Typical Owner (Non-Prod) | Typical Owner (Prod) | Scope           |
| ----- | ------------------------------------- | ------------------------ | -------------------- | --------------- |
| 0     | Globals Loop                          | Admin                    | Admin                | Global          |
| 1     | Platform Loop                         | Admin                    | Admin                | Per environment |
| 2     | Application Loop                      | Admin                    | Admin                | Per environment |
| 3     | Component Loop                        | Anyone                   | N/A                  | Per component   |
| 4     | Local Development Loop                | Anyone                   | N/A                  | Per component   |

## Layer 0: Globals  Loop
The Globals loop is used for bootstrapping resources to be managed by Cloudformation. 

There is only a single resources in our case: an S3 Bucket. We use it for storing the Lambda .Zip files for each environment. 

The following commands are available:

| Description                                 | Command                                   |
| ------------------------------------------- | ----------------------------------------- |
| Check if Turkana is bootstrapped            | ```npm run globals:ready```               |
| Bootstrap Turkana                           | ```npm run globals:create```              |
| Update bootstrapping                        | ```npm run globals:update```              |
| Validate the stack template                 | ```npm run globals:validate-template```   |
| Gets the S3 Bucket Name                     | ```npm run globals:s3bucketname```        |

There is no destroy as the S3 bucket will not be deleted by a Cloudformation delete-stack.

## Layer 1: Platform Loop
A Platform is created for each Environment.: sub-domain, certificates, VPC's and so forth. 

Before creating the stack, see the infra/README.md commands: you must configure parameter files for creating the stack.

The following commands are available:

| Description                             | dev                                | prod                                |
| ----------------------------------------| -----------------------------------| ----------------------------------- |
| Check if the Platform is up and running | ```npm run dev:platform:ready```   | ```npm run prod:platform:ready```   |
| Create the Platform stack (and wait)    | ```npm run dev:platform:create```  | ```npm run prod:platform:create```  |
| Update the Platform stack (and wait)    | ```npm run dev:platform:update```  | ```npm run prod:platform:update```  |
| Destroy the Platform stacK (and wait)   | ```npm run dev:platform:destroy``` | ```npm run prod:platform:destroy``` |

## Layer 2: Application Loop
The Application Infrastructure is any infrastructure related to the application: Lambda Functions, Roles, Buckets, Databases...

### Layer 2.1: Seeding: Application Loop
To spin up Lambda Functions using Cloudformation, the Lambda zip must already exist in an S3 Bucket. 

The Pre-Application Loop will create the Lambdas and publish them to the correct bucket. 

| Description                             | dev                                | prod                                |
| ----------------------------------------| -----------------------------------| ----------------------------------- |
| Pre-seed the application                | ```npm run dev:app:pre-seed```     | ```npm run prod:app:pre-seed```     |

## Layer 2.2: Application Loop
The Application Loop contains the Cloudformation required to spin up Lambdas, Roles, Certificates etc. Everything application related. 

| Description                                   | dev                            | prod                           |
| ----------------------------------------------| ------------------------------ |------------------------------- |
| Check if the Application is up and running    | ```npm run dev:app:ready```    | ```npm run prod:app:ready```   |
| Create the Application stack (and wait)       | ```npm run dev:app:create```   | ```npm run prod:app:create```  |
| Update the Application stack  (and wait)      | ```npm run dev:app:update```   | ```npm run prod:app:update```  |
| Destroy the Application stacK (and wait)      | ```npm run dev:app:destroy```  | ```npm run prod:app:destroy``` |

## Layer 3: Component Loop (Cloud Update). ie: push code updates to components/Lambdas directly
See the src/ component for more information. 

For example: the Lambda / Function can be updated on demand using this workflow. Enter the src folder for the Lambda and run:

| Description                             | dev                                 | prod                                |
| ----------------------------------------| ------------------------------------| ----------------------------------- |
| Pre-seed the application                | ```npm run dev:lambda:update```     | ```npm run prod:lambda:update```    |

In the case of lambda, that will call update-function-code. 

## Layer 4: Local Development Loop (TDD)
See the src/ component for more information. 

# Local Development (VsCode)
To unify the experience between Mac, Linux and Windows, use the following VsCode Addin for all development on Windows (and optionally on Linux):

* Remote - Containers (ms-vscode-remote.remote-containers)

## To work in the VsCode DevContainer (Windows: Mandatory; Linux/MacOS: optional)
Run the Command: Remote-Containers - Open Folder in Container... and select the root of the repository. Confirm you can see you AWS keys:

```bash
set | grep AWS
```

NOTE: The assumption is that AWS_ACCESS_KEY, AWS_REGION and AWS_SECRET_ACCESS_KEY are defined on your host. 
