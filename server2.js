const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query { hello2: String }
`;

const resolvers = {
  Query: { hello2: () => 'world' },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(5000)
  .then(() => console.log('Server started! 🚀'));