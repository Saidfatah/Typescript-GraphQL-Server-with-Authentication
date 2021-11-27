import "reflect-metadata";
import {createConnection} from "typeorm";
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import * as session from 'express-session';
import { typeDefs } from "./typedefs";
import { resolvers
 } from "./resolvers";





const startServer= async()=>{
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req}:any)=>({req}),
    plugins:[
      ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  });

  await createConnection();
  const app = express();
  app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'aazkmakzoaohub'
  }))
  await server.start()
  server.applyMiddleware({ app });
   app.listen({ port: 4000 },()=>{
       console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
   })
}

startServer()