# Gym Social Media

## Description

Gym Social Media is a Node.js API for creating Social Media App focusing on gym enthusiasts with place they can connect with like-minded people.
API provides several functionalities:

- user creation and profile customization (profile photo, information about individual)
- authentication and authorization (Using JWT and Passport library)
- adding posts (text and photos)
- searching for friends
- creating friend requests and routes to accept, refuse or cancel them
- commenting posts
- File upload (photos) handling
- Basic request logs

Application is written in JavaScript, uses SQL database (MySQL dialect) and uses many different libraries:

- Express - Main library used for web server, handling request, routing etc.
- Sequelize - provides connection and abstraction layer for database (ORM)
- Jsonwebtoken - used for signing JWT tokens
- Passport - used for authentication of the request (JWT strategy)
- Multer - used for handling files in incoming requests
- Sharp - used to create thumbnails of the uploaded photos

It also uses several more of a helper libraries:

- cors (cross origin resoruce sharing) - checking if req origin is allowed to make request;
- date-fns - used for formatting dates
- dotenv - used for access to environment variables

App also uses below testing technologies, which are used for testing the API:

- Chai
- Mocha
- Supertest

## How to install

1. Run npm command to install the dependencies:
   `npm install`

2. Project need environment variables. Create a .env file, which consist of below values ():
   > PORT=
   > DB_USER=
   > DB_PASSWORD=
   > DB_HOST=
   > ACCESS_TOKEN_SECRET=
   > REFRESH_TOKEN_SECRET=
   > TEST_ACCOUNT_USERNAME=
   > TEST_ACCOUNT_EMAIL=
   > TEST_ACCOUNT_PASSWORD=
   > TEST_ACCOUNT_USERNAME2=
   > TEST_ACCOUNT_EMAIL2=
   > TEST_ACCOUNT_PASSWORD2=

Example file is in the repo and is called `.env-example`.
