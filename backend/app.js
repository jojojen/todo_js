const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const cors = require('cors'); // Import CORS

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo API',
            version: '1.0.0',
            description: 'A Todo list API'
        },
    },
    apis: ['./routes.js']
}
const swaggerSpec = swaggerJsdoc(options);

const uri = 'my connect';

async function listCollections() {
  const collectionList = await mongoose.connection.db.listCollections().toArray();
  console.log('=== Collections: ===');
  collectionList.forEach((collection) => console.log(collection.name));
  console.log('====================');
}

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = express();    
    // middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    // routers for http req
    app.use('/api', routes);
    // swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // List collections after connecting to the database
    listCollections();

    app.listen(5000, () => {
      console.log('Server has started!');
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
