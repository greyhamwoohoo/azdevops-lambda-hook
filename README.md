# azdevops-lambda-hook
An Azure DevOps ServiceHook implemented as a Lambda on AWS using Cloudformation

# Local Development
To unify the experience between Mac, Linux and Windows, use the following VsCode Addin for all development on Windows (and optionally on Linux):

* Remote - Containers (ms-vscode-remote.remote-containers)

## To work in the VsCode DevContainer (Windows: Mandatory; Linux/MacOS: optional)
Run the Command: Remote-Containers - Open Folder in Container... and select the root of the repository. Confirm you can see you AWS keys:

```bash
set | grep AWS
```

NOTE: The assumption is that AWS_ACCESS_KEY, AWS_REGION and AWS_SECRET_ACCESS_KEY are defined on your host. 
