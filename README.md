# Beauty TODO List

This application will allow creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created.

- Repository Url: https://github.com/lu-moreira/udacity-course-4-project

## Requirements
* Node 12
* serverless 1.60.4
* aws cli 1.16.257+

# Dependencies

Take a look at the package.json files under backend and client folders.

## Deploying on your own in AWS
This assumes that you already have an AWS Profile called *serverless* and are using *us-east-2* region
(obviously you can substitute your own settings as required)
```sh
export NODE_OPTIONS=--max_old_space_size=4096

sls deploy -v --aws-profile <your profile> --aws-region us-east-1
```
:warning: Note that NODE_OPTIONS is required for the _individually_ packaging option in *serverless.yml* to avoid Out Of Memory issues 

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the serverless TODO application.

# Screenshots

### Auth0 Page 
![image](https://user-images.githubusercontent.com/45040629/75077594-04e9e180-54e2-11ea-82a6-bd6c2b981ac1.png)

### Tasks List + Creation
![image](https://user-images.githubusercontent.com/45040629/75077704-4ed2c780-54e2-11ea-894c-506d2e6b5e3e.png)

### Task Image Update
![app-running](http://g.recordit.co/AUWRU8H7sn.gif)
http://g.recordit.co/AUWRU8H7sn.gif

### Task Image View
![image](https://user-images.githubusercontent.com/45040629/75077869-be48b700-54e2-11ea-81dd-946e38f5dd29.png)
