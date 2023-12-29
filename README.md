## Description

## Root

```bash
localhost:3000/api
```

## For User

base route

```bash
/users
```

POST

```bash
/login
```

```bash
{
  "username" : "",
  "password" : ""
}
```

GET

```bash
/all/search/:userId
```

GET

```bash
/all/searchbyusername/:username
```

GET

```bash
/friend/search/:userId
```

GET

```bash
/conversation/search/:userId
```

POST

```bash
/conversation/draft
```

```bash
{
  "reciverId" : 0,
  "message" : ""
}
```

GET

```bash
/conversation/draft/:reciever
```

GET

```bash
/notificatoins
```

GET

```bash
/friends
```

POST

```bash
/friend/send
```

```bash
{
  "user" : 0
}
```

PUT

```bash
/friend/accept
```

```bash
{
  "user" : 0
}
```

PATCH

```bash
/friend/reject
```

```bash
{
  "user" : 0
}
```

DELETE

```bash
/friend/unfriend
```

```bash
{
  "user" : 0
}
```

## For Admin

base route

```bash
/admin
```

POST

```bash
/file/rule/create
```

```bash
{
  "type" : "pdf",
  "size" : 20000
}
```

GET

```bash
/file/rules
```

PUT

```bash
/file/rule/edit
```

```bash
{
  "filePermissionId" : 1,
  "type" : "pdf",
  "size" : 20000
}
```

POST

```bash
/user/rule/create
```

```bash
{
  "users" : [
    {
      "userId" : 1
    },
    {
      "userId" : 2
    },
    {
      "userId" : 3
    }
  ]
}
```

GET

```bash
/user/rules
```

PATCH

```bash
/user/rule/edit
```

```bash
{
  "userId" : 1,
  "uploadDisable" : true
}
```

DELETE

```bash
/file/:id
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
