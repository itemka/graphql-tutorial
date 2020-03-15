const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql; 

const Movie = require('../models/movie');
const Director = require('../models/director');

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    director: {
      type: DirectorType,
      resolve: async (parent, args) => Director.findById(parent.directorId),
    }
  })
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    movie: {
      type: new GraphQLList(MovieType),
      resolve: (parent, args) => Movie.find({directorId: parent.id}),
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const director = new Director({
          name: args.name,
          age: args.age,
        });
        return director.save();
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID },
      }, 
      resolve: (parent, args) => {
        const movie = new Movie({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
        }); 
        return movie.save();
      },
    },
    deleteDirector: {
      type: DirectorType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve: (parent, args) => Director.findByIdAndRemove(args.id),
    },
    deleteMovie: {
      type: MovieType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve: (parent, args) => Movie.findByIdAndRemove(args.id),
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => Director.findByIdAndUpdate(
        args.id,
        { $set: {
            name: args.name,
            age: args.age,
        }},
        { new: true },
      ),
    },
    updateMovie: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID },
      },
      resolve: (parent, args) => Movie.findByIdAndUpdate(
        args.id,
        { $set: {
            name: args.name,
            genre: args.genre,
            directorId: args.directorId,
        }},
        { new: true },
      ),
    },
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => Movie.findById(args.id),
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => Director.findById(args.id),
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: (parent, args) => Movie.find({}),
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve: (parent, args) => Director.find({}),
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
