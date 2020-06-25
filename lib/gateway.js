const { fetch } = require('cross-fetch');
const { print } = require('graphql');
const { stitchSchemas } = require('@graphql-tools/stitch');
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

const getRemoteSchema = async (url, {introspectSchemaExecutor, executor} = {}) => {
  executor = executor || createExecutor(url);
  const schema = wrapSchema({
    schema: await introspectSchema(introspectSchemaExecutor || executor),
    executor
  });
  return schema
}

async function fetchRemoteServiceListSchemas(serviceList) {
  const subschemas = [];
  for (let {url, executor, introspectSchemaExecutor} of serviceList) {
    subschemas.push({schema: await getRemoteSchema(url, {executor, introspectSchemaExecutor})});
  }

  return stitchSchemas({subschemas});
}

module.exports = {
  createExecutor,
  getRemoteSchema,
  fetchRemoteServiceListSchemas
};