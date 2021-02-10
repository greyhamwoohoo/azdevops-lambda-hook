# azdevops-lambda-hook
An Azure DevOps ServiceHook implemented as a Lambda on AWS using a Cloudformation Stack per "environment" (dev/prod).

Shows an opinionated way to work with AWS Cloudformation and Lambas by using "Layers" separated by Lifecyle and Ownership. 

The components are called 'Turkana' so references are easy to replace in future :)

# Workflow
The following lifecycle is adopted based on lifecycle, ownership and the frequency of change:

| Layer | Activity                              | Typical Owner (Non-Prod) | Typical Owner (Prod) |
| ----- | ------------------------------------- | ------------------------ | -------------------- |
| 0     | Globals Loop                          | Admin                    | Admin                |
| 1     | Platform Loop                         | Admin                    | Admin                |

## Layer 0: Globals  Loop
The Globals loop is used for bootstrapping resources to be managed by Cloudformation but shared by multiple stacks (or projects). 

There is only a single resources in our case: an S3 Bucket. 

The following commands are available:

| Description                                 | Command                                   |
| ------------------------------------------- | ----------------------------------------- |
| Check if Turkana is bootstrapped            | ```npm run globals:ready```               |
| Bootstrap Turkana                           | ```npm run globals:create```              |
| Update bootstrapping                        | ```npm run globals:update```              |
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

# Local Development (VsCode)
To unify the experience between Mac, Linux and Windows, use the following VsCode Addin for all development on Windows (and optionally on Linux):

* Remote - Containers (ms-vscode-remote.remote-containers)

## To work in the VsCode DevContainer (Windows: Mandatory; Linux/MacOS: optional)
Run the Command: Remote-Containers - Open Folder in Container... and select the root of the repository. Confirm you can see you AWS keys:

```bash
set | grep AWS
```

NOTE: The assumption is that AWS_ACCESS_KEY, AWS_REGION and AWS_SECRET_ACCESS_KEY are defined on your host. 
