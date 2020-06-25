const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query { hello3: String }
`;

const resolvers = {
  Query: { hello3: () => 'world' },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(6000)
  .then(() => console.log('Server started! 🚀'));