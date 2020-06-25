const { fetch } = require('cross-fetch');
const { print } = require('graphql');
const { stitchSchemas } = require('@graphql-tools/stitch');
const { ApolloServer } = require('apollo-server');
const { wrapSchema, introspectSchema } = require('@graphql-tools/wrap');

const createExecutor = url => async ({ document, variables }) => {
  const query = print(document);
  const fetchResult = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables })
  });
  return fetchResult.json();
};

const getRemoteSchema = async (url) => {
  const executor = createExecutor(url);
  const schema = wrapSchema({
    schema: await introspectSchema(executor),
    executor
  });
  return schema
}

const serviceList =  [
  {name: "server1", url: "http://localhost:4000"},
  {name: "server2", url: "http://localhost:5000"},
  {name: "server3", url: "http://localhost:6000"}
];

async function fetchRemoteSchemas(serviceList) {
  const subschemas = [];
  for (let {url} of serviceList) {
    subschemas.push({schema: await getRemoteSchema(url)});
  }

  return stitchSchemas({subschemas});
}


async function bootstrap() {
  const schema = await fetchRemoteSchemas(serviceList);

  const server = new ApolloServer({schema});
  await server.listen(7000);

  console.log('server started');
}


bootstrap();