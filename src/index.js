import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";

import "./index.css";
import App from "./App";

import { client } from "./api/client";
import { ItemsProvider } from "./contexts/ItemsContext";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ItemsProvider>
        <App />
      </ItemsProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
