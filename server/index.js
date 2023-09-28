const { ApolloServer } = require("apollo-server");
const { typeDefs }  = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");
const { dbDataSource } = require("./datasources/dbDataSource");
require('dotenv').config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({
    req,
    dbDataSource: new dbDataSource()
  })
})
console.log(`process.env.API_PORT ${process.env.API_PORT}`);
server.listen( process.env.API_PORT ).then(({url})  => {
  console.log(`Golf Score Api is running at :- ${url}`)
})