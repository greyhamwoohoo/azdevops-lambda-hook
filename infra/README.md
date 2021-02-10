# Infrastructure
Cloudformation Templates and Parameter files. 

# Platform
The Cloudformation templates to manage the foundational infrastructure: subdomain/Route53 registration, certificate binding, environment name. 

## Files
| Folder      | File                       | Description |
| ----------- | -------------------------- | ----------- |
| globals     | globals.yaml               | Global resources that need to be managed (ie: turkana s3 bucket). |
| globals     | globals.parameters.json    | Contains the S3 bucket name and other global parameters. |
| platform    | foundation.yaml            | Foundational and cross-cutting concerns: Route53, Sub-domain, VPC etc. |
| platform    | foundation.parameters.json | Copy this file and create a new one called foundation.parameters.[ENVIRONMENT].json for each environment you want to target using this as a template. |
