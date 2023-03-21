require('dotenv').config();
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

const uri = process.env.MONGODB_URI;

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

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server has started on port ${port}!`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
