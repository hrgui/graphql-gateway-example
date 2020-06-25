# GraphQL Gateway Example

This is an example of GraphQL Gateway without @apollo/federation, @apollo/gateway

# How to run this
```bash
yarn install
```

Run each of the following lines in their own seperate terminal tab.
```bash
node server1.js # run in tab 1
node server2.js # run in tab 2
node server3.js # run in tab 3
node gateway.js # run in tab 4
```

# Why would you want to do this?

1. If you want to implement authorization in the gateway level instead of the service layer.
2. If you don't care about federation, @apollo/engine.
3. If you want to use [graphql-middleware](https://github.com/prisma-labs/graphql-middleware).

# Notes
- We can also do this without apollo-server - apollo-server is just used for brevity of this example.