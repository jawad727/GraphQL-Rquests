import React from 'react';
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import BookList from "./BookList/BookList"
import "./App.css"

const client = new ApolloClient({ uri: "http://localhost:3000/graphql" })

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <BookList />
      </ApolloProvider>
    </div>
  );
}

export default App;
