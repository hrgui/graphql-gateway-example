const { ApolloServer } = require('apollo-server');
const { fetchRemoteServiceListSchemas } = require('./lib/gateway');

const serviceList =  [
  {name: "server1", url: "http://localhost:4000"},
  {name: "server2", url: "http://localhost:5000"},
  {name: "server3", url: "http://localhost:6000"}
];


async function bootstrap() {
  const schema = await fetchRemoteServiceListSchemas(serviceList);
  const server = new ApolloServer({schema});
  await server.listen(7000);

  console.log('server started');
}


bootstrap();