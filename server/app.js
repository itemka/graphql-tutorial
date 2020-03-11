
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');

const app = express();
const PORT = process.env.PORT || 80;

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(PORT, err => {
  err
    ? console.log(err)
    : console.log(`Server stated! Port: ${PORT}`);
});
