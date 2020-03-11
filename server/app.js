
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 80;

mongoose.connect(
  'mongodb+srv://testUserName1:Password123@cluster0-irvss.mongodb.net/graphql-tutorial?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
const dbConnection = mongoose.connection;
dbConnection.on(`error`, err => console.log(`Connection error ${err}`));
dbConnection.once(`open`, err => console.log(`Connected to DB!`));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.use('/', (req, res) => {
  res.end(`
    <div>
      <nav>
        <ul>
          <li>
            <a href="/graphql">GraphQL</a>
          </li>
        </ul>
      </nav>
    </div>
  `)
});

app.listen(PORT, err => {
  err
    ? console.log(err)
    : console.log(`Server stated! Port: ${PORT}`);
});
