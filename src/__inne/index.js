//@flow

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

client
  .query({
    query: gql`
      {
        rates(currency: "USD") {
          name,
          rate,
          currency
        }
      }
    `
  })
  .then(result => {
    console.log(result);
    console.log(JSON.stringify(result.data));
  });
