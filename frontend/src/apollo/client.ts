import { ApolloClient, createHttpLink } from "@apollo/client";
import { cache } from "./cache";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: cache,
});
