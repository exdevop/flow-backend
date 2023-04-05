## This is a Nodejs backend that implements [Set of property listings](https://flow-living-staging.s3.eu-west-1.amazonaws.com/public/assessment/listings.json), [Set of Agent data records](https://flow-living-staging.s3.eu-west-1.amazonaws.com/public/assessment/agents.json) and [Set of Organisation data records](https://flow-living-staging.s3.eu-west-1.amazonaws.com/public/assessment/organisations.json).

### Features demonstrated:

- [ ] **Node Express** deployed to AWS Lambda. I chose this because it's quick to demonstrate.
- [ ] Automated **CI with Github Actions** for automatic deployment using **Serverless**.
- [ ] **Mongo DB** hosted remotely.
- [ ] Tests, Access control and Containerisation omitted due to time
- [ ] **Request validation** partly implemented on POST endpoints for demonstration purposes **with simple rate limiting**

### Overview:

- The data loaded
  from [Set of property listings](https://flow-living-staging.s3.eu-west-1.amazonaws.com/public/assessment/listings.json), [Set of Agent data records](https://flow-living-staging.s3.eu-west-1.amazonaws.com/public/assessment/agents.json)
  and [Set of Organisation data records](https://flow-living-staging.s3.eu-west-1.amazonaws.com/public/assessment/organisations.json) is loaded and formatted to match the DB models used in order to
  demonstrate ent to end implementation.

## Requirements & Tools used.

- [ ] Mongo DB 6.0.5
- [ ] Node version 16
- [ ] M1 Pro (Apple Silicon) OS is used in case you need to resolve compatibility of tools installed.
- [ ] All packages used are latest stable versions.

## Setup Procedure

```shell
#CD into the project and install packages 
 $ npm install -g serverless
 $ npm install
```

### To test locally and deploy to your AWS Lambda instance:

```shell
#If you dont have AWS CLI set up on client machine
$ serverless config credentials --provider aws --key <...> --secret <>

$ npm run deploy
#Be sure to add environment variables used to AWS lambda console since they are not passed via Github
```

## API test and explanation:

- GET request to will trigger loading of data
  from [Set of property listings](https://flow-living-staging.s3.eu-west-1.amazonaws.com/public/assessment/listings.json), [Set of Agent data records](https://flow-living-staging.s3.eu-west-1.amazonaws.com/public/assessment/agents.json)
  and [Set of Organisation data records](https://flow-living-staging.s3.eu-west-1.amazonaws.com/public/assessment/organisations.json) of not loaded already.

## Notes:

- [ ] `server.js` is used to test the app locally while `app.js` is deployed to AWS Lambda. This can be deployed as a stand-alone microservice too.
- [ ] **Agents API returns invalid json data** but the API is demonstrated via `GET agents/list/:offset/:limit` endpoint
- [ ] Agents **do not have organisation association** in the data given but the API is demonstrated via `GET agents/list_by_organisation/:organisationID` endpoint
- [ ] All the `GET /list...` endpoints can return the data with the specified query parameters per API module since only query parameters would change, in this case they would have to be exact
  attribute names stored in DB. to avoid repetition of logic, request parameters with the specified parameter names are demonstrated, `GET agents/list_by_organisation/:organisationID` for example.

## Sample CRUD requests (Can be executed on Any JetBrains IDE):

### The GET section implements most of the requirements for the project. See API handler comments. This CRUD sample has only requests for listings for demonstration

```http request
### Set of property listings
GET https://flow-living-staging.s3.eu-west-1.amazonaws.com/public/assessment/listings.json
Accept: application/json

### Set of Agent data records
GET https://flow-living-staging.s3.eu-west-1.amazonaws.com/public/assessment/agents.json
Accept: application/json

### Set of Organisation data records
GET https://flow-living-staging.s3.eu-west-1.amazonaws.com/public/assessment/organisations.json
Accept: application/json

### New 'random.*' and 'isoTimestamp' variables
POST http://127.0.0.1:8001/apiV1/listings/create
Content-Type: application/json

{
    "agent": "{{$random.hexadecimal(24)}}",
    "title": "{{$random.alphanumeric(10)}}",
    "description": "{{$random.alphanumeric(50)}}",
    "status": "{{$random.alphabetic(10)}}",
    "organisation": "{{$random.hexadecimal(24)}}",
    "listingType": "{{$random.alphabetic(10)}}",
    "listingSector": "{{$random.alphabetic(10)}}",
    "unit": {
    "bedrooms": "{{$random.integer(100)}}",
    "bathrooms": "{{$random.integer(100)}}",
    "parking": "{{$random.integer(100)}}",
    "price": "{{$random.integer(100)}}"
    },
    "images": ["{{$random.alphabetic(10)}}","{{$random.alphabetic(10)}}"]
}

### New 'random.*' and 'isoTimestamp' variables
PATCH http://127.0.0.1:8001/apiV1/listings/update/6422c2de92af8eba42aa90be
Content-Type: application/json

{
    "agent": "{{$random.alphabetic(10)}}",
    "title": "{{$random.alphabetic(10)}}",
    "description": "{{$random.alphabetic(10)}}",
    "status": "{{$random.alphabetic(10)}}",
    "organisation": "{{$random.alphanumeric(10)}}",
    "listingType": "{{$random.alphabetic(10)}}",
    "listingSector": "{{$random.alphabetic(10)}}",
    "unit": {
    "bedrooms": "{{$random.integer(100)}}",
    "bathrooms": "{{$random.integer(100)}}",
    "parking": "{{$random.integer(100)}}",
    "price": "{{$random.integer(100)}}"
    },
    "images": ["{{$random.alphanumeric(10)}}","{{$random.alphanumeric(10)}}"]
}

### GET request with a header
GET http://127.0.0.1:8001/api

### GET Property listings
GET http://127.0.0.1:8001/apiV1/listings/list/0/15
Accept: application/json

### GET Property Agents
GET http://127.0.0.1:8001/apiV1/agents/list/0/15
Accept: application/json

### GET Organisations
GET http://127.0.0.1:8001/apiV1/organisations/list/0/15
Accept: application/json

### DELETE  Property listing
DELETE http://127.0.0.1:8001/apiV1/listings/delete/6421fe4f9cb79e46b2024d75
Accept: application/json

```

# Coming up (Optional) due to time constraint:

> Minimal **React.js** dashboard for the API.