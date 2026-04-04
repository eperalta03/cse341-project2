const swaggerAutogen = require ('swagger-autogen');

const doc = {
    info: {
        title: "Books & Students API",
        description: "Books & Students API"
    },
    host: "localhost:3500",
    schemes: ["https", "http"]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
