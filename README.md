# Photo Upload

Setup:  `npm run setup` to reset and install all dependencies.

To start up:  `npm start` or `nodemon`.  The server will be available at `localhost:3000`.

Be sure to set your environment variables:

```js
// .env
MONGO_URL=mongodb://localhost/your-db-name
JWT_SECRET='some string'
AWS_BUCKET='some-unique-bucket-name'
AWS_URL='https://s3-us-west-1.amazonaws.com/'
```