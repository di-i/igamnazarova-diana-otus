const typeDefs = require('./schema/index');
const resolvers = require('./resolvers/index');
const { ApolloServer } = require('apollo-server');


const server = new ApolloServer({ typeDefs, resolvers });

server.listen({
	port: 4000,
	endpoint: '/graphql',
});