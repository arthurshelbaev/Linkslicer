import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import ShortenForm from "./ShortenForm";
import LinkList from "./LinkList";

const client = new ApolloClient({
  uri: "http://test-task.profilancegroup-tech.com/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
        <div>
          <h1>Сокращение ссылок</h1>
          <ShortenForm />
          <h2>Мои ссылки</h2>
          <LinkList />
        </div>
    </ApolloProvider>
  );
};

export default App;