const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const directorsJson = [
  { name: "directorsJson1", age: 98 }, // 5e6815b71c9d440000bc0c67
  { name: "directorsJson2", age: 27 }, // 5e68179c1c9d440000bc0c6c
  { name: "directorsJson3", age: 45 }, // 5e6817c11c9d440000bc0c6d
  { name: "directorsJson4", age: 34 }, // 5e6817dc1c9d440000bc0c6e
];

const moviesJson = [
  { name: "moviesJson1", genre: 'moviesJson1genre', directorId: 1 }, // 5e6815b71c9d440000bc0c67
  { name: "moviesJson2", genre: 'moviesJson1genre', directorId: 1 }, // 5e6815b71c9d440000bc0c67
  { name: "moviesJson3", genre: 'moviesJson1genre', directorId: 1 }, // 5e6815b71c9d440000bc0c67
  { name: "moviesJson4", genre: 'moviesJson2genre', directorId: 2 }, // 5e68179c1c9d440000bc0c6c
  { name: "moviesJson5", genre: 'moviesJson2genre', directorId: 2 }, // 5e68179c1c9d440000bc0c6c
  { name: "moviesJson6", genre: 'moviesJson3genre', directorId: 3 }, // 5e6817c11c9d440000bc0c6d
  { name: "moviesJson7", genre: 'moviesJson4genre', directorId: 4 }, // 5e6817dc1c9d440000bc0c6e
];

const movies = [
  { id: '1', name: 'movie1', genre: 'Crime1', directorId: "1" },
  { id: '2', name: 'movie2', genre: 'Crime2', directorId: "2" },
  { id: 3, name: 'movie3', genre: 'Crime3', directorId: 3 },
  { id: 4, name: 'movie4', genre: 'Crime4', directorId: 4 },
  { id: 5, name: 'movie5', genre: 'Crime1', directorId: 1 },
  { id: 6, name: 'movie6', genre: 'Crime1', directorId: 1 },
  { id: 7, name: 'movie7', genre: 'Crime1', directorId: 1 },
  { id: 7, name: 'movie7', genre: 'Crime4', directorId: 4 },
];

const directors = [
  { id: '1', name: 'director1', age: 55 },
  { id: '2', name: 'director2', age: 65 },
  { id: 3, name: 'director3', age: 75 },
  { id: 4, name: 'director4', age: 85 },
];

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve: (parent, args) => directors.find(director => director.id == parent.id),
    }
  })
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movie: {
      type: new GraphQLList(MovieType),
      resolve: (parent, args) => movies.filter(movie => movie.directorId == parent.id),
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => movies.find(movie => movie.id == args.id),
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => directors.find(director => director.id == args.id),
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: (parent, args) => movies,
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve: (parent, args) => directors,
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
