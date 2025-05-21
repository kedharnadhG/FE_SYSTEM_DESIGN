import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {typeDefs} from './typeDefs.js';
import {resolvers} from './resolvers.js';

/* 

    example:

    // The GraphQL schema
    const typeDefs = `#graphql
    type Query {
        hello: String
    }
    `;

    // A map of functions which return data for the schema.
    const resolvers = {
    Query: {
        hello: () => 'world',
    },
    };


*/


// The ApolloServer constructor requires two parameters: (Where are my Types & where are my Resolvers)
// 1)your schema definition and 
// 2)your set of resolvers.

//all the typeDefs & resolvers will be passed to the ApolloServer (even your Query & Mutation types will come here)
const server = new ApolloServer({
  typeDefs, 
  resolvers,
});


// Passing an ApolloServer instance to the `startStandaloneServer` function:  (standalone server is a function which is used to create a server ) 
//  1. creates an Express app (provide http connection between server and client)(it gets the post request from the client & internally route it into the graphql server)

//  2. installs your ApolloServer instance as middleware

//  3. prepares your app to handle incoming requests

// I need AppoloServer inorder to pass and bridge the gap with the Express server & Apollo server working together (working on the '4000' port)

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀 Server ready at ${url}`);

